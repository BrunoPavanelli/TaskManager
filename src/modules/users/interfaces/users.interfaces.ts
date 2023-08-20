import { z } from "zod";

import { schemas } from "../schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof schemas.users.user>;

type TUserRequest = z.infer<typeof schemas.users.request>;

type TUserResponse = z.infer<typeof schemas.users.response>;

type TUserUpdate = DeepPartial<TUserRequest>;

type TLogin = z.infer<typeof schemas.users.login>;

type TToken = z.infer<typeof schemas.users.token>;

type TTokenObject = { token: string };

export {
	TUser,
	TUserRequest,
	TUserResponse,
	TUserUpdate,
	TLogin,
	TToken,
	TTokenObject,
};
