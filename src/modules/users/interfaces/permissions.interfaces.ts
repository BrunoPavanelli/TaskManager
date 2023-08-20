import { z } from "zod";
import { DeepPartial } from "typeorm";

import { schemas } from "../schemas";

type TPermission = z.infer<typeof schemas.permissions.permission>;

type TPermissionRequest = z.infer<typeof schemas.permissions.request>;

type TPermissionUpdate = DeepPartial<TPermissionRequest>;

export {
    TPermission,
    TPermissionRequest,
    TPermissionUpdate
};