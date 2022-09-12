const { hash } = require("bcrypt");
const { Task } = require("../models/Task.model");
const { User } = require("../models/User.model");

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersActive = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Task,
      },
      attributes: ["name", "email"],
      where: {
        status: "active",
      },
    });
    return res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserData = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;
    await user.update({
      name,
      email,
    });
    user.password = undefined;
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const disableUserAccount = async (req, res) => {
  try {
    const { user } = req;
    if (user.status !== "active")
      return res.status(409).json({
        status: "error",
        message: `User status is ${user.status}`,
      });
    await user.update({
      status: "disabled",
    });
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getAllUsersActive,
  updateUserData,
  disableUserAccount,
};
