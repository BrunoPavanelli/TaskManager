import { z } from "zod";

const permission = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    created_at: z.date()
});

const request = permission.omit({ id: true, created_at: true });

const update = request.partial();

const permissions = { permission, request, update };

export { permissions };