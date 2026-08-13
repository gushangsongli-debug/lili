// ================= 1. 软件数据配置 =================
const appsData = [
    // 注意：这里的 url 已经改成了 shenfen
    { id: 'app-identity', name: '身份', url: 'shenfen', svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' },
    { id: 'app-chat', name: '细语', url: 'xiyu', svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' },
    { id: 'app-forum', name: '小圈', url: 'xiaoquan', svg: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>' },
    { id: 'app-music', name: '聆听', url: 'lingting', svg: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>' },
    { id: 'app-settings', name: '设置', url: 'shezhi', svg: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' },
    { id: 'app-worldbook', name: '世界书', url: 'shijieshu', svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
    { id: 'app-album', name: '回忆', url: 'huiyi', svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>' },
    { id: 'app-sms', name: '讯息', url: 'xunxi', svg: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>' },
    { id: 'app-mall', name: '商场', url: 'shangchang', svg: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>' },
    { id: 'app-crosstime', name: '跨时空', url: 'kuashikong', svg: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>' }
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
        appEl.dataset.url = app.url; 
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
let isDragging = false; 

desktop.addEventListener('pointerdown', (e) => {
    const app = e.target.closest('.app-icon');
    if (!app) return;
    e.preventDefault(); 
    
    draggingApp = app;
    sourceCell = app.parentElement;
    isDragging = false; 
    
    const rect = app.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener('pointermove', (e) => {
    if (!draggingApp) return;
    
    if (!isDragging && (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)) {
        isDragging = true;
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
        openApp(draggingApp.id, draggingApp.dataset.url);
    } else {
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

function openApp(appId, url) {
    allAppViews.forEach(view => view.classList.remove('active'));
    
    const targetView = document.getElementById(`view-${appId}`);
    if (targetView) {
        targetView.classList.add('active');
    } else {
        alert("该软件正在开发中...");
        return;
    }

    browserUrl.textContent = url;
    appWindow.classList.add('active');
}

btnCloseApp.addEventListener('click', () => {
    appWindow.classList.remove('active');
});

// ================= 5. 身份软件 (Identity) 业务逻辑 =================
const fileInput = document.getElementById('input-avatar-file');
const fileNameDisplay = document.getElementById('file-name-display');
const btnAddIdentity = document.getElementById('btn-add-identity');
const polaroidGallery = document.getElementById('polaroid-gallery');

let currentAvatarBase64 = ''; // 用于存储读取到的本地图片数据

// 监听文件选择事件
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = file.name; // 显示文件名
        
        // 使用 FileReader 读取本地图片为 Base64 格式
        const reader = new FileReader();
        reader.onload = function(event) {
            currentAvatarBase64 = event.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        fileNameDisplay.textContent = '未选择文件';
        currentAvatarBase64 = '';
    }
});

// 点击添加人设按钮
btnAddIdentity.addEventListener('click', () => {
    const name = document.getElementById('input-name').value.trim() || '神秘人';
    
    // 如果没有上传图片，给一个默认的灰色占位图
    const avatarSrc = currentAvatarBase64 || 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%3E%3Crect%20fill%3D%22%23e0e0e0%22%20width%3D%22120%22%20height%3D%22120%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E无头像%3C%2Ftext%3E%3C%2Fsvg%3E';

    // 创建拍立得卡片 DOM 元素
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    
    // 生成一个 -6 到 6 度的随机倾斜角，让拍立得看起来更随意真实
    const randomRotation = (Math.random() * 12) - 6;
    card.style.transform = `rotate(${randomRotation}deg)`;

    card.innerHTML = `
        <img src="${avatarSrc}" alt="avatar" class="polaroid-img">
        <div class="polaroid-name">${name}</div>
    `;

    // 将新卡片添加到画廊中
    polaroidGallery.appendChild(card);

    // 添加完毕后，清空表单，方便继续添加下一个
    document.getElementById('input-name').value = '';
    document.getElementById('input-id').value = '';
    document.getElementById('input-persona').value = '';
    fileInput.value = '';
    fileNameDisplay.textContent = '未选择文件';
    currentAvatarBase64 = '';
});
