// Cuestionario de fundamentos de BI con retroalimentación inmediata.
document.addEventListener('DOMContentLoaded', () => {
  const quizRoot = document.getElementById('quizApp');
  if (!quizRoot) return;

  const questions = [
    {
      category: 'Fundamentos de BI',
      text: '¿Cuál es el propósito central de Business Intelligence?',
      answers: ['Almacenar todos los datos sin procesarlos', 'Convertir datos en información útil para decidir', 'Reemplazar por completo el criterio profesional', 'Automatizar cualquier tarea de una organización'],
      correct: 1,
      explanation: 'BI integra y analiza datos para entregar información que apoye decisiones mejor fundamentadas.'
    },
    {
      category: 'Toma de decisiones',
      text: '¿Qué distingue principalmente a una decisión basada en datos?',
      answers: ['Se toma más rápido en todos los casos', 'Se apoya en evidencia pertinente que puede contrastarse', 'Elimina la necesidad de comprender el contexto', 'Utiliza únicamente datos numéricos'],
      correct: 1,
      explanation: 'La evidencia permite comprobar supuestos, pero debe interpretarse junto con el contexto y la experiencia.'
    },
    {
      category: 'Toma de decisiones',
      text: '¿Cuál es el orden del ciclo de decisión informada presentado en esta unidad?',
      answers: ['Acción → recolección → evaluación → análisis', 'Análisis → acción → recolección → evaluación', 'Recolección → análisis → acción → evaluación', 'Evaluación → análisis → acción → recolección'],
      correct: 2,
      explanation: 'El ciclo comienza al reunir datos, analizarlos, actuar según los hallazgos y evaluar el resultado.'
    },
    {
      category: 'ETL',
      text: 'En ETL, ¿qué sucede durante la fase Extract?',
      answers: ['Se publican los indicadores a la comunidad', 'Se recopilan datos de las fuentes de origen', 'Se eliminan todos los registros incompletos', 'Se calculan las tendencias futuras'],
      correct: 1,
      explanation: 'Extract conecta y obtiene datos desde fuentes como sistemas académicos o archivos institucionales.'
    },
    {
      category: 'ETL',
      text: '¿Cuál es una tarea propia de Transform?',
      answers: ['Unificar formatos y corregir inconsistencias', 'Capturar nuevos datos en el sistema de origen', 'Presentar el dashboard a los usuarios', 'Guardar el modelo en el repositorio final'],
      correct: 0,
      explanation: 'Transform limpia, valida y adapta los datos para que sean coherentes y analizables.'
    },
    {
      category: 'ETL',
      text: '¿Qué describe la fase Load?',
      answers: ['Localizar fuentes de datos disponibles', 'Definir la pregunta de investigación', 'Cargar los datos preparados en un repositorio analítico', 'Corregir valores duplicados en origen'],
      correct: 2,
      explanation: 'Load almacena los datos transformados en el destino analítico desde el que se harán consultas.'
    },
    {
      category: 'Herramientas de BI',
      text: '¿Cuál de estas herramientas se utiliza comúnmente para crear informes y visualizaciones de BI?',
      answers: ['Power BI', 'Un editor de texto plano exclusivamente', 'Un gestor de contraseñas', 'Un compilador de lenguaje C'],
      correct: 0,
      explanation: 'Power BI permite modelar datos y construir informes interactivos para explorar indicadores.'
    },
    {
      category: 'BI en educación',
      text: 'Una carrera detecta muchas reprobaciones en primer nivel. ¿Qué uso de BI sería más apropiado?',
      answers: ['Excluir esas calificaciones del análisis', 'Comparar resultados y asistencia para orientar tutorías y evaluar su efecto', 'Aumentar todas las notas automáticamente', 'Esperar al final de la carrera para intervenir'],
      correct: 1,
      explanation: 'Analizar resultados por paralelo, asignatura y asistencia puede ayudar a focalizar apoyos y medirlos.'
    },
    {
      category: 'BI en educación',
      text: '¿Qué puede revelar el análisis de la tasa de titulación?',
      answers: ['La proporción de estudiantes que culmina sus estudios en un periodo definido', 'El número de cursos abiertos en un mes', 'La cantidad de computadores en los laboratorios', 'La satisfacción con un solo evento'],
      correct: 0,
      explanation: 'La tasa de titulación permite observar la culminación de estudios y buscar oportunidades para facilitarla.'
    },
    {
      category: 'Calidad de datos',
      text: '¿Por qué se evalúan los resultados después de aplicar una intervención académica?',
      answers: ['Para cerrar definitivamente el ciclo de BI', 'Para comprobar el efecto y generar nueva evidencia para el siguiente ciclo', 'Para evitar recopilar datos en el futuro', 'Para reemplazar los indicadores por opiniones'],
      correct: 1,
      explanation: 'La evaluación indica si la acción funcionó y aporta datos para ajustar las decisiones posteriores.'
    }
  ];

  const content = document.getElementById('quizContent');
  const progressBar = document.getElementById('progressBar');
  const progress = document.querySelector('.quiz-progress');
  const progressLabel = document.getElementById('progressLabel');
  const progressCount = document.getElementById('progressCount');
  const scoreValue = document.getElementById('scoreValue');
  const liveRegion = document.getElementById('quizLive');
  const soundToggle = document.getElementById('soundToggle');
  const storageKey = 'utc-bi-quiz-best';
  let currentIndex = 0;
  let score = 0;
  let timerId = null;
  let audioContext;

  function readBestScore() {
    try {
      return Number(localStorage.getItem(storageKey)) || 0;
    } catch {
      return 0;
    }
  }

  function updateProgress(index) {
    const completed = index >= questions.length ? questions.length : index + 1;
    const percentage = (completed / questions.length) * 100;
    progressBar.style.width = `${percentage}%`;
    progress.setAttribute('aria-valuenow', String(completed));
    progressCount.textContent = `${completed} / ${questions.length}`;
    progressLabel.textContent = index >= questions.length ? 'RESULTADO' : `PREGUNTA ${completed}`;
  }

  function playTone(isCorrect) {
    if (!soundToggle.checked) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioContext ||= new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = isCorrect ? 660 : 245;
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.18);
    } catch {
      // El quiz sigue funcionando si el navegador bloquea el audio.
    }
  }

  function renderQuestion() {
    clearInterval(timerId);
    const question = questions[currentIndex];
    updateProgress(currentIndex);
    content.innerHTML = `
      <div class="question-enter">
        <div class="question-topline">
          <span class="question-category">${question.category}</span>
          <span class="timer" id="questionTimer" aria-label="Tiempo restante: 15 segundos"><i class="fa-regular fa-clock" aria-hidden="true"></i><span id="timerValue">15</span> s<span class="timer-track" aria-hidden="true"><span class="timer-fill" id="timerFill"></span></span></span>
        </div>
        <h3 class="question-text" id="questionText">${question.text}</h3>
        <div class="answer-list" role="group" aria-labelledby="questionText">
          ${question.answers.map((answer, answerIndex) => `<button class="answer-option" type="button" data-answer="${answerIndex}"><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + answerIndex)}</span><span class="answer-copy">${answer}</span></button>`).join('')}
        </div>
        <div id="feedbackSlot"></div>
      </div>`;

    content.querySelectorAll('.answer-option').forEach((button) => {
      button.addEventListener('click', () => answerQuestion(Number(button.dataset.answer), false));
    });
    content.querySelector('.answer-option').focus({ preventScroll: true });
    startTimer();
  }

  function startTimer() {
    let secondsLeft = 15;
    timerId = window.setInterval(() => {
      secondsLeft -= 1;
      const timer = document.getElementById('questionTimer');
      const timerValue = document.getElementById('timerValue');
      const timerFill = document.getElementById('timerFill');
      if (!timer || !timerValue || !timerFill) return clearInterval(timerId);
      timerValue.textContent = String(secondsLeft);
      timerFill.style.width = `${(secondsLeft / 15) * 100}%`;
      timer.setAttribute('aria-label', `Tiempo restante: ${secondsLeft} segundos`);
      if (secondsLeft <= 5) timer.classList.add('is-urgent');
      if (secondsLeft <= 0) answerQuestion(-1, true);
    }, 1000);
  }

  function answerQuestion(selectedIndex, timedOut) {
    if (content.querySelector('.feedback-box')) return;
    clearInterval(timerId);
    const question = questions[currentIndex];
    const isCorrect = selectedIndex === question.correct;
    if (isCorrect) {
      score += 10;
      scoreValue.textContent = String(score);
    }
    playTone(isCorrect);
    const answerButtons = content.querySelectorAll('.answer-option');
    answerButtons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.correct) button.classList.add('is-correct');
      else if (index === selectedIndex) button.classList.add('is-incorrect');
      else button.classList.add('is-muted');
    });

    const feedbackSlot = document.getElementById('feedbackSlot');
    const feedbackTitle = timedOut ? 'Se acabó el tiempo' : isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta';
    const feedbackIcon = isCorrect ? 'fa-circle-check' : 'fa-circle-xmark';
    const correctAnswer = question.answers[question.correct];
    feedbackSlot.innerHTML = `
      <div class="feedback-box${isCorrect ? '' : ' is-incorrect'}" role="status">
        <span class="feedback-icon"><i class="fa-solid ${feedbackIcon}" aria-hidden="true"></i></span>
        <div class="feedback-copy"><strong>${feedbackTitle}${isCorrect ? ' +10 puntos' : ` · La correcta era: ${correctAnswer}`}</strong><p>${question.explanation}</p></div>
      </div>
      <div class="feedback-actions"><button class="btn-next-question" id="nextQuestion" type="button">${currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></div>`;
    liveRegion.textContent = `${feedbackTitle}. ${question.explanation}`;
    document.getElementById('nextQuestion').addEventListener('click', () => {
      currentIndex += 1;
      if (currentIndex >= questions.length) showResult();
      else renderQuestion();
    });
    document.getElementById('nextQuestion').focus({ preventScroll: true });
  }

  function showResult() {
    clearInterval(timerId);
    updateProgress(questions.length);
    const percentage = score;
    const message = percentage >= 90
      ? 'Excelente: relacionas los fundamentos de BI con decisiones educativas concretas.'
      : percentage >= 70
        ? 'Bueno: tienes una base sólida; repasa los detalles de ETL y sigue practicando.'
        : 'Refuerza los conceptos clave y vuelve a intentarlo: cada repaso afianza el aprendizaje.';
    const previousBest = readBestScore();
    const best = Math.max(score, previousBest);
    const isNewRecord = score > previousBest;
    try {
      localStorage.setItem(storageKey, String(best));
    } catch {
      // El resultado se presenta aunque el almacenamiento local esté deshabilitado.
    }
    const badges = [
      { emoji: '🥉', name: 'Bronce', threshold: 50 },
      { emoji: '🥈', name: 'Plata', threshold: 70 },
      { emoji: '🥇', name: 'Oro', threshold: 90 }
    ];
    content.innerHTML = `
      <div class="quiz-result">
        <span class="welcome-icon"><i class="fa-solid fa-flag-checkered" aria-hidden="true"></i></span>
        <h3>Cuestionario completado</h3>
        <p class="result-score"><span>${score}</span><span>/ 100 pts · ${percentage}%</span></p>
        <p class="result-message">${message}</p>
        ${isNewRecord ? '<p class="new-record"><i class="fa-solid fa-sparkles" aria-hidden="true"></i> ¡Nuevo mejor puntaje!</p>' : ''}
        <div class="badge-list" aria-label="Insignias desbloqueadas">
          ${badges.map((badge) => `<div class="quiz-badge${percentage >= badge.threshold ? ' is-unlocked' : ''}"${percentage >= badge.threshold ? '' : ' aria-label="Insignia bloqueada"'}><span class="badge-emoji" aria-hidden="true">${badge.emoji}</span><strong>${badge.name}</strong><span>≥ ${badge.threshold}%</span></div>`).join('')}
        </div>
        <p class="result-best">Mejor puntaje: ${best} / 100</p>
        <button class="btn btn-quiz-primary" id="retryQuiz" type="button"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Reintentar cuestionario</button>
      </div>`;
    liveRegion.textContent = `Cuestionario terminado. Puntaje: ${score} de 100, ${percentage} por ciento. ${message}`;
    document.getElementById('retryQuiz').addEventListener('click', startQuiz);
    document.getElementById('retryQuiz').focus({ preventScroll: true });
    if (percentage >= 50 && typeof window.confetti === 'function') {
      window.confetti({ particleCount: 110, spread: 65, origin: { y: 0.65 }, colors: ['#49c4a1', '#d2a745', '#e07b61', '#f6faf7'] });
    }
  }

  function startQuiz() {
    currentIndex = 0;
    score = 0;
    scoreValue.textContent = '0';
    renderQuestion();
  }

  const bestScore = readBestScore();
  if (bestScore > 0) document.getElementById('bestScore').textContent = `Tu mejor puntaje: ${bestScore} / 100`;
  document.getElementById('startQuiz').addEventListener('click', startQuiz);
});
