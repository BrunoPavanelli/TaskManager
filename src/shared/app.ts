import express, { json } from 'express';
import "reflect-metadata"
import "express-async-errors"

import { usersRoute } from '../modules/users/routes/users.routes';
import { tasksRoute } from '../modules/tasks/routes/tasks.routes';
import { permissionsRoute } from '../permissions/routes/permissions.routes';

const app = express()
app.use(json())

app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);
app.use("/permissions", permissionsRoute);

export default app