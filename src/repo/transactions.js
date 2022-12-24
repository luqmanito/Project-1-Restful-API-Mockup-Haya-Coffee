const postgreDb = require("../config/postgre");
//
const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select * from transactions";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const addTransactions = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into transactions (order_id, status, quantity_ordered, product_code, order_date) values ($1,$2,$3,$4,$5)";
    const { order_id, status, quantity_ordered, product_code, order_date } =
      body;
    postgreDb.query(
      query,
      [order_id, status, quantity_ordered, product_code, order_date],
      (err, response) => {
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

const createTransactions = (body, user_id) => {
  console.log('dari repo trans',user_id);
  return new Promise((resolve, reject) => {
    const query =
      "insert into transactions (user_id, products_name, address_detail, phone_number, payment_method, delivery_method, status_order, total_order, image, id_product) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning id";

    const {
      products_name,
      address_detail,
      phone_number,
      payment_method,
      delivery_method,
      status_order,
      total_order,
      image,
      id_product   
    } = body;
    postgreDb.query(
      query,
      [
        user_id,
        products_name,
        address_detail,
        phone_number,
        payment_method,
        delivery_method,
        status_order,
        total_order, 
        image,
        id_product
      ],
      (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        resolve(result);
      }
    );
  });
};


const getTransactionByUserId = (user_id) => {
  console.log(user_id);
  return new Promise((resolve, reject) => {
    let query =
      "select id, products_name, image, address_detail, phone_number, payment_method, delivery_method, status_order, total_order from transactions where user_id = $1";

    postgreDb.query(query, [user_id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const editTransactions = (body, queryParams) => {
  return new Promise((resolve, reject) => {
    const query = "update transactions set status_order = $1 where id = $2";

    postgreDb
      .query(query, [body.status, queryParams.id])
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

// const dropTransactions = (params) => {
//   return new Promise((resolve, reject) => {
//     const query = "delete from transactions where order_id = $1";
//     postgreDb.query(query, [params.order_id], (err, result) => {
//       if (err) {
//         console.error(err);
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

const deleteTransactions = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = "delete from transactions where id = $1";

    postgreDb.query(query, [queryParams.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      resolve(result);
    });
  });
};

const searchTransactions = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = `select * from transactions where lower(status) like lower($1)`;
    const values = [`%${queryParams.status}%`];
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const sortTransactions = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select order_id, status, quantity_ordered, product_code, order_date from transactions order by order_date asc";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const filterTransactions = () => {
  return new Promise((resolve, reject) => {
    const query = `select * from transactions where "product_code" = 'p01x'`;
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
const transactionsRepo = {
  getTransactions,
  addTransactions,
  editTransactions,
  searchTransactions,
  sortTransactions,
  filterTransactions,
  createTransactions,
  getTransactionByUserId,
  deleteTransactions
};

module.exports = transactionsRepo;
