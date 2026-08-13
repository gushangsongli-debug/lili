// ================= 1. 软件数据配置 =================
const appsData = [
    { id: 'identity', name: '身份', svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' },
    { id: 'chat', name: '细语', svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' },
    { id: 'forum', name: '小圈', svg: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>' },
    { id: 'music', name: '聆听', svg: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>' },
    { id: 'settings', name: '设置', svg: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' },
    { id: 'worldbook', name: '世界书', svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
    { id: 'album', name: '回忆', svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>' },
    { id: 'sms', name: '讯息', svg: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>' },
    { id: 'mall', name: '商场', svg: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>' },
    { id: 'crosstime', name: '跨时空', svg: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>' }
];

// ================= 2. 初始化桌面 =================
const desktop = document.getElementById('desktop');
const totalCells = 4 * 8;

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

// ================= 3. 桌面拖拽逻辑 =================
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
    cloneApp.style.opacity = '0.9';
    cloneApp.style.transition = 'none';

    document.body.appendChild(cloneApp);
    app.style.opacity = '0.3';
});

document.addEventListener('pointermove', (e) => {
    if (!draggingApp || !cloneApp) return;
    isDragging = true;
    cloneApp.style.left = `${e.clientX - offsetX}px`;
    cloneApp.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('pointerup', (e) => {
    if (!draggingApp) return;

    const elapsed = Date.now() - dragStartTime;

    if (cloneApp) {
        cloneApp.style.display = 'none';
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        cloneApp.style.display = '';

        const targetCell = targetElement ? targetElement.closest('.cell') : null;

        if (isDragging && targetCell && targetCell !== sourceCell) {
            if (targetCell.children.length > 0) {
                const existingApp = targetCell.children[0];
                sourceCell.appendChild(existingApp);
            }
            targetCell.appendChild(draggingApp);
        }

        cloneApp.remove();
    }

    // 如果是快速点击（非拖拽），触发打开软件
    if (!isDragging && elapsed < 300) {
        openApp(draggingApp.dataset.appId);
    }

    draggingApp.style.opacity = '1';
    draggingApp = null;
    cloneApp = null;
    sourceCell = null;
    isDragging = false;
});

// ================= 4. 打开/关闭软件 =================
function openApp(appId) {
    const page = document.getElementById('page-' + appId);
    if (page) {
        page.classList.add('active');
    }
}

function closeApp(appId) {
    const page = document.getElementById('page-' + appId);
    if (page) {
        page.classList.remove('active');
    }
}

// ================= 5. 身份软件逻辑 =================
const identityList = document.getElementById('identity-list');
const identityModal = document.getElementById('identity-modal');
const avatarUpload = document.getElementById('avatar-upload');
const avatarInput = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatar-preview');
const avatarPlaceholder = document.getElementById('avatar-placeholder');
const inputName = document.getElementById('input-name');
const inputId = document.getElementById('input-id');
const inputPersona = document.getElementById('input-persona');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');
const modalCloseBtn = document.getElementById('modal-close-btn');
const identityAddBtn = document.getElementById('identity-add-btn');
const identityClose = document.getElementById('identity-close');

// 存储所有人设
let identities = [];
let editingIndex = -1; // -1 表示新建
let currentAvatarData = '';

// 关闭身份页面
identityClose.addEventListener('click', () => {
    closeApp('identity');
});

// 打开新建弹窗
identityAddBtn.addEventListener('click', () => {
    editingIndex = -1;
    resetModal();
    document.querySelector('.modal-title').textContent = '新建人设';
    identityModal.classList.add('active');
});

// 关闭弹窗
function closeModal() {
    identityModal.classList.remove('active');
    resetModal();
}

modalCloseBtn.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// 点击上传头像
avatarUpload.addEventListener('click', () => {
    avatarInput.click();
});

// 处理头像文件
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        currentAvatarData = evt.target.result;
        avatarPreview.src = currentAvatarData;
        avatarPreview.classList.add('show');
        avatarPlaceholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
});

// 重置弹窗
function resetModal() {
    inputName.value = '';
    inputId.value = '';
    inputPersona.value = '';
    currentAvatarData = '';
    avatarPreview.src = '';
    avatarPreview.classList.remove('show');
    avatarPlaceholder.style.display = 'flex';
    avatarInput.value = '';
}

// 保存人设
btnSave.addEventListener('click', () => {
    const name = inputName.value.trim();
    const id = inputId.value.trim();
    const persona = inputPersona.value.trim();

    if (!name) {
        alert('请输入名字');
        return;
    }

    const data = {
        name: name,
        id: id || 'ID-' + Date.now(),
        persona: persona,
        avatar: currentAvatarData
    };

    if (editingIndex === -1) {
        // 新建
        identities.push(data);
    } else {
        // 编辑
        identities[editingIndex] = data;
    }

    closeModal();
    renderIdentities();
});

// 渲染拍立得卡片
function renderIdentities() {
    if (identities.length === 0) {
        identityList.innerHTML = `
            <div class="empty-tip">
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="#ccc" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <p>还没有人设，点击右上角 ＋ 添加</p>
            </div>
        `;
        return;
    }

    let html = '';
    identities.forEach((item, index) => {
        // 给每张卡片随机一个轻微旋转角度
        const rotation = (Math.random() - 0.5) * 4;
        html += `
            <div class="polaroid-card" style="transform: rotate(${rotation}deg);">
                <div class="polaroid-img">
                    ${item.avatar
                        ? `<img src="${item.avatar}" alt="${item.name}">`
                        : '<span class="no-avatar">👤</span>'
                    }
                </div>
                <div class="polaroid-name">${item.name}</div>
                <div class="polaroid-id">@${item.id}</div>
                <div class="polaroid-actions">
                    <button class="btn-edit" onclick="editIdentity(${index})">编辑</button>
                    <button class="btn-delete" onclick="deleteIdentity(${index})">删除</button>
                </div>
            </div>
        `;
    });

    identityList.innerHTML = html;
}

// 编辑人设
function editIdentity(index) {
    editingIndex = index;
    const item = identities[index];

    document.querySelector('.modal-title').textContent = '编辑人设';
    inputName.value = item.name;
    inputId.value = item.id;
    inputPersona.value = item.persona;

    if (item.avatar) {
        currentAvatarData = item.avatar;
        avatarPreview.src = item.avatar;
        avatarPreview.classList.add('show');
        avatarPlaceholder.style.display = 'none';
    } else {
        currentAvatarData = '';
        avatarPreview.classList.remove('show');
        avatarPlaceholder.style.display = 'flex';
    }

    identityModal.classList.add('active');
}

// 删除人设
function deleteIdentity(index) {
    if (confirm(`确定要删除 "${identities[index].name}" 吗？`)) {
        identities.splice(index, 1);
        renderIdentities();
    }
}

// 初始渲染
renderIdentities();
