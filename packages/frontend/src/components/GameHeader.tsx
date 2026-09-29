import { useState } from 'react';
import { toggleBackgroundMusic, isBackgroundMusicPlaying } from '../utils/audio';

export function GameHeader() {
  const [playing, setPlaying] = useState(() => isBackgroundMusicPlaying());

  const handleToggleMusic = () => {
    setPlaying(toggleBackgroundMusic());
  };

  return (
    <div className="game-header">
      <h1 className="game-title">历史英雄猜猜猜</h1>
      <button
        type="button"
        className="btn-music-toggle"
        onClick={handleToggleMusic}
        aria-label={playing ? '关闭背景音乐' : '开启背景音乐'}
        title={playing ? '关闭背景音乐' : '开启背景音乐'}
      >
        {playing ? '🔊' : '🔇'}
      </button>
    </div>
  );
}



