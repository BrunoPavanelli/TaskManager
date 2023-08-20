import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Permission } from "../../entities/permissions.entity";
import { TPermissionRequest, TPermissionUpdate } from "../../interfaces/permissions.interfaces";
import { PermissionsRepository } from "../permissions.repository";

class TypeOrmPermissionsRepository implements PermissionsRepository {
    private repository: Repository<Permission> = AppDataSource.getRepository(Permission);

    async create(permissionData: TPermissionRequest): Promise<Permission> {
        const permission: Permission = this.repository.create(permissionData)
        await this.repository.save(permission);

        return permission;
    }

    async findAll(): Promise<Permission[]> {
        return await this.repository.find();
    }

    async findByProperty(permissionProperty: string, propertyValue: string): Promise<Permission | null> {
        const permission: Permission | null = await this.repository.findOneBy({
            [permissionProperty]: propertyValue
        });

        return permission;
    }

    async updateById(permission: Permission, permissionData: TPermissionUpdate): Promise<Permission> {
        const newpermissionData = {
            ...permission,
            ...permissionData
        }

        const permissionPatched = await this.repository.save(newpermissionData);

        return permissionPatched;
    }

    async deleteById(permission: Permission): Promise<void> {
        await this.repository.delete({
            id: permission.id
        });

        return
    }
}

export { TypeOrmPermissionsRepository }