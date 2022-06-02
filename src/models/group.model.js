var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { topicSchema } = require("../models/topic.model");
const { discussionSchema } = require("../models/discussion.model");
const { submissionSchema } = require("../models/submission.model");

const groupSchema = mongoose.Schema({
  id: {
    type: String,
  },
  panelId: {
    type: String,
  },
  groupLeader: {
    type: String,
  },
  secondMember: {
    type: String,
  },
  thirdMember: {
    type: String,
  },
  fourthMember: {
    type: String,
  },
  supervisor: {
    type: String,
  },
  coSupervisor: {
    type: String,
  },
  topic: topicSchema,
  discussion: [discussionSchema],
  submission: submissionSchema,
});

groupSchema.plugin(uniqueValidator);

const Group = mongoose.model("Group", groupSchema);
module.exports = { Group, groupSchema };
