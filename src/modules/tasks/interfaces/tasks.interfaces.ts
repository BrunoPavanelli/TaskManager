import { z } from "zod";
import { schemas } from "../schemas/tasks.schemas";
import { DeepPartial } from "typeorm";

type TTask = z.infer<typeof schemas.task>;

type TTaskRequest = z.infer<typeof schemas.request>;

type TTaskUpdate = DeepPartial<TTaskRequest>;

type TTaskDealine = z.infer<typeof schemas.deadline>;

type TTaskDealineRequest = z.infer<typeof schemas.deadlineRequest>;

type TTaskDealineUpdate = DeepPartial<TTaskDealineRequest>;

export {
    TTask,
    TTaskRequest,
    TTaskUpdate,
    TTaskDealine,
    TTaskDealineRequest,
    TTaskDealineUpdate,
};