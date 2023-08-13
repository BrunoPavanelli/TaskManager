
import { User } from "../../../shared/database/entities/users.entity";
import { TUserRequest, TUserUpdate } from "../interfaces/users.interfaces";

abstract class UsersRepository {
    abstract create(userData: TUserRequest): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract updateById(user: User, userData: TUserUpdate): Promise<User>;
    abstract deleteById(user: User): Promise<void>;
}

export { UsersRepository }