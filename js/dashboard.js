// Gráficas y controles del panel académico con cifras ficticias para demostración.
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') {
    console.error('Chart.js no está disponible. Verifica la conexión a internet para cargar el CDN.');
    return;
  }

  Chart.defaults.font.family = 'DM Sans, sans-serif';
  Chart.defaults.color = '#71847a';
  Chart.defaults.borderColor = '#e6ede8';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.padding = 17;

  const palette = {
    green: '#14735f',
    mint: '#7bc7a7',
    blue: '#5a9db2',
    coral: '#dd8066',
    gold: '#d5ad55',
    paleGreen: 'rgba(20, 115, 95, 0.12)',
    paleCoral: 'rgba(221, 128, 102, 0.13)'
  };
  const semesters = {
    '2025B': { enrollment: [1640, 1430, 1190, 1110, 1050, 930, 720, 350], total: '8.420', events: '14', approval: '81,4', faculty: '426', changes: [{ text: '3,8%', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '2 nuevos', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '0,6 pp', direction: 'trend-down', icon: 'fa-arrow-down' }, { text: 'estable', direction: 'trend-flat', icon: 'fa-minus' }] },
    '2025A': { enrollment: [1580, 1395, 1160, 1075, 1010, 890, 685, 310], total: '8.105', events: '12', approval: '82,0', faculty: '419', changes: [{ text: '4,4%', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '1 nuevo', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '1,3 pp', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '8 nuevos', direction: 'trend-up', icon: 'fa-arrow-up' }] },
    '2024B': { enrollment: [1510, 1350, 1125, 1030, 960, 845, 650, 295], total: '7.765', events: '11', approval: '80,7', faculty: '411', changes: [{ text: '3,2%', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '3 nuevos', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '0,9 pp', direction: 'trend-up', icon: 'fa-arrow-up' }, { text: '6 nuevos', direction: 'trend-up', icon: 'fa-arrow-up' }] }
  };
  const careerNames = [
    'Medicina Veterinaria',
    'Ing. Agronómica',
    'Contabilidad y Auditoría',
    'Ing. Industrial',
    'Enfermería',
    'Educación Básica',
    'Ing. Electromecánica',
    'Sistemas de Información'
  ];
  const historyLabels = ['2021B', '2022A', '2022B', '2023A', '2023B', '2024A', '2024B', '2025A', '2025B'];
  const historyEnrollment = [6810, 6970, 7140, 7280, 7460, 7590, 7765, 8105, 8420];
  const historyGraduation = [37, 38, 40, 41, 42, 44, 45, 47, 49];
  const historyAttrition = [13.1, 12.8, 12.4, 12.1, 11.7, 11.3, 10.9, 10.4, 9.8];
  const academicAverages = [8.1, 8.4, 7.9, 8.0, 8.5];
  const selectedIndexes = { '2025B': 8, '2025A': 7, '2024B': 6 };
  const chartInstances = {};
  const sharedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 550 },
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#173632', padding: 10, titleFont: { weight: '700' }, displayColors: true }
    }
  };

  chartInstances.enrollment = new Chart(document.getElementById('enrollmentChart'), {
    type: 'bar',
    data: {
      labels: careerNames,
      datasets: [{ label: 'Estudiantes', data: semesters['2025B'].enrollment, backgroundColor: [palette.green, palette.mint, palette.blue, palette.coral, palette.gold, '#83a7a0', '#a6c9b8', '#9cae8e'], borderRadius: 2, maxBarThickness: 34 }]
    },
    options: {
      ...sharedOptions,
      indexAxis: 'y',
      plugins: { ...sharedOptions.plugins, tooltip: { ...sharedOptions.plugins.tooltip, callbacks: { label: (context) => ` ${context.parsed.x.toLocaleString('es-EC')} estudiantes` } } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#edf1ed' }, ticks: { font: { size: 9 }, callback: (value) => Number(value).toLocaleString('es-EC') } },
        y: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  chartInstances.modality = new Chart(document.getElementById('modalityChart'), {
    type: 'doughnut',
    data: {
      labels: ['Presencial', 'Híbrida', 'Virtual'],
      datasets: [{ data: [72, 18, 10], backgroundColor: [palette.green, palette.gold, palette.blue], borderColor: '#fff', borderWidth: 3, hoverOffset: 5 }]
    },
    options: {
      ...sharedOptions,
      cutout: '68%',
      plugins: { ...sharedOptions.plugins, legend: { display: true, position: 'bottom', labels: { ...Chart.defaults.plugins.legend.labels, font: { size: 10 } } }, tooltip: { ...sharedOptions.plugins.tooltip, callbacks: { label: (context) => ` ${context.label}: ${context.parsed}%` } } }
    }
  });

  chartInstances.trend = new Chart(document.getElementById('trendChart'), {
    type: 'line',
    data: {
      labels: historyLabels.slice(-6),
      datasets: [{ label: 'Estudiantes matriculados', data: historyEnrollment.slice(-6), borderColor: palette.green, backgroundColor: palette.paleGreen, pointBackgroundColor: '#fff', pointBorderColor: palette.green, pointBorderWidth: 2, pointRadius: 4, tension: .32, fill: false }]
    },
    options: {
      ...sharedOptions,
      plugins: { ...sharedOptions.plugins, tooltip: { ...sharedOptions.plugins.tooltip, callbacks: { label: (context) => ` ${context.parsed.y.toLocaleString('es-EC')} estudiantes` } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { min: 6800, grid: { color: '#edf1ed' }, ticks: { font: { size: 9 }, callback: (value) => `${(value / 1000).toFixed(1)} mil` } }
      }
    }
  });

  chartInstances.faculty = new Chart(document.getElementById('facultyChart'), {
    type: 'bar',
    data: {
      labels: ['FACA', 'FCAREN', 'FIE', 'FACIC', 'CAREN'],
      datasets: [{ label: 'Promedio / 10', data: academicAverages, backgroundColor: [palette.green, palette.blue, palette.coral, palette.gold, palette.mint], borderRadius: 2, maxBarThickness: 26 }]
    },
    options: {
      ...sharedOptions,
      indexAxis: 'y',
      plugins: { ...sharedOptions.plugins, tooltip: { ...sharedOptions.plugins.tooltip, callbacks: { label: (context) => ` Promedio: ${context.parsed.x.toFixed(1)} / 10` } } },
      scales: {
        x: { min: 0, max: 10, grid: { color: '#edf1ed' }, ticks: { stepSize: 2, font: { size: 9 } } },
        y: { grid: { display: false }, ticks: { font: { size: 10, weight: '700' } } }
      }
    }
  });

  chartInstances.outcomes = new Chart(document.getElementById('outcomesChart'), {
    type: 'line',
    data: {
      labels: historyLabels.slice(-6),
      datasets: [
        { label: 'Titulación', data: historyGraduation.slice(-6), borderColor: palette.green, backgroundColor: palette.paleGreen, pointBackgroundColor: palette.green, pointRadius: 3, tension: .3, fill: true },
        { label: 'Deserción', data: historyAttrition.slice(-6), borderColor: palette.coral, backgroundColor: palette.paleCoral, pointBackgroundColor: palette.coral, pointRadius: 3, tension: .3, fill: true }
      ]
    },
    options: {
      ...sharedOptions,
      plugins: { ...sharedOptions.plugins, legend: { display: true, position: 'bottom', labels: { ...Chart.defaults.plugins.legend.labels, font: { size: 10 } } }, tooltip: { ...sharedOptions.plugins.tooltip, callbacks: { label: (context) => ` ${context.dataset.label}: ${context.parsed.y}%` } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { min: 0, max: 60, grid: { color: '#edf1ed' }, ticks: { font: { size: 9 }, callback: (value) => `${value}%` } }
      }
    }
  });

  function updateDashboard(semesterKey) {
    const data = semesters[semesterKey] || semesters['2025B'];
    document.getElementById('kpiEnrollment').textContent = data.total;
    document.getElementById('kpiEvents').textContent = data.events;
    document.getElementById('kpiApproval').innerHTML = `${data.approval}<span class="kpi-unit">%</span>`;
    document.getElementById('kpiFaculty').textContent = data.faculty;
    ['trendEnrollment', 'trendEvents', 'trendApproval', 'trendFaculty'].forEach((id, index) => {
      const badge = document.getElementById(id);
      const change = data.changes[index];
      badge.className = `trend ${change.direction}`;
      badge.innerHTML = `<i class="fa-solid ${change.icon}" aria-hidden="true"></i> ${change.text}`;
    });
    chartInstances.enrollment.data.datasets[0].data = data.enrollment;
    chartInstances.enrollment.update();

    const endIndex = selectedIndexes[semesterKey] ?? selectedIndexes['2025B'];
    const startIndex = endIndex - 5;
    const labels = historyLabels.slice(startIndex, endIndex + 1);
    chartInstances.trend.data.labels = labels;
    chartInstances.trend.data.datasets[0].data = historyEnrollment.slice(startIndex, endIndex + 1);
    chartInstances.trend.update();
    chartInstances.outcomes.data.labels = labels;
    chartInstances.outcomes.data.datasets[0].data = historyGraduation.slice(startIndex, endIndex + 1);
    chartInstances.outcomes.data.datasets[1].data = historyAttrition.slice(startIndex, endIndex + 1);
    chartInstances.outcomes.update();
  }

  document.getElementById('semesterSelect').addEventListener('change', (event) => updateDashboard(event.target.value));
  document.getElementById('exportReport').addEventListener('click', () => {
    const select = document.getElementById('semesterSelect');
    const semesterName = select.options[select.selectedIndex].text;
    console.log(`[Simulación] Reporte académico UTC para el periodo ${semesterName}.`);
    window.alert('La exportación es una simulación. Revisa la consola del navegador para ver el periodo seleccionado.');
  });
});
