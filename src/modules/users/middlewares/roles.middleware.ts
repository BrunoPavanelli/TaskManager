import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../../shared/data-source";
import { Role } from "../entities/roles.entity";

class RolesMiddleware {
    private repository: Repository<Role> = AppDataSource.getRepository(Role);

    async ensureRolesIdExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const role: Role | null = await this.repository.findOneBy({
            id: id
        });

        if (!role) return res.status(404).json({"message": "role not Found!"})

        res.locals.role = role;
        return next();
    }
    
}

const rolesMiddleware = new RolesMiddleware();
export { rolesMiddleware };