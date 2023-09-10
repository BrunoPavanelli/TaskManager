import { NextFunction, Request, Response, Router } from "express";

import { schemas } from "../schemas";
import { RolesContoller } from "../controllers/roles.controller";
import * as sharedMiddlewares from "../../../shared/middlewares";
import { container } from "tsyringe";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const rolesRoute = Router();

rolesRoute.use((req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next));
rolesRoute.post(
    "", 
    permissionEnsurer.ensurePermission("CAN_CREATE_ROLE"),
    schemaValidator.validateSchema(schemas.roles.request),
    container.resolve(RolesContoller).create
);
rolesRoute.get(
    "", 
    container.resolve(RolesContoller).findAll
);
rolesRoute.get(
    "/:id", 
    container.resolve(RolesContoller).findById
);
rolesRoute.patch(
    "/:id",
    permissionEnsurer.ensurePermission("CAN_UPDATE_ROLE"),
    schemaValidator.validateSchema(schemas.roles.update),
    container.resolve(RolesContoller).updateById
);
rolesRoute.delete(
    "/:id", 
    permissionEnsurer.ensurePermission("CAN_DELETE_ROLE"),
    container.resolve(RolesContoller).deleteById
);
rolesRoute.post(
    "/:id/add_permission",
    container.resolve(RolesContoller).addPermissions    
);
rolesRoute.patch(
    "/:id/remove_permission",
    container.resolve(RolesContoller).removePermissions   
);

rolesRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));
export { rolesRoute };