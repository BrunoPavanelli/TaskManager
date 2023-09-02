import { NextFunction, Request, Response, Router } from "express";
import { permissionsController } from "../controllers/permissions.controller";
import { schemas } from "../schemas";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import * as sharedMiddlewares from "../../../shared/middlewares";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const permissionsRoute = Router();

permissionsRoute.use((req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next));
permissionsRoute.post(
    "", 
    permissionEnsurer.ensurePermission("CAN_CREATE_PERMISSION"),
    schemaValidator.validateSchema(schemas.permissions.request),
    (req, res) => permissionsController.create(req, res)
);
permissionsRoute.get(
    "", 
    (req, res) => permissionsController.findAll(req, res)
);
permissionsRoute.get(
    "/:id", 
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdExists(req, res, next),
    (req, res) => permissionsController.findById(req, res)
);
permissionsRoute.patch(
    "/:id",
    permissionEnsurer.ensurePermission("CAN_UPDATE_PERMISSION"),
    schemaValidator.validateSchema(schemas.permissions.update),
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdExists(req, res, next),
    (req, res) => permissionsController.updateById(req, res)
);
permissionsRoute.delete(
    "/:id", 
    permissionEnsurer.ensurePermission("CAN_DELETE_PERMISSION"),
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdExists(req, res, next),
    (req, res) => permissionsController.deleteById(req, res)
)

permissionsRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));
export { permissionsRoute };