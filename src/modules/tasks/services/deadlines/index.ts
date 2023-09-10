import { CreateDeadlineService } from "./CreateDeadline.service";
import { DeleteDeadlineById } from "./DeleteDeadlineById.service";
import { UpdateDeadlineById } from "./UpdateDeadlineById.service";

const deadlineServices = {
    CreateDeadlineService,
    UpdateDeadlineById,
    DeleteDeadlineById
};

export { deadlineServices };