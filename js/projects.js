/**
 * Operation Hub - Projects Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('projects', { pageTitle: 'Quản lý Dự án' });

  const projectId = App.getParam('id');
  if (projectId) {
    showProjectDetail(projectId);
  } else {
    renderProjectList();
  }

  document.getElementById('filterStatus')?.addEventListener('change', renderProjectList);
  document.getElementById('filterRisk')?.addEventListener('change', renderProjectList);
  document.getElementById('backToList')?.addEventListener('click', () => {
    window.location.href = 'projects.html';
  });

  App.initTabs('#detailTabs');
});

function renderProjectList() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  const statusFilter = document.getElementById('filterStatus')?.value || 'all';
  const riskFilter = document.getElementById('filterRisk')?.value || 'all';

  let projects = [...MOCK_DATA.projects];
  if (statusFilter !== 'all') projects = projects.filter(p => p.status === statusFilter);
  if (riskFilter !== 'all') projects = projects.filter(p => p.risk === riskFilter);

  grid.innerHTML = projects.map(p => {
    const riskBadge = App.severityBadge(p.risk === 'high' ? 'critical' : p.risk === 'medium' ? 'medium' : 'low');
    const progressColor = p.progress >= 80 ? 'green' : p.progress >= 50 ? 'blue' : 'orange';

    return `
      <div class="project-card" onclick="window.location.href='projects.html?id=${p.id}'">
        <div class="project-card-header">
          <div>
            <div class="project-card-title">${p.name}</div>
            <div class="project-card-location">📍 ${p.location}</div>
          </div>
          <span class="badge ${riskBadge}">${App.riskLabel(p.risk)}</span>
        </div>
        <div class="progress-item" style="margin:0">
          <div class="progress-item-header">
            <span class="progress-item-name">Tiến độ</span>
            <span class="progress-item-value">${p.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${progressColor}" style="width:${p.progress}%"></div>
          </div>
        </div>
        <div class="project-card-stats">
          <div class="project-stat">
            <div class="project-stat-value">${p.workers}</div>
            <div class="project-stat-label">Công nhân</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">${p.items.length}</div>
            <div class="project-stat-label">Hạng mục</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">${p.incidents}</div>
            <div class="project-stat-label">Sự cố</div>
          </div>
        </div>
        <div class="project-card-footer">
          <div class="project-leader">
            <div class="avatar avatar-sm" style="background:${App.avatarColor(p.leader)}">${p.leaderAvatar}</div>
            ${p.leader}
          </div>
          <button class="btn btn-sm btn-primary">Xem chi tiết</button>
        </div>
      </div>`;
  }).join('');
}

function showProjectDetail(id) {
  const project = MOCK_DATA.projects.find(p => p.id === id);
  if (!project) {
    window.location.href = 'projects.html';
    return;
  }

  document.getElementById('projectListView').style.display = 'none';
  document.getElementById('projectDetailView').style.display = 'block';

  document.getElementById('detailTitle').textContent = project.name;
  document.getElementById('detailLocation').textContent = `📍 ${project.location} · ${project.description}`;
  document.getElementById('detailRisk').className = `badge ${App.severityBadge(project.risk === 'high' ? 'critical' : project.risk === 'medium' ? 'medium' : 'low')}`;
  document.getElementById('detailRisk').textContent = `Rủi ro: ${App.riskLabel(project.risk)}`;

  // KPI
  document.getElementById('detailKPI').innerHTML = `
    <div class="kpi-card"><div class="kpi-value">${project.progress}%</div><div class="kpi-label">Tiến độ</div></div>
    <div class="kpi-card"><div class="kpi-value">${project.workers}</div><div class="kpi-label">Công nhân</div></div>
    <div class="kpi-card"><div class="kpi-value">${project.items.length}</div><div class="kpi-label">Hạng mục</div></div>
    <div class="kpi-card"><div class="kpi-value">${project.incidents}</div><div class="kpi-label">Sự cố</div></div>`;

  // Progress tab
  document.getElementById('detailProgress').innerHTML = project.items.map(item => {
    const color = item.progress >= 80 ? 'green' : item.progress >= 50 ? 'blue' : 'orange';
    return `
      <div class="progress-item">
        <div class="progress-item-header">
          <span class="progress-item-name">${item.name}</span>
          <span class="progress-item-value">${item.progress}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill ${color}" style="width:${item.progress}%"></div></div>
      </div>`;
  }).join('');

  // Chart tab
  setTimeout(() => {
    Charts.renderBarChart('detailChart', project.items.map(i => ({ label: i.name.substring(0, 12), value: i.progress })));
  }, 100);

  // Log tab
  document.getElementById('detailLog').innerHTML = `
    <div class="timeline-item completed"><div class="timeline-date">${App.formatDate(project.startDate)}</div><div class="timeline-title">Khởi công dự án</div><div class="timeline-desc">Bắt đầu thi công ${project.name}</div></div>
    <div class="timeline-item completed"><div class="timeline-date">2025-06-15</div><div class="timeline-title">Hoàn thành 50% hạng mục</div><div class="timeline-desc">Đạt mốc tiến độ giữa kỳ</div></div>
    <div class="timeline-item current"><div class="timeline-date">2026-07-01</div><div class="timeline-title">Tiến độ hiện tại: ${project.progress}%</div><div class="timeline-desc">Đang thi công các hạng mục chính</div></div>
    <div class="timeline-item"><div class="timeline-date">${App.formatDate(project.endDate)}</div><div class="timeline-title">Dự kiến hoàn thành</div><div class="timeline-desc">Ngân sách: ${project.budget}</div></div>`;

  // Incidents
  const warnings = Storage.get(Storage.KEYS.WARNINGS, []).filter(w => w.project === project.name);
  document.getElementById('detailIncidents').innerHTML = warnings.length ? warnings.map(w => `
    <div class="warning-item severity-${w.severity}">
      <div class="warning-icon ${w.severity}">${Icons.warning}</div>
      <div class="warning-content">
        <div class="warning-title">${w.title}</div>
        <div class="warning-desc">${w.description}</div>
        <div class="warning-meta">${App.timeAgo(w.time)} · ${w.category}</div>
      </div>
    </div>`).join('') : '<div class="empty-state"><p>Không có sự cố nào</p></div>';

  // Chat preview
  document.getElementById('detailChat').innerHTML = `
    <p style="margin-bottom:16px;color:var(--text-muted-dark)">Tin nhắn gần đây liên quan đến dự án:</p>
    <div class="activity-list">
      <div class="activity-item"><div class="activity-dot blue"></div><div class="activity-content"><div class="activity-text"><strong>Trần Minh C</strong> báo cáo tiến độ ${project.items[0]?.name}</div><div class="activity-time">2 giờ trước</div></div></div>
      <div class="activity-item"><div class="activity-dot green"></div><div class="activity-content"><div class="activity-text"><strong>${project.leader}</strong> phê duyệt báo cáo tuần</div><div class="activity-time">1 ngày trước</div></div></div>
    </div>
    <a href="chat.html" class="btn btn-primary btn-sm" style="margin-top:16px">Mở Chat →</a>`;

  // Knowledge
  const articles = MOCK_DATA.knowledgeArticles.slice(0, 3);
  document.getElementById('detailKnowledge').innerHTML = articles.map(a => `
    <div style="display:flex;gap:12px;padding:12px 0;border-bottom:var(--glass-border)">
      <span style="font-size:1.5rem">${a.emoji}</span>
      <div><div style="font-weight:600;font-size:0.875rem">${a.title}</div><div style="font-size:0.75rem;color:var(--text-muted-dark)">${a.views} lượt xem</div></div>
    </div>`).join('') + `<a href="knowledge.html" class="btn btn-primary btn-sm" style="margin-top:16px">Xem Knowledge Base →</a>`;
}
