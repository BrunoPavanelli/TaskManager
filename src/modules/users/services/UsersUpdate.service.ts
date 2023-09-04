import { injectable, inject } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";
import { TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";
import { User } from "../entities/users.entity";
import { schemas } from "../schemas";

@injectable()
class UsersUpdateService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async update(
        userId: string,
        userData: TUserUpdate
    ): Promise<TUserResponse | void> {
        const user: User | null = await this.usersRepository.findByProperty(
            "id",
            userId,
            false
        );
        if (!user) throw new AppError("User not Found!", 404);

        const userPatched = await this.usersRepository.updateById(
            user,
            userData
        );
        const userResponse = schemas.users.response.parse(userPatched);

        return userResponse;
    }
}

export { UsersUpdateService };
