/**
 * Operation Hub - Field Report Page Logic
 * Gửi báo cáo → cập nhật Dashboard, Chat, Warnings
 */

let selectedSeverity = '';

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;
  Storage.init();
  Layout.render('report', { pageTitle: 'Báo cáo Hiện trường' });

  populateProjects();
  bindReportEvents();
});

function populateProjects() {
  const projectSelect = document.getElementById('reportProject');
  const categorySelect = document.getElementById('reportCategory');

  MOCK_DATA.projects.filter(p => p.status === 'active').forEach(p => {
    projectSelect.innerHTML += `<option value="${p.name}">${p.name}</option>`;
  });

  projectSelect.addEventListener('change', () => {
    const project = MOCK_DATA.projects.find(p => p.name === projectSelect.value);
    categorySelect.innerHTML = '<option value="">Chọn hạng mục</option>';
    if (project) {
      project.items.forEach(item => {
        categorySelect.innerHTML += `<option value="${item.name}">${item.name}</option>`;
      });
    }
  });
}

function bindReportEvents() {
  // Severity selection
  document.querySelectorAll('.report-severity-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.report-severity-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSeverity = btn.dataset.severity;
    });
  });

  // Photo upload
  const uploadArea = document.getElementById('uploadArea');
  const photoInput = document.getElementById('photoInput');
  const preview = document.getElementById('uploadPreview');

  uploadArea.addEventListener('click', () => photoInput.click());
  photoInput.addEventListener('change', (e) => {
    preview.innerHTML = '';
    Array.from(e.target.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          preview.innerHTML += `<img src="${ev.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML += `<div style="padding:20px;background:#eee;border-radius:8px;text-align:center;font-size:0.75rem">🎥 ${file.name}</div>`;
      }
    });
  });

  // Form submit
  document.getElementById('reportForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedSeverity) {
      App.toast('Vui lòng chọn mức độ ảnh hưởng', 'warning');
      return;
    }

    const user = Auth.getUser();
    const report = {
      project: document.getElementById('reportProject').value,
      site: document.getElementById('reportCategory').value,
      category: document.getElementById('reportCategory').value,
      location: document.getElementById('reportLocation').value,
      description: document.getElementById('reportDescription').value,
      severity: selectedSeverity,
      reporter: user.name,
      hasImage: photoInput.files.length > 0
    };

    // Lưu vào storage → tự động cập nhật KPI, warnings, chat, notifications
    Storage.addReport(report);

    // Show success
    document.getElementById('reportFormView').style.display = 'none';
    document.getElementById('reportSuccessView').style.display = 'block';

    App.toast('Báo cáo đã gửi! Dashboard đang cập nhật...', 'success');
  });

  // New report button
  document.getElementById('newReportBtn')?.addEventListener('click', () => {
    document.getElementById('reportForm').reset();
    selectedSeverity = '';
    document.querySelectorAll('.report-severity-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('uploadPreview').innerHTML = '';
    document.getElementById('reportFormView').style.display = 'block';
    document.getElementById('reportSuccessView').style.display = 'none';
  });
}
