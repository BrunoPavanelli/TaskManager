import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Task } from "../../../../shared/database/entities/tasks.entity";
import { TTaskDealineRequest, TTaskDealineUpdate, TTaskRequest, TTaskUpdate } from "../../interfaces/tasks.interfaces";
import { TasksRepository } from "../tasks.repository";
import { TaskDeadline } from "../../../../shared/database/entities/tasksDeadline.entity";
import { injectable } from "tsyringe";

@injectable()
class TypeOrmTasksRepository implements TasksRepository {
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

    async findByProperty(taskProperty: string, propertyValue: string): Promise<Task | null> {
        const task: Task | null = await this.repository.findOneBy({
            [taskProperty]: propertyValue
        })

        return task
    } 

    async updateById(task: Task, taskData: TTaskUpdate): Promise<Task> {
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

    async createDeadline(task: Task, taskDeadlineData: TTaskDealineRequest): Promise<Task> {
        const deadline = this.deadlineRepository.create({
            ...taskDeadlineData,
            task: task
        })
        await this.deadlineRepository.save(deadline);

        const taskWithDealine = await this.repository.findOne({
            where: {
                id: task.id
            },
            relations: {
                taskDeadline: true
            }
        })

        return taskWithDealine!
    }

    async updateDeadlineById(task: Task, taskDeadline: TaskDeadline, taskDeadlineData: TTaskDealineUpdate): Promise<Task> {
        const newDeadline = this.deadlineRepository.create({
            ...taskDeadline!,
            ...taskDeadlineData
        })
        await this.deadlineRepository.save(newDeadline);

        const taskWithDealine = await this.repository.findOne({
            where: {
                id: task.id
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

export { TypeOrmTasksRepository }