const { v4: uuidv4 } = require("uuid");

const { Topic } = require("../models/topic.model");
const { Group } = require("../models/group.model");
const { User } = require("../models/user.model");

const createTopic = async (req, res) => {
  Topic.init()
    .then(async () => {
      const topic = new Topic();

      topic.id = "TOPIC-" + uuidv4();
      topic.date = req.body.date;
      topic.title = req.body.title;
      topic.studentGroupId = req.body.studentGroupId;
      topic.intro = req.body.intro;
      topic.accepted = "PENDING";

      const response = await topic.save();

      Group.updateOne(
        { id: req.body.studentGroupId },
        {
          $set: {
            topic: topic,
            supervisor: req.body.supervisor,
            coSupervisor: req.body.coSupervisor,
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
            group.topic = topic;
            group.supervisor = req.body.supervisor;
            group.coSupervisor = req.body.coSupervisor;

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

            const supervisorArray = [
              req.body.supervisor,
              req.body.coSupervisor,
            ];

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

const getTopics = async (req, res) => {
  Topic.find({}, function (err, topics) {
    if (err) return res.json(err);
    return res.json(topics);
  });
};

const approveTopic = async (req, res) => {
  Topic.init()
    .then(async () => {
      Topic.updateOne(
        { id: req.body.topicId },
        {
          $set: {
            accepted: req.body.accepted,
          },
        },
        function (err, topicResponse) {
          Topic.findOne({ id: req.body.topicId }, function (err, topic) {
            Group.updateOne(
              { id: topic.studentGroupId },
              {
                $set: {
                  topic: topic,
                },
              },
              function (err, groupResp) {
                if (err) return res.json(err);

                Group.findOne(
                  { id: topic.studentGroupId },
                  function (err, group) {
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

                    const supervisorArray = [
                      group.supervisor,
                      group.coSupervisor,
                    ];

                    supervisorArray.forEach((staff) => {
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
                    });
                  }
                );
              }
            );
          });
        }
      );

      return res.json({ data: "Successfully updated topic" });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

module.exports = {
  createTopic,
  getTopics,
  approveTopic,
};
