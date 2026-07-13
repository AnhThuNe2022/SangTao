document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('technology', { pageTitle: 'Kiến trúc Công nghệ' });
  renderTechnology();
});

function renderTechnology() {
  const layers = [
    { title: 'Kênh sử dụng', items: [['💻', 'Web Portal', 'Ứng dụng điều hành nội bộ'], ['📱', 'Mobile App', 'Báo cáo tại hiện trường']] },
    { title: 'API Gateway', items: [['🔐', 'Auth', 'Phân quyền'], ['🔔', 'Notification', 'Cảnh báo'], ['🤖', 'AI Service', 'Phân tích'], ['📚', 'Knowledge', 'Tri thức']] },
    { title: 'Data Layer', items: [['🗄️', 'LocalStorage', 'Dữ liệu demo'], ['📊', 'Reports', 'Báo cáo'], ['⚠️', 'Warnings', 'Cảnh báo'], ['💬', 'Chat', 'Trao đổi nội bộ']] },
    { title: 'Tích hợp', items: [['✉️', 'Email / SMS', 'Thông báo'], ['💬', 'Zalo / WhatsApp', 'Chat ngoài'], ['📷', 'Drone / Camera', 'Hình ảnh'], ['📡', 'Thiết bị IoT', 'Cảm biến']] }
  ];

  document.getElementById('techArchitecture').innerHTML = layers.map((layer, index) => `
    <div class="tech-layer">
      <div class="tech-layer-title">${layer.title}</div>
      <div class="tech-layer-items">
        ${layer.items.map(item => `<div class="tech-item"><div class="tech-item-icon">${item[0]}</div><div class="tech-item-name">${item[1]}</div><div class="tech-item-desc">${item[2]}</div></div>`).join('')}
      </div>
    </div>
    ${index < layers.length - 1 ? '<div class="tech-arrow">↓</div>' : ''}
  `).join('');
}
