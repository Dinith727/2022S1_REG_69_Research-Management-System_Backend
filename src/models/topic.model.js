var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const topicSchema = mongoose.Schema({
  id: {
    type: String,
  },
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  studentGroupId: {
    type: String,
  },
  intro: {
    type: String,
  },
  accepted: {
    type: String,
  },
});

topicSchema.plugin(uniqueValidator);

const Topic = mongoose.model("Topic", topicSchema);
module.exports = { Topic, topicSchema };
