const mongoos = require("mongoose");

//AWS server connection
const connect = mongoos
  .connect("mongodb://localhost:27017/candidate_tests", {
    useNewUrlParser: true,
  })
  .then((con) => {
    //
    if (con) {
      console.log("Database successfully connected");
    } else {
      console.log("Failed");
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect database");
  });
exports.connect;
