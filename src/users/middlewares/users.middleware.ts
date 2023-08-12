import { Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { AppDataSource } from "../../shared/data-source";
import { User } from "../../database/entities/users.entity";

class UsersMiddleware {
    private repository: Repository<User> = AppDataSource.getRepository(User);

    async ensureUsersIdExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const user: User | null = await this.repository.findOneBy({
            id: id
        });

        if (!user) return res.status(404).json({"message": "User not Found!"})

        return next();
    }

    async ensureUsersNameExists(req: Request, res: Response, next: NextFunction) {
        const { name } = req.params
        const user: User | null = await this.repository.findOneBy({
            name: name
        });

        if (!user) return res.status(404).json({"message": "User not Found!"})

        return next();
    }
}

const usersMiddleware = new UsersMiddleware();
export { usersMiddleware };