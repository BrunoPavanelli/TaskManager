import { inject, injectable } from "tsyringe";
import { TasksRepository } from "../repositories/tasks.repository";
import { Task } from "../entities/tasks.entity";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";
import { TTaskRequest } from "../interfaces/tasks.interfaces";

@injectable()
class DeleteTaskByIdService {
    constructor (
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async deleteById(taskId: string): Promise<void> {
        const task: Task | null = await this.tasksRepository.findByProperty(
            "id",
            taskId,
            false
        );
        if (!task) throw new AppError("Task not Found!", 404);

        await this.tasksRepository.deleteById(taskId);
        return;
    }
}

export { DeleteTaskByIdService };