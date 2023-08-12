import { Router } from "express";
import { sharedMiddlewares } from "../../../shared/middlewares/shared.middleware";
import { permissionsController } from "../controllers/permissions.controller";
import { schemas } from "../schemas/permissions.schemas";
import { permissionsMiddleware } from "../middlewares/permissions.middleware";

const permissionsRoute = Router();

permissionsRoute.post(
    "", 
    sharedMiddlewares.validateSchema(schemas.request),
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
permissionsRoute.get(
    "/name/:name", 
    (req, res, next) => permissionsMiddleware.ensurePermissionsNameExists(req, res, next),
    (req, res) => permissionsController.findByName(req, res)
);
permissionsRoute.patch(
    "/:id",
    sharedMiddlewares.validateSchema(schemas.update),
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