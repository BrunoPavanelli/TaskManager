import { inject, injectable } from "tsyringe";
import { PermissionsRepository } from "../../repositories/permissions.repository";
import { Permission } from "../../entities/permissions.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class FindPermissionByIdService {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async findById(permissionId: string): Promise<Permission | void> {
        const permission: Permission | null =
            await this.permissionsRepository.findByProperty("id", permissionId);

        if (!permission) throw new AppError("Permission not Found!", 404);

        return permission;
    }
}

export { FindPermissionByIdService };