const { response } = require("express");
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

// const add = async (req, res) => {
//   try {
//     const response = await usersRepo.addUsers(req.body);
//     res.status(201).json({
//       msg : `Insert Succesfully`,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: `internal server error` });
//   }
// };

const add = async (req, res) => {
  // const result = await usersRepo.addUsers(req.body);
  // res.status(200).json({
  //   result : "as"
  // });
  // res.status(result.statusCode).send(result);
  try {
    const result = await usersRepo.addUsers(req.body);
    res.status(200).json({ 
      msg : `Register Succesfully`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Email already exist" });
  }
};


const edit = async (req, res) => {
  try {
    const response = await usersRepo.editUsers(req.body, req.params);
    res.status(200).json({ 
      msg : `Edit Succesfully`,
    });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await usersRepo.dropUsers(req.params);
    res.status(200).json({ 
      msg : `Delete Succesfully`, 
    });
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

const editPass = (req, res) => {
  const {body} = req
  usersRepo.editPassUsers(body)
  .then((response)=> {
    res.status(200).json({
      msg: "Password has been updated",
      data: null,
    })
  })
  .catch((objErr) => {
    const statusCode = objErr.statusCode || 500
    res.status(statusCode).json({msg: objErr.err.message})
  })
}

// const register = async (req, res) => {
//   try {
//     const response = await usersRepo.regUsers(req.body);
//     res.status(201).json({
//       msg: `register success`,
//       data: {
//         ...response.rows,
//         email: body.email,
//         name: body.name
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       msg: "internal server error",
//     });
//   }
// }


const usersController = {
  get,
  add,
  edit,
  drop,
  search,
  sort,
  filter,
  editPass
};

module.exports = usersController;
