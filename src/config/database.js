const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_URL,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PRIVATE_KEY,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  logging: false,
});

module.exports = { db, DataTypes };
