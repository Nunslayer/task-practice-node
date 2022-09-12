const { body } = require("express-validator");
const { Task } = require("../models/Task.model");
const { User } = require("../models/User.model");
const { checkValidations } = require("../utils/checkValidations.utils");

const taskCreateValidators = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Title must be at least 6 characters")
    .custom(async (value, { req }) => {
      return await Task.findOne({
        where: {
          userId: req.body.userId,
          title: value,
          status: "active",
        },
      }).then((task) => {
        if (task) {
          return Promise.reject(
            "User have a task with same title in active status"
          );
        }
      });
    }),
  body("userId")
    .isInt()
    .withMessage("userId must be a integer")
    .custom(async (value) => {
      return await User.findOne({
        where: {
          id: value,
          status: "active",
        },
      }).then((user) => {
        if (!user) {
          return Promise.reject("userId is invalid");
        }
      });
    }),
  checkValidations,
];

module.exports = { taskCreateValidators };
