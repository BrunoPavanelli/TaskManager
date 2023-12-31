import { Repository } from "typeorm";

import { AppDataSource } from "../../../../shared/data-source";
import { Task } from "../../entities/tasks.entity";
import {
    TTaskDealineRequest,
    TTaskDealineUpdate,
    TTaskRequest,
    TTaskUpdate,
} from "../../interfaces/tasks.interfaces";
import { TasksRepository } from "../tasks.repository";
import { TaskDeadline } from "../../entities/tasksDeadline.entity";
import { injectable } from "tsyringe";
import { User } from "../../../users/entities/users.entity";

@injectable()
class TypeOrmTasksRepository implements TasksRepository {
    private repository: Repository<Task> = AppDataSource.getRepository(Task);
    private deadlineRepository: Repository<TaskDeadline> =
        AppDataSource.getRepository(TaskDeadline);
    private userRepository: Repository<User> =
        AppDataSource.getRepository(User);

    async create(taskData: TTaskRequest, userId: string): Promise<Task> {
        const user: User | null = await this.userRepository.findOneBy({
            id: userId,
        });

        const task: Task = this.repository.create({
            ...taskData,
            user: user!,
        });

        await this.repository.save(task);

        return task;
    }

    async findAll(): Promise<Task[]> {
        return await this.repository.find();
    }

    async findByProperty(
        taskProperty: string,
        propertyValue: string,
        relations: boolean
    ): Promise<Task | null> {
        const task: Task | null = relations
            ? await this.repository.findOne({
                  where: {
                      [taskProperty]: propertyValue,
                  },
                  relations: {
                      taskDeadline: true,
                  },
              })
            : await this.repository.findOneBy({
                  [taskProperty]: propertyValue,
              });

        return task;
    }

    async updateById(task: Task, taskData: TTaskUpdate): Promise<Task> {
        const newtaskData = {
            ...task,
            ...taskData,
        };

        const taskPatched = await this.repository.save(newtaskData);

        return taskPatched;
    }

    async deleteById(taskId: string): Promise<void> {
        await this.repository.delete({
            id: taskId,
        });

        return;
    }

    async createDeadline(
        task: Task,
        taskDeadlineData: TTaskDealineRequest
    ): Promise<Task> {
        const deadline = this.deadlineRepository.create({
            ...taskDeadlineData,
            task: task,
        });
        await this.deadlineRepository.save(deadline);

        const taskWithDealine = await this.repository.findOne({
            where: {
                id: task.id,
            },
            relations: {
                taskDeadline: true,
            },
        });

        return taskWithDealine!;
    }

    async findDeadlineById(deadlineId: string): Promise<TaskDeadline | null> {
        const task = await this.deadlineRepository.findOne({
            where: {
                id: deadlineId
            },
            relations: {
                task: true
            }
        })

        return task;
    }

    async updateDeadlineById(
        task: Task,
        taskDeadline: TaskDeadline,
        taskDeadlineData: TTaskDealineUpdate
    ): Promise<Task> {
        const newDeadline = this.deadlineRepository.create({
            ...taskDeadline!,
            ...taskDeadlineData,
        });
        await this.deadlineRepository.save(newDeadline);

        const taskWithDealine = await this.repository.findOne({
            where: {
                id: task.id,
            },
            relations: {
                taskDeadline: true,
            },
        });

        return taskWithDealine!;
    }

    async deleteDeadlineById(taskDeadline: TaskDeadline): Promise<void> {
        await this.deadlineRepository.remove(taskDeadline);
    }
}

export { TypeOrmTasksRepository };
