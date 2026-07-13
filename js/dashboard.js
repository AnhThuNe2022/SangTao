/**
 * Operation Hub - Dashboard Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('dashboard', { pageTitle: 'Dashboard Lãnh đạo' });

  renderKPI();
  renderProgress();
  renderWarnings();
  renderActivities();
  renderCharts();
  renderMap();

  // Auto refresh every 30s
  setInterval(() => {
    renderKPI();
    renderActivities();
  }, 30000);
});

function renderKPI() {
  const kpi = Storage.getKPI();
  const grid = document.getElementById('kpiGrid');
  if (!grid) return;

  const items = [
    { label: 'Dự án', value: kpi.totalProjects, icon: 'projects', color: 'blue', trend: '+2', up: true },
    { label: 'Hạng mục', value: kpi.totalItems, icon: 'sites', color: 'purple', trend: '+8', up: true },
    { label: 'Tiến độ TB', value: kpi.avgProgress + '%', icon: 'roadmap', color: 'green', trend: '+1.2%', up: true },
    { label: 'Cảnh báo', value: kpi.activeWarnings, icon: 'warning', color: 'red', trend: '+3', up: false },
    { label: 'Nhân sự Online', value: kpi.onlineStaff, icon: 'chat', color: 'orange', trend: '', up: true },
    { label: 'Báo cáo Hôm nay', value: kpi.dailyReports, icon: 'report', color: 'blue', trend: '+5', up: true }
  ];

  grid.innerHTML = items.map(item => `
    <div class="kpi-card">
      <div class="kpi-card-header">
        <div class="kpi-icon ${item.color}">${Icons[item.icon] || '📊'}</div>
        ${item.trend ? `<div class="kpi-trend ${item.up ? 'up' : 'down'}">${item.up ? '↑' : '↓'} ${item.trend}</div>` : ''}
      </div>
      <div class="kpi-value">${item.value}</div>
      <div class="kpi-label">${item.label}</div>
    </div>`).join('');
}

function renderProgress() {
  const list = document.getElementById('progressList');
  if (!list) return;

  const projects = MOCK_DATA.projects.filter(p => p.status === 'active').slice(0, 5);

  list.innerHTML = projects.map(p => {
    const color = p.progress >= 80 ? 'green' : p.progress >= 50 ? 'blue' : 'orange';
    return `
      <div class="progress-item">
        <div class="progress-item-header">
          <span class="progress-item-name">${p.name}</span>
          <span class="progress-item-value">${p.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${color}" style="width:${p.progress}%"></div>
        </div>
      </div>`;
  }).join('');
}

function renderWarnings() {
  const container = document.getElementById('recentWarnings');
  if (!container) return;

  const warnings = Storage.get(Storage.KEYS.WARNINGS, MOCK_DATA.warnings).slice(0, 4);

  container.innerHTML = warnings.map(w => `
    <div class="warning-item severity-${w.severity}" onclick="window.location.href='warning.html'">
      <div class="warning-icon ${w.severity}">${Icons.warning}</div>
      <div class="warning-content">
        <div class="warning-title">${w.title}</div>
        <div class="warning-meta">${w.site} · ${App.timeAgo(w.time)}</div>
      </div>
    </div>`).join('');
}

function renderActivities() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;

  const activities = Storage.get(Storage.KEYS.ACTIVITIES, MOCK_DATA.activities).slice(0, 6);
  const dotColors = { report: 'blue', ai: 'purple', update: 'green', approve: 'green', warning: 'red', upload: 'blue', complete: 'green' };

  feed.innerHTML = `<div class="activity-list">${activities.map(a => `
    <div class="activity-item">
      <div class="activity-dot ${dotColors[a.type] || 'blue'}"></div>
      <div class="activity-content">
        <div class="activity-text"><strong>${a.user}</strong> ${a.action} <strong>${a.target}</strong></div>
        <div class="activity-time">${App.timeAgo(a.time)}</div>
      </div>
    </div>`).join('')}</div>`;
}

function renderCharts() {
  Charts.renderLineChart('dailyChart', MOCK_DATA.dailyReportsChart);
  Charts.renderDonutChart('warningChart', MOCK_DATA.warningStats);
}

function renderMap() {
  Charts.renderMap('projectMap', MOCK_DATA.projects);
}
