import express, {Request, Response} from 'express';

import {Game} from '../models/game.interface';
import {getGames} from '../controllers/game.controller';

export const gamesRouter = express.Router();

gamesRouter.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 0;
  const pageOffset = Number(req.query.page_offset) || 50;
  try {
    const games: Game[] = await getGames(page, pageOffset);
    res.status(200).send(games);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
