var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const submissionSchema = mongoose.Schema({
  id: {
    type: String,
  },
  fileHash: {
    type: String,
  },
});

submissionSchema.plugin(uniqueValidator);

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = { Submission, submissionSchema };
