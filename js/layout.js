/**
 * Operation Hub - Layout Module
 * Render Sidebar, Header, và quản lý navigation
 */

const Layout = {
  /** Cấu hình menu navigation */
  navItems: [
    { section: 'Tổng quan' },
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'dashboard' },
    { id: 'projects', label: 'Quản lý Dự án', href: 'projects.html', icon: 'projects' },
    { id: 'construction-sites', label: 'Công trường', href: 'construction-sites.html', icon: 'sites' },
    { section: 'Vận hành' },
    { id: 'report', label: 'Báo cáo Hiện trường', href: 'report.html', icon: 'report' },
    { id: 'chat', label: 'Chat Nội bộ', href: 'chat.html', icon: 'chat', badge: true },
    { id: 'warning', label: 'Trung tâm Cảnh báo', href: 'warning.html', icon: 'warning', badge: true },
    { section: 'Tri thức & AI' },
    { id: 'knowledge', label: 'Knowledge Base', href: 'knowledge.html', icon: 'knowledge' },
    { id: 'assistant', label: 'AI Assistant', href: 'assistant.html', icon: 'assistant' },
    { section: 'Hệ thống' },
    { id: 'notifications', label: 'Thông báo', href: 'notifications.html', icon: 'notifications', badge: true },
    { id: 'technology', label: 'Kiến trúc Công nghệ', href: 'technology.html', icon: 'technology' },
    { id: 'roadmap', label: 'Roadmap', href: 'roadmap.html', icon: 'roadmap' },
    { id: 'settings', label: 'Cài đặt', href: 'settings.html', icon: 'settings' }
  ],

  /** Render toàn bộ layout (sidebar + topbar) */
  render(pageId, options = {}) {
    const user = Auth.getUser();
    if (!user) return;

    const theme = options.theme || 'dark';
    document.body.classList.add(`theme-${theme}`);

    // Render sidebar
    const sidebarEl = document.getElementById('sidebar');
    if (sidebarEl) {
      sidebarEl.innerHTML = this.renderSidebar(pageId, user);
    }

    // Render topbar
    const topbarEl = document.getElementById('topbar');
    if (topbarEl) {
      topbarEl.innerHTML = this.renderTopbar(options.pageTitle || '', user);
    }

    // Bind events
    this.bindEvents();
  },

  /** Render Sidebar HTML */
  renderSidebar(activePage, user) {
    const unreadNotifs = Storage.getUnreadCount();
    const warnings = Storage.get(Storage.KEYS.WARNINGS, MOCK_DATA.warnings);
    const openWarnings = warnings.filter(w => w.status === 'open').length;

    let navHTML = '';
    this.navItems.forEach(item => {
      if (item.section) {
        navHTML += `<div class="nav-section-title">${item.section}</div>`;
        return;
      }

      let badge = '';
      if (item.badge) {
        if (item.id === 'notifications') badge = unreadNotifs;
        else if (item.id === 'warning') badge = openWarnings;
        else if (item.id === 'chat') badge = 3;
      }

      navHTML += `
        <a href="${item.href}" class="nav-item ${item.id === activePage ? 'active' : ''}">
          ${Icons[item.icon] || ''}
          <span>${item.label}</span>
          ${badge ? `<span class="nav-badge">${badge}</span>` : ''}
        </a>`;
    });

    return `
      <div class="sidebar-header">
        <div class="sidebar-logo">${Icons.logo}</div>
        <div class="sidebar-brand">
          <div class="sidebar-brand-name">Operation Hub</div>
          <div class="sidebar-brand-sub">Đèo Cả Group</div>
        </div>
      </div>
      <nav class="sidebar-nav">${navHTML}</nav>
      <div class="sidebar-footer">
        <div class="sidebar-user" onclick="Auth.logout()">
          <div class="sidebar-user-avatar">${user.avatar}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user.name}</div>
            <div class="sidebar-user-role">${user.role}</div>
          </div>
        </div>
      </div>`;
  },

  /** Render Topbar HTML */
  renderTopbar(pageTitle, user) {
    const unreadNotifs = Storage.getUnreadCount();

    return `
      <button class="topbar-menu-btn" id="menuToggle" aria-label="Menu">${Icons.menu}</button>
      ${pageTitle ? `<div class="topbar-page-title">${pageTitle}</div>` : ''}
      <div class="topbar-search">
        ${Icons.search}
        <input type="text" placeholder="Tìm kiếm dự án, cảnh báo, báo cáo..." id="globalSearch">
      </div>
      <div class="topbar-actions">
        <a href="notifications.html" class="topbar-action" title="Thông báo">
          ${Icons.notifications}
          ${unreadNotifs > 0 ? `<span class="notification-count">${unreadNotifs}</span>` : ''}
        </a>
        <a href="settings.html" class="topbar-action" title="Cài đặt">
          ${Icons.settings}
        </a>
        <div class="sidebar-user-avatar" style="width:32px;height:32px;font-size:0.6875rem;cursor:pointer" title="${user.name}">${user.avatar}</div>
      </div>`;
  },

  /** Bind sidebar toggle và overlay */
  bindEvents() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay?.classList.toggle('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar?.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    // Global search
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
          window.location.href = `knowledge.html?q=${encodeURIComponent(searchInput.value.trim())}`;
        }
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.Layout = Layout;
}
