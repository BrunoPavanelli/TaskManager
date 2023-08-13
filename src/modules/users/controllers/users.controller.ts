import { Request, Response } from "express";
import { UsersRepository } from "../repositories/users.repository";
import { schemas } from "../schemas/users.schemas";
import { usersRepository } from "../repositories/typeorm/typeorm.users.repository";

class UsersContoller {
    constructor(private usersRepository: UsersRepository) {}

    async create(req: Request, res: Response): Promise<Response> {
        const userData = req.body
        const user = await this.usersRepository.create(userData);

        const userResponse = schemas.response.parse(user)
        return res.status(201).json(userResponse);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const users = await this.usersRepository.findAll();

        const usersResponse = users.map(user => schemas.response.parse(user))
        return res.json(usersResponse);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body

        const userResponse = schemas.response.parse(user)
        return res.json(userResponse);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body
        const userData = req.body
        const userPatched = await this.usersRepository.updateById(user, userData);

        const userResponse = schemas.response.parse(userPatched)
        return res.json(userResponse)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { user } = req.body
        await this.usersRepository.deleteById(user);

        return res.sendStatus(204);
    }

}

const usersController = new UsersContoller(usersRepository);
export { usersController };