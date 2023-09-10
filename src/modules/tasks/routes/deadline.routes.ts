import { NextFunction, Request, Response, Router } from "express";

import { schemas } from "../schemas";
import { container } from "tsyringe";
import * as sharedMiddlewares from "../../../shared/middlewares";
import { DeadLinesController } from "../controllers/deadlines.controller";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const deadlinesRoute = Router();

deadlinesRoute.use(
    (req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next)
);
// Tasks Deadlines
deadlinesRoute.post(
    "/deadline/:taskId",
    // permissionEnsurer.ensurePermission("CAN_ADD_DEADLINE"),
    schemaValidator.validateSchema(schemas.tasks.deadlineRequest),
    container.resolve(DeadLinesController).createDeadline
)
deadlinesRoute.patch(
    "/deadline/:taskId/:deadlineId",
    // permissionEnsurer.ensurePermission("CAN_UPDATE_DEADLINE"),
    schemaValidator.validateSchema(schemas.tasks.deadlineUpdate),
    container.resolve(DeadLinesController).updateDeadlineById
)
deadlinesRoute.delete(
    "/deadline/:taskId/:deadlineId",
    // permissionEnsurer.ensurePermission("CAN_REMOVE_DEADLINE"),
    container.resolve(DeadLinesController).deleteDeadlineById
)

deadlinesRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));

export { deadlinesRoute };