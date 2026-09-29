import { v4 as uuid } from 'uuid';
import type { CreateGameResponse, GuessResponse } from '@king-of-history/shared';
import { env } from '../config/env';
import { gameStore } from '../store/gameStore';
import type { GameState } from '../store/types';
import { pickRandomHero, findHeroById, isNameMatch } from './heroService';

/** 创建一局新游戏：随机抽取一位英雄，并返回第一条（范围最大的）提示。 */
export async function startGame(): Promise<CreateGameResponse> {
  const hero = await pickRandomHero();
  const hints = hero.hints ?? [];

  const game: GameState = {
    id: uuid(),
    heroId: hero.id,
    status: 'IN_PROGRESS',
    attemptsUsed: 0,
    maxAttempts: env.MAX_ATTEMPTS,
    hintIndex: 1,
    createdAt: Date.now(),
    lastActiveAt: Date.now(),
  };
  gameStore.create(game);

  return {
    gameId: game.id,
    hint: hints[0] ?? '暂无提示',
    hintIndex: game.hintIndex,
    attemptsUsed: game.attemptsUsed,
    maxAttempts: game.maxAttempts,
  };
}

/**
 * 提交一次猜测：
 * - 猜对 → 立即获胜，返回完整英雄信息。
 * - 猜错且还有机会 → 返回下一条提示（范围更小）。
 * - 猜错且次数用尽 → 判定失败，返回完整英雄信息。
 */
export async function submitGuess(gameId: string, name: string): Promise<GuessResponse> {
  const game = gameStore.get(gameId);
  if (!game) {
    throw new Error('对局不存在或已过期');
  }
  if (game.status !== 'IN_PROGRESS') {
    throw new Error('本局游戏已结束');
  }

  const hero = await findHeroById(game.heroId);
  if (!hero) {
    throw new Error('英雄数据不存在');
  }

  game.attemptsUsed += 1;

  if (isNameMatch(name, hero.name)) {
    game.status = 'WON';
    gameStore.update(gameId, () => {});
    return {
      correct: true,
      finished: true,
      status: 'WON',
      attemptsUsed: game.attemptsUsed,
      maxAttempts: game.maxAttempts,
      hero: { name: hero.name, biography: hero.biography },
    };
  }

  if (game.attemptsUsed >= game.maxAttempts) {
    game.status = 'LOST';
    gameStore.update(gameId, () => {});
    return {
      correct: false,
      finished: true,
      status: 'LOST',
      attemptsUsed: game.attemptsUsed,
      maxAttempts: game.maxAttempts,
      hero: { name: hero.name, biography: hero.biography },
    };
  }

  const hints = hero.hints ?? [];
  game.hintIndex = Math.min(game.attemptsUsed + 1, hints.length);
  gameStore.update(gameId, () => {});

  return {
    correct: false,
    finished: false,
    status: 'IN_PROGRESS',
    attemptsUsed: game.attemptsUsed,
    maxAttempts: game.maxAttempts,
    hint: hints[game.hintIndex - 1],
  };
}

export function getGame(gameId: string): GameState | undefined {
  return gameStore.get(gameId);
}

