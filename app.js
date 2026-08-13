// ================= 1. 软件数据配置 =================
const appsData = [
    { id: 'app-identity', name: '身份', url: 'https://identity.app', svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' },
    { id: 'app-chat', name: '细语', url: 'https://chat.app', svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' },
    { id: 'app-forum', name: '小圈', url: 'https://forum.app', svg: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>' },
    { id: 'app-music', name: '聆听', url: 'https://music.app', svg: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>' },
    { id: 'app-settings', name: '设置', url: 'https://settings.app', svg: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' },
    { id: 'app-worldbook', name: '世界书', url: 'https://worldbook.app', svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
    { id: 'app-album', name: '回忆', url: 'https://album.app', svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>' },
    { id: 'app-sms', name: '讯息', url: 'https://sms.app', svg: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>' },
    { id: 'app-mall', name: '商场', url: 'https://mall.app', svg: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>' },
    { id: 'app-crosstime', name: '跨时空', url: 'https://crosstime.app', svg: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>' }
];

// ================= 2. 初始化桌面 =================
const desktop = document.getElementById('desktop');
for (let i = 0; i < 32; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    if (i < appsData.length) {
        const app = appsData[i];
        const appEl = document.createElement('div');
        appEl.className = 'app-icon';
        appEl.id = app.id;
        appEl.dataset.url = app.url; // 存储虚拟URL
        appEl.innerHTML = `
            <div class="icon-box"><svg viewBox="0 0 24 24">${app.svg}</svg></div>
            <div class="app-name">${app.name}</div>
        `;
        cell.appendChild(appEl);
    }
    desktop.appendChild(cell);
}

// ================= 3. 拖拽与点击逻辑 =================
let draggingApp = null, cloneApp = null, sourceCell = null;
let startX = 0, startY = 0, offsetX = 0, offsetY = 0;
let isDragging = false; // 用于区分点击和拖拽

desktop.addEventListener('pointerdown', (e) => {
    const app = e.target.closest('.app-icon');
    if (!app) return;
    e.preventDefault(); 
    
    draggingApp = app;
    sourceCell = app.parentElement;
    isDragging = false; // 初始假设是点击
    
    const rect = app.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener('pointermove', (e) => {
    if (!draggingApp) return;
    
    // 如果移动距离超过 5px，则判定为拖拽行为
    if (!isDragging && (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)) {
        isDragging = true;
        // 创建克隆体
        cloneApp = draggingApp.cloneNode(true);
        cloneApp.style.position = 'fixed';
        cloneApp.style.zIndex = '1000';
        cloneApp.style.pointerEvents = 'none';
        cloneApp.style.transform = 'scale(1.1)';
        document.body.appendChild(cloneApp);
        draggingApp.style.opacity = '0'; 
    }

    if (isDragging && cloneApp) {
        cloneApp.style.left = `${e.clientX - offsetX}px`;
        cloneApp.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('pointerup', (e) => {
    if (!draggingApp) return;
    
    if (!isDragging) {
        // === 点击事件：打开软件 ===
        openApp(draggingApp.id, draggingApp.dataset.url);
    } else {
        // === 拖拽事件：放置与交换 ===
        cloneApp.style.display = 'none'; 
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        cloneApp.style.display = '';
        
        const targetCell = targetElement ? targetElement.closest('.cell') : null;
        if (targetCell && targetCell !== sourceCell) {
            if (targetCell.children.length > 0) {
                sourceCell.appendChild(targetCell.children[0]);
            }
            targetCell.appendChild(draggingApp);
        }
        draggingApp.style.opacity = '1';
        if (cloneApp) cloneApp.remove();
    }
    
    draggingApp = null;
    cloneApp = null;
    sourceCell = null;
});

// ================= 4. 应用窗口管理 =================
const appWindow = document.getElementById('app-window');
const btnCloseApp = document.getElementById('btn-close-app');
const browserUrl = document.getElementById('browser-url');
const allAppViews = document.querySelectorAll('.app-view');

// 打开应用
function openApp(appId, url) {
    // 隐藏所有界面
    allAppViews.forEach(view => view.classList.remove('active'));
    
    // 尝试找到对应的界面并显示
    const targetView = document.getElementById(`view-${appId}`);
    if (targetView) {
        targetView.classList.add('active');
    } else {
        // 如果还没开发这个软件，给个提示
        alert("该软件正在开发中...");
        return;
    }

    // 更新浏览器地址栏并弹出窗口
    browserUrl.textContent = url;
    appWindow.classList.add('active');
}

// 关闭应用
btnCloseApp.addEventListener('click', () => {
    appWindow.classList.remove('active');
});

// ================= 5. 身份软件 (Identity) 业务逻辑 =================
const btnSaveIdentity = document.getElementById('btn-save-identity');
const identityCard = document.getElementById('identity-card');

btnSaveIdentity.addEventListener('click', () => {
    // 获取输入值
    const avatar = document.getElementById('input-avatar').value || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'; // 默认头像
    const name = document.getElementById('input-name').value || '未命名角色';
    const id = document.getElementById('input-id').value || '@unknown';
    const persona = document.getElementById('input-persona').value || '这个人很懒，什么都没写...';

    // 渲染到卡片
    document.getElementById('display-avatar').src = avatar;
    document.getElementById('display-name').textContent = name;
    document.getElementById('display-id').textContent = id;
    document.getElementById('display-persona').textContent = persona;

    // 显示卡片
    identityCard.style.display = 'flex';
    
    // 可选：清空输入框
    // document.getElementById('input-avatar').value = '';
    // document.getElementById('input-name').value = '';
    // document.getElementById('input-id').value = '';
    // document.getElementById('input-persona').value = '';
});
