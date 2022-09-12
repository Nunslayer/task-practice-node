require("./config/env");
const { db } = require("./config/database");
const { httpServer } = require("./config/http");
const { initModels } = require("./models/initModels");

const initServer = async () => {
  try {
    await db.authenticate();
    initModels();
    await db.sync({ force: false });
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server init on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initServer();
