import { Router } from "express";

import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";
import { tasksController } from "../controllers/tasks.controller";
import { schemas } from "../schemas/tasks.schemas";
import { tasksMiddleware } from "../middlewares/tasks.middleware";

const tasksRoute = Router();

tasksRoute.post(
    "", 
    sharedMiddlewares.validateSchema(schemas.request),
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
    sharedMiddlewares.validateSchema(schemas.update),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.updateById(req, res)
);
tasksRoute.delete(
    "/:taskId", 
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.deleteById(req, res)
);

// Tasks Deadlines
tasksRoute.post(
    "/deadline/:taskId",
    sharedMiddlewares.validateSchema(schemas.deadlineRequest),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTaskDontHaveAnDeadLine(req, res, next),
    (req, res) => tasksController.createDeadline(req, res)
)
tasksRoute.patch(
    "/deadline/:taskId/:deadlineId",
    sharedMiddlewares.validateSchema(schemas.deadlineUpdate),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTasksDeadlineIdExists(req, res, next),
    (req, res) => tasksController.updateDeadlineById(req, res)
)
tasksRoute.delete(
    "/deadline/:taskId/:deadlineId",
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTasksDeadlineIdExists(req, res, next),
    (req, res) => tasksController.deleteDeadlineById(req, res)
)

tasksRoute.use(sharedMiddlewares.handleError)

export { tasksRoute };