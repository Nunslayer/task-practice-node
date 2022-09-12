const { Task } = require("../models/Task.model");

const statusIsFine = (req, res, next) => {
  try {
    const { status } = req.params;
    if (
      status !== "active" &&
      status !== "completed" &&
      status !== "late" &&
      status !== "cancelled"
    )
      return res.status(401).json({
        status: "error",
        message: "Bad request, status dont exists",
      });
    next();
  } catch (error) {
    console.log(error);
  }
};

const taskActiveExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: {
        id,
        status: "active",
      },
    });
    if (!task)
      return res.status(404).json({
        status: "error",
        message: "Task not found or status is not active",
      });
    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { statusIsFine, taskActiveExists };
