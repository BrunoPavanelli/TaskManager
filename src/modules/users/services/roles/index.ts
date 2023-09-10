import { RolesCreateService } from "./RolesCreate.service";
import { FindRoleByIdService } from "./FindRoleById.service";
import { UpdateRoleByIdService } from "./UpdateRoleById.service";
import { DeleteRoleByIdService } from "./DeleteRoleById.service";
import { AddPermissionToRoleSerivce } from "./AddPermissionToRole.service";
import { RemovePermissionOfRoleService } from "./RemovePermissionOfRole.service";

const rolesServices = {
    RolesCreateService,
    FindRoleByIdService,
    UpdateRoleByIdService,
    DeleteRoleByIdService,
    AddPermissionToRoleSerivce,
    RemovePermissionOfRoleService
};

export { rolesServices };