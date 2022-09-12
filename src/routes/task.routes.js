const { Router } = require("express");
const {
  createNewTask,
  getAllTasks,
  getTaskByStatus,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/tasks.controller");
const { taskCreateValidators } = require("../dto/tasks.dto");
const {
  statusIsFine,
  taskActiveExists,
} = require("../middlewares/tasks.middlewares");

const tasksRouter = Router();

//Crear tarea ( enviar title, userId, start Date y limitDate por req.body)
tasksRouter.post("/", taskCreateValidators, createNewTask);

//Obtener a todas las tareas registradas
tasksRouter.get("/", getAllTasks);

//Obtener las tareas de acuerdo con el status que nos envien.
tasksRouter.get("/:status", statusIsFine, getTaskByStatus);

//Actualizar de una tarea de acuerdo con el id
tasksRouter.patch("/:id", taskActiveExists, updateTaskById);

//Cancelar la tarea (status cancelled)
tasksRouter.delete("/:id", taskActiveExists, deleteTaskById);

module.exports = { tasksRouter };
