import { inject, injectable } from "tsyringe";
import { TasksRepository } from "../repositories/tasks.repository";
import { Task } from "../entities/tasks.entity";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";
import { TTaskRequest } from "../interfaces/tasks.interfaces";

@injectable()
class UpdateTaskByIdService {
    constructor (
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async update(taskId: string, taskData: TTaskRequest): Promise<Task | void> {
        const task: Task | null = await this.tasksRepository.findByProperty(
            "id",
            taskId,
            false
        );
        if (!task) throw new AppError("Task not Found!", 404);

        const taskPatched = await this.tasksRepository.updateById(task, taskData);
        return taskPatched;
    }
}

export { UpdateTaskByIdService };