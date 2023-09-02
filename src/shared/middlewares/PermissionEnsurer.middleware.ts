import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Permission } from "../../modules/users/entities/permissions.entity";
import { Role } from "../../modules/users/entities/roles.entity";

class PermissionEnsurer {
    permissionRepository: Repository<Permission> = AppDataSource.getRepository(Permission);
    roleRepository: Repository<Role> = AppDataSource.getRepository(Role);

    ensureTokenExists(req: Request, res: Response, next: NextFunction): Response | void {
        const authorization: string | null | undefined = req.headers.authorization;

        if (!authorization) return res.status(401).json({message: "Missing bearer token"})
    
        const [_bearer, token] = authorization.split(" ");
    
        verify(
            token,
            String(process.env.SECRET_KEY),
            (err: any, decode: any) => {
                if (err) return res.status(401).json({message: err.message})
    
                const userId: string = decode.subject;
                const roles: Role[] = decode.roles;
                res.locals.userId = userId;
                res.locals.roles = roles;
            }
        );
    
        return next();
    }

    ensurePermission(permission: string) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
            const userRoles: Role[] = res.locals.roles;

            const rolePermission = await this.roleRepository.find({
                relations: {
                    permissions: true
                },
                where: {
                    permissions: {
                        name: permission
                    }
                }
            });

            const isRolePermissionInUserRoles = userRoles.some(userRole => rolePermission.includes(userRole));

            return isRolePermissionInUserRoles ? next() : res.status(403).json({message: "You don't have the permission to use this resource."});
        };
    }

}

export { PermissionEnsurer };