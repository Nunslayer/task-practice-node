const { validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      const message = errorMessages.join(". ");
      return res.status(400).json({
        status: "error",
        message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkValidations };
