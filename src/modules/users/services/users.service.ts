import { User } from "../../../shared/database/entities/users.entity";
import { TUserRequest, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { usersRepository } from "../repositories/typeorm/typeorm.users.repository";
import { UsersRepository } from "../repositories/users.repository";
import { schemas } from "../schemas/users.schemas";

class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(userData: TUserRequest): Promise<TUserResponse> {
        const user = await this.usersRepository.create(userData);

        return schemas.response.parse(user);
    }

    async findAll(): Promise<TUserResponse[]> {
        const users = await this.usersRepository.findAll();

        return users.map(user => schemas.response.parse(user));
    }

    async findById(user: User): Promise<TUserResponse> {
        return schemas.response.parse(user);
    }

    async updateById(user: User, userData: TUserUpdate): Promise<TUserResponse> {
        const userPatched = await this.usersRepository.updateById(user, userData);

        return schemas.response.parse(userPatched);
    }

    async deleteById(user: User): Promise<void> {
        await this.usersRepository.deleteById(user);
    }

}

const usersServices = new UsersService(usersRepository);
export { usersServices, UsersService };