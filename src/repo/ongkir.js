const axios = require("axios");
var request = require("request");

var options = {
  method: "GET",
  url: "https://api.rajaongkir.com/starter/province",
  qs: { id: "12" },
  headers: { key: "your-api-key" },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


export const getCost = (param_id) => {
   
  const id = param_id;
  const URL = `https://api.rajaongkir.com/starter/province?id=${id}`;
  return axios.get(URL, {
    headers: {
      key: "a2c6722590d364136ab0bc0bd1d69dbb",
    },
  });
};

const main = async (el) => {

  const costRequest = await getCost(12)
  try {
    localStorage.setItem("userInfo", JSON.stringify(loginRequest.data.data));
    setIsSubmit(true);
    toast.success("Login Succesfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    getDataCart();
  } catch (error) {
    console.log(error);
    setIsCorrect(true);
    setTimeout(() => {
      setIsCorrect(false);
    }, 2000);
  } finally {
    setClickLogin(!clickLogin);
  }
};
