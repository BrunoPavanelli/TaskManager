import { container } from "tsyringe";
import { TypeOrmUsersRepository } from "../../modules/users/repositories/typeorm/typeorm.users.repository";
import { TypeOrmPermissionsRepository } from "../../modules/users/repositories/typeorm/typeorm.permissions.repository";
import { TypeOrmTasksRepository } from "../../modules/tasks/repositories/typeorm/typeorm.tasks.repository";

container.register("UsersRepository", TypeOrmUsersRepository);
container.register("PermissionsRepository", TypeOrmPermissionsRepository);
container.register("TasksRepository", TypeOrmTasksRepository);