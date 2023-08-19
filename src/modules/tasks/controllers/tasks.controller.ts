import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { TasksRepository } from "../repositories/tasks.repository";

@injectable()
class TasksContoller {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const taskData = req.body
        const task = await this.tasksRepository.create(taskData);

        return res.status(201).json(task);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const tasks = await this.tasksRepository.findAll();

        return res.json(tasks);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params
        const task = await this.tasksRepository.findById(taskId)

        return res.json(task);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params
        const taskData = req.body
        const task = await this.tasksRepository.updateById(taskId, taskData);

        return res.json(task)
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
        const { taskId } = req.params;
        const taskDeadlineData = req.body;
        const task = await this.tasksRepository.createDeadline(taskId, taskDeadlineData);

        return res.status(201).json(task);
    }    

    async updateDeadlineById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params;
        const { deadlineId } = req.params;
        const taskDeadlineData = req.body;
        const task = await this.tasksRepository.updateDeadlineById(taskId, deadlineId, taskDeadlineData);

        return res.json(task);
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