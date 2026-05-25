// IDs de las secciones en orden
const IDS = ['problematica', 'solucion', 'caracteristicas', 'beneficios', 'precios', 'contacto'];
const N = IDS.length;

// Inicializar dots de navegación
IDS.forEach((_, si) => {
  const dotsContainer = document.getElementById('dots-' + si);
  if (dotsContainer) {
    IDS.forEach((__, di) => {
      const d = document.createElement('div');
      d.className = 'dot' + (di === si ? ' active' : '');
      dotsContainer.appendChild(d);
    });
  }
});

// Función para navegar a una sección por ID
function goToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Función para navegar entre secciones con dirección
function navigate(dir) {
  const mid = window.scrollY + window.innerHeight * 0.45;
  let cur = 0;
  IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= mid) cur = i;
  });
  const nxt = cur + dir;
  if (nxt >= 0 && nxt < N) {
    goToSection(IDS[nxt]);
  }
}

// Manejo del scroll: actualizar barra de progreso y tabs activos
function onScroll() {
  const sy = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const progressLine = document.getElementById('pline');
  if (progressLine) {
    progressLine.style.width = (docH > 0 ? (sy / docH) * 100 : 0) + '%';
  }

  let activeIndex = 0;
  IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 110) {
      activeIndex = i;
    }
  });

  document.querySelectorAll('.nav-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === activeIndex);
  });
}

// Configurar event listeners
function setupEventListeners() {
  // Navegación por tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const sectionId = tab.getAttribute('data-section');
      if (sectionId) goToSection(sectionId);
    });
  });

  // Botones de siguiente/anterior
  document.querySelectorAll('.btn-next, .btn-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dir = btn.getAttribute('data-dir');
      if (dir) navigate(parseInt(dir));
    });
  });

  // Botón demo en contacto
  const demoBtn = document.getElementById('demoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Solicitud enviada. Pronto nos comunicaremos con usted.');
    });
  }
}

// Manejar navegación por hash al cargar
function handleHashNavigation() {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    if (IDS.includes(id)) {
      setTimeout(() => goToSection(id), 100);
    }
  }
}

// Inicializar
function init() {
  setupEventListeners();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', () => {
    onScroll();
    handleHashNavigation();
  });
}

// Ejecutar inicialización
init();