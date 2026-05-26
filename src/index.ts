import express from 'express';
import 'dotenv/config';
import { Request, Response } from 'express';
import userRouter from './routes/user.route';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  console.log('requisição funcionando');
  res.json({ message: 'Hello World' });
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
