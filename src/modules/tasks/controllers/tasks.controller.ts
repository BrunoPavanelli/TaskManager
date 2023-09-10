import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { TasksRepository } from "../repositories/tasks.repository";
import { tasksServices } from "../services";

@injectable()
class TasksContoller {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const taskData = req.body;
        const { userId } = res.locals;

        const task = await container.resolve(tasksServices.CreateTaskService).taskCreate(taskData, userId);

        return res.status(201).json(task);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const tasks = await this.tasksRepository.findAll();

        return res.json(tasks);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const taskId = req.params.id;
        const task = await container.resolve(tasksServices.FindTaskByIdService).findById(taskId);

        return res.json(task);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskPatched = await container.resolve(tasksServices.UpdateTaskByIdService).update(taskId, taskData);

        return res.json(taskPatched)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const taskId = req.params.id;
        await container.resolve(tasksServices.DeleteTaskByIdService).deleteById(taskId);

        return res.sendStatus(204);
    }
}

export { TasksContoller };