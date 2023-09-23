import { container } from "tsyringe";
import { TypeOrmPermissionsRepository } from "../repositories/typeorm/typeorm.permissions.repository";
import { TypeOrmRolesRepository } from "../repositories/typeorm/typeorm.roles.repository";
import { TypeOrmUsersRepository } from "../repositories/typeorm/typeorm.users.repository";

container.register("UsersRepository", TypeOrmUsersRepository);
container.register("RolesRepository", TypeOrmRolesRepository);
container.register("PermissionsRepository", TypeOrmPermissionsRepository);
