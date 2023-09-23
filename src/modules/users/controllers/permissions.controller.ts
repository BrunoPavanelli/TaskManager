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
        const permission = await container.resolve(permissionsServices.CreatePermissionService).permissionCreate(permissionData);

        return res.status(201).json(permission);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const permissions = await this.permissionsRepository.findAll();

        return res.json(permissions);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const permissionId = req.params.id;
        const permission = await container.resolve(permissionsServices.FindPermissionByIdService).findById(permissionId);

        return res.json(permission);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const permissionId = req.params.id;
        const permissionData = req.body;

        const permissionResponse = await container.resolve(permissionsServices.UpdatePermissionByIdService).update(permissionId, permissionData);

        return res.json(permissionResponse);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const permissionId = req.params.id;
        await container.resolve(permissionsServices.DeletePermissionByIdService).deleteById(permissionId);

        return res.sendStatus(204);
    }

}

export { PermissionsContoller };