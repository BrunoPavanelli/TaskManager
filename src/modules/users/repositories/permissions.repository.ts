import { Permission } from "../../../shared/database/entities/permissions.entity";
import { TPermissionRequest, TPermissionUpdate } from "../interfaces/permissions.interfaces";

abstract class PermissionsRepository {
    abstract create(permissionData: TPermissionRequest): Promise<Permission>;
    abstract findAll(): Promise<Permission[]>;
    abstract findByProperty(userProperty: string, propertyValue: string): Promise<Permission | null>;
    abstract updateById(permission: Permission, permissionData: TPermissionUpdate): Promise<Permission>;
    abstract deleteById(permission: Permission): Promise<void>;    
}

export { PermissionsRepository }