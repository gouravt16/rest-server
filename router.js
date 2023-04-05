import express from "express";
import users from "./users.js";
const router = express.Router();

router.use("/user(s)?", users);

export default router;
