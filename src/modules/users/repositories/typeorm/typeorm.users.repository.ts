import { Repository } from "typeorm";
import { injectable } from "tsyringe";

import { UsersRepository } from "../users.repository";
import { TUserRequest, TUserUpdate } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../../../shared/data-source";
import { User } from "../../../../shared/database/entities/users.entity";

@injectable()
class TypeOrmUsersRepository implements UsersRepository {
    private repository: Repository<User> = AppDataSource.getRepository(User);

    async create(userData: TUserRequest): Promise<User> {
        const user: User = this.repository.create(userData)
        await this.repository.save(user);

        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findByProperty(userProperty: string, propertyValue: string): Promise<User | null> {
        const user: User | null = await this.repository.findOneBy({
            [userProperty]: propertyValue
        });

        return user;
    }

    async updateById(user: User, userData: TUserUpdate): Promise<User> {
        const newUserData = {
            ...user,
            ...userData
        }

        const userPatched = await this.repository.save(newUserData);

        return userPatched;
    }

    async deleteById(user: User): Promise<void> {
        await this.repository.delete({
            id: user.id
        });

        return
    }

}

export { TypeOrmUsersRepository };