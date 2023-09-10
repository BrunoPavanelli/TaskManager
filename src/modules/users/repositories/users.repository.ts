
import { Role } from "../entities/roles.entity";
import { User } from "../entities/users.entity";
import { TUserRequest, TUserUpdate } from "../interfaces/users.interfaces";

abstract class UsersRepository {
    abstract create(userData: TUserRequest): Promise<User>;
    abstract createMany(usersData: TUserRequest[]): Promise<User[]>;
    abstract findAll(): Promise<User[]>;
    abstract findByProperty(permissionProperty: string, propertyValue: string, relations: boolean): Promise<User | null>;
    abstract updateById(user: User, userData: TUserUpdate): Promise<User>;
    abstract deleteById(user: User): Promise<void>;
    abstract addRole(user: User, role: Role): Promise<object>;
    abstract removeRole(user: User, role: Role): Promise<object>;
}

export { UsersRepository }