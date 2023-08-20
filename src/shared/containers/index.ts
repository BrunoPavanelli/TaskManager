import { container } from "tsyringe";
import { TypeOrmUsersRepository } from "../../modules/users/repositories/typeorm/typeorm.users.repository";
import { TypeOrmPermissionsRepository } from "../../modules/users/repositories/typeorm/typeorm.permissions.repository";
import { TypeOrmTasksRepository } from "../../modules/tasks/repositories/typeorm/typeorm.tasks.repository";
import { TypeOrmRolesRepository } from "../../modules/users/repositories/typeorm/typeorm.roles.repository";

container.register("UsersRepository", TypeOrmUsersRepository);
container.register("RolesRepository", TypeOrmRolesRepository);
container.register("TasksRepository", TypeOrmTasksRepository);
container.register("PermissionsRepository", TypeOrmPermissionsRepository);