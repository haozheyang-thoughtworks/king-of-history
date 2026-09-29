import { Router } from 'express';
import { gameRouter } from './gameRoutes';

export const apiRouter = Router();

apiRouter.use('/games', gameRouter);

