import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from 'cookie-parser'

import router from "./router.js";
import init from "./db.js";
import account from "./account.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(cors());

init();

// Use this route for login or register.
app.use("/", account);

// Use this route for any other API apart from login or register.
app.use("/", (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      // console.log(authHeader)
      const token = authHeader && authHeader.split(" ")[1];
      // console.log(token)
      const tokenKey = "someRandomValues";
      if (token === null || token === undefined) next("Please Login to Access");
      
      jwt.verify(token, tokenKey, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        console.log('user: ',user.email)
        req.user = user;
        next();
      });
    } catch (err) {
      console.error(err);
      next(err)
    }
  },
  router
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on PORT ${port}`);
});
