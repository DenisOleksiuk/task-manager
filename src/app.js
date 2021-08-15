const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
