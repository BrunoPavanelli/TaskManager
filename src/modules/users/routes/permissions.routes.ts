import { Router } from "express";
import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";
import { permissionsController } from "../controllers/permissions.controller";
import { schemas } from "../schemas";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";
import { usersMiddleware } from "../middlewares/users.middleware";

const permissionsRoute = Router();

permissionsRoute.use((req, res, next) => usersMiddleware.ensureTokenExists(req, res, next));
permissionsRoute.post(
    "", 
    sharedMiddlewares.validateSchema(schemas.permissions.request),
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
    sharedMiddlewares.validateSchema(schemas.permissions.update),
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdExists(req, res, next),
    (req, res) => permissionsController.updateById(req, res)
);
permissionsRoute.delete(
    "/:id", 
    (req, res, next) => permissionsMiddleware.ensurePermissionsIdExists(req, res, next),
    (req, res) => permissionsController.deleteById(req, res)
)

permissionsRoute.use(sharedMiddlewares.handleError)
export { permissionsRoute };