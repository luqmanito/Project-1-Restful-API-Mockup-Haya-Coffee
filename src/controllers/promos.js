const response = require("../helpers/response");
const promosRepo = require("../repo/promos");

const get = async (req, res) => {
  try {
    const response = await promosRepo.getPromos();
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
    const response = await promosRepo.addPromos(req.body, req.file);
    res.status(201).json({
      msg: `${req.body.name} has been added to product list`,
    });
  } catch (err) {
    res.status(500).json({  msg: `all fields are required`, });
  }
};

// const add = async (req, res) => {
//   try {
//     console.log(req.body);
//     const response = await productsRepo.addProducts(req.body, req.file);
//     res.status(201).json({
//       msg: `${req.body.name} has been added to product list`,
//     });
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       msg: `all fields are required`,
//     });
//   }
// };

 const mainCost = async (req, res) => {
  // console.log('dada');
  try {
    const result = await promosRepo.getCost(12);
    res.status(200).json({ result: result.data });
  } catch (error) {
    console.log(error);
  }
};


const edit = async (req, res) => {
  try {
    const response = await promosRepo.editPromos(req.body, req.query);
    res.status(200).json({ result: response });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await promosRepo.dropPromos(req.params);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  try {
    const response = await promosRepo.searchPromos(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const sort = async (req, res) => {
  try {
    const response = await promosRepo.sortPromos();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const filter = async (req, res) => {
    try {
      const response = await promosRepo.filterPromos();
      res.status(200).json({
        result: response.rows,
      });
    } catch (err) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

const promosController = {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  mainCost
};

module.exports = promosController;
