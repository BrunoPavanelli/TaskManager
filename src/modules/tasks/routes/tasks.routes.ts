import { NextFunction, Request, Response, Router } from "express";

import { schemas } from "../schemas";
import { container } from "tsyringe";
import { TasksContoller } from "../controllers/tasks.controller";
import * as sharedMiddlewares from "../../../shared/middlewares";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const tasksRoute = Router();

tasksRoute.use(
    (req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next)
);
tasksRoute.post(
    "", 
    // permissionEnsurer.ensurePermission("CAN_CREATE_TASK"),
    schemaValidator.validateSchema(schemas.tasks.request),
    container.resolve(TasksContoller).create
);
tasksRoute.get(
    "", 
    container.resolve(TasksContoller).findAll
);
tasksRoute.get(
    "/:taskId", 
    container.resolve(TasksContoller).findById
);
tasksRoute.patch(
    "/:taskId",
    // permissionEnsurer.ensurePermission("CAN_UPDATE_TASK"),
    schemaValidator.validateSchema(schemas.tasks.update),
    container.resolve(TasksContoller).updateById
);
tasksRoute.delete(
    "/:taskId",
    // permissionEnsurer.ensurePermission("CAN_DELETE_TASK"),
    container.resolve(TasksContoller).deleteById
);


tasksRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));

export { tasksRoute };