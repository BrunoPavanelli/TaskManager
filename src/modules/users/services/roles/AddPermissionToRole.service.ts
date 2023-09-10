import { inject, injectable } from "tsyringe";
import { RolesRepository } from "../../repositories/roles.repository";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { Permission } from "../../entities/permissions.entity";
import { PermissionsRepository } from "../../repositories/permissions.repository";

@injectable()
class AddPermissionToRoleSerivce {
    constructor(
        @inject("RolesRepository")
        private rolesRepository: RolesRepository,
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async addPermissions(
        roleId: string,
        permissionsIds: string[]
    ): Promise<object | void> {
        const role = await this.rolesRepository.findByProperty(
            "id",
            roleId,
            true
        );
        if (!role) throw new AppError("Role not Found!", 404);

        const findedPermissions: Permission[] = [];
        const notFindedPermissions: string[] = [];

        for (const id of permissionsIds) {
            const permission: Permission | null =
                await this.permissionsRepository.findByProperty("id", id);

            permission
                ? findedPermissions.push(permission)
                : notFindedPermissions.push(id);
        }

        if (notFindedPermissions.length)
            throw new AppError(
                `Permissions with ids:${notFindedPermissions} not exists!`,
                404
            );

        const foundedPermissionsInRole: Permission[] = role.permissions.filter(
            (permission: Permission) => {
                const permissionFounded = findedPermissions.find(
                    (permissionInBody: Permission) =>
                        permissionInBody.id === permission.id
                );

                if (permissionFounded) return true;
            }
        );

        if (foundedPermissionsInRole.length === permissionsIds.length)
            throw new AppError(
                "All passed permissions is already related to role",
                409
            );

        const response = await this.rolesRepository.addPermissions(
            role,
            findedPermissions
        );
        return response;
    }
}

export { AddPermissionToRoleSerivce };
