import { inject, injectable } from "tsyringe";
import { TasksRepository } from "../../repositories/tasks.repository";
import { TTaskDealineRequest } from "../../interfaces/tasks.interfaces";
import { Task } from "../../entities/tasks.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { TaskDeadline } from "../../entities/tasksDeadline.entity";

@injectable()
class UpdateDeadlineById {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async update(taskId: string, deadlineId: string, taskDeadlineData: TTaskDealineRequest): Promise<Task | void> {
        const task: Task | null = await this.tasksRepository.findByProperty(
            "id", 
            taskId,
            true
        )
        if (!task) throw new AppError("Task not Found!", 404);

        const deadline: TaskDeadline | null = await this.tasksRepository.findDeadlineById(deadlineId);
        if (!deadline) throw new AppError("Deadline not Found!", 404);

        const taskWithDealinePatched = await this.tasksRepository.updateDeadlineById(task, deadline, taskDeadlineData);
        return taskWithDealinePatched;
    }
}

export { UpdateDeadlineById };