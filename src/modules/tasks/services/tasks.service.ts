// import { Task } from "../../../shared/database/entities/tasks.entity";
// import { TTaskDealineRequest, TTaskDealineUpdate, TTaskRequest, TTaskUpdate } from "../interfaces/tasks.interfaces";
// import { TasksRepository } from "../repositories/tasks.repository";
// import { tasksRepository } from "../repositories/typeorm/typeorm.tasks.repository";

// class TasksService {
//     constructor(private tasksRepository: TasksRepository) {}

//     async create(taskData: TTaskRequest): Promise<Task> {
//         return await this.tasksRepository.create(taskData);
//     }

//     async findAll(): Promise<Task[]> {
//         return await this.tasksRepository.findAll();
//     }

//     async findById(taskId: string): Promise<Task> {
//         const task: Task | null = await this.tasksRepository.findById(taskId);

//         return task!
//     }

//     async updateById(taskId: string, taskData: TTaskUpdate): Promise<Task> {
//         return await this.tasksRepository.updateById(taskId, taskData);
//     }

//     async deleteById(taskId: string): Promise<void> {
//         await this.tasksRepository.deleteById(taskId);
//     }

//     async createDeadline(taskId: string, taskDeadlineData: TTaskDealineRequest): Promise<Task> {
//         return await this.tasksRepository.createDeadline(taskId, taskDeadlineData);
//     }

//     async updateDeadlineById(taskId: string, taskDeadlineId: string, taskDeadlineData: TTaskDealineUpdate): Promise<Task> {
//         return await this.tasksRepository.updateDeadlineById(taskId, taskDeadlineId, taskDeadlineData);
//     }

//     async deleteDeadlineById(taskDeadlineId: string): Promise<void> {
//         return await this.tasksRepository.deleteDeadlineById(taskDeadlineId)
//     }
// }

// const tasksService = new TasksService(tasksRepository);
// export { tasksService, TasksService };