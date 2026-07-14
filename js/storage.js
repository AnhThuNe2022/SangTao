/**
 * Operation Hub - Local Storage Manager
 * Quản lý persistence qua localStorage cho demo
 */

const Storage = {
  KEYS: {
    AUTH: 'oh_auth',
    REPORTS: 'oh_reports',
    ACTIVITIES: 'oh_activities',
    NOTIFICATIONS: 'oh_notifications',
    WARNINGS: 'oh_warnings',
    CHAT_MESSAGES: 'oh_chat_messages',
    KPI: 'oh_kpi'
  },

  /** Lấy dữ liệu từ localStorage, fallback về default */
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  /** Lưu dữ liệu vào localStorage */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  /** Xóa key */
  remove(key) {
    localStorage.removeItem(key);
  },

  /** Khởi tạo dữ liệu mặc định nếu chưa có */
  init() {
    if (!this.get(this.KEYS.REPORTS)) {
      this.set(this.KEYS.REPORTS, []);
    }
    if (!this.get(this.KEYS.ACTIVITIES)) {
      this.set(this.KEYS.ACTIVITIES, MOCK_DATA.activities);
    }
    if (!this.get(this.KEYS.NOTIFICATIONS)) {
      this.set(this.KEYS.NOTIFICATIONS, MOCK_DATA.notifications);
    }
    if (!this.get(this.KEYS.WARNINGS)) {
      this.set(this.KEYS.WARNINGS, MOCK_DATA.warnings);
    }
    if (!this.get(this.KEYS.CHAT_MESSAGES)) {
      this.set(this.KEYS.CHAT_MESSAGES, MOCK_DATA.chatMessages);
    }
    if (!this.get(this.KEYS.KPI)) {
      this.set(this.KEYS.KPI, MOCK_DATA.kpi);
    }
  },

  /** Lấy KPI (có thể đã cập nhật) */
  getKPI() {
    return this.get(this.KEYS.KPI, MOCK_DATA.kpi);
  },

  /** Cập nhật KPI */
  updateKPI(updates) {
    const kpi = this.getKPI();
    Object.assign(kpi, updates);
    this.set(this.KEYS.KPI, kpi);
    return kpi;
  },

  /** Thêm báo cáo mới từ form */
  addReport(report, options = {}) {
    const reports = this.get(this.KEYS.REPORTS, []);
    const newReport = {
      id: 'r' + Date.now(),
      ...report,
      time: new Date().toISOString(),
      status: 'pending'
    };
    reports.unshift(newReport);
    this.set(this.KEYS.REPORTS, reports);

    // Cập nhật KPI
    const kpi = this.getKPI();
    kpi.dailyReports = (kpi.dailyReports || 0) + 1;
    this.set(this.KEYS.KPI, kpi);

    // Thêm activity
    this.addActivity({
      user: report.reporter || 'Trần Minh C',
      action: 'gửi báo cáo hiện trường',
      target: report.site || report.project,
      type: 'report'
    });

    // Thêm notification
    this.addNotification({
      title: 'Báo cáo hiện trường mới',
      desc: `${report.reporter || 'Kỹ sư'} gửi báo cáo từ ${report.site || report.project}`,
      severity: report.severity === 'critical' ? 'critical' : 'info'
    });

    // Thêm cảnh báo nếu mức độ cao
    if (report.severity === 'critical' || report.severity === 'high') {
      this.addWarning({
        title: report.description?.substring(0, 60) || 'Báo cáo mới',
        description: report.description,
        severity: report.severity,
        project: report.project,
        site: report.site,
        category: report.category || 'Hiện trường'
      });
    }
    const customText = `📋 **Báo cáo hiện trường ${newReport.id}**\n• Dự án: ${report.project}\n• Hạng mục: ${report.site}\n• Vị trí: ${report.location || 'Chưa cập nhật'}\n• Mức độ: ${App.severityLabel(report.severity)}\n• Mô tả: ${report.description}`;

    if (!options.skipChat) {
      this.addChatMessage('ch1', {
        id: newReport.id,
        user: report.reporter || 'Trần Minh C',
        avatar: report.avatar || 'TMC',
        text: customText,
        hasImage: report.hasImage || false
      });
    }

    return newReport;
  },

  /** Thêm hoạt động */
  addActivity(activity) {
    const activities = this.get(this.KEYS.ACTIVITIES, []);
    activities.unshift({
      id: 'a' + Date.now(),
      time: new Date().toISOString(),
      ...activity
    });
    this.set(this.KEYS.ACTIVITIES, activities.slice(0, 20));
  },

  /** Thêm notification */
  addNotification(notif) {
    const notifications = this.get(this.KEYS.NOTIFICATIONS, []);
    notifications.unshift({
      id: 'n' + Date.now(),
      time: new Date().toISOString(),
      read: false,
      ...notif
    });
    this.set(this.KEYS.NOTIFICATIONS, notifications);
  },

  /** Thêm cảnh báo */
  addWarning(warning) {
    const warnings = this.get(this.KEYS.WARNINGS, []);
    warnings.unshift({
      id: 'w' + Date.now(),
      time: new Date().toISOString(),
      status: 'open',
      ...warning
    });
    this.set(this.KEYS.WARNINGS, warnings);

    const kpi = this.getKPI();
    kpi.activeWarnings = (kpi.activeWarnings || 0) + 1;
    this.set(this.KEYS.KPI, kpi);
  },

  /** Thêm tin nhắn chat */
  addChatMessage(channelId, message) {
    const allMessages = this.get(this.KEYS.CHAT_MESSAGES, {});
    if (!allMessages[channelId]) allMessages[channelId] = [];
    allMessages[channelId].push({
      id: 'm' + Date.now(),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      ...message
    });
    this.set(this.KEYS.CHAT_MESSAGES, allMessages);
  },

  /** Đếm notification chưa đọc */
  getUnreadCount() {
    const notifications = this.get(this.KEYS.NOTIFICATIONS, []);
    return notifications.filter(n => !n.read).length;
  },

  /** Đánh dấu tất cả notification đã đọc */
  markAllRead() {
    const notifications = this.get(this.KEYS.NOTIFICATIONS, []);
    notifications.forEach(n => n.read = true);
    this.set(this.KEYS.NOTIFICATIONS, notifications);
  }
};
// const reportFirsts = {
//     id: "BC-20260713-001",
//     project: "Cù Mông Tunnel",
//     site: "Hầm Cù Mông",
//     category: "Hầm",
//     location: "Km 45+200",
//     description: "Vết nứt bê tông hầm Cù Mông",
//     severity: "high",
//     reporter: "Trần Minh C",
//     avatar: "TMC",
//     hasImage: true
// };
// if (!Storage.get(Storage.KEYS.REPORTS, [])
//     .some(r => r.id === reportFirsts.id)) {

//     Storage.addReport(reportFirsts, { skipChat: true });
// }
// // Khởi tạo khi load
if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
