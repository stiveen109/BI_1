// Utilidades compartidas por las páginas del sitio.
document.addEventListener('DOMContentLoaded', () => {
  const themeButton = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist = true) {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', String(isDark));
    themeButton.setAttribute('aria-label', `Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`);
    themeIcon.classList.toggle('fa-moon', !isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
    themeLabel.textContent = isDark ? 'Tema claro' : 'Tema oscuro';
    themeMeta.content = isDark ? '#111d18' : '#075b50';

    if (persist) {
      try {
        localStorage.setItem('utc-bi-theme', isDark ? 'dark' : 'light');
      } catch {
        // El cambio visual sigue disponible si el almacenamiento está bloqueado.
      }
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: isDark ? 'dark' : 'light' } }));
  }

  const savedTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  applyTheme(savedTheme, false);
  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const now = new Date();
    dateElement.dateTime = now.toISOString().slice(0, 10);
    dateElement.textContent = new Intl.DateTimeFormat('es-EC', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now);
  }
});
