const { v4: uuidv4 } = require("uuid");
const { Panel } = require("../models/panel.model");

const createPanel = async (req, res) => {
  Panel.init()
    .then(async () => {
      const panel = new Panel();

      panel.id = "PANEL-" + uuidv4();
      panel.name = req.body.name;
      panel.panelist = req.body.panelist;

      const response = await panel.save();
      return res.json({ data: response });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const getPanels = async (req, res) => {
  Panel.find({}, function (err, panels) {
    if (err) return res.json(err);
    return res.json(panels);
  });
};

const updatePanel = async (req, res) => {
  Panel.updateOne(
    { id: req.body.id },
    {
      $push: {
        panelist: req.body.staffId,
      },
    },
    function (err, response) {
      if (err) return res.json(err);
      Panel.findOne({ id: req.body.id }, function (err, panel) {
        return res.json(panel);
      });
    }
  );
};

module.exports = {
  createPanel,
  getPanels,
  updatePanel,
};
