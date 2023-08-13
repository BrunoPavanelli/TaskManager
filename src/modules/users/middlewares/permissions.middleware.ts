import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../../shared/data-source";
import { Permission } from "../../../shared/database/entities/permissions.entity";

class PermissionsMiddleware {
    private repository: Repository<Permission> = AppDataSource.getRepository(Permission);

    async ensurePermissionsIdExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const permission: Permission | null = await this.repository.findOneBy({
            id: id
        });

        if (!permission) return res.status(404).json({"message": "permission not Found!"})

        res.locals.permission = permission;
        return next();
    }
    
}

const permissionsMiddleware = new PermissionsMiddleware();
export { permissionsMiddleware };