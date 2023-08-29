import { z } from 'zod';

const role = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.date(),
});

const request = role.omit({ id: true, created_at: true });

const update = request.partial();

const roles = { role, request, update };

export { roles };
