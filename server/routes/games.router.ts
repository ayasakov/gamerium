import express, {Request, Response} from 'express';

import {Game} from '../models/game.interface';

export const gamesRouter = express.Router();

gamesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const games: Game[] = [];
    res.status(200).send(games);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
