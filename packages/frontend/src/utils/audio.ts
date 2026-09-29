// 背景音乐播放控制：单例 HTMLAudioElement，循环播放。
// 音频文件放在 public/audio/bgm.mp3（Vite 会原样打包进 dist，部署时无需任何额外配置）。
const BGM_SRC = '/audio/bgm.mp3';

let bgmAudio: HTMLAudioElement | null = null;

function getBgmAudio(): HTMLAudioElement {
  if (!bgmAudio) {
    bgmAudio = new Audio(BGM_SRC);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.5;
  }
  return bgmAudio;
}

/**
 * 播放背景音乐（循环）。必须在用户点击等交互事件的同步调用栈内触发，
 * 否则会被浏览器的自动播放策略拦截。
 */
export async function playBackgroundMusic(): Promise<void> {
  const audio = getBgmAudio();
  try {
    await audio.play();
  } catch (err) {
    // 常见于浏览器自动播放策略拦截，或音频文件尚未放置到 public/audio/bgm.mp3。
    console.warn('背景音乐播放失败：', err);
  }
}

export function pauseBackgroundMusic(): void {
  bgmAudio?.pause();
}

export function stopBackgroundMusic(): void {
  if (!bgmAudio) return;
  bgmAudio.pause();
  bgmAudio.currentTime = 0;
}

/** 切换播放/暂停，返回切换后是否处于播放状态。 */
export function toggleBackgroundMusic(): boolean {
  const audio = getBgmAudio();
  if (audio.paused) {
    void playBackgroundMusic();
    return true;
  }
  audio.pause();
  return false;
}

export function isBackgroundMusicPlaying(): boolean {
  return !!bgmAudio && !bgmAudio.paused;
}

