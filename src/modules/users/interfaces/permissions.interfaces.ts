import { z } from "zod";
import { DeepPartial } from "typeorm";

import { schemas } from "../schemas/permissions.schemas";

type TPermission = z.infer<typeof schemas.permission>;

type TPermissionRequest = z.infer<typeof schemas.request>;

type TPermissionUpdate = DeepPartial<TPermissionRequest>;

export {
    TPermission,
    TPermissionRequest,
    TPermissionUpdate
};