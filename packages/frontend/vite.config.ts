import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true, // 容器 + volume 挂载场景下，某些系统需要轮询才能检测到文件变化
    },
  },
});

