import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { RolesRepository } from "../repositories/roles.repository";
import { rolesServices } from "../services/roles";

@injectable()
class RolesContoller {
    constructor(
        @inject("RolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const roleData = req.body;
        const role = await container
            .resolve(rolesServices.RolesCreateService)
            .roleCreate(roleData);

        return res.status(201).json(role);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const roles = await this.rolesRepository.findAll();

        return res.json(roles);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const roleId = req.params.id;
        const role = await container.resolve(rolesServices.FindRoleByIdService).findById(roleId);

        return res.json(role);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const roleId = req.params.id;
        const roleData = req.body;

        const role = await container.resolve(rolesServices.UpdateRoleByIdService).update(roleId, roleData);

        return res.json(role);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const roleId = req.params.id;
        await container.resolve(rolesServices.DeleteRoleByIdService).deleteById(roleId);

        return res.sendStatus(204);
    }

    async addPermissions(req: Request, res: Response): Promise<Response> {
        const roleId = req.params.id;
        const permissionsIds = req.body;
        const response = await container.resolve(rolesServices.AddPermissionToRoleSerivce).addPermissions(roleId, permissionsIds);

        return res.json(response);
    }

    async removePermissions(req: Request, res: Response): Promise<Response> {
        const roleId = req.params.id;
        const permissionsIds = req.body;
        const response = await container.resolve(rolesServices.RemovePermissionOfRoleService).removePermissions(roleId, permissionsIds);

        return res.json(response);
    }
}

export { RolesContoller };
