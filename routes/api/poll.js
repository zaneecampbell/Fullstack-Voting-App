const express = require('express');
// const request = require("request");
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Poll = require('../../models/Poll');

// @route POST api/
// @desc create poll
// @access Public
router.post(
  '/create',
  [
    check('question', 'Please ask a question')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, options } = req.body;

    poll = new Poll({
      question,
      options
    });

    await poll.save();

    res.json(poll.id);
  }
);

// @route POST api/:id
// @desc get poll
// @access Public

router.get('/get/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(400).json({ msg: 'Poll not found' });
    }

    res.json(poll);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Poll not found' });
    }
    res.status(500).send('Server Error');
  }
});

/// @route P
/// @desc update poll information when voting
/// @access Public
router.patch('/patch/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(400).json({ msg: 'Poll not found' });
    }

    const updated = await poll.updateOne({});

    res.json(updated);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Poll not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
