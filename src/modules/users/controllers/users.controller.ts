import { Request, Response } from "express";
import { UsersService, usersServices } from "../services/users.service";

class UsersContoller {
    constructor(private usersService: UsersService) {}

    async create(req: Request, res: Response): Promise<Response> {
        const userData = req.body
        const user = await this.usersService.create(userData);

        return res.status(201).json(user);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const users = await this.usersService.findAll();

        return res.json(users);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body
        const userResponse = await this.usersService.findById(user)

        return res.json(userResponse);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body
        const userData = req.body
        const userResponse = await this.usersService.updateById(user, userData);

        return res.json(userResponse)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body
        await this.usersService.deleteById(user);

        return res.sendStatus(204);
    }

}

const usersController = new UsersContoller(usersServices);
export { usersController };