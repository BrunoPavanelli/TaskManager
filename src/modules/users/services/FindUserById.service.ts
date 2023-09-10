import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";
import { TUserResponse } from "../interfaces/users.interfaces";
import { User } from "../entities/users.entity";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class FindUserByIdService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async findById(userId: string): Promise<TUserResponse> {
        const user: User | null = await this.usersRepository.findByProperty("id", userId, true)
        if (!user) throw new AppError("User not Found!", 404);

        return user;
    }
}

export { FindUserByIdService };