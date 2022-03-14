const express = require("express");
const users = require("./users");
const router = express.Router();

const data = [
  { id: 1, name: "Test Data", contact: 7685846284 },
  { id: 2, name: "Rakesh Yadav", contact: 9883962164 },
  { id: 3, name: "Rishu Yadav", contact: 9883979229 },
];

router.get("/", (req, res) => {
  res.send(data);
});

router.use("/user(s)?", users);

module.exports = router;
