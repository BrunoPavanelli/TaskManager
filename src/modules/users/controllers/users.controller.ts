import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { UsersRepository } from "../repositories/users.repository";
import { usersServices } from "../services";
import { schemas } from "../schemas";

import "../containers";

@injectable()
class UsersContoller {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async login(req: Request, res: Response): Promise<Response> {
        const userData = req.body;
        const token = await container.resolve(usersServices.LoginUserService).userLogin(userData)

        return res.json(token);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const userData = req.body;
        const user = await container.resolve(usersServices.CreateUserService).userCreate(userData);

        const userResponse = schemas.users.response.parse(user);
        return res.status(201).json(userResponse);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const users = await this.usersRepository.findAll();

        const usersResponse = users.map(user => schemas.users.response.parse(user));
        return res.json(usersResponse);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const userResponse = await container.resolve(usersServices.FindUserByIdService).findById(id);
        return res.json(userResponse);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const userData = req.body;

        const userResponse = await container.resolve(usersServices.UpdateUserByIdService).update(id, userData);
        return res.json(userResponse);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await container.resolve(usersServices.DeleteUserByIdService).deleteById(id);

        return res.sendStatus(204);
    }

    async addRole(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { roleId } = req.body;
        const response = await container.resolve(usersServices.AddRoleToUserService).addRole(id, roleId);

        return res.json(response);
    }

    async removeRole(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { roleId } = req.body;
        const response = await container.resolve(usersServices.RemoveRoleOfUserService).removeRole(id, roleId);

        return res.json(response);
    }

}

export { UsersContoller };