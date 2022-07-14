const express = require('express');
require('express-async-errors');
const loginRouter = require('./routers/loginRouter');
const errorMiddleware = require('./middlewares/error.middleware');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use(errorMiddleware);

module.exports = app;
