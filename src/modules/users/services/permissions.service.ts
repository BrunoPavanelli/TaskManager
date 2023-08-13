import { Permission } from "../../../shared/database/entities/permissions.entity";
import { TPermissionRequest, TPermissionUpdate } from "../interfaces/permissions.interfaces";
import { PermissionsRepository } from "../repositories/permissions.repository";
import { permissionsRepository } from "../repositories/typeorm/typeorm.permissions.repository";

class PermissionsService {
    constructor(private permissionsRepository: PermissionsRepository) {}

    async create(permissionData: TPermissionRequest): Promise<Permission> {
        return await this.permissionsRepository.create(permissionData);
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionsRepository.findAll();
    }

    async findById(permissionId: string): Promise<Permission> {
        const permission: Permission | null = await this.permissionsRepository.findById(permissionId);

        return permission!
    }

    async findByName(permissionName: string): Promise<Permission> {
        return await this.permissionsRepository.findByName(permissionName);
    }

    async updateById(permissionId: string, permissionData: TPermissionUpdate): Promise<Permission> {
        return await this.permissionsRepository.updateById(permissionId, permissionData);
    }

    async deleteById(permissionId: string): Promise<void> {
        await this.permissionsRepository.deleteById(permissionId);
    }
}

const permissionsService = new PermissionsService(permissionsRepository);
export { permissionsService, PermissionsService }