const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./router");
const init = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.use("/", router);

const port = process.env.PORT || 8080;

init();
app.listen(port, () => {
  console.log(`App running on PORT ${port}`);
});
