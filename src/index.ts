import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { userRouter } from './routes/user.route';
import { teamRouter } from './routes/team.route';
import { taskRouter } from './routes/task.route';
import { teamMemberRouter } from './routes/teamMember.route';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3333;

app.use('/users', userRouter);
app.use('/teams', teamRouter);
app.use('/tasks', taskRouter);
app.use('/teamMembers', teamMemberRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
