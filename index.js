const express = require("express");
const postgreDb = require("./src/config/postgre");
const mainRouter = require("./src/routes/main")
const server = express();

const PORT = 8070;

postgreDb
  .connect()
  .then(() => {
    console.log("DB is connected");
// pasang parser u/ body spy bisa create/post scr dinamis
server.use(express.json())  //krn kita mau pk json, jd .json, kl urlencode pake .urlencode
server.use(express.urlencoded({extended: false}))
//true = parsing pk qs bisa nested object
//false = parsing pk querystring tdk bs nested object

    // semua request ke server akan didelegasikan ke mainRouter
    server.use(mainRouter)


// server siap menerima request, setelah routing sudah disiapkan
    server.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

