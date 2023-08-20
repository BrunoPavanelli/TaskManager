import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";

import { UsersRepository } from "../repositories/users.repository";
import { usersServices } from "../services";
import { schemas } from "../schemas/users.schemas";

@injectable()
class UsersContoller {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    login(req: Request, res: Response): Response {
        const userLoginService = new usersServices.UsersLoginService();
        const { user } = res.locals;
        
        const token = userLoginService.userLogin(user.id);

        return res.json(token);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const userData = req.body;
        const user = await container.resolve(usersServices.UsersCreateService).userCreate(userData);

        const userResponse = schemas.response.parse(user);
        return res.status(201).json(userResponse);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const users = await this.usersRepository.findAll();

        const usersResponse = users.map(user => schemas.response.parse(user));
        return res.json(usersResponse);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body;

        const userResponse = schemas.response.parse(user);
        return res.json(userResponse);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body;
        const userData = req.body;
        const userPatched = await this.usersRepository.updateById(user, userData);

        const userResponse = schemas.response.parse(userPatched);
        return res.json(userResponse);
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body;
        await this.usersRepository.deleteById(user);

        return res.sendStatus(204);
    }

}

const usersController = container.resolve(UsersContoller);
export { usersController };