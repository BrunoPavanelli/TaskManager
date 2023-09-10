import { inject, injectable } from "tsyringe";
import { RolesRepository } from "../../repositories/roles.repository";
import { Role } from "../../entities/roles.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class FindRoleByIdService {
    constructor (
        @inject("RolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    async findById(roleId: string): Promise<Role | void> {
        const role = await this.rolesRepository.findByProperty("id", roleId, true);
        if (!role) throw new AppError("Role not Found!", 404);

        return role;
    }
}

export { FindRoleByIdService };