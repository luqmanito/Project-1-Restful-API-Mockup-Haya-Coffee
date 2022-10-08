const productsRepo = require("../repo/products");

const get = async (req, res) => {
  // pada subrouter tdk perlu didefinisikan pathnya, ckup "/", krn pd mainrouter sudah didefinisikan
  try {
    const response = await productsRepo.getProducts();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const add = async (req, res) => {
  try {
    const response = await productsRepo.addProducts(req.body);
    res.status(201).json({
      result: response,
    });
  } catch (err) {
    res.status(500).json({ msg: `internal server error` });
  }
};

const edit = async (req, res) => {
  try {
    const response = await productsRepo.editProducts(req.body, req.params);
    res.status(200).json({ result: response });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await productsRepo.dropProducts(req.params)  
    res.status(200).json({ result });
} catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  } 
};

const bookController = {
  get,
  add,
  edit,
  drop,
};

module.exports = bookController;
