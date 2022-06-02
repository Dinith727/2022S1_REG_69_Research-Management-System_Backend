const { User } = require("../models/user.model");

const createUser = async (req, res) => {
  User.init()
    .then(async () => {
      const user = new User();

      user.id = req.body.id;
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.email = req.body.email;
      user.year = req.body.year;
      user.batch = req.body.batch;
      user.faculty = req.body.faculty;
      user.password = req.body.password;
      user.role = req.body.role;
      user.activated = true;

      const response = await user.save();
      return res.json({ data: response });
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const getUsers = async (req, res) => {
  User.find({}, function (err, users) {
    if (err) return res.json(err);
    return res.json(users);
  });
};

const getUserById = async (req, res) => {
  const userId = req.body.id;
  User.findOne({ id: userId }, function (err, users) {
    if (err) return res.json(err);
    return res.json(users);
  });
};

const updateUser = async (req, res) => {
  User.updateOne(
    { id: req.body.id },
    {
      $set: {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        year: req.body.year,
        batch: req.body.batch,
        faculty: req.body.faculty,
        password: req.body.password,
        role: req.body.role,
        activated: req.body.activated,
      },
    },
    function (err, resp) {
      if (err) return res.json(err);
      return res.json(resp);
    }
  );
};

const deleteUser = async (req, res) => {
  User.deleteOne({ id: req.body.id }, function (err, resp) {
    if (err) return res.json(err);
    return res.json(resp);
  });
};

const login = async (req, res) => {
  User.findOne({ email: req.body.email }, function (err, resp) {
    if (err) return res.json(err);
    if (resp && req.body.password === resp.password && resp.activated) {
      res.json(resp);
    } else {
      res.json({ exists: false });
    }
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
