const mongoose = require("mongoose");

const username = "gouravt16";
const password = "Impossible888";
const cluster = "professional.acozh";
const database = "Professional";

const init = () => {
  try {
    mongoose.connect(
      `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = mongoose.connection;
    db.once("open", function () {
      console.log("MongoDB Connected successfully");
    });
  } catch (err) {
    return console.error(err);
  }
};

module.exports = init;
