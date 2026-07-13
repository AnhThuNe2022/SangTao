/**
 * Operation Hub - Authentication Module
 */

const Auth = {
  /** Kiểm tra đã đăng nhập chưa */
  isLoggedIn() {
    return !!Storage.get(Storage.KEYS.AUTH);
  },

  /** Lấy thông tin user hiện tại */
  getUser() {
    return Storage.get(Storage.KEYS.AUTH);
  },

  /** Đăng nhập */
  login(username, password) {
    const user = MOCK_DATA.users.find(
      u => u.username === username && u.password === password
    );
    if (user) {
      const { password: _, ...safeUser } = user;
      Storage.set(Storage.KEYS.AUTH, safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
  },

  /** Đăng xuất */
  logout() {
    Storage.remove(Storage.KEYS.AUTH);
    window.location.href = 'login.html';
  },

  /** Bảo vệ trang - redirect nếu chưa login */
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  /** Redirect nếu đã login (cho trang login) */
  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = 'dashboard.html';
    }
  }
};

if (typeof window !== 'undefined') {
  window.Auth = Auth;
}
