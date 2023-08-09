import { TUserRequest, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { usersRepositorie } from "../repositories/typeorm/typeorm.users.repository";
import { UsersRepositorie } from "../repositories/users.repository";
import schemas from "../schemas/users.schemas";

class UsersService {
    constructor(private usersRepository: UsersRepositorie) {}

    async create(userData: TUserRequest): Promise<TUserResponse> {
        const user = await this.usersRepository.create(userData);

        return schemas.response.parse(user);
    }

    async findAll(): Promise<TUserResponse[]> {
        const users = await this.usersRepository.findAll();

        return users.map(user => schemas.response.parse(user));
    }

    async findById(userId: string): Promise<TUserResponse> {
        const user = await this.usersRepository.findById(userId)

        return schemas.response.parse(user);
    }

    async findByName(userName: string): Promise<TUserResponse> {
        const user = await this.usersRepository.findByName(userName)

        return schemas.response.parse(user);
    }

    async updateById(userId: string, userData: TUserUpdate): Promise<TUserResponse> {
        const user = await this.usersRepository.updateById(userId, userData);

        return schemas.response.parse(user);
    }

    async deleteById(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

const usersServices = new UsersService(usersRepositorie);
export { usersServices, UsersService };