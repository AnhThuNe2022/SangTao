/**
 * Operation Hub - Chat Page Logic (Teams-style)
 */

let currentChannel = 'ch1';

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('chat', { pageTitle: 'Chat Nội bộ' });

  renderChannels();
  renderMessages(currentChannel);
  bindChatEvents();
});

function renderChannels() {
  const container = document.getElementById('chatChannels');
  if (!container) return;

  let html = '<div class="chat-section-label">Kênh</div>';
  html += MOCK_DATA.chatChannels.map(ch => `
    <div class="chat-channel ${ch.id === currentChannel ? 'active' : ''}" data-channel="${ch.id}" data-name="${ch.displayName}">
      <span class="chat-channel-icon">#</span>
      <span>${ch.displayName}</span>
      ${ch.unread ? `<span class="chat-channel-unread">${ch.unread}</span>` : ''}
    </div>`).join('');

  html += '<div class="chat-section-label">Tin nhắn trực tiếp</div>';
  html += MOCK_DATA.chatDMs.map(dm => `
    <div class="chat-dm" data-dm="${dm.id}">
      <div class="chat-dm-avatar-wrap">
        <div class="avatar" style="background:${dm.isBot ? 'linear-gradient(135deg,#667eea,#764ba2)' : App.avatarColor(dm.name)}">${dm.avatar}</div>
        <div class="chat-dm-status ${dm.status}"></div>
      </div>
      <span>${dm.name}</span>
    </div>`).join('');

  container.innerHTML = html;

  container.querySelectorAll('.chat-channel').forEach(el => {
    el.addEventListener('click', () => {
      currentChannel = el.dataset.channel;
      document.getElementById('chatChannelName').textContent = '# ' + el.dataset.name;
      container.querySelectorAll('.chat-channel').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      el.querySelector('.chat-channel-unread')?.remove();
      renderMessages(currentChannel);
    });
  });
}

function renderMessages(channelId) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const allMessages = Storage.get(Storage.KEYS.CHAT_MESSAGES, MOCK_DATA.chatMessages);
  const messages = allMessages[channelId] || allMessages['ch1'] || [];

  container.innerHTML = messages.map(msg => {
    const isBot = msg.isBot || msg.user === 'AI Assistant';
    const isOwn = msg.user === (Auth.getUser()?.name);

    return `
      <div class="chat-message ${isOwn ? 'own' : ''} ${isBot ? 'bot' : ''}">
        <div class="chat-message-avatar" style="background:${isBot ? 'linear-gradient(135deg,#667eea,#764ba2)' : App.avatarColor(msg.user)}">${msg.avatar}</div>
        <div class="chat-message-content">
          <div class="chat-message-header">
            <span class="chat-message-name">${msg.user}${isBot ? ' 🤖' : ''}</span>
            <span class="chat-message-time">${msg.time}</span>
          </div>
          <div class="chat-message-bubble">${formatMessage(msg.text)}</div>
          ${msg.hasImage ? `<div class="chat-message-image"><div style="width:280px;height:160px;background:linear-gradient(135deg,#334,#556);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);font-size:0.8125rem">📷 ${msg.imageDesc || 'Ảnh hiện trường'}</div></div>` : ''}
          ${msg.hasFile ? `<div class="chat-message-file">${Icons.file} ${msg.fileName || 'Tài liệu đính kèm'}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function bindChatEvents() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const user = Auth.getUser();
    Storage.addChatMessage(currentChannel, {
      user: user.name,
      avatar: user.avatar,
      text: text
    });

    input.value = '';
    renderMessages(currentChannel);

    // AI auto-reply if mentions concrete/technical keywords
    if (/nứt|bê tông|an toàn|sụt|hầm/i.test(text)) {
      setTimeout(() => {
        Storage.addChatMessage(currentChannel, {
          user: 'AI Assistant',
          avatar: '🤖',
          text: '🤖 Tôi đã nhận được câu hỏi của bạn. Hãy truy cập **AI Assistant** để được tư vấn chi tiết, hoặc xem **Knowledge Base** để tra cứu tài liệu liên quan.',
          isBot: true
        });
        renderMessages(currentChannel);
      }, 1500);
    }
  }

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Attach file
  document.getElementById('attachImage')?.addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });
  document.getElementById('attachFile')?.addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const user = Auth.getUser();
    const isImage = file.type.startsWith('image/');

    Storage.addChatMessage(currentChannel, {
      user: user.name,
      avatar: user.avatar,
      text: `📎 Đính kèm: ${file.name}`,
      hasImage: isImage,
      hasFile: !isImage,
      fileName: file.name,
      imageDesc: isImage ? file.name : undefined
    });
    renderMessages(currentChannel);
    App.toast('Đã gửi file thành công', 'success');
    e.target.value = '';
  });

  // Toggle info panel on mobile
  document.getElementById('toggleInfo')?.addEventListener('click', () => {
    document.getElementById('chatInfoPanel')?.classList.toggle('mobile-open');
  });
}
