import express from 'express';
import 'dotenv/config';
import { userRouter } from './routes/user.route';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3333;

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
