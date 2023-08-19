import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../../shared/data-source";
import { Task } from "../../../shared/database/entities/tasks.entity";
import { TaskDeadline } from "../../../shared/database/entities/tasksDeadline.entity";

class TasksMiddleware {
    private repository: Repository<Task> = AppDataSource.getRepository(Task);
    private deadlineRepository: Repository<TaskDeadline> = AppDataSource.getRepository(TaskDeadline);

    async ensureTasksIdExists(req: Request, res: Response, next: NextFunction) {
        const { taskId } = req.params
        const task: Task | null = await this.repository.findOneBy({
            id: taskId
        });

        if (!task) return res.status(404).json({"message": "Task not Found!"})

        return next();
    }

    async ensureTaskDontHaveAnDeadLine(req: Request, res: Response, next: NextFunction) {
        const { taskId } = req.params
        const task: Task | null = await this.repository.findOne({
            where: {
                id: taskId
            },
            relations: {
                taskDeadline: true
            }
        });

        if (task!.taskDeadline) return res.status(409).json({"message": "Task already have a Deadline!"})

        return next();
    }

    async ensureTasksDeadlineIdExists(req: Request, res: Response, next: NextFunction) {
        const { deadlineId } = req.params
        const deadline: TaskDeadline | null = await this.deadlineRepository.findOneBy({
            id: deadlineId
        });
        console.log(deadline)
        if (!deadline) return res.status(404).json({"message": "Task Deadline not Found!"})

        return next();
    }
}

const tasksMiddleware = new TasksMiddleware();
export { tasksMiddleware };