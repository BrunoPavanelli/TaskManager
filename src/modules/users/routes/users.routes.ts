import { NextFunction, Request, Response, Router } from "express";

import { usersController } from "../controllers/users.controller";
import { usersMiddleware } from "../middlewares/users.middleware";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { schemas } from "../schemas";
import * as sharedMiddlewares from "../../../shared/middlewares";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const usersRoute = Router();

usersRoute.post(
    "/login",
    schemaValidator.validateSchema(schemas.users.login),
    (req, res, next) => usersMiddleware.ensureCorrectCredentials(req, res, next),
    (req, res) => usersController.login(req, res)
);

usersRoute.use((req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next));
usersRoute.post(
    "",
    permissionEnsurer.ensurePermission("CAN_CREATE_USER"),
    schemaValidator.validateSchema(schemas.users.request),
    (req, res) => usersController.create(req, res)
);
usersRoute.get(
    "", 
    (req, res) => usersController.findAll(req, res)
);
usersRoute.get(
    "/:id", 
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res) => usersController.findById(req, res)
);
usersRoute.patch(
    "/:id",
    schemaValidator.validateSchema(schemas.users.update),
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res) => usersController.updateById(req, res)
);
usersRoute.delete(
    "/:id", 
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res) => usersController.deleteById(req, res)
);
usersRoute.post(
    "/:id/add_role", 
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res, next) => usersMiddleware.ensureRoleRaletionToUser(req, res, next),
    (req, res) => usersController.addRole(req, res)
);
usersRoute.patch(
    "/:id/remove_role", 
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res, next) => usersMiddleware.ensureRoleRaletionToUser(req, res, next),
    (req, res) => usersController.removeRole(req, res)
);

usersRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));

export { usersRoute };