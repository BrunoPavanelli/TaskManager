import { Router } from "express";

import { usersController } from "../controllers/users.controller";
import { usersMiddleware } from "../middlewares/users.middleware";
import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";
import { schemas } from "../schemas/users.schemas";

const usersRoute = Router();

usersRoute.post(
    "", 
    sharedMiddlewares.validateSchema(schemas.request),
    (req, res) => usersController.create(req, res)
);
usersRoute.post(
    "/login",
    sharedMiddlewares.validateSchema(schemas.login),
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
    sharedMiddlewares.validateSchema(schemas.update),
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res) => usersController.updateById(req, res)
);
usersRoute.delete(
    "/:id", 
    (req, res, next) => usersMiddleware.ensureUsersIdExists(req, res, next),
    (req, res) => usersController.deleteById(req, res)
);

usersRoute.use(sharedMiddlewares.handleError)

export { usersRoute };