const { Discussion } = require("../models/discussion.model");
const { Group } = require("../models/group.model");
const { User } = require("../models/user.model");

const createChat = async (req, res) => {
  Discussion.init()
    .then(async () => {
      const discussion = new Discussion();

      discussion.userId = req.body.userId;
      discussion.message = req.body.message;
      discussion.attachment = req.body.attachment;
      discussion.groupId = req.body.groupId;
      const response = await discussion.save();

      // update group object with the discussion object
      Group.updateOne(
        { id: req.body.groupId },
        {
          $push: {
            discussion: discussion,
          },
        },
        function (err, groupResp) {
          if (err) return res.json(err);

          Group.findOne({ id: req.body.groupId }, function (err, group) {
            if (err) return res.json(err);

            const studentArray = [
              group.groupLeader,
              group.secondMember,
              group.thirdMember,
              group.fourthMember,
            ];

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
                    if (element?.id === req.body.groupId) {
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

const getChats = async (req, res) => {
  Discussion.find({}, function (err, chats) {
    if (err) return res.json(err);
    return res.json(chats);
  });
};

const getChatByGroupId = async (req, res) => {
  Group.findOne({ id: req.body.groupId }, function (err, group) {
    if (err) return res.json(err);
    return res.json(group);
  });
};

module.exports = {
  createChat,
  getChats,
  getChatByGroupId,
};
