const { Task } = require("../models/Task.model");
const { User } = require("../models/User.model");

const createNewTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;
    const task = await Task.create({
      title,
      userId,
      startDate,
      limitDate,
    });
    return res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: {
        model: User,
        attributes: ["name", "email", "id", "status"],
      },
    });
    return res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaskByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await Task.findAll({
      include: {
        model: User,
        attributes: ["name", "email", "id", "status"],
      },
      where: {
        status,
      },
    });
    return res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { task } = req;
    const { finishDate } = req.body;
    const finish = new Date(finishDate);
    const limit = new Date(task.limitDate);
    if (finish.getTime() <= limit.getTime()) {
      task.finishDate = finishDate;
      task.status = "completed";
    } else {
      task.finishDate = finishDate;
      task.status = "late";
    }
    await task.save();
    return res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { task } = req;
    await task.update({
      status: "cancelled",
    });
    return res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewTask,
  getAllTasks,
  getTaskByStatus,
  updateTaskById,
  deleteTaskById,
};
