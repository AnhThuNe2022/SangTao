/**
 * Operation Hub - Dashboard Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('dashboard', { pageTitle: '' });

  populateProjectFilter();
  bindDashboardFilters();
  renderKPI();
  renderMap();
  renderProgressOverview();
  renderWarnings();
  renderImportantProjects();
  renderActivities();
  renderLiveSites();

  setInterval(() => {
    renderKPI();
    renderWarnings();
    renderActivities();
  }, 30000);
});

function populateProjectFilter() {
  const select = document.getElementById('dashboardProjectFilter');
  if (!select) return;
  select.innerHTML += MOCK_DATA.projects
    .map(project => `<option value="${project.id}">${project.name}</option>`)
    .join('');
}

function getSelectedProjects() {
  const selected = document.getElementById('dashboardProjectFilter')?.value || 'all';
  if (selected === 'all') return MOCK_DATA.projects;
  return MOCK_DATA.projects.filter(project => project.id === selected);
}

function bindDashboardFilters() {
  document.getElementById('dashboardProjectFilter')?.addEventListener('change', () => {
    renderKPI();
    renderMap();
    renderProgressOverview();
    renderWarnings();
    renderImportantProjects();
    renderActivities();
    renderLiveSites();
  });
}

function renderKPI() {
  const kpi = Storage.getKPI();
  const projects = getSelectedProjects();
  const projectNames = projects.map(project => project.name);
  const warnings = Storage.get(Storage.KEYS.WARNINGS, MOCK_DATA.warnings)
    .filter(warning => projectNames.includes(warning.project));
  const grid = document.getElementById('kpiGrid');
  if (!grid) return;

  const criticalWarnings = warnings.filter(warning => warning.severity === 'critical').length;
  const avgProgress = projects.length
    ? projects.reduce((sum, project) => sum + Number(project.progress || 0), 0) / projects.length
    : Number(kpi.avgProgress || 0);
  const totalWorkers = projects.reduce((sum, project) => sum + (project.workers || 0), 0);
  const activeProjects = projects.filter(project => project.status === 'active').length;

  const items = [
    { label: 'Tổng số dự án', value: projects.length || activeProjects, icon: 'projects', color: 'blue', trend: '2 dự án so với tuần trước', direction: 'up', series: [8, 9, 8, 13, 24, 15, 22, 13, 10, 16, 15, 27, 18, 26, 21, 29] },
    { label: 'Tiến độ trung bình', value: avgProgress.toFixed(1) + '%', icon: 'roadmap', color: 'green', trend: '5.2% so với tuần trước', direction: 'up', series: [58, 61, 60, 60, 72, 68, 65, 76, 61, 64, 59, 63, 79, 70, 81, 77, 86] },
    { label: 'Cảnh báo đang mở', value: warnings.filter(w => w.status === 'open').length, icon: 'notifications', color: 'orange', trend: '3 cảnh báo so với tuần trước', direction: 'down', series: [5, 7, 6, 8, 7, 16, 15, 12, 18, 19, 13, 15, 24, 18, 25, 20, 27] },
    { label: 'Sự cố nghiêm trọng', value: String(criticalWarnings).padStart(2, '0'), icon: 'warning', color: 'red', trend: '1 sự cố so với tuần trước', direction: 'down', series: [2, 3, 2, 2, 7, 5, 4, 9, 2, 5, 4, 11, 12, 5, 13, 8, 14] },
    { label: 'Công nhân hiện tại', value: totalWorkers.toLocaleString('vi-VN'), icon: 'chat', color: 'cyan', trend: '120 người so với tuần trước', direction: 'up', series: [18, 19, 21, 20, 26, 41, 36, 25, 23, 34, 22, 30, 29, 45, 31, 38, 43] },
    { label: 'Chi phí đã giải ngân', value: '68.7%', icon: 'technology', color: 'purple', trend: '4.3% so với kế hoạch', direction: 'up', series: [20, 21, 20, 39, 35, 26, 31, 37, 22, 24, 28, 26, 32, 38, 31, 40] }
  ];

  grid.innerHTML = items.map(item => `
    <article class="dashboard-kpi ${item.color}">
      <div class="dashboard-kpi-top">
        <div class="dashboard-kpi-icon">${Icons[item.icon] || Icons.dashboard}</div>
        <span>${item.label}</span>
      </div>
      <strong>${item.value}</strong>
      <div class="dashboard-kpi-trend ${item.direction}">
        <span>${item.direction === 'up' ? '↑' : '↓'}</span>
        ${item.trend}
      </div>
      ${renderSparkline(item.series)}
    </article>
  `).join('');
}

function renderSparkline(values) {
  const width = 160;
  const height = 38;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / Math.max(max - min, 1)) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return `<svg class="dashboard-sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><polyline points="${points}" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="${points} ${width},${height} 0,${height}" fill="currentColor" opacity="0.08"/></svg>`;
}

function renderMap() {
  Charts.renderMap('projectMap', getSelectedProjects());
}

function renderProgressOverview() {
  const donut = document.getElementById('progressDonut');
  const legend = document.getElementById('progressLegend');
  const weekly = document.getElementById('weeklyProgressChart');
  if (!donut || !legend || !weekly) return;

  const projects = getSelectedProjects();
  const completed = projects.filter(project => project.progress >= 100).length;
  const active = projects.filter(project => project.progress < 100 && project.progress >= 60).length;
  const delayed = projects.filter(project => project.progress < 60 && project.progress >= 30).length;
  const paused = projects.filter(project => project.progress < 30).length;
  const avg = projects.length
    ? (projects.reduce((sum, project) => sum + Number(project.progress || 0), 0) / projects.length).toFixed(1)
    : (Storage.getKPI().avgProgress || 0);

  donut.innerHTML = `
    <svg viewBox="0 0 160 160">
      <circle class="donut-track" cx="80" cy="80" r="56"></circle>
      <circle class="donut-ring green" cx="80" cy="80" r="56" stroke-dasharray="101 352" stroke-dashoffset="0"></circle>
      <circle class="donut-ring blue" cx="80" cy="80" r="56" stroke-dasharray="224 352" stroke-dashoffset="-104"></circle>
      <circle class="donut-ring orange" cx="80" cy="80" r="56" stroke-dasharray="38 352" stroke-dashoffset="-331"></circle>
      <text x="80" y="76" text-anchor="middle">${avg}%</text>
    </svg>
    <div class="donut-center-label">Tiến độ trung bình</div>`;

  const rows = [
    ['green', 'Hoàn thành', completed, '28.6%'],
    ['blue', 'Đang thi công', active, '53.6%'],
    ['orange', 'Chậm tiến độ', delayed, '10.7%'],
    ['gray', 'Tạm dừng', paused, '7.1%']
  ];
  legend.innerHTML = rows.map(row => `
    <div class="progress-legend-row">
      <span class="legend-dot ${row[0]}"></span>
      <div><strong>${row[1]}</strong><span>${row[2]} dự án (${row[3]})</span></div>
    </div>
  `).join('');

  const weeklyValues = [68, 71, 69, 72, 74, 74, 74.6];
  weekly.innerHTML = renderWeeklyLine(weeklyValues, ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']);
}

function renderWeeklyLine(values, labels) {
  const width = 430;
  const height = 110;
  const points = values.map((value, index) => {
    const x = 26 + (index / (values.length - 1)) * (width - 52);
    const y = height - 20 - ((value - 50) / 50) * 70;
    return { x, y, value, label: labels[index] };
  });
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');

  return `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <line x1="20" y1="86" x2="${width - 14}" y2="86" stroke="rgba(255,255,255,.12)"/>
      <line x1="20" y1="26" x2="${width - 14}" y2="26" stroke="rgba(255,255,255,.08)"/>
      <path d="${path}" fill="none" stroke="#28a8ff" stroke-width="3"/>
      ${points.map(point => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#28a8ff"/><text x="${point.x}" y="${point.y - 10}" text-anchor="middle">${point.value}%</text><text x="${point.x}" y="104" text-anchor="middle">${point.label}</text>`).join('')}
      <text x="4" y="29">100%</text>
      <text x="8" y="88">50%</text>
      <text x="14" y="108">0%</text>
    </svg>`;
}

function renderWarnings() {
  const container = document.getElementById('recentWarnings');
  if (!container) return;

  const projectNames = getSelectedProjects().map(project => project.name);
  const warnings = Storage.get(Storage.KEYS.WARNINGS, MOCK_DATA.warnings)
    .filter(warning => projectNames.includes(warning.project))
    .slice(0, 5);
  const iconMap = { critical: '⛔', high: '⚠', medium: '⚠', low: 'ℹ' };

  container.innerHTML = warnings.map(warning => `
    <button class="dashboard-alert severity-${warning.severity}" onclick="window.location.href='warning.html'">
      <span class="dashboard-alert-icon">${iconMap[warning.severity] || '⚠'}</span>
      <span>
        <strong>${warning.title}</strong>
        <small>Dự án ${warning.project} - ${warning.site}</small>
      </span>
      <time>${App.timeAgo(warning.time)}</time>
    </button>
  `).join('');
}

function renderImportantProjects() {
  const container = document.getElementById('importantProjects');
  if (!container) return;

  const selectedProjects = getSelectedProjects();
  const projects = (selectedProjects.filter(project => project.status === 'active').length
    ? selectedProjects.filter(project => project.status === 'active')
    : selectedProjects).slice(0, 5);
  container.innerHTML = `
    <div class="project-row project-head"><span>Dự án</span><span>Tiến độ</span><span>Kế hoạch</span><span>Trạng thái</span></div>
    ${projects.map(project => {
      const plan = Math.min(100, Math.round(project.progress + (project.risk === 'high' ? 15 : 8)));
      const delayed = project.progress + 8 < plan;
      const color = delayed ? 'orange' : 'green';
      return `
        <div class="project-row">
          <span>${shortProjectName(project.name)}</span>
          <span class="table-progress ${color}"><strong>${project.progress}%</strong><i><b style="width:${project.progress}%"></b></i></span>
          <span>${plan}%</span>
          <span><em class="${delayed ? 'delayed' : 'active'}">${delayed ? 'Chậm tiến độ' : 'Đang thi công'}</em></span>
        </div>`;
    }).join('')}
  `;
}

function shortProjectName(name) {
  return name.replace('Cao tốc ', '').replace('Phía Đông', 'giai đoạn 1');
}

function renderActivities() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;

  const activities = Storage.get(Storage.KEYS.ACTIVITIES, MOCK_DATA.activities).slice(0, 5);
  const iconMap = { report: '👷', ai: '◇', update: '↗', approve: '✓', warning: '⚠', upload: '▣', complete: '✓' };

  feed.innerHTML = activities.map(activity => `
    <div class="dashboard-activity">
      <span class="dashboard-activity-icon ${activity.type}">${iconMap[activity.type] || '•'}</span>
      <span>
        <strong>${activity.action}</strong>
        <small>${activity.user} - ${activity.target}</small>
      </span>
      <time>${App.timeAgo(activity.time)}</time>
    </div>
  `).join('');
}

function renderLiveSites() {
  const container = document.getElementById('liveSites');
  if (!container) return;

  const sites = [
    ['Cao tốc Cam Lâm - Vĩnh Hảo', 'assets/live/cam-lam-vinh-hao.jpg'],
    ['Hầm số 2 - Hữu Nghị - Chi Lăng', 'assets/live/ham-so-2.jpg'],
    ['HẦM ĐÈO CÙ MÔNG', 'assets/live/cu-mong.jpg'],
    ['CAO TỐC BẮC GIANG - LẠNG SƠN', 'assets/live/bg-ls.jpg']
  ];

  container.innerHTML = sites.map(site => `
    <figure class="live-card">
      <img src="${site[1]}" alt="${site[0]}">
      <figcaption><span>${site[0]}</span><strong>LIVE</strong></figcaption>
    </figure>
  `).join('');
}
