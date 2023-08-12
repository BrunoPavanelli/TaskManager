import { z } from "zod";

const user = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	perfil: z.string(),
	password: z.string(),
	created_at: z.date()
});

const request = user.omit({ id: true, created_at: true });

const response = user.omit({ password: true });

const update = user.omit({ id: true, created_at: true }).partial();

const login = z.object({
	email: z.string().email(),
	password: z.string(),
});

const token = z.object({
	id: z.string(),
});

const schemas = { user, request, update, response, login, token };

export { schemas };