var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const panelSchema = mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  panelist: [],
});

panelSchema.plugin(uniqueValidator);

const Panel = mongoose.model("Panel", panelSchema);
module.exports = { Panel, panelSchema };
