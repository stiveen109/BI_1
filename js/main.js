// Utilidades compartidas por las páginas del sitio.
document.addEventListener('DOMContentLoaded', () => {
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
