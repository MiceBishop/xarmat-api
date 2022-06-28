import 'dotenv/config';
import express, { Request, Response } from 'express';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  logger.info(`App is running at https://localhost:${port}`);
  await connect();
});
