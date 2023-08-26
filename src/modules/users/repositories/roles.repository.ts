import { Permission } from "../entities/permissions.entity";
import { Role } from "../entities/roles.entity";
import { TRoleRequest, TRoleUpdate } from "../interfaces/roles.interfaces";

abstract class RolesRepository {
    abstract create(roleData: TRoleRequest): Promise<Role>;
    abstract findAll(): Promise<Role[]>;
    abstract findByProperty(propertyProperty: string, propertyValue: string): Promise<Role | null>;
    abstract updateById(role: Role, roleData: TRoleUpdate): Promise<Role>;
    abstract deleteById(role: Role): Promise<void>;
    abstract addPermission(role: Role, permissions: Permission[]): Promise<object>;
    abstract removePermission(role: Role, permissions: Permission[]): Promise<object>;
}

export { RolesRepository }