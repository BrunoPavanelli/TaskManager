import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Role } from "../../entities/roles.entity";
import { TRoleRequest, TRoleUpdate } from "../../interfaces/roles.interfaces";
import { RolesRepository } from "../roles.repository";
import { Permission } from "../../entities/permissions.entity";

class TypeOrmRolesRepository implements RolesRepository {
    private repository: Repository<Role> = AppDataSource.getRepository(Role);

    async create(RoleData: TRoleRequest): Promise<Role> {
        const role: Role = this.repository.create(RoleData)
        await this.repository.save(role);

        return role;
    }

    async createMany(rolesData: TRoleRequest[]): Promise<Role[]> {
        const roles: Role[] = this.repository.create(rolesData);
        await this.repository.save(roles);

        return roles;
    }


    async findAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    async findByProperty(roleProperty: string, propertyValue: string, relations: boolean): Promise<Role | null> {
        const role: Role | null = 
        relations 
        ? await this.repository.findOne({
            where: {
                [roleProperty]: propertyValue
            },
            relations: {
                permissions: true
            }
        })
        : await this.repository.findOneBy({
            [roleProperty]: propertyValue
        })

        return role;
    }

    async updateById(role: Role, roleData: TRoleUpdate): Promise<Role> {
        const newRoleData = {
            ...role,
            ...roleData
        }

        const rolePatched = await this.repository.save(newRoleData);

        return rolePatched;
    }

    async deleteById(role: Role): Promise<void> {
        await this.repository.delete({
            id: role.id
        });

        return
    }

    async addPermissions(role: Role, permissions: Permission[]): Promise<object> {
        role.permissions = [...role.permissions, ...permissions];
        await this.repository.save(role);

        return { message: "Permissions added succesfully!" };
    }

    async removePermissions(role: Role, permissions: Permission[]): Promise<object> {
        role.permissions = role.permissions.filter(permission => {
            const permissionFounded = permissions.find((permissionInBody: Permission) => permissionInBody.id === permission.id)
            
            if (!permissionFounded) return true
        });
        await this.repository.save(role);

        return { message: "Permissions removed succesfully!" };
    }
}

export { TypeOrmRolesRepository }