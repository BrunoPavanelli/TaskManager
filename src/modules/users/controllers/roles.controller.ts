import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { RolesRepository } from "../repositories/roles.repository";
import { rolesServices } from "../services/roles";
@injectable()
class RolesContoller {
    constructor(
        @inject("rolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const roleData = req.body;
        const role = await container.resolve(rolesServices.RolesCreateService).roleCreate(roleData);

        return res.status(201).json(role);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const roles = await this.rolesRepository.findAll();

        return res.json(roles);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { role } = res.locals;

        return res.json(role);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { role } = res.locals;
        const roleData = req.body;

        const roleResponse = await this.rolesRepository.updateById(role, roleData);

        return res.json(roleResponse);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { role } = res.locals;
        await this.rolesRepository.deleteById(role);

        return res.sendStatus(204);
    }

}

const rolesController = container.resolve(RolesContoller);
export { rolesController };