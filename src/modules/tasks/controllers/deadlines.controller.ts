import { Request, Response } from "express";
import { injectable, inject, container } from "tsyringe";
import { TasksRepository } from "../repositories/tasks.repository";
import { deadlineServices } from "../services/deadlines";

@injectable()
class DeadLinesController {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async createDeadline(req: Request, res: Response): Promise<Response> {
        const taskId = req.params.id;
        const taskDeadlineData = req.body;

        const taskWithDeadline = await container.resolve(deadlineServices.CreateDeadlineService).create(taskId, taskDeadlineData);
        
        return res.status(201).json(taskWithDeadline);
    }    

    async updateDeadlineById(req: Request, res: Response): Promise<Response> {
        const taskId = req.params.taskId;
        const deadlineId = req.params.deadlineId;
        const taskDeadlineData = req.body;

        const taskWithDeadline = await container.resolve(deadlineServices.UpdateDeadlineById).update(taskId, deadlineId, taskDeadlineData);

        return res.json(taskWithDeadline);
    }

    async deleteDeadlineById(req: Request, res: Response): Promise<Response> {
        const deadlineId = req.params.deadlineId;
        await container.resolve(deadlineServices.DeleteDeadlineById).deleteById(deadlineId);

        return res.sendStatus(204);
    }
}

export { DeadLinesController };