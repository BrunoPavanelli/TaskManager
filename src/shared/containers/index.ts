import { container } from "tsyringe";
import { TypeOrmUsersRepository } from "../../modules/users/repositories/typeorm/typeorm.users.repository";

container.register("UsersRepository", TypeOrmUsersRepository);