import "reflect-metadata";
import "express-async-errors";
import express, { json } from 'express';

import "./containers";

import { usersRoute } from '../modules/users/routes/users.routes';
import { tasksRoute } from '../modules/tasks/routes/tasks.routes';
import { rolesRoute } from "../modules/users/routes/roles.routes";
import { permissionsRoute } from '../modules/users/routes/permissions.routes';

const app = express();
app.use(json());

app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);
app.use("/roles", rolesRoute);
app.use("/permissions", permissionsRoute);

export default app;