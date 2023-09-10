import { inject, injectable } from "tsyringe";
import { PermissionsRepository } from "../../repositories/permissions.repository";
import { Permission } from "../../entities/permissions.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { TPermissionRequest } from "../../interfaces/permissions.interfaces";

@injectable()
class UpdatePermissionByIdService {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async update(permissionId: string, permissionData: TPermissionRequest): Promise<Permission | void> {
        const permission: Permission | null =
            await this.permissionsRepository.findByProperty("id", permissionId);
        if (!permission) throw new AppError("Permission not Found!", 404);

        const permissionPatched = await this.permissionsRepository.updateById(permission, permissionData);

        return permissionPatched;
    }
}

export { UpdatePermissionByIdService };