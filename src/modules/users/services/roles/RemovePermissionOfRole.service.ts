import { inject } from "tsyringe";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { Permission } from "../../entities/permissions.entity";
import { PermissionsRepository } from "../../repositories/permissions.repository";
import { RolesRepository } from "../../repositories/roles.repository";

class RemovePermissionOfRoleService {
    constructor(
        @inject("RolesRepository")
        private rolesRepository: RolesRepository,
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async removePermissions(
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

        if (!foundedPermissionsInRole)
            throw new AppError(
                "None of the passed permissions has relation with role",
                409
            );

        const response = await this.rolesRepository.removePermissions(
            role,
            findedPermissions
        );
        return response;
    }
}

export { RemovePermissionOfRoleService };
