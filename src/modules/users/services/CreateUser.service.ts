import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async userCreate(userData: TUserRequest): Promise<TUserResponse> {
        const { email } = userData;

        const user = await this.usersRepository.findByProperty("email", email, true)
        if (user) throw new AppError("Email already registered", 400);

        const newUser = await this.usersRepository.create(userData);
        return newUser
    }
}

export { CreateUserService };