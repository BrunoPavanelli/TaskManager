import { Role } from "../../shared/database/entities/roles.entity";
import { TRoleRequest, TRoleUpdate } from "../interfaces/roles.interfaces";

abstract class rolensRepositorie {
    abstract create(roleData: TRoleRequest): Promise<Role>;
    abstract findAll(): Promise<Role[]>;
    abstract findById(roleId: string): Promise<Role | null>;
    abstract updateById(roleId: string, roleData: TRoleUpdate): Promise<Role>;
    abstract deleteById(roleId: string): Promise<void>;    
}

export { rolensRepositorie }