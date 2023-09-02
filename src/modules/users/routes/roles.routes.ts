import { NextFunction, Request, Response, Router } from "express";

import { schemas } from "../schemas";
import { rolesController } from "../controllers/roles.controller";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { usersMiddleware } from "../middlewares/users.middleware";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import { ErrorHandler, PermissionEnsurer, SchemaValidator } from "../../../shared/middlewares";

const errorHandler = new ErrorHandler();
const schemaValidator = new SchemaValidator();
const permissionEnsurer = new PermissionEnsurer();

const rolesRoute = Router();

rolesRoute.use((req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next));
rolesRoute.post(
    "", 
    permissionEnsurer.ensurePermission("CAN_CREATE_ROLE"),
    schemaValidator.validateSchema(schemas.roles.request),
    (req, res) => rolesController.create(req, res)
);
rolesRoute.get(
    "", 
    (req, res) => rolesController.findAll(req, res)
);
rolesRoute.get(
    "/:id", 
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res) => rolesController.findById(req, res)
);
rolesRoute.patch(
    "/:id",
    permissionEnsurer.ensurePermission("CAN_UPDATE_ROLE"),
    schemaValidator.validateSchema(schemas.roles.update),
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res) => rolesController.updateById(req, res)
);
rolesRoute.delete(
    "/:id", 
    permissionEnsurer.ensurePermission("CAN_DELETE_ROLE"),
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res) => rolesController.deleteById(req, res)
);
rolesRoute.post(
    "/:id/add_permission",
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdsExists(req, res, next),
    (req, res, next) => rolesMiddleware.ensurePermissionsNotRelatedWithRole(req, res, next),
    (req, res) => rolesController.addPermission(req, res)    
);
rolesRoute.patch(
    "/:id/remove_permission",
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdsExists(req, res, next),
    (req, res, next) => rolesMiddleware.ensurePermissionsNotRelatedWithRole(req, res, next),
    (req, res) => rolesController.removePermission(req, res)    
);

rolesRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));
export { rolesRoute };