# Fundamentos de Business Intelligence — UTC

Sitio educativo de dos páginas para estudiar los fundamentos de Business Intelligence (BI) y explorar un dashboard académico de demostración. Está construido con HTML5, CSS3 y JavaScript vanilla; Bootstrap 5, Chart.js, Font Awesome y canvas-confetti se cargan desde CDN.

## Abrir el sitio

1. Descarga o clona el proyecto y abre la carpeta en GitHub Codespaces o en tu equipo.
2. Abre `index.html` directamente en un navegador. No se requiere instalar dependencias ni iniciar un servidor.
3. Usa la navegación superior para cambiar entre **Teoría y quiz** y **Dashboard académico**.

Se necesita conexión a internet para cargar las librerías, iconos y tipografías desde CDN. El sitio usa rutas relativas, por lo que también puede previsualizarse desde Codespaces.

## Contenido

- `index.html`: introducción a BI, decisiones basadas en datos, ciclo de decisión, proceso ETL, casos de educación superior y cuestionario.
- `dashboard.html`: indicadores, cinco visualizaciones, selector de semestre y novedades académicas recientes.
- `css/styles.css`: variables, navegación, estilos compartidos, secciones teóricas y diseño adaptable.
- `css/quiz.css`: presentación del cuestionario, temporizador, retroalimentación y resultados.
- `css/dashboard.css`: estilos de indicadores, gráficas, tabla y controles del dashboard.
- `js/main.js`: utilidades compartidas y fecha dinámica del panel.
- `js/quiz.js`: preguntas, puntuación, temporizador, sonido opcional, insignias, confetti y mejor puntaje en `localStorage`.
- `js/dashboard.js`: creación de gráficas Chart.js y actualización de datos según el semestre.
- `img/`: reservado para imágenes opcionales; esta versión utiliza iconografía CDN y no necesita recursos locales.

## Datos de demostración

Las cifras, carreras y novedades del dashboard son ficticias y se incluyen únicamente con fines educativos. El botón **Exportar reporte** simula la acción mediante un mensaje y una entrada en la consola; no genera un archivo.

## Accesibilidad y compatibilidad

Las páginas incluyen regiones semánticas, enlace para saltar al contenido, etiquetas para controles y descripciones para los canvas. El diseño se adapta a móvil, tablet y escritorio y respeta la preferencia de movimiento reducido del sistema. El botón de tema claro/oscuro conserva la selección en el navegador y se comparte entre ambas páginas.
