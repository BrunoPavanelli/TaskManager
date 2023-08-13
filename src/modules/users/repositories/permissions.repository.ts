import { Permission } from "../../../shared/database/entities/permissions.entity";
import { TPermissionRequest, TPermissionUpdate } from "../interfaces/permissions.interfaces";

abstract class PermissionsRepository {
    abstract create(permissionData: TPermissionRequest): Promise<Permission>;
    abstract findAll(): Promise<Permission[]>;
    abstract findById(permissionId: string): Promise<Permission | null>;
    abstract findByName(permissionName: string): Promise<Permission>;
    abstract updateById(permissionId: string, permissionData: TPermissionUpdate): Promise<Permission>;
    abstract deleteById(permissionId: string): Promise<void>;    
}

export { PermissionsRepository }