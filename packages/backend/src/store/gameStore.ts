import type { GameState } from './types';

// 内存态对局存储：Map<gameId, GameState> 单例。
// 不做持久化，重启即清空；提供简单的 TTL 清理防止内存无限增长。
class GameStore {
  private games = new Map<string, GameState>();

  create(game: GameState): GameState {
    this.games.set(game.id, game);
    return game;
  }

  get(gameId: string): GameState | undefined {
    return this.games.get(gameId);
  }

  update(gameId: string, updater: (game: GameState) => void): GameState {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error(`Game not found: ${gameId}`);
    }
    updater(game);
    game.lastActiveAt = Date.now();
    return game;
  }

  delete(gameId: string): void {
    this.games.delete(gameId);
  }

  /** 清理超过 maxIdleMs 无活动的对局，默认 2 小时。 */
  cleanupInactive(maxIdleMs = 2 * 60 * 60 * 1000): void {
    const now = Date.now();
    for (const [id, game] of this.games) {
      if (now - game.lastActiveAt > maxIdleMs) {
        this.games.delete(id);
      }
    }
  }
}

export const gameStore = new GameStore();

/** 启动一个定时任务，周期性清理不活跃对局。 */
export function startGameStoreCleanupTimer(intervalMs = 30 * 60 * 1000): NodeJS.Timeout {
  return setInterval(() => gameStore.cleanupInactive(), intervalMs);
}

