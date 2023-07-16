import mongoose from "mongoose";

const username = "admin";
const password = "admin";
const cluster = "myatlasclusteredu.e8spqcl";
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

export default init;
