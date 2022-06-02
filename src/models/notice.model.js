var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const noticeSchema = mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  userRole: {
    type: String,
  },
  message: {
    type: String,
  },
  attachment: {
    type: String,
  },
});

noticeSchema.plugin(uniqueValidator);

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = { Notice, noticeSchema };
