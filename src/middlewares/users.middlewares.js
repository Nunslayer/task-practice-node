const { Task } = require("../models/Task.model");
const { User } = require("../models/User.model");

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      include: {
        model: Task,
      },
      where: {
        id,
      },
    });
    if (!user)
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExists };
