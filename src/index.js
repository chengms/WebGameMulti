// 导入主应用
import './main.jsx';

// 添加全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// 添加未处理的Promise错误处理
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise rejection:', event.reason);
});

// 检测浏览器功能
const checkBrowserFeatures = () => {
  const features = {
    modules: 'noModule' in document.createElement('script'),
    dynamicImport: true
  };
  
  try {
    new Function('import("")');
  } catch (e) {
    features.dynamicImport = false;
  }
  
  return features;
};

const features = checkBrowserFeatures();
console.log('Browser features:', features);

// 如果浏览器不支持所需功能，显示警告
if (!features.modules || !features.dynamicImport) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Browser Not Supported</h1>
        <p>Please use a modern browser like Chrome, Firefox, Safari, or Edge.</p>
      </div>
    `;
  }
} 