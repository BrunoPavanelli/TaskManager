import { Router } from "express";

import { schemas } from "../schemas";
import { rolesController } from "../controllers/roles.controller";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { usersMiddleware } from "../middlewares/users.middleware";
import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";

const rolesRoute = Router();

rolesRoute.use((req, res, next) => usersMiddleware.ensureTokenExists(req, res, next));
rolesRoute.post(
    "", 
    sharedMiddlewares.validateSchema(schemas.roles.request),
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
    sharedMiddlewares.validateSchema(schemas.roles.update),
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res) => rolesController.updateById(req, res)
);
rolesRoute.delete(
    "/:id", 
    (req, res, next) => rolesMiddleware.ensureRolesIdExists(req, res, next),
    (req, res) => rolesController.deleteById(req, res)
)

rolesRoute.use(sharedMiddlewares.handleError)
export { rolesRoute };