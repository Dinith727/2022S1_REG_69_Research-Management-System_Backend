const { v4: uuidv4 } = require("uuid");
const { Group } = require("../models/group.model");
const { User } = require("../models/user.model");

const createGroup = async (req, res) => {
  Group.init()
    .then(async () => {
      const group = new Group();

      group.id = "GROUP-" + uuidv4();
      group.groupLeader = req.body.groupLeader;
      group.secondMember = req.body.secondMember;
      group.thirdMember = req.body.thirdMember;
      group.fourthMember = req.body.fourthMember;

      const response = await group.save();

      const studentArray = [
        "groupLeader",
        "secondMember",
        "thirdMember",
        "fourthMember",
      ];

      studentArray.forEach((member) => {
        User.updateOne(
          { id: req.body[member] },
          {
            $set: {
              studentGroup: group,
            },
          },
          function (err, resp) {
            if (err) return res.json(err);
          }
        );
      });

      return res.json({ data: response });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const getGroups = async (req, res) => {
  Group.find({}, function (err, groups) {
    if (err) return res.json(err);
    return res.json(groups);
  });
};

const getGroupById = async (req, res) => {
  const groupId = req.body.id;
  Group.findOne({ id: groupId }, function (err, groups) {
    if (err) return res.json(err);
    return res.json(groups);
  });
};

const updateGroup = async (req, res) => {
  Group.updateOne(
    { id: req.body.id },
    {
      $set: {
        id: req.body.id,
        panelId: req.body.panelId,
        groupLeader: req.body.groupLeader,
        secondMember: req.body.secondMember,
        thirdMember: req.body.thirdMember,
        fourthMember: req.body.fourthMember,
        supervisor: req.body.supervisor,
        coSupervisor: req.body.coSupervisor,
      },
    },
    function (err, resp) {
      if (err) return res.json(err);
      return res.json(resp);
    }
  );
};

const deleteGroup = async (req, res) => {
  Group.deleteOne({ id: req.body.id }, function (err, resp) {
    if (err) return res.json(err);
    return res.json(resp);
  });
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
