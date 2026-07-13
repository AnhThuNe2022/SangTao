document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('roadmap', { pageTitle: 'Roadmap' });
  renderRoadmap();
});

function renderRoadmap() {
  document.getElementById('roadmapContainer').innerHTML = MOCK_DATA.roadmap.map((phase, index) => `
    <div class="roadmap-phase">
      <div class="roadmap-marker ${phase.status}">${index + 1}</div>
      <div class="roadmap-card">
        <div class="roadmap-card-header">
          <div>
            <div class="text-muted">${phase.phase}</div>
            <div class="roadmap-card-title">${phase.title}</div>
          </div>
          <div class="roadmap-card-date">${phase.date}</div>
        </div>
        <div class="roadmap-card-desc">${phase.desc}</div>
        <div class="roadmap-tasks">
          ${phase.tasks.map(task => `<span class="roadmap-task ${phase.status === 'done' ? 'done' : ''}">${task}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}
