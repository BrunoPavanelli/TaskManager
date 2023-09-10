import { CreateTaskService } from "./CreateTask.service";
import { DeleteTaskByIdService } from "./DeleteTaskById.service";
import { FindTaskByIdService } from "./FindTaskById.service";
import { UpdateTaskByIdService } from "./UpdateTaskById.service";

const tasksServices = {
    CreateTaskService,
    FindTaskByIdService,
    UpdateTaskByIdService,
    DeleteTaskByIdService
};


export { tasksServices };