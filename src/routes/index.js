const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const groupController = require("../controllers/group.controller");
const topicController = require("../controllers/topic.controller");
const discussionController = require("../controllers/discussion.controller");
const submissionController = require("../controllers/submission.controller");
const noticeController = require("../controllers/notice.controller");
const panelController = require("../controllers/panel.controller");
const templateController = require("../controllers/template.controller");

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.route("/login").post(userController.login);

router.route("/createUser").post(userController.createUser);
router.route("/users").get(userController.getUsers);
router.route("/userById").post(userController.getUserById);
router.route("/updateUser").post(userController.updateUser);
router.route("/deleteUser").post(userController.deleteUser);

router.route("/createGroup").post(groupController.createGroup);
router.route("/groups").get(groupController.getGroups);
router.route("/groupById").post(groupController.getGroupById);
router.route("/updateGroup").post(groupController.updateGroup);
router.route("/deleteGroup").post(groupController.deleteGroup);

router.route("/createTopic").post(topicController.createTopic);
router.route("/topics").get(topicController.getTopics);
router.route("/approveTopic").post(topicController.approveTopic);

router.route("/createSubmission").post(submissionController.createSubmission);
router.route("/submissions").get(submissionController.getSubmissions);

router.route("/createChat").post(discussionController.createChat);
router.route("/chats").get(discussionController.getChats);
router.route("/chatsByGroupId").post(discussionController.getChatByGroupId);

router.route("/createNotice").post(noticeController.createNotice);
router.route("/notices").get(noticeController.getNotices);

router.route("/createPanel").post(panelController.createPanel);
router.route("/panels").get(panelController.getPanels);
router.route("/updatePanel").post(panelController.updatePanel);

router.route("/createTemplate").post(templateController.createTemplate);
router.route("/templates").get(templateController.getTemplate);
router.route("/deleteTemplate").post(templateController.deleteTemplate);

module.exports = router;
