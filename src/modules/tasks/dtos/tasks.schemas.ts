import { z } from 'zod';

const task = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.date(),
});

const request = task.omit({ id: true, created_at: true });

const update = request.partial();

const dateRegex = new RegExp(/\d\d\/\d\d\/\d\d\d\d/i);
const hourRegex = new RegExp(/\d\d:\d\d/i);

const deadline = z.object({
  id: z.string(),
  expiration_date: z.string().regex(dateRegex),
  expiration_hour: z.string().regex(hourRegex),
  created_at: z.date(),
});

const deadlineRequest = deadline.omit({ id: true, created_at: true });

const deadlineUpdate = deadlineRequest.partial();

const tasks = {
  task,
  request,
  update,
  deadline,
  deadlineRequest,
  deadlineUpdate,
};

export { tasks };
