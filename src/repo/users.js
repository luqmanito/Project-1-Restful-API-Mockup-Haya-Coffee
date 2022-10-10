const postgreDb = require("../config/postgre");
//
const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from users";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const addUsers = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into Users (id, name, mobile_number, email, address, gender, birth_date) values ($1,$2,$3,$4,$5,$6,$7)";
    //cr parsing body pake req.body, didestructuring spy lbh simpel
    const { id, name, mobile_number, email, address, gender, birth_date } =
      body;
    postgreDb.query(
      query,
      [id, name, mobile_number, email, address, gender, birth_date],
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

const editUsers = (body, params) => {
  return new Promise((resolve, reject) => {
    const query = "update users set address = $1 where id = $2";
    
    postgreDb
      .query(query, [body.address, params.id])
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const dropUsers = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from users where id = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const searchUsers = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = `select * from Users where lower(gender) like lower($1)`;
    const values = [`%${queryParams.gender}%`];
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const sortUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from users order by birth_date asc";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const filterUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `select * from users where "id" = 'id02'`;
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
const usersRepo = {
  getUsers,
  addUsers,
  editUsers,
  dropUsers,
  searchUsers,
  sortUsers,
  filterUsers,
};

module.exports = usersRepo;
