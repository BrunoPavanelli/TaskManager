import { NextFunction, Request, Response, Router } from "express";

import { deadlinesController, tasksController } from "../controllers/tasks.controller";
import { schemas } from "../schemas";
import { tasksMiddleware } from "../middlewares/tasks.middleware";
import { usersMiddleware } from "../../users/middlewares/users.middleware";
import { ErrorHandler, PermissionEnsurer, SchemaValidator } from "../../../shared/middlewares";

const errorHandler = new ErrorHandler();
const schemaValidator = new SchemaValidator();
const permissionEnsurer = new PermissionEnsurer();

const tasksRoute = Router();

tasksRoute.use(
    (req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next)
);
tasksRoute.post(
    "", 
    permissionEnsurer.ensurePermission("CAN_CREATE_TASK"),
    schemaValidator.validateSchema(schemas.tasks.request),
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
    permissionEnsurer.ensurePermission("CAN_UPDATE_TASK"),
    schemaValidator.validateSchema(schemas.tasks.update),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.updateById(req, res)
);
tasksRoute.delete(
    "/:taskId",
    permissionEnsurer.ensurePermission("CAN_DELETE_TASK"),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res) => tasksController.deleteById(req, res)
);

// Tasks Deadlines
tasksRoute.post(
    "/deadline/:taskId",
    permissionEnsurer.ensurePermission("CAN_ADD_DEADLINE"),
    schemaValidator.validateSchema(schemas.tasks.deadlineRequest),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTaskDontHaveAnDeadLine(req, res, next),
    (req, res) => deadlinesController.createDeadline(req, res)
)
tasksRoute.patch(
    "/deadline/:taskId/:deadlineId",
    permissionEnsurer.ensurePermission("CAN_UPDATE_DEADLINE"),
    schemaValidator.validateSchema(schemas.tasks.deadlineUpdate),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTasksDeadlineIdExists(req, res, next),
    (req, res) => deadlinesController.updateDeadlineById(req, res)
)
tasksRoute.delete(
    "/deadline/:taskId/:deadlineId",
    permissionEnsurer.ensurePermission("CAN_REMOVE_DEADLINE"),
    (req, res, next) => tasksMiddleware.ensureTasksIdExists(req, res, next),
    (req, res, next) => tasksMiddleware.ensureTasksDeadlineIdExists(req, res, next),
    (req, res) => deadlinesController.deleteDeadlineById(req, res)
)

tasksRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));

export { tasksRoute };