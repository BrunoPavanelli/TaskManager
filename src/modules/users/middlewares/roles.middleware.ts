import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../../shared/data-source";
import { Role } from "../entities/roles.entity";
import { Permission } from "../entities/permissions.entity";

class RolesMiddleware {
    private repository: Repository<Role> = AppDataSource.getRepository(Role);

    async ensureRolesIdExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const role: Role[] | null = await this.repository.find({
            where: {
                id: id
            },
            relations: {
                permissions: true
            }
        });

        if (!role[0]) return res.status(404).json({"message": "Role not Found!"})

        res.locals.role = role[0];
        return next();
    }

    async ensurePermissionsNotRelatedWithRole(req: Request, res: Response, next: NextFunction) {
        const { method } = req;
        const { role, permissions } = res.locals;

        const foundedPermissionsInRole: Permission[] = role.permissions.filter((permission: Permission) => {
            const permissionFounded = permissions.find((permissionInBody: Permission) => permissionInBody.id === permission.id)
            
            if (permissionFounded) return true
        });

        // console.log("role permissions")
        // console.log(role.permissions);
        // console.log("permissions")
        // console.log(permissions);
        // console.log("founded permissions")
        // console.log(foundedPermissionsInRole);

        if (method === "POST") {
            if (permissions.length === foundedPermissionsInRole.length) return res.status(400).json({"message": "All passed permissions is already related to role"});
        };

        if (method === "PATCH") {
            if (!foundedPermissionsInRole.length) return res.status(400).json({"message": "None of the passed permissions has relation with role"});
        };

        return next();
    }
    
}

const rolesMiddleware = new RolesMiddleware();
export { rolesMiddleware };