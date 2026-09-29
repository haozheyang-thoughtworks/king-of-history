// 对局相关的内存态类型（不落库）。单人 vs 系统的猜英雄小游戏。

export type GameStatus = 'IN_PROGRESS' | 'WON' | 'LOST';

export interface GameState {
  id: string;
  heroId: string;
  status: GameStatus;
  /** 已经使用的猜测次数（0 ~ maxAttempts）。 */
  attemptsUsed: number;
  /** 本局最多可猜测次数（默认 5）。 */
  maxAttempts: number;
  /** 当前已经展示到第几条提示（1-based）。 */
  hintIndex: number;
  createdAt: number;
  lastActiveAt: number;
}

