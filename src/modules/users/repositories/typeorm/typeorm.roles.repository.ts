import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Role } from "../../entities/roles.entity";
import { TRoleRequest, TRoleUpdate } from "../../interfaces/roles.interfaces";
import { RolesRepository } from "../roles.repository";

class TypeOrmRolesRepository implements RolesRepository {
    private repository: Repository<Role> = AppDataSource.getRepository(Role);

    async create(RoleData: TRoleRequest): Promise<Role> {
        const role: Role = this.repository.create(RoleData)
        await this.repository.save(role);

        return role;
    }

    async findAll(): Promise<Role[]> {
        return await this.repository.find();
    }

    async findByProperty(roleProperty: string, propertyValue: string): Promise<Role | null> {
        const role: Role | null = await this.repository.findOneBy({
            [roleProperty]: propertyValue
        });

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
}

export { TypeOrmRolesRepository }