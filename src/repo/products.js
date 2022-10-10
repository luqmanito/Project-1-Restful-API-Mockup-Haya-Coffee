// const { query } = require("express");
const postgreDb = require("../config/postgre");
//
const getProducts = () => {
  return new Promise((resolve, reject) => {
    const query = "select id, name, price from products";
    postgreDb.query(query, (err, result) => {
      if (err) {  
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const addProducts = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (id, name, category, price, quantity) values ($1,$2,$3,$4,$5)";
    //cr parsing body pake req.body, didestructuring spy lbh simpel
    const { id, name, category, price, quantity } = body;
    postgreDb.query(
      query,
      [id, name, category, price, quantity],
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
    const values = [`%${queryParams.name}%`]
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
      "select id, name, price, category, sold from products order by sold asc";
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
      "select id, name, price, category, sold from products order by price desc";
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
      const query =
      `select id, name, price, category from products where "category" = 'non coffee'`;
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
  sortProductsNewest
};

module.exports = productsRepo;
