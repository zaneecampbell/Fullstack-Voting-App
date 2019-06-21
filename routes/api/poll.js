const express = require("express");
// const request = require("request");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Poll = require("../../models/Poll");

// @route POST api/create
// @desc create poll
// @access Public
router.post(
  "/",
  [
    check("question", "Please ask a question")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, options } = req.body;

    poll = new Poll({
      question,
      options,
    });

    await poll.save();

    res.json(poll.id);
  },
);

module.exports = router;
