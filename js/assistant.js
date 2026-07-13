let assistantMessages = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('assistant', { pageTitle: 'AI Assistant' });

  renderAssistantWelcome();
  bindAssistantEvents();
});

function renderAssistantWelcome() {
  const container = document.getElementById('assistantMessages');
  container.innerHTML = `
    <div class="assistant-welcome">
      <div class="assistant-welcome-icon">🤖</div>
      <h2>AI Assistant</h2>
      <p>Hỏi nhanh về kỹ thuật, cảnh báo, quy trình và tri thức công trường.</p>
      <div class="assistant-suggestions">
        <button class="assistant-suggestion">Vết nứt bê tông hầm có nguy hiểm không?</button>
        <button class="assistant-suggestion">Quy trình báo cáo sự cố an toàn lao động</button>
        <button class="assistant-suggestion">Đề xuất xử lý chậm tiến độ do mưa</button>
        <button class="assistant-suggestion">Tra cứu bài học kinh nghiệm về sụt lún</button>
      </div>
    </div>`;

  container.querySelectorAll('.assistant-suggestion').forEach(btn => {
    btn.addEventListener('click', () => askAssistant(btn.textContent));
  });
}

function bindAssistantEvents() {
  document.getElementById('assistantSend')?.addEventListener('click', () => {
    const input = document.getElementById('assistantInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    askAssistant(text);
  });

  document.getElementById('assistantInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('assistantSend').click();
    }
  });

  document.getElementById('newAssistantChat')?.addEventListener('click', () => {
    assistantMessages = [];
    renderAssistantWelcome();
  });
}

function askAssistant(text) {
  assistantMessages.push({ role: 'user', text });
  renderAssistantMessages(true);
  setTimeout(() => {
    const key = Object.keys(MOCK_DATA.aiResponses).find(item => text.toLowerCase().includes(item));
    const response = MOCK_DATA.aiResponses[key || 'default'];
    assistantMessages.push({ role: 'ai', title: response.title, html: response.content });
    renderAssistantMessages(false);
  }, 500);
}

function renderAssistantMessages(isTyping) {
  const user = Auth.getUser();
  const container = document.getElementById('assistantMessages');
  container.innerHTML = assistantMessages.map(msg => {
    if (msg.role === 'user') {
      return `<div class="assistant-msg user"><div class="assistant-msg-avatar user">${user.avatar}</div><div class="assistant-msg-content">${msg.text}</div></div>`;
    }
    return `<div class="assistant-msg ai"><div class="assistant-msg-avatar ai">🤖</div><div class="assistant-msg-content"><strong>${msg.title}</strong>${msg.html}</div></div>`;
  }).join('') + (isTyping ? '<div class="assistant-msg ai"><div class="assistant-msg-avatar ai">🤖</div><div class="assistant-msg-content assistant-typing"><span></span><span></span><span></span></div></div>' : '');
  container.scrollTop = container.scrollHeight;
}
