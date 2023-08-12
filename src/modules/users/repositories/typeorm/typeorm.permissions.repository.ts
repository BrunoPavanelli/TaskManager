import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Permission } from "../../../../shared/database/entities/permissions.entity";
import { TPermissionRequest, TPermissionUpdate } from "../../interfaces/permissions.interfaces";
import { PermissionsRepositorie } from "../permissions.repository";

class TypeOrmPermissionsRepositories implements PermissionsRepositorie {
    private repository: Repository<Permission> = AppDataSource.getRepository(Permission);

    async create(permissionData: TPermissionRequest): Promise<Permission> {
        const permission: Permission = this.repository.create(permissionData)
        await this.repository.save(permission);

        return permission;
    }

    async findAll(): Promise<Permission[]> {
        return await this.repository.find();
    }

    async findById(permissionId: string): Promise<Permission> {
        const permission: Permission | null = await this.repository.findOneBy({
            id: permissionId
        })

        return permission!
    }

    async findByName(permissionName: string): Promise<Permission> {
        const permission: Permission | null = await this.repository.findOneBy({
            name: permissionName
        })
        console.log(permission)
        return permission!
    }

    async updateById(permissionId: string, permissionData: TPermissionUpdate): Promise<Permission> {
        const permission: Permission = await this.findById(permissionId)
        const newpermissionData = {
            ...permission,
            ...permissionData
        }

        const permissionPatched = await this.repository.save(newpermissionData);

        return permissionPatched;
    }

    async deleteById(permissionId: string): Promise<void> {
        await this.repository.delete({
            id: permissionId
        });

        return
    }
}

const permissionsRepositorie = new TypeOrmPermissionsRepositories()
export { permissionsRepositorie }