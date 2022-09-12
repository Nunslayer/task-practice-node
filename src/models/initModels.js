const { Task } = require("./Task.model");
const { User } = require("./User.model");

const initModels = () => {
  User.hasMany(Task, { foreignKey: "userId" });
  Task.belongsTo(User);
};

module.exports = { initModels };
