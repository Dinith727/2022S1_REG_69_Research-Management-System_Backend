const { Notice } = require("../models/notice.model");

const createNotice = async (req, res) => {
  Notice.init()
    .then(async () => {
      const notice = new Notice();

      notice.userRole = req.body.userRole;
      notice.message = req.body.message;
      notice.attachment = req.body.attachment;

      const response = await notice.save();
      return res.json({ data: response });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const getNotices = async (req, res) => {
  Notice.find({}, function (err, notices) {
    if (err) return res.json(err);
    return res.json(notices);
  });
};

module.exports = {
  createNotice,
  getNotices,
};
