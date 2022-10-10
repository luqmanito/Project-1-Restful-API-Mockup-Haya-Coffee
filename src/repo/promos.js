// const { query } = require("express");
const postgreDb = require("../config/postgre");
//
const getPromos= () => {
  return new Promise((resolve, reject) => {
    const query = "select id, discount, free_delivery, valid_until from promos";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const addPromos= (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into promos (id, discount, free_delivery, valid_until) values ($1,$2,$3,$4)";
    //cr parsing body pake req.body, didestructuring spy lbh simpel
    const { id, discount, free_delivery, valid_until } = body;
    postgreDb.query(
      query,
      [id, discount, free_delivery, valid_until],
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

const editPromos= (body, params) => {
  return new Promise((resolve, reject) => {
    const query = "update promos set discount = $1 where id = $2";

    postgreDb
      .query(query, [body.discount, params.id])
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const dropPromos= (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from promos where id = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const searchPromos= (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = `select * from promos where lower(free_delivery) like lower($1)`;
    const values = [`%${queryParams.free_delivery}%`]
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const sortPromos= () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, discount, free_delivery, valid_until from promos order by discount asc";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const filterPromos= () => {
    return new Promise((resolve, reject) => {
      const query =
      `select id, discount, free_delivery, valid_until from promos where "free_delivery" = 'YES'`;
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
const promosRepo = {
  getPromos,
  addPromos,
  editPromos,
  dropPromos,
  searchPromos,
  sortPromos,
  filterPromos
};

module.exports = promosRepo;
