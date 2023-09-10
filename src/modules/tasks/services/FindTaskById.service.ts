import { inject, injectable } from "tsyringe";
import { TasksRepository } from "../repositories/tasks.repository";
import { Task } from "../entities/tasks.entity";
import { AppError } from "../../../shared/middlewares/ErrorHandler.middleware";

@injectable()
class FindTaskByIdService {
    constructor (
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async findById(taskId: string): Promise<Task | void> {
        const task: Task | null = await this.tasksRepository.findByProperty(
            "id",
            taskId,
            true
        );
        if (!task) throw new AppError("Task not Found!", 404);

        return task;
    }
}

export { FindTaskByIdService };