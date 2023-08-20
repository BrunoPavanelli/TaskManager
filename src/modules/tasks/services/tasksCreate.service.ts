import { inject, injectable } from "tsyringe";

import { Task } from "../entities/tasks.entity";
import { AppError } from "../../../shared/middlewares/shared.middleware";
import { TTaskRequest } from "../interfaces/tasks.interfaces";
import { TasksRepository } from "../repositories/tasks.repository";

@injectable()
class TasksCreateService {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async taskCreate(taskData: TTaskRequest, userId: string): Promise<Task> {
        const { name } = taskData;

        const task: Task | null = await this.tasksRepository.findByProperty("name", name);

        if (task) throw new AppError("Task already registered", 400);

        const newTask = await this.tasksRepository.create(taskData, userId);
        return newTask;
    }
}

export { TasksCreateService };

