require("dotenv").config();
const express = require("express");
const postgreDb = require("./src/config/postgre");
const mainRouter = require("./src/routes/main");
const server = express();
const PORT = 8070;
const morgan = require("morgan");
const cors = require("cors");
server.use(cors());

const corsOptions = {
  origin: "*",
};

postgreDb
  .connect()
  .then(() => {
    console.log("DB is connected");
    server.use(cors(corsOptions));

    server.use(express.static("./public"));

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    server.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );

    server.use(mainRouter);

    server.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
