const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Poll = mongoose.model("poll", PollSchema);
