import { Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { AppDataSource } from "../../../shared/data-source";
import { User } from "../entities/users.entity";
import { TLogin } from "../interfaces/users.interfaces";
import { compareSync } from "bcryptjs";

class UsersMiddleware {
    private repository: Repository<User> = AppDataSource.getRepository(User);

    async ensureUsersIdExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const user: User | null = await this.repository.findOneBy({
            id: id
        });

        if (!user) return res.status(404).json({"message": "User not Found!"})

        req.body.user = user;
        return next();
    }
    
    async ensureCorrectCredentials(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const userData: TLogin = req.body;

        const user: User | null = await this.repository.findOneBy({
            email: userData.email
        });

        if (!user) return res.status(401).json({message: "Invalid credentials"});

        const userPassword: string = user.password;
        const userRequestPassword: string = userData.password;

        const validatePassword: boolean = compareSync(userRequestPassword, userPassword);
        if (!validatePassword) return res.status(401).json({message: "Invalid credentials"});

        res.locals.user = user;

        return next();
    }
}

const usersMiddleware = new UsersMiddleware();
export { usersMiddleware };