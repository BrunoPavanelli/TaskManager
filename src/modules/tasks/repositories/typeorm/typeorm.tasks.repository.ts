import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Task } from "../../../../shared/database/entities/tasks.entity";
import { TTaskDealineRequest, TTaskDealineUpdate, TTaskRequest, TTaskUpdate } from "../../interfaces/tasks.interfaces";
import { TasksRepositorie } from "../tasks.repository";
import { TaskDeadline } from "../../../../shared/database/entities/tasksDeadline.entity";

class TypeOrmTasksRepositories implements TasksRepositorie {
    private repository: Repository<Task> = AppDataSource.getRepository(Task);
    private deadlineRepository: Repository<TaskDeadline> = AppDataSource.getRepository(TaskDeadline);

    async create(taskData: TTaskRequest): Promise<Task> {
        const task: Task = this.repository.create(taskData)
        await this.repository.save(task);

        return task;
    }

    async findAll(): Promise<Task[]> {
        return await this.repository.find();
    }

    async findById(taskId: string): Promise<Task> {
        const task: Task | null = await this.repository.findOneBy({
            id: taskId
        })

        return task!
    }

    async findByName(taskName: string): Promise<Task> {
        const task: Task | null = await this.repository.findOneBy({
            name: taskName
        })
        console.log(task)
        return task!
    }

    async updateById(taskId: string, taskData: TTaskUpdate): Promise<Task> {
        const task: Task = await this.findById(taskId)
        const newtaskData = {
            ...task,
            ...taskData
        }

        const taskPatched = await this.repository.save(newtaskData);

        return taskPatched;
    }

    async deleteById(taskId: string): Promise<void> {
        await this.repository.delete({
            id: taskId
        });

        return
    }

    async createDeadline(taskId: string, taskDeadlineData: TTaskDealineRequest): Promise<Task> {
        const task = await this.findById(taskId)

        const deadline = this.deadlineRepository.create({
            ...taskDeadlineData,
            task: task
        })
        await this.deadlineRepository.save(deadline);

        const taskWithDealine = await this.repository.findOne({
            where: {
                id: taskId
            },
            relations: {
                taskDeadline: true
            }
        })

        return taskWithDealine!
    }

    async updateDeadlineById(taskId: string, taskDeadlineId: string, taskDeadlineData: TTaskDealineUpdate): Promise<Task> {
        const deadline = await this.deadlineRepository.findOneBy({id: taskDeadlineId})

        const newDeadline = this.deadlineRepository.create({
            ...deadline!,
            ...taskDeadlineData
        })
        await this.deadlineRepository.save(newDeadline);

        const taskWithDealine = await this.repository.findOne({
            where: {
                id: taskId
            },
            relations: {
                taskDeadline: true
            }
        })

        return taskWithDealine!
    }

    async deleteDeadlineById(taskDeadlineId: string): Promise<void> {
        const deadline = await this.deadlineRepository.findOneBy({id: taskDeadlineId})
        await this.deadlineRepository.remove(deadline!);
    }
}

const tasksRepositorie = new TypeOrmTasksRepositories()
export { tasksRepositorie }