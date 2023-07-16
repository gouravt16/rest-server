import express from "express";
const users = express.Router();
import userModel from "./model.js";
import crypto from "crypto";
import multer from "multer";

users.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log(`Users data fetched successfully`)
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

users.get("/:id", async (req, res) => {
  try {
    const users = await userModel.find({ _id: req.params.id });
    if (users && users.length > 0) {
      console.log(`Data fetched successfully for user having id as ${req.params.id}`)
      return res.send(users);
    }
    else {
      console.error(`No data found for user having id as ${req.params.id}`)
      return res.status(404).send({});
    }
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
    console.log(`User created successfully`)
    return res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

// For uploading image only
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/public/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
users.post("/upload", upload.single("uploaded_file"), function (req, res) {
  res.send("file uploaded successfully");
});

users.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await userModel.deleteOne({ _id });
    console.log(`${_id} deleted successfully`)
    return res.send(_id);
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
    if (response.matchedCount > 0) {
      console.log(`${_id} updated successfully`)
      return res.send(data);
    }
    else {
      console.error(`${_id} user not found!!`)
      res.status(404).send("User Not Found!!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default users;
