import { Router } from 'express';
import * as gameController from '../controllers/gameController';

export const gameRouter = Router();

gameRouter.post('/', gameController.createGame);
gameRouter.post('/:gameId/guesses', gameController.submitGuess);

