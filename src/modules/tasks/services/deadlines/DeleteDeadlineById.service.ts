import { inject, injectable } from "tsyringe";
import { TasksRepository } from "../../repositories/tasks.repository";
import { TTaskDealineRequest } from "../../interfaces/tasks.interfaces";
import { Task } from "../../entities/tasks.entity";
import { AppError } from "../../../../shared/middlewares/ErrorHandler.middleware";
import { TaskDeadline } from "../../entities/tasksDeadline.entity";

@injectable()
class DeleteDeadlineById {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async deleteById(deadlineId: string): Promise<Task | void> {
        const deadline: TaskDeadline | null = await this.tasksRepository.findDeadlineById(deadlineId);
        if (!deadline) throw new AppError("Deadline not Found!", 404);

        const taskWithDealinePatched = await this.tasksRepository.deleteDeadlineById(deadline);
        return taskWithDealinePatched;
    }
}

export { DeleteDeadlineById };