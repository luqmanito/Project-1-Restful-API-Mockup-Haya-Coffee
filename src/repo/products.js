// const { query } = require("express");
const postgreDb = require("../config/postgre");
//
// const getProducts = () => {
//   return new Promise((resolve, reject) => {
//     const query = "select id, name, price from products";
//     postgreDb.query(query, (err, result) => {
//       if (err) {
//         console.error(err);
//         return reject(err);
//       }
//       return resolve(result);
//     });
//   });
// };

// const getProducts = (queryParams) => {
//   return new Promise((resolve, reject) => {
//     let query = `select * from products`;
//     if (queryParams.keyword) {
//       query += ` where lower(name) like lower('%${queryParams.keyword}%')`;
//     }
//     if (queryParams.filter) {
//       if (queryParams.keyword) {
//         query += `and lower(category) like lower('%${queryParams.filter}%')`;
//       } else {
//         query += `where lower(category) like lower ('%${queryParams.filter}')`;
//       }
//     }
//     if (queryParams.sort == "oldest") {
//       query += `order by created_at asc`;
//     }
//     if (queryParams.sort == "newest") {
//       query += `order by created_at desc`;
//     }
//     if (queryParams.sort == "less popular") {
//       query += `order by sold asc`;
//     }
//     if (queryParams.sort == "most popular") {
//       query += `order by sold desc`;
//     }
//     if (queryParams.sort == "cheapest") {
//       query += `order by price asc `;
//     }
//     if (queryParams.sort == "most expensive") {
//       query += `order by price desc `;
//     }

//     const page = Number(queryParams.page)
//     const limit = Number(queryParams.limit)
//     const offset = (page-1) * limit
//     query +=

//     postgreDb.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//         return reject(err);
//       }
//       return resolve(result);
//     });
//   });
// };

const getProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    // const bookSchema = {
    //   table: "books",
    //   alias: "b",
    //   column: {
    //     id: "number",
    //     title: "string",
    //     author: "string",
    //     publisher: "string",
    //     genre: "string",
    //     published_date: "date",
    //   },
    // };
    // asumsi query params selalu berisi title dan author
    let query = "select name, category, price, quantity, sold from products p ";
    const values = [];
    const whereParams = Object.keys(queryParams).filter((key) =>
      ["name", "category"].includes(key)
    );
    if (whereParams.length > 0) query += "where ";
    whereParams.forEach((key) => {
      if (values.length > 0) query += "and ";
      query += `lower(p.${key}) like lower('%' || $${
        values.length + 1
      } || '%') `;
      values.push(String(queryParams[key]));
    });
    // paginasi biasanya diwakili dengan query page dan limit
    const page = Number(queryParams.page);
    const limit = Number(queryParams.limit);
    const offset = (page - 1) * limit;
    query += `limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const addProducts = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (name, category, image, price, quantity, sold) values ($1,$2,$3,$4,$5,$6)";
    //cr parsing body pake req.body, didestructuring spy lbh simpel
    const { name, category, price, quantity, sold } = body;
    const imageUrl = `/images/${file.filename}`;
    postgreDb.query(
      query,
      [name, category, imageUrl, price, quantity, sold],
      (err, response) => {
        // pake cb async
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          resolve(response);
        }
      }
    );
  });
};

const editProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    const query = "update products set name = $1 where id = $2";

    postgreDb
      .query(query, [body.name, params.id])
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const searchProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = `select * from products where lower(name) like lower($1)`;
    const values = [`%${queryParams.name}%`];
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const sortProductsSold = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, name, price, category, sold from products order by sold desc";

    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const sortProductsPrice = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, name, price, category, sold from products order by price asc";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const sortProductsNewest = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, name, price, category, created_at from products order by created_at desc";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const filterProducts = () => {
  return new Promise((resolve, reject) => {
    const query = `select id, name, price, category from products where "category" = 'non coffee'`;
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
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
  searchProducts,
  sortProductsSold,
  filterProducts,
  sortProductsPrice,
  sortProductsNewest,
};

module.exports = productsRepo;
