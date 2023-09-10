import { inject, injectable } from "tsyringe";
import { PermissionsRepository } from "../../repositories/permissions.repository";
import { Permission } from "../../entities/permissions.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { TPermissionRequest } from "../../interfaces/permissions.interfaces";

@injectable()
class DeletePermissionByIdService {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async deleteById(permissionId: string): Promise<void> {
        const permission: Permission | null =
            await this.permissionsRepository.findByProperty("id", permissionId);
        if (!permission) throw new AppError("Permission not Found!", 404);

        await this.permissionsRepository.deleteById(permission);
        return 
    }
}

export { DeletePermissionByIdService };