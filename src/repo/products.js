const postgreDb = require("../config/postgre");

const getProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    let query = `select * from products`;
    if (queryParams.search) {
      query += ` where lower(name) like lower('%${queryParams.search}%')`;
    }
    if (queryParams.filter) {
      if (queryParams.search) {
        query += ` and lower(category) = lower('${queryParams.filter}')`;
      } else {
        query += ` where lower(category) = lower ('${queryParams.filter}')`;
      }
    }
    if (queryParams.sort == "oldest") {
      query += ` order by created_at asc`;
    }
    if (queryParams.sort == "newest") {
      query += ` order by created_at desc`;
    }
    if (queryParams.sort == "less popular") {
      query += ` order by sold asc`;
    }
    if (queryParams.sort == "most-popular") {
      query += ` order by sold desc`;
    }
    if (queryParams.sort == "cheapest") {
      query += ` order by price asc `;
    }
    if (queryParams.sort == "most-expensive") {
      query += ` order by price desc `;
    }
    if (queryParams.limit && !queryParams.page) {
      query += ` limit ${queryParams.limit} `;
    }

    if (queryParams.page && queryParams.limit) {
      const values = [];
      const page = Number(queryParams.page);
      const limit = Number(queryParams.limit);
      const offset = (page - 1) * limit;
      query += ` limit $${values.length + 1} offset $${values.length + 2}`;
      console.log(query);
      values.push(limit, offset);
      postgreDb.query(query, values, (err, result) => {
        if (err) {
          console.log(query);
          console.log(err);
          return reject(err);
        }
        console.log(query);
        return resolve(result);
      });
    }

    postgreDb.query(query, (err, result) => {
      if (err) {
        console.log(query);
        console.log(err);
        return reject(err);
      }
      console.log(query);
      return resolve(result);
    });
  });
};

const addProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const { name, price, description } = body;

    if (file) {
      const query =
        "insert into products (name, image, price, description) values ($1,$2,$3,$4)";
      const imageUrl = `${file.url} `;
      postgreDb.query(
        query,
        [name, imageUrl, price, description],
        (err, response) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(query);
          resolve(response);
        }
      );
    } else {
      const query =
        "insert into products (name,  price,  description) values ($1,$2,$3)";
      postgreDb.query(query, [name, price, description], (err, response) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(query);
        resolve(response);
      });
    }
  });
};

const editProducts = (body, queryParams, file) => {
  return new Promise((resolve, reject) => {
    const { name, price, category } = body;
    let query = "update products set ";
    const values = [];

    if (file) {
      const imageUrl = `${file.url} `;
      if (!name && !price && !category) {
        if (file && file.resource_type == "image") {
          query += `image = '${imageUrl}' where id = $1`;
          values.push(queryParams.id);
        }
      } else {
        if (file && file.resource_type == "image") {
          query += `image = '${imageUrl}',`;
        }
      }
    }

    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += ` ${key} = $${idx + 1} where id = $${idx + 2}`;
        values.push(body[key], queryParams.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.log(query, values, file);
        return reject(err);
      }
      console.log(values);
      console.log(query);
      resolve(result);
    });
  });
};

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1 returning name";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(result);
    });
  });
};

const getProductsId = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = `select * from products where id = $1`;
    postgreDb.query(query, [queryParams.id], (err, result) => {
      if (err) {
        console.log(query);
        console.error(err);
        return reject(err);
      }
      console.log(query);
      return resolve(result);
    });
  });
};

const getProductsImg = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = `select image from products where id = $1`;
    postgreDb.query(query, [queryParams.id], (err, result) => {
      if (err) {
        console.log(query);
        console.error(err);
        return reject(err);
      }
      console.log(query);
      return resolve(result);
    });
  });
};

//
const productsRepo = {
  getProducts,
  addProducts,
  editProducts,
  dropProducts,
  getProductsId,
};

module.exports = productsRepo;
