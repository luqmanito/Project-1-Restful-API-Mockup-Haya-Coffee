// const { query } = require("express");
const postgreDb = require("../config/postgre");
// select id, name, price from products
const getProducts = () => {
  return new Promise((resolve, reject) => {
    const query = `select id, name, category, price, quantity from products order by name asc`;
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
    const query = "update products set category = $1 where id = $2";

    postgreDb
      .query(query, [body.category, params.id])
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
        return reject(err)
      }
      resolve(result)
    });
  });
};

const productsRepo = {
  getProducts,
  addProducts,
  editProducts,
  dropProducts
};

module.exports = productsRepo;
