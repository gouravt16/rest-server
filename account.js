import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import ProfileModel from "./models/ProfileModal.js";

router.post("/register", async (req, res) => {
  try {
    console.log(`Started registering the user into database`);
    const { firstname, lastname, contact, email, password, confirmPassword } = req.body;
    const existingUser = await ProfileModel.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ message: `User already exist` });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });
    await ProfileModel.create({
      firstname,
      lastname,
      contact,
      email,
      password,
      confirmPassword,
    });
    console.log(`User ${firstname} ${lastname} created successfully`)
    return res.status(201).json({ message: `User created successfully` });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Trying to login with ${email} creadentials..`)
    const userDetails = await ProfileModel.findOne({ email: email });
    if (!userDetails)
      return res.status(404).json({ message: `User Not Found` });
    if (password !== userDetails.password) {
      return res.status(400).json({ message: `Wrong Password` });
    }
    const user = { email: email };

    const tokenKey = "someRandomValues";

    const accessToken = jwt.sign(user, tokenKey, { expiresIn: "1h" });
    console.log(`User ${email} logged in successfully at ${new Date()}`)
    return res.status(200).json({ message: `Successfully logged in`, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
