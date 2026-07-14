/**
 * Operation Hub - Mock Data Store
 * Toàn bộ dữ liệu mẫu cho hệ thống demo
 */

const reportFirst = {
    id: "BC-20260713-001",
    project: "Cù Mông Tunnel",
    site: "Hầm Cù Mông",
    category: "Hầm",
    location: "Km 45+200",
    description: "Vết nứt bê tông hầm Cù Mông",
    severity: "high",
    reporter: "Trần Minh C",
    avatar: "TMC",
    hasImage: true
};
   // Storage.addReport(reportFirst, { skipChat: true });
const MOCK_DATA = {
  // Thông tin người dùng đăng nhập
     reports: [
        reportFirst
        // hoặc thêm nhiều report khác
        // reportSecond,
        // reportThird
    ],
  users: [
    { id: 'u1', username: 'admin', password: 'admin123', name: 'Nguyễn Văn B', role: 'Giám đốc Điều hành', avatar: 'NVB', department: 'Ban Lãnh đạo' },
    { id: 'u2', username: 'engineer', password: '123456', name: 'Trần Minh C', role: 'Kỹ sư Hiện trường', avatar: 'TMC', department: 'Kỹ thuật' },
    { id: 'u3', username: 'manager', password: '123456', name: 'Lê Hoàng D', role: 'Quản lý Dự án', avatar: 'LHD', department: 'PMO' }
  ],

  // KPI Dashboard
  kpi: {
    totalProjects: 15,
    totalItems: 128,
    avgProgress: 97.6,
    activeWarnings: 24,
    onlineStaff: 12,
    totalWorkers: 2847,
    dailyReports: 47,
    resolvedIssues: 156
  },

  // Danh sách dự án
  projects: [
    {
      id: 'p1',
      name: 'Cao tốc Bắc - Nam Phía Đông',
      location: 'Quảng Ngãi - Khánh Hòa',
      progress: 78.5,
      leader: 'Nguyễn Văn A',
      leaderAvatar: 'NVA',
      workers: 520,
      risk: 'high',
      status: 'active',
      startDate: '2023-01-15',
      endDate: '2026-12-31',
      budget: '12,500 tỷ',
      description: 'Dự án cao tốc Bắc Nam phía Đông, đoạn Quảng Ngãi - Khánh Hòa với tổng chiều dài 352km.',
      items: [
        { name: 'Hầm Cù Mông', progress: 85 },
        { name: 'Cầu Trà Khúc', progress: 72 },
        { name: 'IC Quảng Ngãi', progress: 95 }
      ],
      incidents: 3,
      lat: 15.12, lng: 108.79
    },
    {
      id: 'p2',
      name: 'Cao tốc Bắc - Nam Phía Tây',
      location: 'Đà Nẵng - Quảng Ngãi',
      progress: 92.3,
      leader: 'Trần Thị B',
      leaderAvatar: 'TTB',
      workers: 380,
      risk: 'medium',
      status: 'active',
      startDate: '2022-06-01',
      endDate: '2025-06-30',
      budget: '8,200 tỷ',
      description: 'Đoạn cao tốc Bắc Nam phía Tây, kết nối Đà Nẵng - Quảng Ngãi.',
      items: [
        { name: 'Hầm Hải Vân 2', progress: 98 },
        { name: 'Cầu Thu Bồn', progress: 88 },
        { name: 'IC Tam Kỳ', progress: 100 }
      ],
      incidents: 1,
      lat: 15.88, lng: 108.33
    },
    {
      id: 'p3',
      name: 'Cao tốc Cam Lộ - La Sơn',
      location: 'Quảng Trị - Thừa Thiên Huế',
      progress: 100,
      leader: 'Lê Văn C',
      leaderAvatar: 'LVC',
      workers: 0,
      risk: 'low',
      status: 'completed',
      startDate: '2020-03-01',
      endDate: '2024-09-30',
      budget: '5,800 tỷ',
      description: 'Dự án cao tốc Cam Lộ - La Sơn đã hoàn thành và đưa vào khai thác.',
      items: [
        { name: 'Hầm Hải Vân', progress: 100 },
        { name: 'Cầu Hương', progress: 100 }
      ],
      incidents: 0,
      lat: 16.46, lng: 107.59
    },
    {
      id: 'p4',
      name: 'Cao tốc Nha Trang - Cam Lâm',
      location: 'Khánh Hòa',
      progress: 45.2,
      leader: 'Phạm Văn D',
      leaderAvatar: 'PVD',
      workers: 290,
      risk: 'high',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2027-06-30',
      budget: '4,100 tỷ',
      description: 'Dự án cao tốc Nha Trang - Cam Lâm, kết nối vùng duyên hải Nam Trung Bộ.',
      items: [
        { name: 'IC Nha Trang', progress: 60 },
        { name: 'Cầu Cái River', progress: 35 }
      ],
      incidents: 5,
      lat: 12.24, lng: 109.19
    },
    {
      id: 'p5',
      name: 'Cao tốc Bến Lức - Long Thành',
      location: 'Long An - Đồng Nai',
      progress: 63.8,
      leader: 'Hoàng Thị E',
      leaderAvatar: 'HTE',
      workers: 410,
      risk: 'medium',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2026-03-31',
      budget: '6,700 tỷ',
      description: 'Cao tốc Bến Lức - Long Thành kết nối vùng kinh tế trọng điểm phía Nam.',
      items: [
        { name: 'Cầu Long Thành', progress: 55 },
        { name: 'IC Bến Lức', progress: 78 }
      ],
      incidents: 2,
      lat: 10.78, lng: 106.95
    },
    {
      id: 'p6',
      name: 'Cao tốc Mỹ Thuận - Cần Thơ',
      location: 'Vĩnh Long - Cần Thơ',
      progress: 34.1,
      leader: 'Võ Văn F',
      leaderAvatar: 'VVF',
      workers: 350,
      risk: 'high',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2028-12-31',
      budget: '9,300 tỷ',
      description: 'Dự án cao tốc Mỹ Thuận - Cần Thơ, tuyến đường chiến lược vùng ĐBSCL.',
      items: [
        { name: 'Cầu Mỹ Thuận 2', progress: 25 },
        { name: 'Hầm Cần Thơ', progress: 15 }
      ],
      incidents: 4,
      lat: 10.03, lng: 105.77
    }
  ],

  // Công trường
  constructionSites: [
    { id: 's1', name: 'Hầm Cù Mông', project: 'Cao tốc Bắc - Nam Phía Đông', status: 'active', workers: 120, progress: 85, manager: 'Nguyễn Văn A' },
    { id: 's2', name: 'Hầm Hải Vân 2', project: 'Cao tốc Bắc - Nam Phía Tây', status: 'active', workers: 95, progress: 98, manager: 'Trần Thị B' },
    { id: 's3', name: 'IC Nha Trang', project: 'Cao tốc Nha Trang - Cam Lâm', status: 'warning', workers: 80, progress: 60, manager: 'Phạm Văn D' },
    { id: 's4', name: 'Cầu Long Thành', project: 'Cao tốc Bến Lức - Long Thành', status: 'active', workers: 65, progress: 55, manager: 'Hoàng Thị E' },
    { id: 's5', name: 'Cầu Mỹ Thuận 2', project: 'Cao tốc Mỹ Thuận - Cần Thơ', status: 'critical', workers: 110, progress: 25, manager: 'Võ Văn F' },
    { id: 's6', name: 'Hầm Hải Vân', project: 'Cao tốc Cam Lộ - La Sơn', status: 'completed', workers: 0, progress: 100, manager: 'Lê Văn C' },
    { id: 's7', name: 'Cầu Trà Khúc', project: 'Cao tốc Bắc - Nam Phía Đông', status: 'active', workers: 45, progress: 72, manager: 'Nguyễn Văn A' },
    { id: 's8', name: 'IC Tam Kỳ', project: 'Cao tốc Bắc - Nam Phía Tây', status: 'completed', workers: 0, progress: 100, manager: 'Trần Thị B' }
  ],

  // Cảnh báo
  warnings: [
    { id: 'w1', title: 'Nứt bê tông tại Hầm Cù Mông', description: 'Phát hiện vết nứt dọc trên vách hầm km 45+200, cần kiểm tra khẩn cấp.', severity: 'critical', project: 'Cao tốc Bắc - Nam Phía Đông', site: 'Hầm Cù Mông', time: '2026-07-13T08:30:00', status: 'open', category: 'Chất lượng' },
    { id: 'w2', title: 'Trễ tiến độ hạng mục Cầu Mỹ Thuận 2', description: 'Tiến độ chậm 15 ngày so với kế hoạch do thời tiết xấu.', severity: 'high', project: 'Cao tốc Mỹ Thuận - Cần Thơ', site: 'Cầu Mỹ Thuận 2', time: '2026-07-13T07:15:00', status: 'open', category: 'Tiến độ' },
    { id: 'w3', title: 'Thiếu nhân lực tại IC Nha Trang', description: 'Thiếu 25 công nhân cho ca làm việc tuần này.', severity: 'high', project: 'Cao tốc Nha Trang - Cam Lâm', site: 'IC Nha Trang', time: '2026-07-12T16:45:00', status: 'in_progress', category: 'Nhân lực' },
    { id: 'w4', title: 'Mưa lớn ảnh hưởng thi công', description: 'Dự báo mưa lớn 3 ngày liên tiếp tại khu vực Quảng Ngãi.', severity: 'medium', project: 'Cao tốc Bắc - Nam Phía Đông', site: 'Cầu Trà Khúc', time: '2026-07-12T14:00:00', status: 'open', category: 'Thời tiết' },
    { id: 'w5', title: 'Vượt ngân sách vật tư thép', description: 'Chi phí thép tăng 8% so với dự toán tháng 7.', severity: 'medium', project: 'Cao tốc Bến Lức - Long Thành', site: 'Cầu Long Thành', time: '2026-07-12T10:30:00', status: 'open', category: 'Tài chính' },
    { id: 'w6', title: 'Kiểm tra an toàn định kỳ', description: 'Lịch kiểm tra an toàn lao động quý 3 sắp đến hạn.', severity: 'low', project: 'Cao tốc Bắc - Nam Phía Tây', site: 'Hầm Hải Vân 2', time: '2026-07-11T09:00:00', status: 'open', category: 'An toàn' },
    { id: 'w7', title: 'Sụt lún nền đường km 120', description: 'Phát hiện sụt lún nhẹ tại km 120+500, đang theo dõi.', severity: 'critical', project: 'Cao tốc Bắc - Nam Phía Đông', site: 'Hầm Cù Mông', time: '2026-07-11T06:20:00', status: 'in_progress', category: 'Chất lượng' },
    { id: 'w8', title: 'Thiếu giấy phép môi trường', description: 'Giấy phép môi trường hạng mục mới sắp hết hạn.', severity: 'high', project: 'Cao tốc Nha Trang - Cam Lâm', site: 'IC Nha Trang', time: '2026-07-10T15:00:00', status: 'open', category: 'Pháp lý' }
  ],

  // Hoạt động gần đây
  activities: [
    { id: 'a1', user: 'Trần Minh C', action: 'gửi báo cáo hiện trường', target: 'Hầm Cù Mông', time: '2026-07-13T09:15:00', type: 'report' },
    { id: 'a2', user: 'AI Assistant', action: 'phân tích cảnh báo', target: 'Nứt bê tông', time: '2026-07-13T08:45:00', type: 'ai' },
    { id: 'a3', user: 'Lê Hoàng D', action: 'cập nhật tiến độ', target: 'Cầu Long Thành', time: '2026-07-13T08:00:00', type: 'update' },
    { id: 'a4', user: 'Nguyễn Văn B', action: 'phê duyệt báo cáo', target: 'IC Nha Trang', time: '2026-07-12T17:30:00', type: 'approve' },
    { id: 'a5', user: 'Phạm Văn D', action: 'tạo cảnh báo mới', target: 'Thiếu nhân lực', time: '2026-07-12T16:45:00', type: 'warning' },
    { id: 'a6', user: 'Hoàng Thị E', action: 'upload tài liệu', target: 'Knowledge Base', time: '2026-07-12T14:20:00', type: 'upload' },
    { id: 'a7', user: 'Võ Văn F', action: 'yêu cầu hỗ trợ AI', target: 'Xử lý sụt lún', time: '2026-07-12T11:00:00', type: 'ai' },
    { id: 'a8', user: 'Trần Thị B', action: 'hoàn thành hạng mục', target: 'IC Tam Kỳ', time: '2026-07-11T16:00:00', type: 'complete' }
  ],

  // Biểu đồ báo cáo hàng ngày (7 ngày)
  dailyReportsChart: [
    { day: 'T2', value: 32 },
    { day: 'T3', value: 41 },
    { day: 'T4', value: 38 },
    { day: 'T5', value: 45 },
    { day: 'T6', value: 52 },
    { day: 'T7', value: 28 },
    { day: 'CN', value: 47 }
  ],

  // Thống kê cảnh báo
  warningStats: [
    { label: 'Nguy hiểm', value: 5, color: '#ff4d4f' },
    { label: 'Cảnh báo', value: 8, color: '#ffa940' },
    { label: 'Trung bình', value: 7, color: '#faad14' },
    { label: 'Bình thường', value: 4, color: '#52c41a' }
  ],

  // Chat channels
  chatChannels: [
    { id: 'ch1', name: 'bao-cao-hien-truong', displayName: 'Báo cáo Hiện trường', icon: '#', unread: 3 },
    { id: 'ch2', name: 'ky-thuat', displayName: 'Kỹ thuật', icon: '#', unread: 0 },
    { id: 'ch3', name: 'an-toan-lao-dong', displayName: 'An toàn Lao động', icon: '#', unread: 1 },
    { id: 'ch4', name: 'tong-hop', displayName: 'Tổng hợp', icon: '#', unread: 0 },
    { id: 'ch5', name: 'du-an-bac-nam', displayName: 'Dự án Bắc Nam', icon: '#', unread: 2 }
  ],

  // Direct messages
  chatDMs: [
    { id: 'dm1', name: 'Trần Minh C', avatar: 'TMC', status: 'online' },
    { id: 'dm2', name: 'Lê Hoàng D', avatar: 'LHD', status: 'online' },
    { id: 'dm3', name: 'Phạm Văn D', avatar: 'PVD', status: 'away' },
    { id: 'dm4', name: 'AI Assistant', avatar: '🤖', status: 'online', isBot: true }
  ],

  // Tin nhắn chat mẫu
  chatMessages: {
    'ch1': [
{
    id: reportFirst.id,                     // ID của message
    reportId: reportFirst.id,  // ID của báo cáo

    user: reportFirst.reporter,
    avatar: reportFirst.avatar,
    time: "08:30",

    text: `📋 **Báo cáo hiện trường ${reportFirst.id}**
• Dự án: ${reportFirst.project}
• Hạng mục: ${reportFirst.site}
• Vị trí: ${reportFirst.location}
• Mức độ: Nguy hiểm
• Mô tả: ${reportFirst.description}`,


    hasImage: true,
    imageDesc: "Vết nứt bê tông vách hầm"
},    
  //{ id: 'm2', user: 'AI Assistant', avatar: '🤖', time: '08:31', text: '🤖 **Phân tích AI:**\n\nPhát hiện vết nứt dọc trên vách hầm. Dựa trên hình ảnh:\n• Loại: Nứt co ngót bê tông\n• Mức độ: **Cao** - Cần xử lý trong 48h\n• Đề xuất: Kiểm tra bằng thiết bị siêu âm, bơm epoxy nếu rộng > 0.3mm\n• Tham khảo: KB-042 "Xử lý nứt bê tông hầm"', isBot: true },
  { id: reportFirst.id, reportId: reportFirst.id, user: 'AI Assistant', avatar: '🤖', time: '08:31', text: `🤖 Đã ghi nhận báo cáo ${reportFirst.id} vào hệ thống. Dashboard, Trung tâm Cảnh báo và Thông báo đã được cập nhật theo mức độ **Nguy hiểm**.`, isBot: true },   
  { id: 'm3', user: 'Lê Hoàng D', avatar: 'LHD', time: '08:45', text: 'Đã nhận. Tôi sẽ cử đội kỹ thuật xuống kiểm tra trong sáng nay. @Trần Minh C chuẩn bị thiết bị đo.' },
      { id: 'm4', user: 'Nguyễn Văn B', avatar: 'NVB', time: '09:00', text: 'Đây là vấn đề ưu tiên. Cập nhật tiến độ xử lý trên hệ thống mỗi 2 giờ.' },
      { id: 'm5', user: 'Trần Minh C', avatar: 'TMC', time: '09:15', text: 'Roger. Đang chuẩn bị thiết bị và di chuyển xuống hiện trường.', hasFile: true, fileName: 'Bao_cao_ky_thuat.pdf' }
    ]
  },

  // Knowledge Base
  knowledgeArticles: [
    { id: 'kb1', title: 'Xử lý nứt bê tông trong hầm đường bộ', category: 'Kỹ thuật', tags: ['Bê tông', 'Hầm', 'Sửa chữa'], views: 1248, author: 'Nguyễn Văn A', date: '2026-06-15', emoji: '🔧', excerpt: 'Hướng dẫn chi tiết quy trình phát hiện, phân loại và xử lý các loại nứt bê tông trong công trình hầm.' },
    { id: 'kb2', title: 'Quy trình báo cáo sự cố an toàn lao động', category: 'An toàn', tags: ['An toàn', 'Quy trình'], views: 892, author: 'Trần Thị B', date: '2026-05-20', emoji: '⛑️', excerpt: 'Quy trình chuẩn báo cáo và xử lý sự cố an toàn lao động tại công trường.' },
    { id: 'kb3', title: 'Kỹ thuật thi công hầm xuyên núi', category: 'Kỹ thuật', tags: ['Hầm', 'Thi công'], views: 756, author: 'Lê Văn C', date: '2026-04-10', emoji: '⛰️', excerpt: 'Tổng hợp kinh nghiệm và kỹ thuật thi công hầm xuyên núi từ các dự án cao tốc.' },
    { id: 'kb4', title: 'Quản lý tiến độ dự án BOT', category: 'Quản lý', tags: ['Tiến độ', 'BOT'], views: 634, author: 'Hoàng Thị E', date: '2026-03-25', emoji: '📊', excerpt: 'Phương pháp quản lý tiến độ hiệu quả cho dự án BOT cao tốc.' },
    { id: 'kb5', title: 'Xử lý sụt lún nền đường cao tốc', category: 'Kỹ thuật', tags: ['Nền đường', 'Sụt lún'], views: 521, author: 'Võ Văn F', date: '2026-02-18', emoji: '🛤️', excerpt: 'Các biện pháp phòng chống và khắc phục sụt lún nền đường cao tốc.' },
    { id: 'kb6', title: 'Tiêu chuẩn nghiệm thu hạng mục cầu', category: 'Kỹ thuật', tags: ['Cầu', 'Nghiệm thu'], views: 445, author: 'Phạm Văn D', date: '2026-01-30', emoji: '🌉', excerpt: 'Tiêu chuẩn và quy trình nghiệm thu các hạng mục cầu trong dự án cao tốc.' }
  ],

  // AI responses
  aiResponses: {
    'nứt bê tông': {
      title: 'Xử lý nứt bê tông - Hướng dẫn kỹ thuật',
      content: `<p>Dựa trên dữ liệu từ Knowledge Base và tiêu chuẩn TCVN, đây là hướng dẫn xử lý nứt bê tông:</p>
<h4>1. Phân loại nứt</h4>
<ul>
<li><strong>Nứt co ngót:</strong> Rộng &lt; 0.3mm, không ảnh hưởng kết cấu</li>
<li><strong>Nứt do tải trọng:</strong> Rộng &gt; 0.3mm, cần đánh giá ngay</li>
<li><strong>Nứt do lún nền:</strong> Nứt chéo hoặc bậc thang, mức độ nghiêm trọng</li>
</ul>
<h4>2. Biện pháp xử lý</h4>
<ol>
<li><strong>Bước 1:</strong> Đo rộng nứt bằng thước đo vết nứt</li>
<li><strong>Bước 2:</strong> Kiểm tra siêu âm nếu rộng &gt; 0.3mm</li>
<li><strong>Bước 3:</strong> Vệ sinh khe nứt, bơm epoxy hoặc vữa không co</li>
<li><strong>Bước 4:</strong> Gia cố bằng tấm carbon fiber nếu cần</li>
<li><strong>Bước 5:</strong> Theo dõi định kỳ 7-14-30 ngày</li>
</ol>
<h4>3. Lưu ý quan trọng</h4>
<p>⚠️ Nếu nứt rộng &gt; 1mm hoặc có dấu hiệu mở rộng, cần báo cáo ngay cho Ban Lãnh đạo và tư vấn giám sát.</p>
<p>📚 Tham khảo: <em>KB-042: Xử lý nứt bê tông trong hầm đường bộ</em></p>`
    },
    'an toàn lao động': {
      title: 'Quy trình An toàn Lao động',
      content: `<p>Quy trình an toàn lao động tại công trường Đèo Cả:</p>
<h4>Checklist hàng ngày</h4>
<ul>
<li>Kiểm tra PPE (mũ, giày, áo phản quang, dây an toàn)</li>
<li>Họp an toàn đầu ca (15 phút)</li>
<li>Kiểm tra thiết bị thi công</li>
<li>Rà soát khu vực nguy hiểm</li>
</ul>
<h4>Quy trình báo cáo sự cố</h4>
<ol>
<li>Dừng công việc ngay lập tức</li>
<li>Sơ cứu nạn nhân (nếu có)</li>
<li>Báo cáo qua app Chat → #an-toan-lao-dong</li>
<li>Phong tỏa hiện trường, chụp ảnh</li>
<li>Điều tra nguyên nhân trong 24h</li>
</ol>`
    },
    'default': {
      title: 'Trợ lý AI Operation Hub',
      content: `<p>Tôi là trợ lý AI của Operation Hub - Trung tâm Điều hành Công trường Hợp nhất.</p>
<p>Tôi có thể hỗ trợ bạn:</p>
<ul>
<li>🔧 Tư vấn kỹ thuật thi công</li>
<li>⛑️ Hướng dẫn an toàn lao động</li>
<li>📊 Phân tích dữ liệu dự án</li>
<li>📋 Tra cứu Knowledge Base</li>
<li>⚠️ Đánh giá mức độ rủi ro</li>
</ul>
<p>Hãy đặt câu hỏi cụ thể để tôi hỗ trợ tốt nhất!</p>`
    }
  },

  // Notifications
  notifications: [
    { id: 'n1', title: 'Cảnh báo mới: Nứt bê tông', desc: 'Phát hiện vết nứt tại Hầm Cù Mông - Mức độ nguy hiểm', severity: 'critical', time: '2026-07-13T08:30:00', read: false },
    { id: 'n2', title: 'Báo cáo hiện trường mới', desc: 'Trần Minh C gửi báo cáo từ Hầm Cù Mông', severity: 'info', time: '2026-07-13T09:15:00', read: false },
    { id: 'n3', title: 'Trễ tiến độ', desc: 'Cầu Mỹ Thuận 2 chậm 15 ngày so với KH', severity: 'high', time: '2026-07-13T07:15:00', read: false },
    { id: 'n4', title: 'AI phân tích hoàn tất', desc: 'Kết quả phân tích nứt bê tông đã sẵn sàng', severity: 'info', time: '2026-07-13T08:31:00', read: true },
    { id: 'n5', title: 'Phê duyệt báo cáo', desc: 'Báo cáo IC Nha Trang đã được phê duyệt', severity: 'success', time: '2026-07-12T17:30:00', read: true },
    { id: 'n6', title: 'Thiếu nhân lực', desc: 'IC Nha Trang thiếu 25 công nhân', severity: 'high', time: '2026-07-12T16:45:00', read: true },
    { id: 'n7', title: 'Dự báo thời tiết', desc: 'Mưa lớn 3 ngày tại Quảng Ngãi', severity: 'medium', time: '2026-07-12T14:00:00', read: true },
    { id: 'n8', title: 'Kiểm tra an toàn', desc: 'Lịch kiểm tra ATLĐ quý 3 sắp đến hạn', severity: 'low', time: '2026-07-11T09:00:00', read: true }
  ],

  // Roadmap
  roadmap: [
    { id: 'r1', phase: 'Giai đoạn 1', title: 'Khởi động & Thiết kế', date: 'Q1-Q2 2026', status: 'done', desc: 'Hoàn thành khảo sát, thiết kế kiến trúc hệ thống, xây dựng prototype.', tasks: ['Khảo sát nhu cầu', 'Thiết kế UI/UX', 'Kiến trúc hệ thống', 'Prototype Dashboard'] },
    { id: 'r2', phase: 'Giai đoạn 2', title: 'Phát triển Core Module', date: 'Q3 2026', status: 'current', desc: 'Phát triển các module cốt lõi: Dashboard, Báo cáo, Chat, Cảnh báo.', tasks: ['Dashboard Lãnh đạo', 'App Chat nội bộ', 'Báo cáo hiện trường', 'Trung tâm cảnh báo'] },
    { id: 'r3', phase: 'Giai đoạn 3', title: 'AI & Knowledge Base', date: 'Q4 2026', status: 'future', desc: 'Tích hợp AI Assistant, xây dựng Knowledge Base, phân tích dữ liệu.', tasks: ['AI Assistant', 'Knowledge Base', 'Phân tích dữ liệu', 'Rule Engine cảnh báo'] },
    { id: 'r4', phase: 'Giai đoạn 4', title: 'Tích hợp & Triển khai', date: 'Q1 2027', status: 'future', desc: 'Tích hợp IoT, Drone, triển khai pilot tại 3 dự án.', tasks: ['Tích hợp IoT/Drone', 'Pilot 3 dự án', 'Đào tạo người dùng', 'Go-live'] },
    { id: 'r5', phase: 'Giai đoạn 5', title: 'Mở rộng Toàn tập đoàn', date: 'Q2-Q4 2027', status: 'future', desc: 'Triển khai toàn bộ 15 dự án, tối ưu hóa và nâng cấp liên tục.', tasks: ['Triển khai 15 dự án', 'Mobile App native', 'Tích hợp ERP', 'Tối ưu hiệu năng'] }
  ]
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.MOCK_DATA = MOCK_DATA;
}
