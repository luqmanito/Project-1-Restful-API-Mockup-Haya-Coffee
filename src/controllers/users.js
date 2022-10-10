const usersRepo = require("../repo/users");

const get = async (req, res) => {
  // pada subrouter tdk perlu didefinisikan pathnya, ckup "/", krn pd mainrouter sudah didefinisikan
  try {
    const response = await usersRepo.getUsers();
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
    const response = await usersRepo.addUsers(req.body);
    res.status(201).json({
      result: response,
    });
  } catch (err) {
    res.status(500).json({ msg: `internal server error` });
  }
};

const edit = async (req, res) => {
  try {
    const response = await usersRepo.editUsers(req.body, req.params);
    res.status(200).json({ result: response });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await usersRepo.dropUsers(req.params);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const search = async (req, res) => {
  // pada subrouter tdk perlu didefinisikan pathnya, ckup "/", krn pd mainrouter sudah didefinisikan
  try {
    const response = await usersRepo.searchUsers(req.query);
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
  // pada subrouter tdk perlu didefinisikan pathnya, ckup "/", krn pd mainrouter sudah didefinisikan
  try {
    const response = await usersRepo.sortUsers();
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
    // pada subrouter tdk perlu didefinisikan pathnya, ckup "/", krn pd mainrouter sudah didefinisikan
    try {
      const response = await usersRepo.filterUsers();
      res.status(200).json({
        result: response.rows,
      });
    } catch (err) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

const usersController = {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter
};

module.exports = usersController;
