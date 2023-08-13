import "reflect-metadata"
import "./containers"
import express, { json } from 'express';
import "express-async-errors"

import { usersRoute } from '../modules/users/routes/users.routes';
import { tasksRoute } from '../modules/tasks/routes/tasks.routes';
import { permissionsRoute } from '../modules/users/routes/permissions.routes';

const app = express()
app.use(json())

app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);
app.use("/permissions", permissionsRoute);

export default app