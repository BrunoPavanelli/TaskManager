import { Repository } from "typeorm";
import { injectable } from "tsyringe";

import { UsersRepository } from "../users.repository";
import { TUserRequest, TUserUpdate } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../../../shared/data-source";
import { User } from "../../entities/users.entity";
import { Role } from "../../entities/roles.entity";

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

    async addRole(user: User, role: Role): Promise<object> {
        user.roles = [ ...user.roles, role ];
        await this.repository.save(user);

        return { message: "Role added sussesfully!" }
    }

    async removeRole(user: User, role: Role): Promise<object> {
        user.roles = user.roles.filter(userRole => role.id !== userRole.id);
        await this.repository.save(user);

        return { message: "Role removed succesfully!" };
    }
}

export { TypeOrmUsersRepository };