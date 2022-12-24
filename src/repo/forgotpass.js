function generateOTP(length)
{
    return window.btoa(String.fromCharCode(...window.crypto.getRandomValues(new Uint8Array(length * 2)))).replace(/[+/]/g, "").substring(0, length);
}

console.log(generateOTP(22)); // "yFg3Upv2cE9cKOXd7hHwWp"

const addOtp = (body) => {
    return new Promise((resolve, reject) => {
      const { name, category, price, quantity, sold, description } = body;
        const query =
          "insert into otp (email, code) values ($1,$2)";
        postgreDb.query(query, [name, price, description], (err, response) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(query);
          resolve(response);
        });
      
    });
  };
