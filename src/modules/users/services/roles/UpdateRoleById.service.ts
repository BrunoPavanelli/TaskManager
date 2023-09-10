import { inject, injectable } from "tsyringe";
import { RolesRepository } from "../../repositories/roles.repository";
import { TRoleRequest } from "../../interfaces/roles.interfaces";
import { Role } from "../../entities/roles.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class UpdateRoleByIdService {
    constructor (
        @inject("RolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    async update(roleId: string, roleData: TRoleRequest): Promise<Role | void> {
        const role = await this.rolesRepository.findByProperty(
            "id",
            roleId,
            true
        );
        if (!role) throw new AppError("Role not Found!", 404);

        const rolePatched = await this.rolesRepository.updateById(role, roleData);

        return rolePatched;
    }
}

export { UpdateRoleByIdService };