import { inject, injectable } from "tsyringe";
import { TasksRepository } from "../../repositories/tasks.repository";
import { TTaskDealineRequest } from "../../interfaces/tasks.interfaces";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { Task } from "../../entities/tasks.entity";

@injectable()
class CreateDeadlineService {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async create(taskId: string, taskDeadlineData: TTaskDealineRequest): Promise<Task | void> {
        const task = await this.tasksRepository.findByProperty(
            "id",
            taskId,
            false
        );
        if (!task) throw new AppError("Task not Found!", 404);

        if (task.taskDeadline) throw new AppError("Task already have a deadline", 409);

        const taskWithDeadline = await this.tasksRepository.createDeadline(task, taskDeadlineData);
        return taskWithDeadline;
    }
}

export { CreateDeadlineService };