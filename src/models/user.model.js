var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { groupSchema } = require("../models/group.model");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  studentGroup: groupSchema,
  staffGroups: [groupSchema],
  email: {
    type: String,
    unique: true,
  },
  year: {
    type: String,
  },
  batch: {
    type: String,
  },
  faculty: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  activated: {
    type: Boolean,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
module.exports = { User, userSchema };
