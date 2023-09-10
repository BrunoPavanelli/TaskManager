import { CreatePermissionService } from "./CreatePermission.service";
import { FindPermissionByIdService } from "./FindPermissionById.service";
import { UpdatePermissionByIdService } from "./UpdatePermissionById.service";
import { DeletePermissionByIdService } from "./DeletePermissionById.service";

const permissionsServices = {
    CreatePermissionService,
    FindPermissionByIdService,
    UpdatePermissionByIdService,
    DeletePermissionByIdService
};

export { permissionsServices };