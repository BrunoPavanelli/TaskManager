import { Router } from "express";

import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";
import { deadlinesController, tasksController } from "../controllers/tasks.controller";
import { schemas } from "../schemas";
import { tasksMiddleware } from "../middlewares/tasks.middleware";
import { usersMiddleware } from "../../users/middlewares/users.middleware";

const tasksRoute = Router();

tasksRoute.use(
    (req, res, next) => usersMiddleware.ensureTokenExists(req, res, next)
);
tasksRoute.post(
    "", 
    sharedMiddlewares.ensurePermission("CAN_CREATE_TASK"),
    sharedMiddlewares.validateSchema(schemas.tasks.request),
    (req, res) => tasksController.create(req, res)
);
tasksRoute.get(
    "", 
    (req, res) => tasksController.findAll(req, res)
);
tasksRoute.get(
    "/:taskId", 
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.findById(req, res)
);
tasksRoute.patch(
    "/:taskId",
    sharedMiddlewares.ensurePermission("CAN_UPDATE_TASK"),
    sharedMiddlewares.validateSchema(schemas.tasks.update),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.updateById(req, res)
);
tasksRoute.delete(
    "/:taskId",
    sharedMiddlewares.ensurePermission("CAN_DELETE_TASK"),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.deleteById(req, res)
);

// Tasks Deadlines
tasksRoute.post(
    "/deadline/:taskId",
    sharedMiddlewares.ensurePermission("CAN_ADD_DEADLINE"),
    sharedMiddlewares.validateSchema(schemas.tasks.deadlineRequest),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTaskDontHaveAnDeadLine(req, res, next),
    (req, res) => deadlinesController.createDeadline(req, res)
)
tasksRoute.patch(
    "/deadline/:taskId/:deadlineId",
    sharedMiddlewares.ensurePermission("CAN_UPDATE_DEADLINE"),
    sharedMiddlewares.validateSchema(schemas.tasks.deadlineUpdate),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTasksDeadlineIdExists(req, res, next),
    (req, res) => deadlinesController.updateDeadlineById(req, res)
)
tasksRoute.delete(
    "/deadline/:taskId/:deadlineId",
    sharedMiddlewares.ensurePermission("CAN_REMOVE_DEADLINE"),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTasksDeadlineIdExists(req, res, next),
    (req, res) => deadlinesController.deleteDeadlineById(req, res)
)

tasksRoute.use(sharedMiddlewares.handleError)

export { tasksRoute };