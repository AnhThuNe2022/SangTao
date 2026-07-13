/**
 * Operation Hub - Chart Rendering (Pure SVG/Canvas, no external libs)
 */

const Charts = {
  /** Vẽ biểu đồ đường (Line Chart) */
  renderLineChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = options.height || 200;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...data.map(d => d.value)) * 1.1;
    const minVal = 0;

    const points = data.map((d, i) => ({
      x: padding.left + (i / (data.length - 1)) * chartW,
      y: padding.top + chartH - ((d.value - minVal) / (maxVal - minVal)) * chartH,
      ...d
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaPath = linePath + ` L${points[points.length - 1].x},${padding.top + chartH} L${points[0].x},${padding.top + chartH} Z`;

    const gridLines = [];
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartH;
      gridLines.push(`<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`);
    }

    const dots = points.map(p =>
      `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#0078d4" stroke="#0a1628" stroke-width="2">
        <title>${p.day}: ${p.value}</title>
      </circle>`
    ).join('');

    const labels = points.map(p =>
      `<text x="${p.x}" y="${height - 8}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="11">${p.day}</text>`
    ).join('');

    container.innerHTML = `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">
        ${gridLines.join('')}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0078d4" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#0078d4" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#lineGrad)"/>
        <path d="${linePath}" fill="none" stroke="#0078d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${dots}
        ${labels}
      </svg>`;
  },

  /** Vẽ biểu đồ Donut */
  renderDonutChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const size = options.size || 180;
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size / 2 - 10;
    const innerR = outerR * 0.6;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    let currentAngle = -Math.PI / 2;
    const slices = data.map(d => {
      const angle = (d.value / total) * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const x1 = cx + outerR * Math.cos(startAngle);
      const y1 = cy + outerR * Math.sin(startAngle);
      const x2 = cx + outerR * Math.cos(endAngle);
      const y2 = cy + outerR * Math.sin(endAngle);
      const x3 = cx + innerR * Math.cos(endAngle);
      const y3 = cy + innerR * Math.sin(endAngle);
      const x4 = cx + innerR * Math.cos(startAngle);
      const y4 = cy + innerR * Math.sin(startAngle);

      const largeArc = angle > Math.PI ? 1 : 0;

      return `<path d="M${x1},${y1} A${outerR},${outerR} 0 ${largeArc} 1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 ${largeArc} 0 ${x4},${y4} Z" fill="${d.color}">
        <title>${d.label}: ${d.value}</title>
      </path>`;
    }).join('');

    const legend = data.map(d => `
      <div class="donut-legend-item">
        <div class="donut-legend-color" style="background:${d.color}"></div>
        <span>${d.label} (${d.value})</span>
      </div>`).join('');

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          ${slices}
          <text x="${cx}" y="${cy - 6}" text-anchor="middle" fill="white" font-size="24" font-weight="700">${total}</text>
          <text x="${cx}" y="${cy + 14}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="11">Cảnh báo</text>
        </svg>
        <div class="donut-legend">${legend}</div>
      </div>`;
  },

  /** Vẽ biểu đồ cột cho project detail */
  renderBarChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = options.height || 200;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const barWidth = chartW / data.length * 0.6;
    const gap = chartW / data.length * 0.4;
    const maxVal = 100;

    const bars = data.map((d, i) => {
      const barH = (d.value / maxVal) * chartH;
      const x = padding.left + i * (barWidth + gap) + gap / 2;
      const y = padding.top + chartH - barH;
      const color = d.value >= 80 ? '#52c41a' : d.value >= 50 ? '#0078d4' : '#ffa940';

      return `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="${color}" opacity="0.85">
          <title>${d.label}: ${d.value}%</title>
        </rect>
        <text x="${x + barWidth / 2}" y="${height - 10}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">${d.label}</text>
        <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" fill="white" font-size="11" font-weight="600">${d.value}%</text>`;
    }).join('');

    container.innerHTML = `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}">
        ${bars}
      </svg>`;
  },

  /** Vẽ bản đồ Việt Nam với pins */
  renderMap(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const statusColors = {
      high: '#ff4d4f',
      medium: '#ffa940',
      low: '#52c41a',
      completed: '#0078d4'
    };

    const pins = projects.map(p => {
      const x = 80 + (p.lng - 102) * 12;
      const y = 280 - (p.lat - 8) * 14;
      const color = p.status === 'completed' ? statusColors.completed : statusColors[p.risk] || '#0078d4';

      return `
        <g class="map-pin" data-project="${p.id}">
          <circle cx="${x}" cy="${y}" r="12" fill="${color}" opacity="0.2" class="map-pin-pulse"/>
          <circle cx="${x}" cy="${y}" r="6" fill="${color}" stroke="#fff" stroke-width="2"/>
          <title>${p.name} (${p.progress}%)</title>
        </g>`;
    }).join('');

    container.innerHTML = `
      <svg viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0d2137"/>
            <stop offset="100%" stop-color="#0a1628"/>
          </linearGradient>
        </defs>
        <rect width="400" height="350" fill="url(#mapBg)" rx="8"/>
        <!-- Simplified Vietnam outline -->
        <path d="M220,30 L250,50 L270,80 L280,120 L275,160 L260,200 L240,240 L220,270 L200,290 L180,300 L160,290 L150,260 L140,220 L130,180 L120,140 L115,100 L130,70 L160,45 L190,35 Z"
          fill="rgba(0,120,212,0.08)" stroke="rgba(0,120,212,0.2)" stroke-width="1.5"/>
        ${pins}
        <text x="200" y="330" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="11">Bản đồ Dự án - Việt Nam</text>
      </svg>
      <div class="map-legend">
        <div class="map-legend-item"><div class="map-legend-dot" style="background:#ff4d4f"></div> Rủi ro cao</div>
        <div class="map-legend-item"><div class="map-legend-dot" style="background:#ffa940"></div> Rủi ro TB</div>
        <div class="map-legend-item"><div class="map-legend-dot" style="background:#52c41a"></div> Rủi ro thấp</div>
        <div class="map-legend-item"><div class="map-legend-dot" style="background:#0078d4"></div> Hoàn thành</div>
      </div>`;

    // Click handler for pins
    container.querySelectorAll('.map-pin').forEach(pin => {
      pin.addEventListener('click', () => {
        const projectId = pin.dataset.project;
        window.location.href = `projects.html?id=${projectId}`;
      });
    });
  }
};

if (typeof window !== 'undefined') {
  window.Charts = Charts;
}
