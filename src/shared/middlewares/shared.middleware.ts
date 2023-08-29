import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Permission } from '../../modules/users/entities/permissions.entity';
import { Role } from '../../modules/users/entities/roles.entity';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message), (this.statusCode = statusCode);
  }
}

class SharedMiddlewares {
  permissionRepository: Repository<Permission> =
    AppDataSource.getRepository(Permission);
  roleRepository: Repository<Role> = AppDataSource.getRepository(Role);

  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      const errorMessage = { message: err.message };
      return res.status(err.statusCode).json(errorMessage);
    }

    if (err instanceof ZodError) {
      const errorMessage = { message: err.flatten().fieldErrors };
      return res.status(400).json(errorMessage);
    }

    console.log(err);
    const errorMessage = { message: 'Internal Server Error' };
    return res.status(500).json(errorMessage);
  }

  validateSchema(schema: ZodTypeAny) {
    return (
      req: Request,
      res: Response,
      next: NextFunction,
    ): void | Response => {
      const toValidate = req.body;
      const validated = schema.parse(toValidate);

      req.body = validated;
      return next();
    };
  }

  ensurePermission(permission: string) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void | Response> => {
      const userRoles: Role[] = res.locals.roles;

      const rolePermission = await this.roleRepository.find({
        relations: {
          permissions: true,
        },
        where: {
          permissions: {
            name: permission,
          },
        },
      });

      const isRolePermissionInUserRoles = userRoles.some((userRole) =>
        rolePermission.includes(userRole),
      );

      return isRolePermissionInUserRoles
        ? next()
        : res.status(403).json({
            message: "You don't have the permission to use this resource.",
          });
    };
  }
}

const sharedMiddlewares = new SharedMiddlewares();
export { sharedMiddlewares, AppError };
