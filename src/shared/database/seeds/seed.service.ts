import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../../modules/users/repositories/users.repository";
import { PermissionsRepository } from "../../../modules/users/repositories/permissions.repository";
import { RolesRepository } from "../../../modules/users/repositories/roles.repository";
import { mock } from "./seed.mock";
import { User } from "../../../modules/users/entities/users.entity";
import { Permission } from "../../../modules/users/entities/permissions.entity";
import { Role } from "../../../modules/users/entities/roles.entity";

@injectable()
export class SeedService {
    constructor (
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
        @inject("PermissionsRepository")
        private permissionsRepository: PermissionsRepository,
        @inject("RolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    private async createUsers(): Promise<User[]> {
        const usersToCreate = mock.makeUsersArray(4);
        const users: User[] = await this.usersRepository.createMany(usersToCreate);

        return users
    };

    private async createPermissions(): Promise<Permission[]> {
        const permissionsToCreate = mock.permissionsArray;
        const permissions: Permission[] = await this.permissionsRepository.createMany(permissionsToCreate);

        return permissions;
    }

    private async createRoles(): Promise<Role[]> {
        const rolesToCreate = mock.rolesArray;
        const roles: Role[] = await this.rolesRepository.createMany(rolesToCreate);

        return roles
    }

    async seedDb() {
        const users = await this.createUsers();
        const permissions = await this.createPermissions();
        const roles = await this.createRoles();

        const masterRole = roles[0];
    }
}