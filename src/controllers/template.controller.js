const { v4: uuidv4 } = require("uuid");
const { Template } = require("../models/template.model");

const createTemplate = async (req, res) => {
  Template.init()
    .then(async () => {
      const template = new Template();

      template.id = "TEMPLATE-" + uuidv4();
      template.fileName = req.body.fileName;
      template.fileHash = req.body.fileHash;

      const response = await template.save();
      return res.json({ data: response });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const getTemplate = async (req, res) => {
  Template.find({}, function (err, template) {
    if (err) return res.json(err);
    return res.json(template);
  });
};

const deleteTemplate = async (req, res) => {
  Template.deleteOne({ id: req.body.id }, function (err, resp) {
    if (err) return res.json(err);
    return res.json(resp);
  });
};

module.exports = {
  createTemplate,
  getTemplate,
  deleteTemplate,
};
