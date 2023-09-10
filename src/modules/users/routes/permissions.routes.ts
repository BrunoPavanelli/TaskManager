import { NextFunction, Request, Response, Router } from "express";

import { schemas } from "../schemas";
import * as sharedMiddlewares from "../../../shared/middlewares";
import { container } from "tsyringe";
import { PermissionsContoller } from "../controllers/permissions.controller";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const permissionsRoute = Router();

permissionsRoute.use((req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next));
permissionsRoute.post(
    "", 
    permissionEnsurer.ensurePermission("CAN_CREATE_PERMISSION"),
    schemaValidator.validateSchema(schemas.permissions.request),
    container.resolve(PermissionsContoller).create
);
permissionsRoute.get(
    "", 
    container.resolve(PermissionsContoller).findAll
);
permissionsRoute.get(
    "/:id", 
    container.resolve(PermissionsContoller).findById
);
permissionsRoute.patch(
    "/:id",
    permissionEnsurer.ensurePermission("CAN_UPDATE_PERMISSION"),
    schemaValidator.validateSchema(schemas.permissions.update),
    container.resolve(PermissionsContoller).updateById
);
permissionsRoute.delete(
    "/:id", 
    permissionEnsurer.ensurePermission("CAN_DELETE_PERMISSION"),
    container.resolve(PermissionsContoller).deleteById
)

permissionsRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));
export { permissionsRoute };