// ================= 软件数据配置 =================
const appsData = [
    { id: 'identity', name: '身份', svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' },
    { id: 'chat', name: '细语', svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' },
    { id: 'forum', name: '小圈', svg: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>' },
    { id: 'music', name: '聆听', svg: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>' },
    { id: 'settings', name: '设置', svg: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' },
    { id: 'worldbook', name: '世界书', svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
    { id: 'album', name: '回忆', svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>' },
    { id: 'sms', name: '讯息', svg: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>' },
    { id: 'mall', name: '商场', svg: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>' },
    { id: 'crosstime', name: '跨时空', svg: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>' }
];

// ================= 初始化桌面 =================
const desktop = document.getElementById('desktop');
const totalCells = 32;

for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    if (i < appsData.length) {
        const app = appsData[i];
        const appEl = document.createElement('div');
        appEl.className = 'app-icon';
        appEl.dataset.appId = app.id;

        appEl.innerHTML = `
            <div class="icon-box">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    ${app.svg}
                </svg>
            </div>
            <div class="app-name">${app.name}</div>
        `;
        cell.appendChild(appEl);
    }
    desktop.appendChild(cell);
}

// ================= 桌面图标拖拽逻辑 =================
let draggingApp = null;
let cloneApp = null;
let sourceCell = null;
let offsetX = 0, offsetY = 0;
let isDragging = false;
let dragStartTime = 0;

desktop.addEventListener('pointerdown', (e) => {
    const app = e.target.closest('.app-icon');
    if (!app) return;
    e.preventDefault();

    draggingApp = app;
    sourceCell = app.parentElement;
    isDragging = false;
    dragStartTime = Date.now();

    const rect = app.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cloneApp = app.cloneNode(true);
    cloneApp.style.position = 'fixed';
    cloneApp.style.left = `${rect.left}px`;
    cloneApp.style.top = `${rect.top}px`;
    cloneApp.style.zIndex = '1000';
    cloneApp.style.pointerEvents = 'none';
    cloneApp.style.transform = 'scale(1.1)';
    cloneApp.style.transition = 'transform 0.1s';
    cloneApp.style.opacity = '0';

    document.body.appendChild(cloneApp);
});

document.addEventListener('pointermove', (e) => {
    if (!draggingApp || !cloneApp) return;

    if (!isDragging) {
        isDragging = true;
        cloneApp.style.opacity = '1';
        draggingApp.style.opacity = '0';
    }

    cloneApp.style.left = `${e.clientX - offsetX}px`;
    cloneApp.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('pointerup', (e) => {
    if (!draggingApp) return;

    const elapsed = Date.now() - dragStartTime;

    if (!isDragging && elapsed < 300) {
        // 点击事件 -> 打开软件
        const appId = draggingApp.dataset.appId;
        openApp(appId);
    } else if (isDragging) {
        // 拖拽结束 -> 交换位置
        cloneApp.style.display = 'none';
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        cloneApp.style.display = '';

        const targetCell = targetElement ? targetElement.closest('.cell') : null;

        if (targetCell && targetCell !== sourceCell) {
            if (targetCell.children.length > 0) {
                const existingApp = targetCell.children[0];
                sourceCell.appendChild(existingApp);
            }
            targetCell.appendChild(draggingApp);
        }
    }

    if (draggingApp) draggingApp.style.opacity = '1';
    if (cloneApp) cloneApp.remove();

    draggingApp = null;
    cloneApp = null;
    sourceCell = null;
    isDragging = false;
});

// ================= 打开软件 =================
function openApp(appId) {
    if (appId === 'identity') {
        document.getElementById('window-identity').style.display = 'flex';
    }
    // 后续其他软件的打开逻辑可以在这里添加
}

// ================= 身份软件逻辑 =================
const identityWindow = document.getElementById('window-identity');
const identityClose = document.getElementById('identity-close');
const identityAddBtn = document.getElementById('identity-add-btn');
const formOverlay = document.getElementById('identity-form-overlay');
const formCancel = document.getElementById('form-cancel');
const formSave = document.getElementById('form-save');
const avatarUpload = document.getElementById('avatar-upload');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');
const polaroidList = document.getElementById('polaroid-list');

// 存储所有人设
let personas = [];
let currentAvatarData = null;

// 关闭身份窗口
identityClose.addEventListener('click', () => {
    identityWindow.style.display = 'none';
});

// 打开添加人设表单
identityAddBtn.addEventListener('click', () => {
    resetForm();
    formOverlay.style.display = 'flex';
});

// 取消表单
formCancel.addEventListener('click', () => {
    formOverlay.style.display = 'none';
});

// 点击头像上传区域
avatarUpload.addEventListener('click', () => {
    avatarInput.click();
});

// 头像文件选择
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        currentAvatarData = ev.target.result;
        avatarPreview.innerHTML = `<img src="${currentAvatarData}" alt="头像">`;
    };
    reader.readAsDataURL(file);
});

// 保存人设
formSave.addEventListener('click', () => {
    const name = document.getElementById('form-name').value.trim();
    const id = document.getElementById('form-id').value.trim();
    const persona = document.getElementById('form-persona').value.trim();

    if (!name) {
        alert('请输入名字');
        return;
    }

    const newPersona = {
        name: name,
        id: id || 'N/A',
        persona: persona || '',
        avatar: currentAvatarData || null
    };

    personas.push(newPersona);
    renderPolaroids();
    formOverlay.style.display = 'none';
});

// 重置表单
function resetForm() {
    document.getElementById('form-name').value = '';
    document.getElementById('form-id').value = '';
    document.getElementById('form-persona').value = '';
    currentAvatarData = null;
    avatarPreview.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
    avatarInput.value = '';
}

// 渲染拍立得卡片
function renderPolaroids() {
    polaroidList.innerHTML = '';

    personas.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'polaroid-card';

        const avatarHTML = p.avatar
            ? `<img src="${p.avatar}" alt="${p.name}">`
            : `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;

        card.innerHTML = `
            <div class="polaroid-avatar">
                ${avatarHTML}
            </div>
            <div class="polaroid-name">${p.name}</div>
        `;

        polaroidList.appendChild(card);
    });
}
