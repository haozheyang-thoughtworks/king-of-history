import type { HeroReveal } from './hero';

// 对局相关类型：单人 vs 系统的猜英雄小游戏。
// 对局运行时状态保存在后端进程内存中（不持久化到数据库）。

export type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

/** POST /api/games 的响应：新建一局并返回第一条提示。 */
export interface CreateGameResponse {
  gameId: string;
  hint: string;
  hintIndex: number;
  attemptsUsed: number;
  maxAttempts: number;
}

/** POST /api/games/:gameId/guesses 的请求体。 */
export interface GuessRequest {
  name: string;
}

/** POST /api/games/:gameId/guesses 的响应。 */
export interface GuessResponse {
  correct: boolean;
  finished: boolean;
  status: GameStatus;
  attemptsUsed: number;
  maxAttempts: number;
  /** 猜错且还有机会时，返回下一条提示。 */
  hint?: string;
  /** 游戏结束（猜对 或 次数用尽）时，返回完整英雄信息。 */
  hero?: HeroReveal;
}

