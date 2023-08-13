import { Task } from "../../../shared/database/entities/tasks.entity";
import { TTaskDealineRequest, TTaskDealineUpdate, TTaskRequest, TTaskUpdate } from "../interfaces/tasks.interfaces";

abstract class TasksRepository {
    abstract create(taskData: TTaskRequest): Promise<Task>;
    abstract findAll(): Promise<Task[]>;
    abstract findById(taskId: string): Promise<Task | null>;
    abstract updateById(taskId: string, taskData: TTaskUpdate): Promise<Task>;
    abstract deleteById(taskId: string): Promise<void>;
    abstract createDeadline(taskId: string, taskDeadlineData: TTaskDealineRequest): Promise<Task>;
    abstract updateDeadlineById(taskId: string, taskDeadlineId: string, taskDeadlineData: TTaskDealineUpdate): Promise<Task>;
    abstract deleteDeadlineById(taskDeadlineId: string): Promise<void>;        
}

export { TasksRepository }