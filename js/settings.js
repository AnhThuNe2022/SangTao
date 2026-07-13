document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('settings', { pageTitle: 'Cài đặt' });

  const user = Auth.getUser();
  document.getElementById('settingsName').textContent = user.name;
  document.getElementById('settingsRole').textContent = user.role;
  document.getElementById('settingsDepartment').textContent = user.department;

  App.initToggles();
  document.getElementById('resetDemoData')?.addEventListener('click', () => {
    Storage.set(Storage.KEYS.REPORTS, []);
    Storage.set(Storage.KEYS.ACTIVITIES, MOCK_DATA.activities);
    Storage.set(Storage.KEYS.NOTIFICATIONS, MOCK_DATA.notifications);
    Storage.set(Storage.KEYS.WARNINGS, MOCK_DATA.warnings);
    Storage.set(Storage.KEYS.CHAT_MESSAGES, MOCK_DATA.chatMessages);
    Storage.set(Storage.KEYS.KPI, MOCK_DATA.kpi);
    App.toast('Đã khởi tạo lại dữ liệu demo', 'success');
  });
});
