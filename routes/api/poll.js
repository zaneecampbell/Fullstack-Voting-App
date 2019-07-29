const express = require('express');
// const request = require("request");
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Poll = require('../../models/Poll');

// @route POST /api/create
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

// @route GET /api/get/:id
// @desc get poll data
// @access Public

router.get('/get/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }

    res.json(poll);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Poll not found' });
    }
    res.status(500).send('Server Error');
  }
});

/// @route Patch /api/patch/:id
/// @desc update poll count information when voting
/// @access Public
router.patch('/patch/:id', async (req, res) => {
  try {
    const index = parseInt(req.body.selected, 10);
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }

    const update = 'options.' + index + '.count';

    const updatedPoll = await poll.updateOne(
      { $inc: { [update]: 1 } },
      { upsert: true },
      () => console.log('success')
    );

    res.json(updatedPoll);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Poll not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
