var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const templateSchema = mongoose.Schema({
  id: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileHash: {
    type: String,
  },
});

templateSchema.plugin(uniqueValidator);

const Template = mongoose.model("Template", templateSchema);
module.exports = { Template, templateSchema };
