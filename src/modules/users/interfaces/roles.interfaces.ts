import { z } from "zod";
import { DeepPartial } from "typeorm";

import { schemas } from "../schemas";

type TRole = z.infer<typeof schemas.roles.role>;

type TRoleRequest = z.infer<typeof schemas.roles.request>;

type TRoleUpdate = DeepPartial<TRoleRequest>;

export {
    TRole,
    TRoleRequest,
    TRoleUpdate
};