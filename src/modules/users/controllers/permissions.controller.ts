import { Request, Response } from "express";
import { permissionsService, PermissionsService } from "../services/permissions.service";

class PermissionsContoller {
    constructor(private permissionsService: PermissionsService) {}

    async create(req: Request, res: Response): Promise<Response> {
        const permissionData = req.body
        const permission = await this.permissionsService.create(permissionData);

        return res.status(201).json(permission);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const permissions = await this.permissionsService.findAll();

        return res.json(permissions);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const permission = await this.permissionsService.findById(id)

        return res.json(permission);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const permissionData = req.body
        const permission = await this.permissionsService.updateById(id, permissionData);

        return res.json(permission)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        await this.permissionsService.deleteById(id);

        return res.sendStatus(204);
    }

}

const permissionsController = new PermissionsContoller(permissionsService);
export { permissionsController };