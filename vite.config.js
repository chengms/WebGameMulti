import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 根据环境变量判断是否是生产环境
const isProd = process.env.CF_PAGES_BRANCH === 'main';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? 'https://gametime.bar' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    cors: true,
    // 开发环境配置
    proxy: isProd ? {} : {
      '/api': {
        target: 'https://gametime.bar',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: true
  },
}); 