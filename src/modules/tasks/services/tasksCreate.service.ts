// import { injectable } from "tsyringe";
// import { TasksRepository } from "../repositories/tasks.repository";
// import { TTaskRequest } from "../interfaces/tasks.interfaces";
// import { Task } from "../../../shared/database/entities/tasks.entity";

// @injectable()
// class TasksCreateService {
//     constructor(
//         @injectable("TasksRepository")
//         private tasksRepository: TasksRepository
//     ) {}

//     async taskCreate(taskData: TTaskRequest): Promise<Task> {
//         const { name } = taskData;

//         const task: Task | null = this.tasksRepository.
//     }
// }