import { NextFunction, Request, Response } from "express";
import { In, Repository } from "typeorm";

import { AppDataSource } from "../../../shared/data-source";
import { Permission } from "../entities/permissions.entity";

class PermissionsMiddleware {
    private repository: Repository<Permission> = AppDataSource.getRepository(Permission);

    async ensurePermissionsIdExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const permission: Permission | null = await this.repository.findOneBy({
            id: id
        });

        if (!permission) return res.status(404).json({"message": "Permission not Found!"})

        res.locals.permission = permission;
        return next();
    }

    async ensurePermissionsIdsExists(req: Request, res: Response, next: NextFunction) {
        const { permissions } = req.body;
        const findedPermissions: Permission[] = [];
        const notFindedPermissions: string[] = [];

        for (const id of permissions) {
            const permission: Permission | null = await this.repository.findOneBy({
                id: id
            });

           permission 
           ? findedPermissions.push(permission)
           : notFindedPermissions.push(id)
        };

        if (notFindedPermissions.length) return res.status(404).json({"message": `Permissions with ids:${notFindedPermissions} not exists!`});

        res.locals.permissions = findedPermissions;
        return next();
    };
}

const permissionsMiddleware = new PermissionsMiddleware();
export { permissionsMiddleware };