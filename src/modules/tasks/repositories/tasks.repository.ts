import { Task } from "../entities/tasks.entity";
import { TaskDeadline } from "../entities/tasksDeadline.entity";
import { TTaskDealineRequest, TTaskDealineUpdate, TTaskRequest, TTaskUpdate } from "../interfaces/tasks.interfaces";

abstract class TasksRepository {
    abstract create(taskData: TTaskRequest): Promise<Task>;
    abstract findAll(): Promise<Task[]>;
    abstract findByProperty(taskProperty: string, propertyValue: string): Promise<Task | null>;
    abstract updateById(task: Task, taskData: TTaskUpdate): Promise<Task>;
    abstract deleteById(taskId: string): Promise<void>;
    abstract createDeadline(task: Task, taskDeadlineData: TTaskDealineRequest): Promise<Task>;
    abstract updateDeadlineById(task: Task, taskDeadlineId: TaskDeadline, taskDeadlineData: TTaskDealineUpdate): Promise<Task>;
    abstract deleteDeadlineById(taskDeadlineId: string): Promise<void>;        
}

export { TasksRepository }