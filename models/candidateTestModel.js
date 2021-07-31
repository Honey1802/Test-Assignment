const Mongoose = require("mongoose");
const candidate_tests = new Mongoose.Schema({
  user_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "candidate",
  },
  firstRound: {
    type: Number,
    default: null,
    max: [10, 'First round maximum score is 10'],
  },
  secondRound: {
    type: Number,
    default: null,
    max: [10, 'Second round maximum score is 10'],
  },
  thirdRound: {
    type: Number,
    default: null,
    max: [10, 'Third round maximum score is 10'],
  },
});

const CandidateTests = Mongoose.model("candidate_tests", candidate_tests);
module.exports = CandidateTests;
