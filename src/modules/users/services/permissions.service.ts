import { Permission } from "../../../shared/database/entities/permissions.entity";
import { TPermissionRequest, TPermissionUpdate } from "../interfaces/permissions.interfaces";
import { PermissionsRepositorie } from "../repositories/permissions.repository";
import { permissionsRepositorie } from "../repositories/typeorm/typeorm.permissions.repository";

class PermissionsService {
    constructor(private permissionsRepositorie: PermissionsRepositorie) {}

    async create(permissionData: TPermissionRequest): Promise<Permission> {
        return await this.permissionsRepositorie.create(permissionData);
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionsRepositorie.findAll();
    }

    async findById(permissionId: string): Promise<Permission> {
        const permission: Permission | null = await this.permissionsRepositorie.findById(permissionId);

        return permission!
    }

    async findByName(permissionName: string): Promise<Permission> {
        return await this.permissionsRepositorie.findByName(permissionName);
    }

    async updateById(permissionId: string, permissionData: TPermissionUpdate): Promise<Permission> {
        return await this.permissionsRepositorie.updateById(permissionId, permissionData);
    }

    async deleteById(permissionId: string): Promise<void> {
        await this.permissionsRepositorie.deleteById(permissionId);
    }
}

const permissionsService = new PermissionsService(permissionsRepositorie);
export { permissionsService, PermissionsService }