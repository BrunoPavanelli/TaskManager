import { injectable, inject } from "tsyringe";
import { UsersRepository } from "../repositories/users.repository";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";
import { User } from "../entities/users.entity";

@injectable()
class UsersDeleteByIdService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async deleteById(userId: string): Promise<void> {
        const user: User | null = await this.usersRepository.findByProperty(
            "id",
            userId,
            true
        );
        if (!user) throw new AppError("User not Found!", 404);

        await this.usersRepository.deleteById(user);
    }
}

export { UsersDeleteByIdService };
