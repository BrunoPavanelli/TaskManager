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
        const { id }= req.params
        const user = await this.usersService.findById(id)

        return res.json(user);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const userData = req.body
        const user = await this.usersService.updateById(id, userData);

        return res.json(user)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        await this.usersService.deleteById(id);

        return res.sendStatus(204);
    }

}

const usersController = new UsersContoller(usersServices);
export { usersController };