// Matrix Digital Rain Background
document.addEventListener('DOMContentLoaded', function() {
    // 首次加载动画
    initMatrixLoader();
    
    // 禁止开发者工具
    preventDevTools();
    
    // Matrix digital rain background effect
    createMatrixRain();
    
    // Typing effect for sections
    typeText('#intro-text', 'Accessing identity file... Decryption in progress...', 60, function() {
        setTimeout(() => {
            document.getElementById('identity-section').classList.remove('hidden');
        }, 500);
    });
    
    setTimeout(() => {
        typeText('#skills-intro', 'Analyzing skill matrix... Processing data...', 60, function() {
            setTimeout(() => {
                document.getElementById('skills-section').classList.remove('hidden');
                animateSkillBars();
            }, 500);
        });
    }, 2500);
    
    setTimeout(() => {
        typeText('#projects-intro', 'Loading personal interests... Analyzing patterns...', 60, function() {
            setTimeout(() => {
                document.getElementById('projects-section').classList.remove('hidden');
            }, 500);
        });
    }, 5000);
    
    setTimeout(() => {
        typeText('#contact-intro', 'Establishing secure communication channels... Encrypting connections...', 60, function() {
            setTimeout(() => {
                document.getElementById('contact-section').classList.remove('hidden');
            }, 500);
        });
    }, 7500);
});

// 初始化矩阵加载动画
function initMatrixLoader() {
    // 检查是否是首次访问
    if (!sessionStorage.getItem('matrixEntered')) {
        // 显示加载页面
        const matrixLoader = document.getElementById('matrixLoader');
        const terminal = document.getElementById('terminal');
        const redPill = document.getElementById('redPill');
        const bluePill = document.getElementById('bluePill');
        const progressFill = document.getElementById('progressFill');
        const progressBar = document.getElementById('progressBar');
        const matrixCodeContainer = document.getElementById('matrixCodeContainer');
        
        // 使用相同的数字雨效果
        createMatrixRainForLoader(matrixCodeContainer);
        
        // 隐藏进度条
        progressBar.classList.remove('active');
        
        // 红蓝药丸效果
        redPill.addEventListener('click', function() {
            // 添加选中效果
            redPill.classList.add('selected');
            bluePill.classList.add('disabled');
            document.querySelector('.choice-text').style.opacity = '0.5';
            
            setTimeout(() => {
                startMatrixLoading(progressFill, function() {
                    matrixLoader.classList.add('hidden');
                    setTimeout(() => {
                        terminal.classList.add('visible');
                    }, 500);
                    
                    // 设置会话存储，以便刷新页面时不再显示
                    sessionStorage.setItem('matrixEntered', 'true');
                });
            }, 500);
        });
        
        bluePill.addEventListener('click', function() {
            // 添加选中效果
            bluePill.classList.add('selected');
            redPill.classList.add('disabled');
            document.querySelector('.choice-text').style.opacity = '0.5';
            
            setTimeout(() => {
                // 如果用户选择蓝色药丸，重定向到其他页面或关闭网站
                window.location.href = 'https://blog.cuijianzhuang.com/';
            }, 1000);
        });
    } else {
        // 如果已访问过，直接隐藏加载器并显示终端
        document.getElementById('matrixLoader').classList.add('hidden');
        document.getElementById('terminal').classList.add('visible');
    }
}

// 为加载页面创建相同的矩阵数字雨效果
function createMatrixRainForLoader(container) {
    // 创建Canvas元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    
    container.appendChild(canvas);
    
    // 矩阵字符
    const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const characters = matrixChars.split('');
    
    // 设置基于Canvas宽度的列
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // 跟踪每列y位置的数组
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // 绘制矩阵雨
    function draw() {
        // 设置半透明黑色背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 设置字符的颜色和字体
        ctx.fillStyle = '#0F0'; // 矩阵绿
        ctx.font = `${fontSize}px monospace`;
        
        // 遍历drops数组
        for (let i = 0; i < drops.length; i++) {
            // 获取随机字符
            const char = characters[Math.floor(Math.random() * characters.length)];
            
            // 绘制字符
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // 为某些字符添加发光效果
            if (Math.random() > 0.975) {
                ctx.fillStyle = '#AFA'; // 更亮的绿色作为发光效果
            } else {
                ctx.fillStyle = '#0F0'; // 普通矩阵绿
            }
            
            ctx.fillText(char, x, y);
            
            // 当到达底部时重置drop位置
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // 向下移动drop
            drops[i]++;
        }
    }
    
    // 设置间隔运行draw函数
    const drawInterval = setInterval(draw, 35);
    
    // 窗口大小调整时重设Canvas
    const resizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // 重新计算列和drops
        const newColumns = Math.floor(canvas.width / fontSize);
        const oldLength = drops.length;
        
        if (newColumns > oldLength) {
            // 添加新列
            for (let i = oldLength; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * -canvas.height);
            }
        } else {
            // 移除列
            drops.splice(newColumns);
        }
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // 清理函数，当加载器隐藏时调用
    return function cleanup() {
        clearInterval(drawInterval);
        window.removeEventListener('resize', resizeHandler);
        if (canvas.parentNode === container) {
            container.removeChild(canvas);
        }
    };
}

// 生成矩阵代码效果（旧版本，现在不再使用）
function generateMatrixCode(container) {
    // 这个功能被新版Canvas实现替代了，但保留这个函数以防需要回退
    console.log("Using canvas-based Matrix rain instead");
}

// 创建单列代码雨（旧版本，现在不再使用）
function createRainColumn(container, chars) {
    // 这个功能被新版Canvas实现替代了，但保留这个函数以防需要回退
}

// 进度条加载效果
function startMatrixLoading(progressBar, callback) {
    let progress = 0;
    const loadingSteps = [
        "Initializing Connection...",
        "Locating Entry Point...",
        "Bypassing Security Systems...",
        "Establishing Neural Link...",
        "Preparing to Enter the Matrix..."
    ];
    
    // 修改加载文本
    const loadingText = document.querySelector('.loading-text');
    let currentStep = 0;
    
    // 显示进度条
    progressBar.parentElement.classList.add('active');
    
    loadingText.textContent = loadingSteps[currentStep];
    loadingText.classList.remove('glitch');
    
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        
        // 阶段性更新文本
        if (progress % 20 === 0 && currentStep < loadingSteps.length - 1) {
            currentStep++;
            loadingText.textContent = loadingSteps[currentStep];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            loadingText.textContent = "WELCOME TO THE MATRIX";
            loadingText.classList.add('glitch');
            
            setTimeout(() => {
                if (callback) callback();
            }, 1000);
        }
    }, 30);
}

// 禁止开发者工具
function preventDevTools() {
    // 方法一：检测控制台是否打开
    let devToolsOpen = false;
    
    // 检测 F12, Ctrl+Shift+I, Ctrl+Shift+J
    document.addEventListener('keydown', function(e) {
        if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) // Ctrl+Shift+J
        ) {
            e.preventDefault();
            showDevToolsWarning();
            return false;
        }
    });
    
    // 检测控制台对象
    const checkDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (
            widthThreshold || 
            heightThreshold || 
            (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized)
        ) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                showDevToolsWarning();
            }
        } else {
            devToolsOpen = false;
        }
    };
    
    // 定期检查开发者工具是否打开
    setInterval(checkDevTools, 1000);
    
    // 检测右键
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 显示警告
    function showDevToolsWarning() {
        const message = '系统检测到未授权的开发者工具访问尝试。\n此操作已被记录。';
        if (!document.getElementById('devtools-warning')) {
            const warningDiv = document.createElement('div');
            warningDiv.id = 'devtools-warning';
            warningDiv.style.position = 'fixed';
            warningDiv.style.top = '0';
            warningDiv.style.left = '0';
            warningDiv.style.width = '100%';
            warningDiv.style.padding = '15px';
            warningDiv.style.backgroundColor = '#ff0000';
            warningDiv.style.color = '#ffffff';
            warningDiv.style.textAlign = 'center';
            warningDiv.style.zIndex = '9999';
            warningDiv.style.fontFamily = 'monospace';
            warningDiv.style.fontSize = '16px';
            warningDiv.textContent = message;
            document.body.appendChild(warningDiv);
            
            setTimeout(() => {
                if (warningDiv.parentNode) {
                    warningDiv.parentNode.removeChild(warningDiv);
                }
            }, 5000);
        }
        
        console.clear();
        console.log('%c警告！', 'color: red; font-size: 30px; font-weight: bold;');
        console.log('%c' + message, 'font-size: 16px;');
    }
    
    // 禁用控制台输出
    const disableConsole = function() {
        try {
            const noop = () => {};
            
            // 备份原始方法
            const originalConsole = {
                log: console.log,
                info: console.info,
                warn: console.warn,
                error: console.error,
                debug: console.debug,
                clear: console.clear
            };
            
            // 重写控制台方法
            console.log = console.info = console.warn = console.error = console.debug = function() {
                showDevToolsWarning();
                return false;
            };
            
            // 仍允许清除控制台
            console.clear = originalConsole.clear;
        } catch (e) {}
    };
    
    disableConsole();
}

// Typing effect function
function typeText(selector, text, speed, callback) {
    const element = document.querySelector(selector);
    let i = 0;
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    
    element.innerHTML = ''; // Clear any existing content
    typing();
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar span');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Matrix digital rain effect
function createMatrixRain() {
    const matrixBackground = document.querySelector('.matrix-background');
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    
    matrixBackground.appendChild(canvas);
    
    // Matrix characters
    const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Convert string to array
    const characters = matrixChars.split('');
    
    // Set columns based on canvas width
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // Draw the matrix rain
    function draw() {
        // Set semi-transparent black background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set color and font for characters
        ctx.fillStyle = '#0F0'; // Matrix green
        ctx.font = `${fontSize}px monospace`;
        
        // Loop through drops array
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const char = characters[Math.floor(Math.random() * characters.length)];
            
            // Draw the character
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Add some glowing effect to some characters
            if (Math.random() > 0.975) {
                ctx.fillStyle = '#AFA'; // Brighter green for glow effect
            } else {
                ctx.fillStyle = '#0F0'; // Normal matrix green
            }
            
            ctx.fillText(char, x, y);
            
            // Reset drop position when it reaches bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Set interval to run the draw function
    setInterval(draw, 35);
    
    // Resize canvas when window resizes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Recalculate columns and drops
        const newColumns = Math.floor(canvas.width / fontSize);
        const oldLength = drops.length;
        
        if (newColumns > oldLength) {
            // Add new columns
            for (let i = oldLength; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * -canvas.height);
            }
        } else {
            // Remove columns
            drops.splice(newColumns);
        }
    });
}

// Add glitching effect to the terminal
const terminal = document.querySelector('.terminal');
setInterval(() => {
    if (Math.random() > 0.97) {
        terminal.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            terminal.style.transform = 'translateX(0)';
        }, 100);
    }
}, 2000);

// Add flicker effect to the terminal occasionally
setInterval(() => {
    if (Math.random() > 0.98) {
        terminal.style.opacity = '0.8';
        setTimeout(() => {
            terminal.style.opacity = '1';
        }, 50);
    }
}, 3000);

// 添加鼠标悬停效果
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 16px rgba(0, 255, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// 添加点击效果
document.querySelectorAll('.skill-bar span').forEach(bar => {
    bar.addEventListener('click', function() {
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1000);
    });
});

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Alt + H: 显示/隐藏帮助信息
    if (e.altKey && e.key === 'h') {
        showHelpModal();
    }
    // Alt + T: 切换终端主题
    if (e.altKey && e.key === 't') {
        toggleTerminalTheme();
    }
});

// 显示帮助信息
function showHelpModal() {
    const modal = document.createElement('div');
    modal.className = 'help-modal matrix-style';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>[SYSTEM HELP]</h2>
            <p>快捷键列表：</p>
            <ul>
                <li>Alt + H: 显示此帮助</li>
                <li>Alt + T: 切换终端主题</li>
                <li>ESC: 关闭弹窗</li>
            </ul>
            <p>点击任意处关闭</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// 切换终端主题
function toggleTerminalTheme() {
    const terminal = document.querySelector('.terminal');
    if (terminal.classList.contains('light-theme')) {
        terminal.classList.remove('light-theme');
    } else {
        terminal.classList.add('light-theme');
    }
}

// 添加折叠和展开功能
document.querySelectorAll('.section-header').forEach(header => {
    // 初始化时添加展开/折叠指示器
    header.classList.add('collapsible');
    const content = header.nextElementSibling;
    if (content) {
        content.style.maxHeight = null;
        content.classList.add('collapsible-content');
    }

    header.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        
        if (content) {
            // 添加矩阵风格的过渡动画
            content.classList.add('matrix-transition');
            
            if (content.style.maxHeight) {
                // 折叠
                content.style.maxHeight = null;
                content.classList.remove('active');
                
                // 添加折叠动画效果
                content.style.transform = 'translateY(-10px)';
                content.style.opacity = '0';
                
                setTimeout(() => {
                    content.style.transform = '';
                    content.style.opacity = '';
                }, 300);
            } else {
                // 展开
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                
                // 添加展开动画效果
                content.style.transform = 'translateY(10px)';
                content.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    content.style.transform = '';
                    content.style.opacity = '1';
                });
                
                // 处理嵌套内容
                const nestedContents = content.querySelectorAll('.collapsible-content');
                nestedContents.forEach(nested => {
                    if (nested.classList.contains('active')) {
                        content.style.maxHeight = parseInt(content.style.maxHeight) + nested.scrollHeight + "px";
                    }
                });
            }
            
            // 添加矩阵风格的视觉效果
            const glitchEffect = document.createElement('div');
            glitchEffect.className = 'matrix-glitch-effect';
            content.appendChild(glitchEffect);
            
            setTimeout(() => {
                content.removeChild(glitchEffect);
            }, 300);
        }
    });
}); 