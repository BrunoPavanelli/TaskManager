import { Request, Response } from "express";
import { TasksService, tasksService } from "../services/tasks.service";

class TasksContoller {
    constructor(private tasksService: TasksService) {}

    async create(req: Request, res: Response): Promise<Response> {
        const taskData = req.body
        const task = await this.tasksService.create(taskData);

        return res.status(201).json(task);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const tasks = await this.tasksService.findAll();

        return res.json(tasks);
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params
        const task = await this.tasksService.findById(taskId)

        return res.json(task);
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params
        const taskData = req.body
        const task = await this.tasksService.updateById(taskId, taskData);

        return res.json(task)
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params
        await this.tasksService.deleteById(taskId);

        return res.sendStatus(204);
    }

    async createDeadline(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params;
        const taskDeadlineData = req.body;
        const task = await this.tasksService.createDeadline(taskId, taskDeadlineData);

        return res.status(201).json(task);
    }    

    async updateDeadlineById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params;
        const { deadlineId } = req.params;
        const taskDeadlineData = req.body;
        const task = await this.tasksService.updateDeadlineById(taskId, deadlineId, taskDeadlineData);

        return res.json(task);
    }

    async deleteDeadlineById(req: Request, res: Response): Promise<Response> {
        const { deadlineId } = req.params;
        await this.tasksService.deleteDeadlineById(deadlineId);

        return res.sendStatus(204);
    }

}

const tasksController = new TasksContoller(tasksService);
export { tasksController };