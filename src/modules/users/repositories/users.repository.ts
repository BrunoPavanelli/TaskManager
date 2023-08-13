
import { User } from "../../../shared/database/entities/users.entity";
import { TUserRequest, TUserUpdate } from "../interfaces/users.interfaces";

abstract class UsersRepository {
    abstract create(userData: TUserRequest): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findById(userId: string): Promise<User | null>;
    abstract updateById(userId: string, userData: TUserUpdate): Promise<User>;
    abstract deleteById(userId: string): Promise<void>;
}

export { UsersRepository }