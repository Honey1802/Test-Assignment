var express = require("express");
var router = express.Router();
const candidateModel = require("../models/candidateModel");
const candidateTestModel = require("../models/candidateTestModel");
/* GET users listing. */
router.post("/save-candidate", async function (req, res, next) {
  const username = req.body.name;
  const email = req.body.email;
  try {
    let found = await candidateModel.findOne({ email: email });
    if (found) {
      res
        .status(409)
        .json({ status: 409, message: "Candidate already exist", data: found });
    } else {
      const newCandidate = await candidateModel.create({
        name: username,
        email: email,
      });
      res.status(200).json({
        status: 200,
        message: "Successfully saved",
        data: newCandidate,
      });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: "Error", error });
  }
});
router.post("/assign-score", async function (req, res, next) {
  const user_id = req.body.user_id;
  let body = req.body;
  delete user_id;
  let dataToSave = {};
  for (const [key, value] of Object.entries(body)) {
    dataToSave[key] = value;
  }
  try {
    let found = await candidateTestModel.findOne({ user_id: user_id });
    if (found) {
      let updated = await candidateTestModel.findByIdAndUpdate(
        found._id,
        dataToSave
      );
      res
        .status(200)
        .json({ status: 200, message: "Successfully saved", data: updated });
    } else {
      const newCandidateTestsRecord = await candidateTestModel.create({
        user_id,
        ...dataToSave,
      });
      res.status(200).json({
        status: 200,
        message: "Successfully saved",
        data: newCandidateTestsRecord,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, message: error.message, error });
  }
});
router.get("/max-average-score", async function (req, res, next) {
  try {
    let data = await candidateTestModel.aggregate([
      {
        $addFields: {
          totalScore: { $add: ["$firstRound", "$secondRound", "$thirdRound"] },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "user_id",
          foreignField: "_id",
          as: "user_details",
        },
      },
      { $unwind: "$user_details" },
      { $sort: { totalScore: -1 } },
      {
        $group: {
          _id: "",
          firstRoundAvg: { $avg: "$firstRound" },
          secondRoundAvg: { $avg: "$secondRound" },
          thirdRoundAvg: { $avg: "$thirdRound" },
          maxScoreCandidate: { $first:"$user_details"},
          maxScore: { $first:"$totalScore"},
          },
        },
    ]);
    res
      .status(200)
      .json({ status: 200, message: "Successfully fetched", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, message: error.message, error });
  }
});

module.exports = router;
