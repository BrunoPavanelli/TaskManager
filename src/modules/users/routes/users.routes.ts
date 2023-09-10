import { NextFunction, Request, Response, Router } from "express";

import { schemas } from "../schemas";
import * as sharedMiddlewares from "../../../shared/middlewares";
import { container } from "tsyringe";
import { UsersContoller } from "../controllers/users.controller";

const errorHandler = new sharedMiddlewares.ErrorHandler();
const schemaValidator = new sharedMiddlewares.SchemaValidator();
const permissionEnsurer = new sharedMiddlewares.PermissionEnsurer();

const usersRoute = Router();

usersRoute.post(
    "/login",
    schemaValidator.validateSchema(schemas.users.login),
    container.resolve(UsersContoller).login
);

usersRoute.use((req, res, next) => permissionEnsurer.ensureTokenExists(req, res, next));
usersRoute.post(
    "",
    // permissionEnsurer.ensurePermission("CAN_CREATE_USER"),
    schemaValidator.validateSchema(schemas.users.request),
    container.resolve(UsersContoller).create
);
usersRoute.get(
    "", 
    container.resolve(UsersContoller).findAll
);
usersRoute.get(
    "/:id", 
    container.resolve(UsersContoller).findById
);
usersRoute.patch(
    "/:id",
    schemaValidator.validateSchema(schemas.users.update),
    container.resolve(UsersContoller).updateById
);
usersRoute.delete(
    "/:id", 
    container.resolve(UsersContoller).deleteById
);
usersRoute.post(
    "/:id/add_role", 
    container.resolve(UsersContoller).addRole
);
usersRoute.patch(
    "/:id/remove_role", 
    container.resolve(UsersContoller).removeRole
);

usersRoute.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));

export { usersRoute };