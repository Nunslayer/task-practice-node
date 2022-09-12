const { Router } = require("express");
const {
  createNewUser,
  getAllUsersActive,
  updateUserData,
  disableUserAccount,
} = require("../controllers/users.controller");
const { userCreateValidators } = require("../dto/users.dto");
const { userExists } = require("../middlewares/users.middlewares");

const usersRouter = Router();

//Crear usuario (enviar name, email, y password por req.body)
usersRouter.post("/", userCreateValidators, createNewUser);

//Obtener a todos los usuarios activos
usersRouter.get("/", getAllUsersActive);

//Actualizar perfil de usuario (solo name y email)
usersRouter.patch("/:id", userExists, updateUserData);

//Deshabilitar cuenta de usuario
usersRouter.delete("/:id", userExists, disableUserAccount);

module.exports = { usersRouter };
