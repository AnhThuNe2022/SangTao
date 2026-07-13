/**
 * Operation Hub - App Utilities
 */

const App = {
  /** Format thời gian relative */
  timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  },

  /** Format ngày */
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  },

  /** Format datetime */
  formatDateTime(dateStr) {
    return new Date(dateStr).toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  },

  /** Severity label */
  severityLabel(severity) {
    const labels = {
      critical: 'Nguy hiểm',
      high: 'Cảnh báo',
      medium: 'Trung bình',
      low: 'Bình thường'
    };
    return labels[severity] || severity;
  },

  /** Severity badge class */
  severityBadge(severity) {
    const map = {
      critical: 'badge-danger',
      high: 'badge-warning',
      medium: 'badge-caution',
      low: 'badge-success'
    };
    return map[severity] || 'badge-info';
  },

  /** Risk label */
  riskLabel(risk) {
    const labels = { high: 'Cao', medium: 'Trung bình', low: 'Thấp' };
    return labels[risk] || risk;
  },

  /** Show toast notification */
  toast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /** Show modal */
  showModal(title, content, footer) {
    let overlay = document.getElementById('appModal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'appModal';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">${title}</div>
          <button class="modal-close" onclick="App.closeModal()">${Icons.close}</button>
        </div>
        <div class="modal-body">${content}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>`;

    overlay.classList.add('active');

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) App.closeModal();
    });
  },

  closeModal() {
    const overlay = document.getElementById('appModal');
    if (overlay) overlay.classList.remove('active');
  },

  /** Get URL parameter */
  getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  /** Avatar color from name */
  avatarColor(name) {
    const colors = ['#667eea', '#764ba2', '#0078d4', '#00bcf2', '#52c41a', '#ffa940', '#ff4d4f', '#eb2f96'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  },

  /** Tab switching helper */
  initTabs(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const parent = container.closest('.main-content') || document;
        parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        parent.querySelector(`#${target}`)?.classList.add('active');
      });
    });
  },

  /** Toggle switch helper */
  initToggles() {
    document.querySelectorAll('.toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
      });
    });
  }
};

if (typeof window !== 'undefined') {
  window.App = App;
}
