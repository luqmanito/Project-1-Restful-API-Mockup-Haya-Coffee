const postgreDb = require("../config/postgre");
const bcrypt = require("bcrypt");
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
    const { name, password, mobile_number, email, address, gender, birth_date } = body;
    const emailValidation = `select email from users where email like $1`;
    postgreDb.query(emailValidation, [email], (err, resEmail) => {
      if (err) return reject({err});
      if (resEmail.rows.length > 0) {
        return reject(err);
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return resolve({err});
        }
        const query =
          "INSERT INTO users (name, password, mobile_number, email, address, gender, birth_date) values ($1,$2,$3,$4,$5,$6,$7) RETURNING id";
        const values = [name, hashedPassword, mobile_number, email, address, gender, birth_date];
        postgreDb.query(query, values, (err, result) => {
          if (err) {
            console.log(err);
            return resolve({err});
          }
          return resolve(result);
        });
      });
    });
  });
};


// const adddUsers = (body) => {
//   return new Promise((resolve, reject) => {
//     const queryAdd =
//       "insert into Users (name, password, mobile_number, email, address, gender, birth_date) values ($1,$2,$3,$4,$5,$6,$7)";
//     const queryCheckPhoneAndMail =
//       "select email from users u where email like $1";

//     //cr parsing body pake req.body, didestructuring spy lbh simpel
//     const {
//       name,
//       password,
//       mobile_number,
//       email,
//       address,
//       gender,
//       birth_date,
//     } = body;

//     postgreDb.query(
//       queryCheckPhoneAndMail,
//       [mobile_number, email],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           return reject({ err });
//         }

//         if (result.rows.length > 0) {
//           let errMsg = {};
//         if (
//           result.rows.email === email
//         ) {
//           errMsg.push("email already exist!");
//           console.error(err);
//           return reject(errMsg);
//         }
//         }
//         bcrypt.hash(password, 10, (err, hashedpw) => {
//           if (err) {
//             console.error(err);
//             return reject(err);
//           }
//           const values = [
//             name,
//             hashedpw,
//             mobile_number,
//             email,
//             address,
//             gender,
//             birth_date,
//           ];
//           postgreDb.query(queryAdd, values, (err, result) => {
//             if (err) {
//               console.error(err);
//               return reject(err);
//             }
//             return resolve(result);
//           });
//         });
//       }

//     );

    
//   });
// };




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
//editpassword
const editPassUsers = (body) => {
  return new Promise((resolve, reject) => {
    const { old_password, new_password, user_id } = body;
    const getPwdQuery = "select password from users where id = $1";
    const getPwdValues = [user_id];
    postgreDb.query(getPwdQuery, getPwdValues, (err, response) => {
      if (err) {
        console.error(err);
        return reject({ err });
      }
      const hashedPassword = response.rows[0].password;
      bcrypt.compare(old_password, hashedPassword, (err, isSame) => {
        if (err) {
          console.error(err);
          return reject({ err });
        }
        if (!isSame)
          return reject({
            err: new Error("Old password is wrong"),
            statusCode: 403,
          });
        bcrypt.hash(new_password, 10, (err, newHashedPassword) => {
          if (err) {
            console.error(err);
            return reject({ err });
          }
          const editPwdQuery = "update users set password =$1 where id = $2";
          const editPwdValues = [newHashedPassword, user_id];
          postgreDb.query(editPwdQuery, editPwdValues, (err, response) => {
            if (err) {
              console.error(err);
              return reject({ err });
            }
            return resolve(response);
          });
        });
      });
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
  editPassUsers,
};

module.exports = usersRepo;
