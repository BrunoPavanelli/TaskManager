import { container } from "tsyringe";
import { TypeOrmUsersRepository } from "../../modules/users/repositories/typeorm/typeorm.users.repository";
import { TypeOrmPermissionsRepository } from "../../modules/users/repositories/typeorm/typeorm.permissions.repository";

container.register("UsersRepository", TypeOrmUsersRepository);
container.register("PermissionsRepository", TypeOrmPermissionsRepository);