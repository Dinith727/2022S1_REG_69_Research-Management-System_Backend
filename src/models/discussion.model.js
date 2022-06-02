var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const discussionSchema = mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  },
  message: {
    type: String,
  },
  attachment: {
    type: String,
  },
  groupId: {
    type: String,
  },
});

discussionSchema.plugin(uniqueValidator);

const Discussion = mongoose.model("Discussion", discussionSchema);
module.exports = { Discussion, discussionSchema };
