const { v4: uuidv4 } = require("uuid");

const { Submission } = require("../models/submission.model");
const { User } = require("../models/user.model");
const { Group } = require("../models/group.model");

const createSubmission = async (req, res) => {
  Submission.init()
    .then(async () => {
      const submission = new Submission();

      submission.id = "SUBMISSION-" + uuidv4();
      submission.fileHash = req.body.fileHash;

      const response = await submission.save();

      Group.updateOne(
        { id: req.body.studentGroupId },
        {
          $set: {
            submission: submission,
          },
        },
        function (err, groupResp) {
          if (err) return res.json(err);

          Group.findOne({ id: req.body.studentGroupId }, function (err, group) {
            if (err) return res.json(err);

            const studentArray = [
              group.groupLeader,
              group.secondMember,
              group.thirdMember,
              group.fourthMember,
            ];
            group.submission = submission;

            studentArray.forEach((member) => {
              User.updateOne(
                { id: member },
                {
                  $set: {
                    studentGroup: group,
                  },
                },
                function (err, studentResp) {
                  if (err) return res.json(err);
                }
              );
            });

            const supervisorArray = [group.supervisor, group.coSupervisor];

            supervisorArray.forEach((staff) => {
              User.findOne({ id: staff }, function (err, staffResponse) {
                if (staffResponse.staffGroups.length > 0) {
                  staffResponse.staffGroups.forEach((element) => {
                    if (element?.id === req.body.studentGroupId) {
                      User.updateOne(
                        { id: staff },
                        {
                          $set: {
                            staffGroups: group,
                          },
                        },
                        function (err, staffResp) {
                          if (err) return res.json(err);
                        }
                      );
                    } else {
                      User.updateOne(
                        { id: staff },
                        {
                          $push: {
                            staffGroups: group,
                          },
                        },
                        function (err, staffResp) {
                          if (err) return res.json(err);
                        }
                      );
                    }
                  });
                } else {
                  User.updateOne(
                    { id: staff },
                    {
                      $set: {
                        staffGroups: group,
                      },
                    },
                    function (err, staffResp) {
                      if (err) return res.json(err);
                    }
                  );
                }
              });
            });
          });
        }
      );

      return res.json({ data: response });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const getSubmissions = async (req, res) => {
  Submission.find({}, function (err, submissions) {
    if (err) return res.json(err);
    return res.json(submissions);
  });
};

module.exports = {
  createSubmission,
  getSubmissions,
};
