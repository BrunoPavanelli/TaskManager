import { Router } from "express";

import { usersController } from "../controllers/users.controller";
import { usersMiddleware } from "../middlewares/users.middleware";
import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { schemas } from "../schemas";

const usersRoute = Router();

usersRoute.post(
    "", 
    sharedMiddlewares.validateSchema(schemas.users.request),
    (req, res) => usersController.create(req, res)
);
usersRoute.post(
    "/login",
    sharedMiddlewares.validateSchema(schemas.users.login),
    (req, res, next) => usersMiddleware.ensureCorrectCredentials(req, res, next),
    (req, res) => usersController.login(req, res)
);

usersRoute.use((req, res, next) => usersMiddleware.ensureTokenExists(req, res, next));
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
    sharedMiddlewares.validateSchema(schemas.users.update),
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

usersRoute.use(sharedMiddlewares.handleError)

export { usersRoute };