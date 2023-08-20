import { z } from "zod";
import { schemas } from "../schemas";
import { DeepPartial } from "typeorm";

type TTask = z.infer<typeof schemas.tasks.task>;

type TTaskRequest = z.infer<typeof schemas.tasks.request>;

type TTaskUpdate = DeepPartial<TTaskRequest>;

type TTaskDealine = z.infer<typeof schemas.tasks.deadline>;

type TTaskDealineRequest = z.infer<typeof schemas.tasks.deadlineRequest>;

type TTaskDealineUpdate = DeepPartial<TTaskDealineRequest>;

export {
    TTask,
    TTaskRequest,
    TTaskUpdate,
    TTaskDealine,
    TTaskDealineRequest,
    TTaskDealineUpdate,
};