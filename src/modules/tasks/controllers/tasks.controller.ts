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

        const task = await container.resolve(tasksServices.TasksCreateService).taskCreate(taskData, userId);

        return res.status(201).json(task);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const tasks = await this.tasksRepository.findAll();

        return res.json(tasks);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { task } = req.body;

        return res.json(task);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { task } = res.locals;
        const taskData = req.body;

        const taskPatched = await this.tasksRepository.updateById(task, taskData);

        return res.json(taskPatched)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params
        await this.tasksRepository.deleteById(taskId);

        return res.sendStatus(204);
    }
}

@injectable()
class DeadLinesController {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async createDeadline(req: Request, res: Response): Promise<Response> {
        const { task } = res.locals;
        const taskDeadlineData = req.body;

        const taskWithDeadline = await this.tasksRepository.createDeadline(task, taskDeadlineData);

        return res.status(201).json(taskWithDeadline);
    }    

    async updateDeadlineById(req: Request, res: Response): Promise<Response> {
        const { task } = res.locals;
        const { deadline } = res.locals;
        const taskDeadlineData = req.body;

        const taskWithDeadline = await this.tasksRepository.updateDeadlineById(task, deadline, taskDeadlineData);

        return res.json(taskWithDeadline);
    }

    async deleteDeadlineById(req: Request, res: Response): Promise<Response> {
        const { deadlineId } = req.params;
        await this.tasksRepository.deleteDeadlineById(deadlineId);

        return res.sendStatus(204);
    }

}

const tasksController = container.resolve(TasksContoller);
const deadlinesController = container.resolve(DeadLinesController);
export { tasksController, deadlinesController };