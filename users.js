const express = require("express");
const users = express.Router();
const userModel = require("./model");
const crypto = require("crypto");

users.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

users.get("/:id", async (req, res) => {
  try {
    const users = await userModel.find({ _id: req.params.id });
    if (users && users.length > 0) res.send(users);
    else res.status(404).send({});
  } catch (error) {
    res.status(500).send(error);
  }
});

users.post("/", async (req, res) => {
  try {
    const id = await crypto.randomBytes(12).toString("hex");
    var data = req.body;
    data._id = id;
    await userModel.create(data);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

users.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await userModel.deleteOne({ _id });
    res.send(_id);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

users.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    var data = req.body;
    data._id = _id;
    const response = await userModel.updateOne({ _id }, data);
    if (response.matchedCount > 0) res.send(data);
    else {
      res.status(404).send("User Not Found!!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = users;
