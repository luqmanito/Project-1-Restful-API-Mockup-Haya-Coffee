const postgreDb = require("../config/postgre");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// otentikasi
const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    // cek apa ada email yg diinput di db
    const getPasswordByEmailQuery =
      "select id, name, password from users where email = $1";
    const getPasswordByEmailValues = [email];
    postgreDb.query(
      getPasswordByEmailQuery,
      getPasswordByEmailValues,
      (err, response) => {
        if (err) {
          console.error(err);
          return reject({ err });
        }
        if (response.rows.length === 0)
          return reject({
            err: new Error("Email or password is wrong"),
            statuscode: 401,
          });
        // cek pw di db sama dgn yg diinput
        const hashedPassword = response.rows[0].password;
        bcrypt.compare(password, hashedPassword, (err, isSame) => {
          if (err) {
            console.error(err);
            return reject({ err });
          }
          if (!isSame)
            return reject({
              err: new Error("Email or password is wrong"),
              statusCode: 401,
            });
            // proses login jika cocok, create jwt => return jwt to user
            const payload = {
                user_id: response.rows[0].id,
                name: response.rows[0].name,
                email
            }
            jwt.sign(payload, process.env.secret_key,{
                expiresIn: "5m",
                issuer: process.env.issuer,
            }, (err, token)=> {
                if (err) {
                    console.error(err);
                    return reject({err})
                }
                return resolve({token, name: payload.name})
            })
        });
      }
    );
  });
};


const authRepo = {
    login
  };
  
  module.exports = authRepo;