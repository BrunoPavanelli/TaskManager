import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/middlewares/shared.middleware";
import { TPermissionRequest } from "../../interfaces/permissions.interfaces";
import { PermissionsRepository } from "../../repositories/permissions.repository";
import { Permission } from "../../entities/permissions.entity";

@injectable()
class PermissionsCreateService {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository
    ) {}

    async permissionCreate(permissionData: TPermissionRequest): Promise<Permission> {
        const { name } = permissionData;

        const permission = await this.permissionsRepository.findByProperty("name", name)
        if (permission) throw new AppError("Permission already registered", 400);

        const newpermission = await this.permissionsRepository.create(permissionData);
        return newpermission
    }
}

export { PermissionsCreateService };