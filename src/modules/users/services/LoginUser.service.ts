import { inject, injectable } from "tsyringe";
import { TLogin, TToken, TTokenObject } from "../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";
import { UsersRepository } from "../repositories/users.repository";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";
import { compareSync } from "bcryptjs";
import { User } from "../entities/users.entity";

@injectable()
class LoginUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    private async ensureCorrectCredentials(userData: TLogin): Promise<TToken |void> {
        const user: User | null = await this.usersRepository.findByProperty(
            "email",
            userData.email,
            true
        );

        if (!user) throw new AppError("Invalid credentials", 400);

        const userPassword: string = user.password;
        const userRequestPassword: string = userData.password;

        const validatePassword: boolean = compareSync(userRequestPassword, userPassword);
        if (!validatePassword) throw new AppError("Invalid credentials", 400);

        return {
            id: user.id,
            roles: user.roles
        }
    }

    async userLogin(userData: TLogin): Promise<TTokenObject> {
        const data: TToken | void = await this.ensureCorrectCredentials(userData);

        const token = sign(
            { roles: data?.roles },
            String(process.env.SECRET_KEY),
            { expiresIn: "1d", subject: String(data?.id) }
        );

        const tokenObject: TTokenObject = {
            token: token
        };

        return tokenObject;
    }

}

export { LoginUserService };