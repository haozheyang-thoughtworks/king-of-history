import type { Request, Response, NextFunction } from 'express';
import * as gameService from '../services/gameService';

/** POST /api/games —— 创建新的一局游戏，返回 gameId 与第一条提示。 */
export async function createGame(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await gameService.startGame();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

/** POST /api/games/:gameId/guesses —— 提交一次猜测。 */
export async function submitGuess(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { gameId } = req.params;
    const { name } = (req.body ?? {}) as { name?: string };

    if (!name || !name.trim()) {
      res.status(400).json({ error: '请输入英雄名字' });
      return;
    }

    const result = await gameService.submitGuess(gameId, name);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

