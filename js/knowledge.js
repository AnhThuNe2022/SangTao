document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('knowledge', { pageTitle: 'Knowledge Base' });

  document.getElementById('knowledgeSearchIcon').innerHTML = Icons.search;
  renderKnowledgeTags();
  renderKnowledgeArticles();

  document.getElementById('knowledgeSearch')?.addEventListener('input', renderKnowledgeArticles);
  const query = App.getParam('q');
  if (query) {
    document.getElementById('knowledgeSearch').value = query;
    renderKnowledgeArticles();
  }
});

function renderKnowledgeTags() {
  const tags = ['Tất cả', 'Kỹ thuật', 'An toàn', 'Quản lý', 'Tiến độ', 'Sự cố'];
  const container = document.getElementById('knowledgeTags');
  container.innerHTML = tags.map((tag, index) => `<button class="knowledge-tag ${index === 0 ? 'active' : ''}" data-tag="${tag}">${tag}</button>`).join('');
  container.querySelectorAll('.knowledge-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      container.querySelectorAll('.knowledge-tag').forEach(item => item.classList.remove('active'));
      tag.classList.add('active');
      renderKnowledgeArticles();
    });
  });
}

function renderKnowledgeArticles() {
  const query = (document.getElementById('knowledgeSearch')?.value || '').toLowerCase();
  const activeTag = document.querySelector('.knowledge-tag.active')?.dataset.tag || 'Tất cả';
  const articles = MOCK_DATA.knowledgeArticles.filter(article => {
    const text = `${article.title} ${article.category} ${article.tags.join(' ')} ${article.excerpt}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);
    const matchesTag = activeTag === 'Tất cả' || article.category === activeTag || article.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  document.getElementById('knowledgeGrid').innerHTML = articles.map(article => `
    <article class="knowledge-card">
      <div class="knowledge-card-thumb">${article.emoji}</div>
      <div class="knowledge-card-body">
        <div class="knowledge-card-category">${article.category}</div>
        <h3 class="knowledge-card-title">${article.title}</h3>
        <p class="knowledge-card-excerpt">${article.excerpt}</p>
        <div class="knowledge-card-meta">
          <span>${article.views.toLocaleString('vi-VN')} lượt xem</span>
          <span>${App.formatDate(article.date)}</span>
        </div>
      </div>
    </article>
  `).join('');
}
