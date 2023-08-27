import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { UsersRepository } from "../repositories/users.repository";
import { usersServices } from "../services";
import { schemas } from "../schemas";


@injectable()
class UsersContoller {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    login(req: Request, res: Response): Response {
        const userLoginService = new usersServices.UsersLoginService();
        const { id, roles } = res.locals.user;

        const token = userLoginService.userLogin({id, roles});

        return res.json(token);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const userData = req.body;
        const user = await container.resolve(usersServices.UsersCreateService).userCreate(userData);

        const userResponse = schemas.users.response.parse(user);
        return res.status(201).json(userResponse);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const users = await this.usersRepository.findAll();

        const usersResponse = users.map(user => schemas.users.response.parse(user));
        return res.json(usersResponse);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { user } = res.locals;

        const userResponse = schemas.users.response.parse(user);
        return res.json(userResponse);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { user } = res.locals;
        const userData = req.body;
        const userPatched = await this.usersRepository.updateById(user, userData);

        const userResponse = schemas.users.response.parse(userPatched);
        return res.json(userResponse);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { user } = res.locals;
        await this.usersRepository.deleteById(user);

        return res.sendStatus(204);
    }

    async addRole(req: Request, res: Response): Promise<Response> {
        const { user, role } = res.locals;
        const response = await this.usersRepository.addRole(user, role);

        return res.json(response);
    }

    async removeRole(req: Request, res: Response): Promise<Response> {
        const { user, role } = res.locals;
        const response = await this.usersRepository.removeRole(user, role);

        return res.json(response);
    }

}

const usersController = container.resolve(UsersContoller);
export { usersController };