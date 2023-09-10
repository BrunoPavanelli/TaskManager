import { injectable, inject } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";
import { User } from "../entities/users.entity";
import { RolesRepository } from "../repositories/roles.repository";
import { Role } from "../entities/roles.entity";

@injectable()
class RemoveRoleOfUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
        @inject("RoleRepository")
        private rolesRepository: RolesRepository
    ) {}

    async removeRole(userId: string, roleId: string): Promise<object | void> {
        const user: User | null = await this.usersRepository.findByProperty(
            "id",
            userId,
            true
        );
        if (!user) throw new AppError("User not Found!", 404);

        const role: Role | null = await this.rolesRepository.findByProperty(
            "id",
            roleId,
            true
        );
        if (!role) throw new AppError("Role not Found!", 404);

        const roleFounded = user.roles.find(userRole => userRole.id === role.id);
        if (!roleFounded) throw new AppError("User isn't related to this role!", 400);

        const response = await this.usersRepository.removeRole(user, role);
        return response;
    }
}

export { RemoveRoleOfUserService };