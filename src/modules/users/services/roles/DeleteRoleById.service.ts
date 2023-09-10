import { inject, injectable } from "tsyringe";
import { RolesRepository } from "../../repositories/roles.repository";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class DeleteRoleByIdService {
    constructor (
        @inject("RolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    async deleteById(roleId: string): Promise<void> {
        const role = await this.rolesRepository.findByProperty(
            "id",
            roleId,
            true
        );
        if (!role) throw new AppError("Role not Found!", 404);

        await this.rolesRepository.deleteById(role);
        return
    }
}

export { DeleteRoleByIdService };