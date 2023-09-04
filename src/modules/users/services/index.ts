import { UsersLoginService } from "./UsersLogin.service";
import { UsersCreateService } from "./UsersCreate.service";
import { UsersUpdateService } from "./UsersUpdate.service";
import { UserFindByIdService } from "./UsersFindBy.service";
import { UsersAddRoleService } from "./UsersAddRole.service";
import { UsersDeleteByIdService } from "./UsersDeleteById.service";
import { UsersRemoveRoleService } from "./UsersRemoveRole.service";

const usersServices = {
    UsersLoginService,
    UsersCreateService,
    UsersUpdateService,
    UserFindByIdService,
    UsersAddRoleService,
    UsersDeleteByIdService,
    UsersRemoveRoleService,
};


export { usersServices };