import { inject, injectable } from "tsyringe";

import { Role } from "../../entities/roles.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { TRoleRequest } from "../../interfaces/roles.interfaces";
import { RolesRepository } from "../../repositories/roles.repository";

@injectable()
class RolesCreateService {
    constructor(
        @inject("RolesRepository")
        private rolesRepository: RolesRepository
    ) {}

    async roleCreate(roleData: TRoleRequest): Promise<Role | void> {
        const { name } = roleData;

        const role = await this.rolesRepository.findByProperty("name", name)
        if (role) throw new AppError("Role already registered", 400);

        const newRole = await this.rolesRepository.create(roleData);
        return newRole
    }
}

export { RolesCreateService };