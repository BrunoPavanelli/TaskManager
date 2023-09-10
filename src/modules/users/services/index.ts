import { LoginUserService } from "./LoginUser.service";
import { CreateUserService } from "./CreateUser.service";
import { UpdateUserByIdService } from "./UpdateUserById.service";
import { FindUserByIdService } from "./FindUserById.service";
import { AddRoleToUserService } from "./AddRoleToUser.service";
import { DeleteUserByIdService } from "./DeleteUserById.service";
import { RemoveRoleOfUserService } from "./RemoveRoleOfUser.service";

const usersServices = {
    LoginUserService,
    CreateUserService,
    UpdateUserByIdService,
    FindUserByIdService,
    AddRoleToUserService,
    DeleteUserByIdService,
    RemoveRoleOfUserService,
};


export { usersServices };