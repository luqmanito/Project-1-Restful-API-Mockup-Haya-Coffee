const response = require("../helpers/response");
const { checkWhitelistToken } = require("../repo/users");


const checkWhitelist = async (req, res, next) => {
    const token = req.header("x-access-token");
    const checkToken = await checkWhitelistToken(token);
    // console.log(checkWhitelistToken.rows.length);
    if (checkToken.rows.length === 0) {
      return response(res, {
        status: 400,
        message: "Please login first",
        
      }),next()
    }
   
}

const whitelist = {
    checkWhitelist
}

module.exports = whitelist;