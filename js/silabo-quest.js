// Aventura interactiva del sílabo con progreso independiente del resto del sitio.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('questScreen');
  if (!root) return;

  const STORAGE_KEY = 'silaboQuestProgress';
  const SILABO_DATA = {
    datosGenerales: {
      carrera: 'Sistemas de Información',
      asignatura: 'Sistemas de Información para la Inteligencia de Negocios',
      ciclo: '8vo ciclo',
      creditos: 3,
      horas: 144,
      docente: 'Luis René Quisaguano Collaguazo',
      correo: 'luis.quisaguano1@utc.edu.ec',
      periodo: 'Dato no verificado en el material disponible'
    },
    unidades: [
      {
        id: 1, titulo: 'Los Cimientos del BI', subtitulo: 'Fundamentos y Gestión de BI',
        icono: 'fa-solid fa-layer-group', metodo: 'Aprendizaje Cooperativo',
        temas: ['Fundamentos de Business Intelligence', 'Gestión y componentes de BI', 'Ventaja corporativa y toma de decisiones basada en datos'],
        resultado: 'Relacionar los elementos de BI con la generación de información útil para decidir.'
      },
      {
        id: 2, titulo: 'El Laberinto del Data Warehouse', subtitulo: 'Sistemas de Soporte y Data Warehouse',
        icono: 'fa-solid fa-database', metodo: 'Metodología no especificada en el material disponible',
        temas: ['Flujo ETL: Extract, Transform, Load', 'Data Warehouse', 'Gestión del conocimiento y patrones de análisis'],
        resultado: 'Reconocer cómo los datos preparados y organizados apoyan el análisis.'
      },
      {
        id: 3, titulo: 'Constructor de Soluciones BI', subtitulo: 'Sistema de Soporte para Toma de Decisiones',
        icono: 'fa-solid fa-chart-pie', metodo: 'Aprendizaje Basado en Proyectos',
        temas: ['Indicadores y dashboards', 'Alertas tempranas y reportes', 'Vistas multidimensionales e hipercubos', 'Procesos ETL y proyecto PlasTrack'],
        resultado: 'Proponer componentes de soporte a decisiones para un escenario de aplicación.'
      }
    ],
    evaluaciones: [{ nombre: 'EVAL2', fecha: '10/01/2027 (dato aportado; confirmar en el sílabo vigente)' }],
    proyecto: { nombre: 'PlasTrack', descripcion: 'Proyecto de monitoreo de microplásticos con datos Copernicus (descripción aportada para esta actividad).' },
    habilidadesBlandas: ['Colaboración', 'Comunicación', 'Pensamiento crítico'],
    bibliografia: ['Bibliografía no incluida en el material de referencia disponible.']
  };
  const RETOS = {
    memoria: [
      ['Business Intelligence', 'Estrategias y herramientas para transformar datos en información que apoye decisiones.'],
      ['Ventaja corporativa', 'Beneficio competitivo obtenido al usar datos estratégicamente.'],
      ['Componentes de BI', 'Datos, procesos, tecnologías y personas de una solución de BI.'],
      ['Herramienta de BI', 'Software especializado como Power BI, Tableau o Qlik Sense.'],
      ['Decisión basada en datos', 'Elección de acciones respaldada por evidencia analítica.'],
      ['Sistema de información', 'Elementos que recolectan, procesan y distribuyen datos.']
    ],
    etl: [
      { id: 'extract', title: 'Extract', description: 'Obtener datos desde las fuentes de origen.' },
      { id: 'transform', title: 'Transform', description: 'Limpiar, validar y preparar los datos.' },
      { id: 'load', title: 'Load', description: 'Cargar los datos preparados en el repositorio analítico.' }
    ],
    categories: [
      { id: 'variables', title: 'Variables de medición y análisis' },
      { id: 'warehouse', title: 'Data Warehouse' },
      { id: 'knowledge', title: 'Sistemas de Gestión del Conocimiento' },
      { id: 'patterns', title: 'Patrones: evaluación, interpretación y visualización' }
    ],
    terms: [
      { id: 'term-variables', text: 'Variables de medición y análisis', category: 'variables' },
      { id: 'term-datawarehouse', text: 'Data Warehouse', category: 'warehouse' },
      { id: 'term-knowledge', text: 'Sistemas de Gestión del Conocimiento', category: 'knowledge' },
      { id: 'term-patterns', text: 'Patrones de evaluación, interpretación y visualización', category: 'patterns' }
    ],
    componentesCorrectos: ['KPIs', 'Dashboards', 'Alertas tempranas', 'Reporteadores', 'Vistas multidimensionales / hipercubos', 'Procesos ETL'],
    distractores: ['Redes sociales', 'Videojuego', 'Memes', 'Spam'],
    jefeFinal: [
      { pregunta: '¿Cuántas horas totales tiene la asignatura?', opciones: ['96', '120', '144', '180'], correcta: 2, explicacion: 'La cifra proporcionada para esta actividad es 144 horas.' },
      { pregunta: '¿Cuántos créditos tiene la asignatura?', opciones: ['2', '3', '4', '5'], correcta: 1, explicacion: 'La cifra proporcionada es 3 créditos.' },
      { pregunta: '¿Cuál es el proyecto articulador mencionado?', opciones: ['DataCampus', 'PlasTrack', 'AgroBI', 'UTC360'], correcta: 1, explicacion: 'El proyecto indicado es PlasTrack.' },
      { pregunta: '¿En qué fecha se indica la EVAL2?', opciones: ['10/01/2027', '01/10/2026', '10/01/2026', '01/10/2027'], correcta: 0, explicacion: 'La fecha aportada para EVAL2 es 10/01/2027; confirma la fecha con el sílabo vigente.' },
      { pregunta: '¿Qué metodología se asocia con la Unidad 1?', opciones: ['Aprendizaje Cooperativo', 'Clase magistral exclusiva', 'Gamificación empresarial', 'Estudio individual'], correcta: 0, explicacion: 'La metodología indicada para la Unidad 1 es Aprendizaje Cooperativo.' },
      { pregunta: '¿Qué metodología se asocia con la Unidad 3?', opciones: ['Aprendizaje Basado en Proyectos', 'Aprendizaje memorístico', 'Clase invertida exclusiva', 'Estudio de campo'], correcta: 0, explicacion: 'La metodología indicada para la Unidad 3 es Aprendizaje Basado en Proyectos.' },
      { pregunta: '¿Qué herramienta de BI se recomienda como ejemplo?', opciones: ['Power BI', 'Bloc de notas', 'Git', 'Paint'], correcta: 0, explicacion: 'Power BI se menciona entre las herramientas de BI.' },
      { pregunta: '¿Cuál resume el objetivo general aportado?', opciones: ['Administrar redes sociales de la universidad', 'Analizar conceptos de BI para implementar herramientas en una organización', 'Programar videojuegos de escritorio', 'Diseñar sistemas operativos'], correcta: 1, explicacion: 'Ese es el objetivo general descrito en la información de la actividad.' },
      { pregunta: '¿Cuántas horas autónomas semanales se indican aproximadamente en la consigna?', opciones: ['12', '24', '36', '48'], correcta: 3, explicacion: 'La consigna indica aproximadamente 48 horas autónomas semanales. Confirma el dato: no es coherente a primera vista con las 144 horas totales.' },
      { pregunta: '¿Cuál es el correo institucional indicado para el docente?', opciones: ['luis.quisaguano1@utc.edu.ec', 'docencia@utc.edu.ec', 'luis.quisaguano@bi.edu', 'soporte@utc.edu.ec'], correcta: 0, explicacion: 'El correo aportado es luis.quisaguano1@utc.edu.ec.' }
    ]
  };
  const BADGES = [
    { id: 'u1', title: 'Unidad 1 completada', icon: '🥉' },
    { id: 'u2', title: 'Unidad 2 completada', icon: '🥈' },
    { id: 'u3', title: 'Unidad 3 completada', icon: '🥇' },
    { id: 'boss', title: 'Guardián derrotado', icon: '🏆' },
    { id: 'flawless', title: 'Sin errores', icon: '⚡' }
  ];
  const LEVELS = [
    { name: 'Aprendiz', min: 0, max: 150 },
    { name: 'Analista', min: 151, max: 400 },
    { name: 'Estratega', min: 401, max: 700 },
    { name: 'Master BI', min: 701, max: Infinity }
  ];
  const DEFAULT_STATE = {
    xp: 0, completed: [], badges: [], bossWon: false, sound: true,
    task2: { etlRewarded: false, etlPenalty: false, scoredTerms: [], completeTerms: [] }
  };
  let state = loadProgress();
  let view = { name: 'home' };
  let memory = { deck: [], open: [], matched: [], locked: false };
  let missionTwo = { order: ['extract', 'transform', 'load'], placements: {}, selectedTerm: null, feedback: '' };
  let boss = { question: 0, health: 8, playerHealth: 3, timer: 20, mistakes: 0, locked: false };
  let timerId = null;
  let transitionId = null;
  let draggedEtl = null;
  let selectedComponents = [];
  let audioContext;
  let storageIssue = '';

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  function freshState() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function isValidProgress(value) {
    return value && typeof value === 'object'
      && Number.isFinite(value.xp) && value.xp >= 0
      && Array.isArray(value.completed) && value.completed.every((id) => [1, 2, 3].includes(id))
      && Array.isArray(value.badges) && value.badges.every((id) => BADGES.some((badge) => badge.id === id))
      && typeof value.bossWon === 'boolean' && typeof value.sound === 'boolean'
      && value.task2 && typeof value.task2 === 'object'
      && typeof value.task2.etlRewarded === 'boolean'
      && typeof value.task2.etlPenalty === 'boolean'
      && Array.isArray(value.task2.scoredTerms) && value.task2.scoredTerms.every((id) => RETOS.terms.some((term) => term.id === id))
      && Array.isArray(value.task2.completeTerms) && value.task2.completeTerms.every((id) => RETOS.terms.some((term) => term.id === id));
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshState();
      const parsed = JSON.parse(raw);
      if (!isValidProgress(parsed)) throw new Error('El progreso guardado no tiene el formato esperado.');
      return { ...freshState(), ...parsed, task2: { ...freshState().task2, ...parsed.task2 } };
    } catch (error) {
      if (error instanceof SyntaxError || error instanceof Error && error.message.includes('formato esperado')) {
        storageIssue = 'El progreso guardado estaba dañado y se inició una aventura nueva.';
        try { localStorage.removeItem(STORAGE_KEY); } catch { storageIssue += ' No se pudo limpiar el dato anterior.'; }
        return freshState();
      }
      storageIssue = 'El almacenamiento del navegador no está disponible; el progreso solo se conservará mientras esta página permanezca abierta.';
      return freshState();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      storageIssue = '';
    } catch {
      storageIssue = 'No se pudo guardar el progreso en este navegador. La aventura sigue activa, pero recargar puede borrar los avances.';
    }
    renderPlayer();
  }

  function renderPlayer() {
    const level = [...LEVELS].reverse().find((item) => state.xp >= item.min) || LEVELS[0];
    const next = LEVELS.find((item) => item.min > level.min);
    const amount = next ? Math.min(100, ((state.xp - level.min) / (next.min - level.min)) * 100) : 100;
    const remaining = next ? Math.max(0, next.min - state.xp) : 0;
    byId('playerLevel').textContent = level.name;
    byId('xpValue').textContent = `${state.xp} XP`;
    byId('xpFill').style.width = `${amount}%`;
    byId('xpProgress').setAttribute('aria-valuemax', next ? String(next.min - level.min) : '100');
    byId('xpProgress').setAttribute('aria-valuenow', String(next ? state.xp - level.min : 100));
    byId('xpNext').textContent = next ? `${remaining} XP para ${next.name}` : 'Nivel máximo alcanzado';
    byId('badgeCount').textContent = `${state.badges.length} / ${BADGES.length}`;
    byId('storageNotice').textContent = storageIssue;
    const soundButton = byId('soundToggle');
    soundButton.setAttribute('aria-pressed', String(state.sound));
    soundButton.setAttribute('aria-label', `${state.sound ? 'Desactivar' : 'Activar'} sonido`);
    soundButton.innerHTML = `<i class="fa-solid ${state.sound ? 'fa-volume-high' : 'fa-volume-xmark'}" aria-hidden="true"></i><span>Sonido ${state.sound ? 'activado' : 'desactivado'}</span>`;
    renderCollections();
  }

  function renderCollections() {
    byId('badgeCollection').innerHTML = BADGES.map((badge) => {
      const earned = state.badges.includes(badge.id);
      return `<div class="badge-entry${earned ? ' is-earned' : ''}"${earned ? '' : ' aria-label="Insignia bloqueada"'}>
        <span class="badge-emoji" aria-hidden="true">${badge.icon}</span><span>${escapeHtml(badge.title)}${earned ? ' · Obtenida' : ' · Bloqueada'}</span>
      </div>`;
    }).join('');
    byId('knowledgeCollection').innerHTML = SILABO_DATA.unidades.map((unit) => state.completed.includes(unit.id)
      ? `<div class="knowledge-entry"><span>U${unit.id} · ${escapeHtml(unit.subtitulo)}</span><button type="button" data-action="knowledge" data-unit="${unit.id}" aria-label="Abrir tarjeta de conocimiento de la Unidad ${unit.id}">Ver</button></div>`
      : `<div class="knowledge-entry"><span>U${unit.id} · Bloqueada</span><i class="fa-solid fa-lock" aria-hidden="true"></i></div>`).join('');
  }

  function setView(name, data = {}) {
    clearInterval(timerId);
    clearTimeout(transitionId);
    view = { name, ...data };
    render();
    root.focus({ preventScroll: true });
  }

  function addXp(amount) {
    state.xp = Math.max(0, state.xp + amount);
    saveProgress();
  }

  function awardBadge(id) {
    if (!state.badges.includes(id)) state.badges.push(id);
  }

  function playTone(correct = true) {
    if (!state.sound) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioContext ||= new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = correct ? 650 : 220;
      gain.gain.setValueAtTime(.06, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .16);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + .16);
    } catch {
      byId('storageNotice').textContent = 'El navegador no permitió reproducir el sonido; el juego continúa normalmente.';
    }
  }

  function render() {
    renderPlayer();
    if (view.name === 'home') renderHome();
    else if (view.name === 'map') renderMap();
    else if (view.name === 'memory') renderMemory();
    else if (view.name === 'mission2') renderMissionTwo();
    else if (view.name === 'mission3') renderMissionThree();
    else if (view.name === 'knowledge') renderKnowledge(view.unit);
    else if (view.name === 'boss') renderBoss();
    else if (view.name === 'boss-result') renderBossResult(view.won);
  }

  function renderHome() {
    const complete = state.completed.length;
    root.innerHTML = `<section class="quest-screen-card">
      <p class="quest-section-label">BIENVENIDO, ANALISTA</p>
      <h2>¿Listo para explorar el sílabo?</h2>
      <p>Completa tres misiones de conceptos, procesos y diseño de soluciones de BI. Cada reto revela una tarjeta de conocimiento; al final te espera el Guardián del Sílabo.</p>
      <div class="game-stats"><span class="game-stat"><i class="fa-solid fa-map" aria-hidden="true"></i> ${complete}/3 unidades</span><span class="game-stat"><i class="fa-solid fa-star" aria-hidden="true"></i> ${state.xp} XP</span><span class="game-stat"><i class="fa-solid fa-award" aria-hidden="true"></i> ${state.badges.length} insignias</span></div>
      <div class="quest-actions"><button class="quest-btn" type="button" data-action="start"><i class="fa-solid fa-play" aria-hidden="true"></i> ${complete ? 'Continuar aventura' : 'Iniciar aventura'}</button>
      ${state.bossWon ? '<button class="quest-btn quest-btn-secondary" type="button" data-action="victory">Ver certificado</button>' : ''}</div>
      <div class="quest-map" aria-label="Mapa de aventura">${mapNodes()}</div>
      <div class="quest-progress-summary"><span>Próximo destino: ${escapeHtml(nextDestination())}</span><span>Tu avance se guarda en este navegador.</span></div>
    </section>`;
  }

  function nextDestination() {
    const firstIncomplete = SILABO_DATA.unidades.find((unit) => !state.completed.includes(unit.id));
    return firstIncomplete ? firstIncomplete.titulo : 'El Guardián del Sílabo';
  }

  function mapNodes() {
    return [...SILABO_DATA.unidades.map((unit) => ({ ...unit, boss: false })), {
      id: 'boss', titulo: 'El Guardián del Sílabo', subtitulo: 'Jefe final', icono: 'fa-solid fa-dragon', boss: true
    }].map((node, index) => {
      const complete = node.boss ? state.bossWon : state.completed.includes(node.id);
      const available = node.boss ? state.completed.length === 3 : node.id === 1 || state.completed.includes(node.id - 1);
      const current = available && !complete;
      const icon = complete ? 'fa-solid fa-check' : available ? node.icono : 'fa-solid fa-lock';
      return `<div class="map-node-wrap">
        ${current ? '<span class="map-avatar" aria-label="Posición actual del jugador">🧙‍♀️</span>' : ''}
        <button class="map-node${complete ? ' is-complete' : ''}${current ? ' is-current' : ''}" type="button" data-action="open-node" data-node="${node.boss ? 'boss' : node.id}" aria-label="${node.boss ? 'Jefe final' : `Unidad ${node.id}: ${escapeHtml(node.subtitulo)}`}, ${complete ? 'completada' : available ? 'disponible' : 'bloqueada'}" ${available ? '' : 'disabled'}>
          <i class="${icon}" aria-hidden="true"></i>${node.boss && !complete ? '<span class="visually-hidden-live">Jefe final</span>' : ''}
        </button><h3>${node.boss ? 'Jefe Final' : `Unidad ${node.id}`}</h3><p>${escapeHtml(node.titulo)}${complete ? ' · Completado' : available ? ' · Disponible' : ' · Bloqueado'}</p>
      </div>`;
    }).join('');
  }

  function renderMap() {
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">MAPA DE AVENTURA</p><h2>El conocimiento es tu ruta</h2><p>Completa cada unidad para abrir el siguiente territorio. El jefe final se habilita al terminar las tres misiones.</p><div class="quest-map" aria-label="Mapa de aventura">${mapNodes()}</div><div class="quest-actions"><button type="button" class="quest-btn quest-btn-secondary" data-action="home">Volver al inicio</button></div></section>`;
  }

  function renderMemory() {
    const cards = memory.deck.map((card, index) => {
      const isOpen = memory.open.includes(index);
      const isMatched = memory.matched.includes(card.pair);
      const visible = isOpen || isMatched;
      return `<button type="button" class="memory-card${visible ? '' : ' is-hidden'}${isMatched ? ' is-matched' : ''}" data-action="memory-card" data-card="${index}" aria-label="${visible ? escapeHtml(card.text) : `Carta ${index + 1}, oculta`}" aria-pressed="${isOpen || isMatched}" ${isMatched || memory.locked || isOpen ? 'disabled' : ''}>${visible ? escapeHtml(card.text) : '？'}</button>`;
    }).join('');
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">MISIÓN 1 · UNIDAD 1</p><h2>Los Cimientos del BI</h2><p class="game-instructions">Encuentra los seis pares concepto–definición. Usa clic o teclado para revelar una carta cada vez.</p>
      <div class="game-stats"><span class="game-stat">${memory.matched.length}/6 pares</span></div><div class="memory-grid" aria-label="Cartas de memoria">${cards}</div><p class="quest-feedback" id="gameFeedback" role="status" aria-live="polite"></p><div class="quest-actions"><button class="quest-btn quest-btn-secondary" type="button" data-action="map">Salir al mapa</button></div>
    </section>`;
  }

  function createMemoryDeck() {
    memory = { deck: RETOS.memoria.flatMap(([concept, definition], pair) => [
      { pair, text: concept }, { pair, text: definition }
    ]).sort(() => Math.random() - .5), open: [], matched: [], locked: false };
    setView('memory');
  }

  function renderMissionTwo() {
    const etl = missionTwo.order.map((id, index) => {
      const step = RETOS.etl.find((item) => item.id === id);
      return `<div class="etl-sort-item" draggable="true" data-etl="${id}" data-index="${index}" aria-label="${index + 1}. ${step.title}; use las flechas para cambiar el orden">
        <i class="fa-solid fa-grip-vertical etl-grip" aria-hidden="true"></i><strong>${escapeHtml(step.title)}</strong><small>${escapeHtml(step.description)}</small>
        <button class="etl-move" type="button" data-action="etl-move" data-index="${index}" data-direction="-1" aria-label="Mover ${step.title} hacia arriba" ${index === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
        <button class="etl-move" type="button" data-action="etl-move" data-index="${index}" data-direction="1" aria-label="Mover ${step.title} hacia abajo" ${index === 2 ? 'disabled' : ''}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
      </div>`;
    }).join('');
    const zones = RETOS.categories.map((category) => {
      const chips = RETOS.terms.filter((term) => missionTwo.placements[term.id] === category.id)
        .map((term) => `<span class="term-chip">${escapeHtml(term.text)}</span>`).join('');
      return `<button class="drop-zone" type="button" data-action="place-term" data-category="${category.id}" aria-label="Categoría ${escapeHtml(category.title)}. Activa para colocar el término seleccionado.">
        <strong>${escapeHtml(category.title)}</strong><span>${chips || '<span class="term-chip">Suelta o selecciona un término</span>'}</span>
      </button>`;
    }).join('');
    const bank = RETOS.terms.map((term) =>
      `<button class="term-card${missionTwo.selectedTerm === term.id ? ' is-selected' : ''}${missionTwo.placements[term.id] ? ' is-placed' : ''}" type="button" draggable="true" data-action="select-term" data-term="${term.id}" aria-pressed="${missionTwo.selectedTerm === term.id}" aria-label="${escapeHtml(term.text)}${missionTwo.placements[term.id] ? ', asignado; seleccionar para mover' : ''}">${escapeHtml(term.text)}${missionTwo.placements[term.id] ? ' ✓' : ''}</button>`).join('');
    const etlDone = missionTwo.order.join(',') === 'extract,transform,load';
    const categoriesDone = RETOS.terms.every((term) => missionTwo.placements[term.id] === term.category);
    const liveFeedback = missionTwo.feedback || (etlDone ? '¡Flujo ETL correcto!' : 'El flujo todavía no está en el orden Extract → Transform → Load.');
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">MISIÓN 2 · UNIDAD 2</p><h2>El Laberinto del Data Warehouse</h2><p class="game-instructions">Ordena ETL arrastrando o con flechas. Después, arrastra cada término a su categoría; con teclado, elige un término y activa su categoría.</p>
      <h3 class="quest-subheading">Parte A · Ordena el flujo ETL</h3><div class="etl-sort" aria-label="Pasos ETL en orden editable">${etl}</div>
      <h3 class="quest-subheading">Parte B · Clasifica los términos</h3><div class="term-bank" aria-label="Términos por clasificar">${bank || '<span class="term-chip">Todos los términos están asignados</span>'}</div><div class="category-board">${zones}</div>
      <p class="quest-feedback" id="gameFeedback" role="status" aria-live="polite">${escapeHtml(etlDone && categoriesDone ? '¡Todo correcto! Puedes completar la misión.' : liveFeedback)}</p>
      <div class="quest-actions"><button class="quest-btn" type="button" data-action="check-mission2">Comprobar y completar</button><button class="quest-btn quest-btn-secondary" type="button" data-action="map">Salir al mapa</button></div>
    </section>`;
  }

  function checkMissionTwo() {
    const feedback = byId('gameFeedback');
    const etlCorrect = missionTwo.order.join(',') === 'extract,transform,load';
    if (etlCorrect && !state.task2.etlRewarded) {
      addXp(20);
      state.task2.etlRewarded = true;
    } else if (!etlCorrect && !state.task2.etlPenalty) {
      addXp(-5);
      state.task2.etlPenalty = true;
    }
    let newCorrect = 0;
    RETOS.terms.forEach((term) => {
      const assigned = missionTwo.placements[term.id];
      if (!assigned) return;
      if (assigned === term.category) {
        if (!state.task2.completeTerms.includes(term.id)) {
          state.task2.completeTerms.push(term.id);
          newCorrect += 1;
        }
        if (!state.task2.scoredTerms.includes(term.id)) {
          state.task2.scoredTerms.push(term.id);
          addXp(20);
        }
      } else if (!state.task2.scoredTerms.includes(term.id)) {
        addXp(-5);
        state.task2.scoredTerms.push(term.id);
      }
    });
    saveProgress();
    const allCorrect = etlCorrect && RETOS.terms.every((term) => missionTwo.placements[term.id] === term.category);
    if (allCorrect) {
      completeMission(2, 150);
      return;
    }
    renderMissionTwo();
    byId('gameFeedback').textContent = 'Aún hay pasos o términos por corregir. Los aciertos y penalizaciones se aplican una sola vez por reto.';
    byId('gameFeedback').classList.add('is-error');
    if (newCorrect) playTone(true);
  }

  function renderMissionThree() {
    const choices = [...RETOS.componentesCorrectos, ...RETOS.distractores].map((component) => {
      const selected = selectedComponents.includes(component);
      const wrong = selected && !RETOS.componentesCorrectos.includes(component);
      return `<button class="component-card${wrong ? ' is-wrong' : ''}" type="button" data-action="toggle-component" data-component="${escapeHtml(component)}" aria-pressed="${selected}">${selected ? '<i class="fa-solid fa-check" aria-hidden="true"></i> ' : ''}${escapeHtml(component)}</button>`;
    }).join('');
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">MISIÓN 3 · UNIDAD 3</p><h2>Constructor de Soluciones BI</h2><p class="quest-instructions">Selecciona exactamente los seis componentes adecuados para el escenario.</p>
      <div class="quest-scenario"><strong>Escenario · ${escapeHtml(SILABO_DATA.proyecto.nombre)}</strong><br>${escapeHtml(SILABO_DATA.proyecto.descripcion)}</div>
      <div class="game-stats"><span class="game-stat">${selectedComponents.length}/6 seleccionados</span></div><div class="component-grid">${choices}</div>
      <p class="quest-feedback" id="gameFeedback" role="status" aria-live="polite"></p>
      <div class="quest-actions"><button class="quest-btn" type="button" data-action="check-mission3" ${selectedComponents.length === 6 ? '' : 'disabled'}>Validar solución</button><button class="quest-btn quest-btn-secondary" type="button" data-action="map">Salir al mapa</button></div>
    </section>`;
  }

  function renderKnowledge(unitId) {
    const unit = SILABO_DATA.unidades.find((item) => item.id === Number(unitId));
    if (!unit) return setView('map');
    const next = Number(unitId) < 3 ? `Unidad ${Number(unitId) + 1}` : 'Jefe Final';
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">TARJETA DE CONOCIMIENTO · UNIDAD ${unit.id}</p><h2>${escapeHtml(unit.subtitulo)}</h2>
      <div class="knowledge-card"><h3><i class="${unit.icono}" aria-hidden="true"></i> Síntesis de la unidad</h3><p>${escapeHtml(unit.resultado)}</p><ul>${unit.temas.map((topic) => `<li>${escapeHtml(topic)}</li>`).join('')}</ul><p><strong>Metodología indicada:</strong> ${escapeHtml(unit.metodo)}</p><p><strong>Actividad de evaluación:</strong> reto interactivo de esta página; no representa una evaluación oficial.</p></div>
      <p class="game-instructions">Resumen didáctico construido con la información parcial disponible. Confirma temas, horas y evaluación en el sílabo vigente.</p>
      <div class="game-stats"><span class="game-stat">${state.xp} XP acumulados</span><span class="game-stat">Insignia ${BADGES.find((badge) => badge.id === `u${unit.id}`)?.icon || ''} obtenida</span></div>
      <div class="quest-actions"><button class="quest-btn" type="button" data-action="map">Continuar · ${next}</button><button class="quest-btn quest-btn-secondary" type="button" data-action="home">Inicio</button></div></section>`;
  }

  function renderBoss() {
    const question = RETOS.jefeFinal[boss.question];
    const bossPercent = Math.max(0, (boss.health / 8) * 100);
    const playerPercent = (boss.playerHealth / 3) * 100;
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">JEFE FINAL · BATALLA DE CONOCIMIENTO</p><h2>El Guardián del Sílabo</h2>
      <div class="health-row"><div><div class="health-label"><span>Guardián</span><span>${boss.health}/8</span></div><div class="health-track" role="progressbar" aria-label="Vida del Guardián" aria-valuemin="0" aria-valuemax="8" aria-valuenow="${boss.health}"><span style="width:${bossPercent}%"></span></div></div>
      <div><div class="health-label"><span>Tu energía · ${'❤️'.repeat(boss.playerHealth)}${'♡'.repeat(3 - boss.playerHealth)}</span><span>${boss.playerHealth}/3</span></div><div class="health-track player" role="progressbar" aria-label="Energía del jugador" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${boss.playerHealth}"><span style="width:${playerPercent}%"></span></div></div></div>
      <div class="game-stats"><span class="game-stat">Ronda ${boss.question + 1}/10</span><span class="boss-timer" id="bossTimer"><i class="fa-regular fa-clock" aria-hidden="true"></i> <span>${boss.timer}</span> s</span></div>
      <h3 class="quest-subheading">${escapeHtml(question.pregunta)}</h3><div class="question-option-list">${question.opciones.map((option, index) => `<button class="quest-answer" type="button" data-action="boss-answer" data-answer="${index}">${escapeHtml(option)}</button>`).join('')}</div>
      <p class="quest-feedback" id="gameFeedback" role="status" aria-live="polite"></p></section>`;
    startBossTimer();
  }

  function startBossTimer() {
    clearInterval(timerId);
    timerId = window.setInterval(() => {
      if (view.name !== 'boss' || boss.locked) return clearInterval(timerId);
      boss.timer -= 1;
      const timer = byId('bossTimer');
      if (timer) timer.querySelector('span').textContent = String(boss.timer);
      if (boss.timer <= 0) resolveBossAnswer(-1, true);
    }, 1000);
  }

  function resolveBossAnswer(selected, timedOut = false) {
    if (boss.locked || view.name !== 'boss') return;
    boss.locked = true;
    clearInterval(timerId);
    const question = RETOS.jefeFinal[boss.question];
    const correct = selected === question.correcta;
    if (correct) boss.health = Math.max(0, boss.health - 1);
    else {
      boss.playerHealth = Math.max(0, boss.playerHealth - 1);
      boss.mistakes += 1;
    }
    playTone(correct);
    root.querySelectorAll('.quest-answer').forEach((button, index) => {
      button.disabled = true;
      if (index === question.correcta) button.classList.add('is-right');
      else if (index === selected) button.classList.add('is-wrong');
    });
    const feedback = byId('gameFeedback');
    feedback.textContent = `${timedOut ? 'Se agotó el tiempo. ' : ''}${correct ? '¡Impacto al Guardián! ' : 'El Guardián contraataca. '}${question.explicacion}`;
    if (boss.playerHealth <= 0) {
      transitionId = window.setTimeout(() => setView('boss-result', { won: false }), 1600);
      return;
    }
    if (boss.health <= 0) {
      transitionId = window.setTimeout(() => winBoss(), 1500);
      return;
    }
    if (boss.question >= RETOS.jefeFinal.length - 1) {
      transitionId = window.setTimeout(() => setView('boss-result', { won: false }), 1600);
      return;
    }
    transitionId = window.setTimeout(() => {
      boss.question += 1;
      boss.timer = 20;
      boss.locked = false;
      render();
    }, 1500);
  }

  function winBoss() {
    if (state.bossWon) return setView('boss-result', { won: true });
    state.bossWon = true;
    awardBadge('boss');
    if (boss.mistakes === 0) awardBadge('flawless');
    addXp(300);
    saveProgress();
    setView('boss-result', { won: true });
    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 220, spread: 95, origin: { y: .62 }, colors: ['#49c4a1', '#d2a745', '#e07b61', '#f6faf7'] });
    }
  }

  function certificateDataUrl() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('El navegador no pudo crear el certificado.');
    context.fillStyle = '#f7fbf8';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#075b50';
    context.lineWidth = 18;
    context.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);
    context.strokeStyle = '#d2a745';
    context.lineWidth = 3;
    context.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);
    context.textAlign = 'center';
    context.fillStyle = '#075b50';
    context.font = '700 30px sans-serif';
    context.fillText('UNIVERSIDAD TÉCNICA DE COTOPAXI · UTC', 600, 150);
    context.fillStyle = '#173632';
    context.font = '800 62px sans-serif';
    context.fillText('CERTIFICADO DE DOMINIO', 600, 275);
    context.font = '700 44px sans-serif';
    context.fillText('DEL SÍLABO', 600, 335);
    context.font = '24px sans-serif';
    context.fillText('Se reconoce la culminación de la aventura educativa', 600, 425);
    context.fillText('Sistemas de Información para la Inteligencia de Negocios', 600, 475);
    context.fillStyle = '#14735f';
    context.font = '800 38px sans-serif';
    context.fillText('🏆 BUSINESS INTELLIGENCE MASTER', 600, 565);
    context.fillStyle = '#506662';
    context.font = '22px sans-serif';
    context.fillText(`Experiencia acumulada: ${state.xp} XP`, 600, 640);
    context.fillText(`Emitido el ${new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(new Date())}`, 600, 690);
    context.font = '16px sans-serif';
    context.fillText('Reconocimiento didáctico; no constituye una certificación oficial de la UTC.', 600, 765);
    return canvas.toDataURL('image/png');
  }

  function renderBossResult(won) {
    if (!won) {
      root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">BATALLA TERMINADA</p><h2>El Guardián sigue en pie</h2><div class="boss-result is-lost"><div class="victory-icon" aria-hidden="true">🐉</div><h3>¡Puedes volver a intentarlo!</h3><p>Tu experiencia e insignias de las misiones se conservan. Repasa las tarjetas de conocimiento antes del siguiente combate.</p></div><div class="quest-actions"><button class="quest-btn" type="button" data-action="retry-boss">Reintentar jefe final</button><button class="quest-btn quest-btn-secondary" type="button" data-action="map">Volver al mapa</button></div></section>`;
      return;
    }
    let certificate;
    try {
      certificate = certificateDataUrl();
    } catch (error) {
      storageIssue = error.message;
    }
    root.innerHTML = `<section class="quest-screen-card"><p class="quest-section-label">MISIÓN CUMPLIDA · DOMINIO ALCANZADO</p><div class="quest-victory"><div class="victory-icon" aria-hidden="true">🏆</div><h2>¡Business Intelligence Master!</h2><p>Has derrotado al Guardián del Sílabo y completado la aventura.</p><div class="game-stats"><span class="game-stat">${state.xp} XP</span><span class="game-stat">${state.badges.length} insignias</span></div></div>
      ${certificate ? `<img class="certificate-preview" src="${certificate}" alt="Vista previa del Certificado de Dominio del Sílabo, reconocimiento didáctico no oficial">` : `<p class="quest-feedback is-error" role="alert">${escapeHtml(storageIssue)}</p>`}
      <div class="quest-actions">${certificate ? `<a class="quest-btn" href="${certificate}" download="certificado-silabo-quest.png"><i class="fa-solid fa-download" aria-hidden="true"></i> Descargar certificado PNG</a>` : ''}<button class="quest-btn quest-btn-secondary" type="button" data-action="knowledge" data-unit="1">Ver tarjetas de conocimiento</button></div></section>
      <section class="quest-screen-card" aria-labelledby="fullSummary"><p class="quest-section-label">RESUMEN DE LA ASIGNATURA</p><h2 id="fullSummary">${escapeHtml(SILABO_DATA.datosGenerales.asignatura)}</h2><div class="knowledge-card"><h3>Datos generales proporcionados</h3><ul><li>Carrera: ${escapeHtml(SILABO_DATA.datosGenerales.carrera)} · ${escapeHtml(SILABO_DATA.datosGenerales.ciclo)}</li><li>Créditos: ${SILABO_DATA.datosGenerales.creditos} · Horas totales indicadas: ${SILABO_DATA.datosGenerales.horas}</li><li>Docente: ${escapeHtml(SILABO_DATA.datosGenerales.docente)} · ${escapeHtml(SILABO_DATA.datosGenerales.correo)}</li><li>EVAL2: ${escapeHtml(SILABO_DATA.evaluaciones[0].fecha)}</li><li>Habilidades transversales sugeridas en esta actividad: ${SILABO_DATA.habilidadesBlandas.map(escapeHtml).join(', ')}</li><li>${escapeHtml(SILABO_DATA.bibliografia[0])}</li></ul><p>Estos datos se transcribieron de la solicitud y requieren contraste con el documento oficial.</p></div></section>`;
  }

  function completeMission(unitId, reward) {
    if (!state.completed.includes(unitId)) {
      state.completed.push(unitId);
      awardBadge(`u${unitId}`);
      addXp(reward);
    }
    saveProgress();
    setView('knowledge', { unit: unitId });
    playTone(true);
    if (typeof window.confetti === 'function') window.confetti({ particleCount: 70, spread: 55, origin: { y: .7 } });
  }

  function startBoss() {
    boss = { question: 0, health: 8, playerHealth: 3, timer: 20, mistakes: 0, locked: false };
    setView('boss');
  }

  function routeToNode(node) {
    if (node === 'boss') {
      if (state.bossWon) return setView('boss-result', { won: true });
      if (state.completed.length === 3) return startBoss();
      return;
    }
    const id = Number(node);
    if (state.completed.includes(id)) return setView('knowledge', { unit: id });
    if (id === 1 || state.completed.includes(id - 1)) {
      if (id === 1) createMemoryDeck();
      else if (id === 2) {
        missionTwo = { order: ['extract', 'transform', 'load'], placements: {}, selectedTerm: null };
        setView('mission2');
      } else {
        selectedComponents = [];
        setView('mission3');
      }
    }
  }

  function moveEtl(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= missionTwo.order.length) return;
    [missionTwo.order[index], missionTwo.order[target]] = [missionTwo.order[target], missionTwo.order[index]];
    missionTwo.feedback = missionTwo.order.join(',') === 'extract,transform,load'
      ? '¡Orden ETL correcto!'
      : 'El flujo todavía no está en el orden Extract → Transform → Load.';
    renderMissionTwo();
  }

  function placeTerm(termId, categoryId) {
    const term = RETOS.terms.find((item) => item.id === termId);
    if (!term) return;
    missionTwo.placements[termId] = categoryId;
    missionTwo.feedback = term.category === categoryId
      ? `¡Correcto! «${term.text}» corresponde a esta categoría.`
      : `Revisa la clasificación de «${term.text}» e inténtalo de nuevo.`;
  }

  function handleAction(button) {
    const action = button.dataset.action;
    if (action === 'start') setView('map');
    else if (action === 'home') setView('home');
    else if (action === 'map') setView('map');
    else if (action === 'open-node') routeToNode(button.dataset.node);
    else if (action === 'memory-card') selectMemoryCard(Number(button.dataset.card));
    else if (action === 'etl-move') moveEtl(Number(button.dataset.index), Number(button.dataset.direction));
    else if (action === 'select-term') {
      missionTwo.selectedTerm = missionTwo.selectedTerm === button.dataset.term ? null : button.dataset.term;
      renderMissionTwo();
    } else if (action === 'place-term') {
      if (!missionTwo.selectedTerm) {
        byId('gameFeedback').textContent = 'Primero selecciona un término; también puedes arrastrarlo aquí.';
        return;
      }
      placeTerm(missionTwo.selectedTerm, button.dataset.category);
      missionTwo.selectedTerm = null;
      renderMissionTwo();
    } else if (action === 'check-mission2') checkMissionTwo();
    else if (action === 'toggle-component') toggleComponent(button.dataset.component);
    else if (action === 'check-mission3') checkMissionThree();
    else if (action === 'knowledge') setView('knowledge', { unit: Number(button.dataset.unit) });
    else if (action === 'boss-answer') resolveBossAnswer(Number(button.dataset.answer));
    else if (action === 'retry-boss') startBoss();
    else if (action === 'victory') setView('boss-result', { won: true });
  }

  function selectMemoryCard(index) {
    if (memory.locked || memory.open.includes(index) || memory.matched.includes(memory.deck[index].pair)) return;
    memory.open.push(index);
    playTone(true);
    renderMemory();
    if (memory.open.length !== 2) return;
    const [first, second] = memory.open;
    if (memory.deck[first].pair === memory.deck[second].pair) {
      memory.matched.push(memory.deck[first].pair);
      memory.open = [];
      if (memory.matched.length === 6) {
        byId('gameFeedback').textContent = '¡Seis pares encontrados! Has desbloqueado la tarjeta de conocimiento.';
        transitionId = window.setTimeout(() => completeMission(1, 100), 850);
      } else {
        renderMemory();
      }
      return;
    }
    memory.locked = true;
    byId('gameFeedback').textContent = 'No coinciden. Prueba otra combinación.';
    playTone(false);
    transitionId = window.setTimeout(() => {
      memory.open = [];
      memory.locked = false;
      renderMemory();
    }, 950);
  }

  function toggleComponent(component) {
    const index = selectedComponents.indexOf(component);
    if (index >= 0) selectedComponents.splice(index, 1);
    else if (selectedComponents.length < 6) selectedComponents.push(component);
    renderMissionThree();
  }

  function checkMissionThree() {
    const isCorrect = selectedComponents.length === 6 && selectedComponents.every((item) => RETOS.componentesCorrectos.includes(item));
    if (isCorrect) {
      playTone(true);
      completeMission(3, 200);
      return;
    }
    playTone(false);
    byId('gameFeedback').textContent = 'Revisa la selección: deben ser exactamente los seis componentes correctos, sin distractores.';
    byId('gameFeedback').classList.add('is-error');
  }

  root.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (button && root.contains(button)) handleAction(button);
  });
  root.addEventListener('dragstart', (event) => {
    const etlItem = event.target.closest('[data-etl]');
    const term = event.target.closest('[data-action="select-term"]');
    if (etlItem) {
      draggedEtl = etlItem.dataset.etl;
      event.dataTransfer.setData('text/plain', `etl:${draggedEtl}`);
    } else if (term) {
      event.dataTransfer.setData('text/plain', `term:${term.dataset.term}`);
    } else {
      event.preventDefault();
    }
  });
  root.addEventListener('dragover', (event) => {
    if (event.target.closest('.etl-sort-item, .drop-zone')) event.preventDefault();
  });
  root.addEventListener('drop', (event) => {
    const item = event.target.closest('.etl-sort-item');
    const zone = event.target.closest('.drop-zone');
    const payload = event.dataTransfer.getData('text/plain');
    if (item && payload.startsWith('etl:')) {
      event.preventDefault();
      const from = missionTwo.order.indexOf(draggedEtl || payload.slice(4));
      const to = Number(item.dataset.index);
      if (from >= 0 && to >= 0 && from !== to) {
        const [step] = missionTwo.order.splice(from, 1);
        missionTwo.order.splice(to, 0, step);
        missionTwo.feedback = missionTwo.order.join(',') === 'extract,transform,load'
          ? '¡Orden ETL correcto!'
          : 'El flujo todavía no está en el orden Extract → Transform → Load.';
        renderMissionTwo();
      }
      draggedEtl = null;
    } else if (zone && payload.startsWith('term:')) {
      event.preventDefault();
      placeTerm(payload.slice(5), zone.dataset.category);
      missionTwo.selectedTerm = null;
      renderMissionTwo();
    }
  });

  byId('soundToggle').addEventListener('click', () => {
    state.sound = !state.sound;
    saveProgress();
    playTone(true);
  });
  byId('resetProgress').addEventListener('click', () => {
    if (!window.confirm('¿Reiniciar toda la aventura? Se borrarán el XP, las insignias y las misiones completadas de este juego.')) return;
    clearInterval(timerId);
    clearTimeout(transitionId);
    try {
      localStorage.removeItem(STORAGE_KEY);
      storageIssue = '';
    } catch {
      storageIssue = 'No se pudo eliminar el progreso guardado. Comprueba los permisos de almacenamiento del navegador.';
    }
    state = freshState();
    missionTwo = { order: ['extract', 'transform', 'load'], placements: {}, selectedTerm: null };
    selectedComponents = [];
    setView('home');
  });

  renderPlayer();
  if (storageIssue) byId('storageNotice').textContent = storageIssue;
  renderHome();
});
