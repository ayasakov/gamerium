import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import {gamesRouter} from './routes/games.router';
import {errorHandler} from './middleware/error.middleware';
import {notFoundHandler} from './middleware/not-found.middleware';

dotenv.config();

const app: Express = express();

if (!process.env.PORT) {
  process.exit(1);
}
const port = process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/games', gamesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
