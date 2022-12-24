const transactionsRepo = require("../repo/transactions");

const get = async (req, res) => {
  try {
    const response = await transactionsRepo.getTransactions();
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
    const response = await transactionsRepo.addTransactions(req.body);
    res.status(201).json({
      msg : `Insert Succesfully`,
    });
  } catch (err) {
    res.status(500).json({ msg: `internal server error` });
  }
};

const edit = async (req, res) => {
  try {
    const response = await transactionsRepo.editTransactions(req.body, req.query);
    res.status(200).json({ 
      msg : `Edit Succesfully`, 
    });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await transactionsRepo.dropTransactions(req.params);
    res.status(200).json({ 
      msg : `Delete Succesfully`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  try {
    const response = await transactionsRepo.searchTransactions(req.query);
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
    const response = await transactionsRepo.sortTransactions();
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
      const response = await transactionsRepo.filterTransactions();
      res.status(200).json({
        result: response.rows,
      });
    } catch (err) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

  const create = async (req, res) => {
    const user_id = req.userPayload.user_id;
    try {
      const response = await transactionsRepo.createTransactions(req.body, user_id);
      res.status(201).json({
        msg : `Transaction Created Succesfully`,
        data : response
      });
    } catch (err) {
      res.status(500).json({ msg: `internal server error` });
    }
  };

  const getHistoryTransaction = async (req, res) => {
    const user_id = req.userPayload.user_id;
    try {
      const response = await transactionsRepo.getTransactionByUserId(user_id);
      res.status(200).json({
        result: response.rows,
      });
    } catch (err) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

  const dropTransactions = async (req, res) => {
    try {
      const result = await transactionsRepo.deleteTransactions(req.query);
      return res.status(200).json({
        status: 200,
        message: "Delete success",
      });
    } catch (error) {
      return res.status(500).json({
        error,
        status: 500,
        message: "Internal server error",
      });
    }
  }


const transactionsController = {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  create,
  getHistoryTransaction,
  dropTransactions
};

module.exports = transactionsController;
