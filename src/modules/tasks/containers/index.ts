import { container } from "tsyringe";
import { TypeOrmTasksRepository } from "../repositories/typeorm/typeorm.tasks.repository";

container.register("TasksRepository", TypeOrmTasksRepository);