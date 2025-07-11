import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 根据环境变量判断是否是生产环境
const isProd = process.env.CF_PAGES_BRANCH === 'main';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    cors: true,
    // 开发环境配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    // 配置静态文件服务
    fs: {
      allow: ['..']
    }
  },
  // 配置公共目录
  publicDir: 'public',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 启用 gzip 压缩
    minify: 'terser',
    // 优化 chunk 分割
    rollupOptions: {
      output: {
        // 简化代码分割，避免空chunk
        manualChunks: (id) => {
          // React 相关库
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // 路由相关
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // 其他第三方库
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // 优化文件命名
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return 'assets/media/[name]-[hash].[ext]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    // 构建目标优化
    target: 'es2018', // 更现代的 JS 语法，更小的包体积
    // Terser 压缩配置
    terserOptions: {
      compress: {
        drop_console: isProd, // 生产环境移除 console
        drop_debugger: true,
        pure_funcs: isProd ? ['console.log', 'console.info'] : [],
        // 移除未使用的代码
        dead_code: true,
        // 优化条件表达式
        conditionals: true,
        // 优化比较操作
        comparisons: true,
        // 内联函数
        inline: 2
      },
      mangle: {
        // 混淆变量名以减小体积
        toplevel: true,
        safari10: true
      },
      format: {
        // 移除注释
        comments: false
      }
    },
    // 设置 chunk 大小限制
    chunkSizeWarningLimit: 1000,
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 资源内联阈值
    assetsInlineLimit: 4096 // 4KB 以下的资源内联为 base64
  },
  optimizeDeps: {
    // 预构建依赖
    include: [
      'react', 
      'react-dom', 
      'react-router-dom'
    ],
    // 排除不需要预构建的依赖
    exclude: []
  },
  // CSS 优化
  css: {
    // 启用 CSS 模块
    modules: {
      localsConvention: 'camelCase'
    },
    // PostCSS 配置
    postcss: {
      plugins: [
        // 可以添加 autoprefixer 等插件
      ]
    }
  },
  // 预览服务器配置
  preview: {
    port: 3000,
    host: true
  }
}); 