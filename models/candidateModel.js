const Mongoose = require("mongoose");
const user = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const candidate = Mongoose.model("candidate", user);
module.exports = candidate;
