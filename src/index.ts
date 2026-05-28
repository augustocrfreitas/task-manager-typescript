import express from 'express';
import 'dotenv/config';
import { userRouter } from './routes/user.route';
import { teamRouter } from './routes/team.route';
import { taskRouter } from './routes/task.route';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3333;

app.use('/users', userRouter);
app.use('/teams', teamRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
