// 这是一个图标生成脚本
// 可以通过安装 svg2png 和 sharp 等工具来使用
// npm install svg2png sharp

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const sizes = [16, 32, 48, 57, 60, 72, 76, 96, 114, 120, 144, 152, 180, 192, 512];
const svgPath = path.join(__dirname, 'favicon.svg');
const outputDir = __dirname;

// 创建生成PNG的函数
function generateFavicons() {
  console.log('开始生成图标...');
  
  // 检查SVG文件是否存在
  if (!fs.existsSync(svgPath)) {
    console.error('错误: favicon.svg 文件不存在');
    return;
  }
  
  // 生成各种尺寸的图标
  sizes.forEach(size => {
    const outputFile = path.join(outputDir, `favicon-${size}x${size}.png`);
    console.log(`生成 ${size}x${size} 图标...`);
    
    // 使用命令行工具转换 SVG 到 PNG
    // 注意：这里假设已安装相关工具，如 svg2png 或 convert
    const command = `npx svg2png ${svgPath} -o ${outputFile} -w ${size} -h ${size}`;
    
    exec(command, (error) => {
      if (error) {
        console.error(`生成 ${size}x${size} 图标时出错:`, error);
      } else {
        console.log(`成功生成 ${size}x${size} 图标`);
      }
    });
  });
  
  // 创建特殊尺寸的图标
  const specialSizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];
  
  specialSizes.forEach(item => {
    const outputFile = path.join(outputDir, item.name);
    const srcFile = path.join(outputDir, `favicon-${item.size}x${item.size}.png`);
    
    // 复制对应尺寸的图标为特定名称
    fs.copyFile(srcFile, outputFile, (err) => {
      if (err) {
        console.error(`复制 ${item.name} 时出错:`, err);
      } else {
        console.log(`成功创建 ${item.name}`);
      }
    });
  });
  
  // 生成 ICO 文件 (需要 imagemagick)
  const icoCommand = `convert ${path.join(outputDir, 'favicon-16x16.png')} ${path.join(outputDir, 'favicon-32x32.png')} ${path.join(outputDir, 'favicon-48x48.png')} ${path.join(outputDir, 'favicon.ico')}`;
  
  exec(icoCommand, (error) => {
    if (error) {
      console.error('生成 ICO 文件时出错:', error);
    } else {
      console.log('成功生成 favicon.ico');
    }
  });
}

// 执行生成
generateFavicons(); 