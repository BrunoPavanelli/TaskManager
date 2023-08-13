import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { PermissionsRepository } from "../repositories/permissions.repository";
import { permissionsServices } from "../services/permissions";

@injectable()
class PermissionsContoller {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const permissionData = req.body;
        const permission = await container.resolve(permissionsServices.PermissionsCreateService).permissionCreate(permissionData);

        return res.status(201).json(permission);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const permissions = await this.permissionsRepository.findAll();

        return res.json(permissions);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { permission } = req.body;

        return res.json(permission);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { permission } = res.locals;
        const permissionData = req.body;

        const permissionResponse = await this.permissionsRepository.updateById(permission, permissionData);

        return res.json(permissionResponse);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { permission } = req.body;
        await this.permissionsRepository.deleteById(permission);

        return res.sendStatus(204);
    }

}

const permissionsController = container.resolve(PermissionsContoller);
export { permissionsController };