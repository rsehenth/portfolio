/* Additive motion layer. The [data-reveal] observer in BaseLayout owns the
   fade-up system; this module only adds its own attributes/classes so it can
   run inside [data-view], where [data-reveal] is forced visible with !important. */

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* One observer registry and one scroll pipeline for the whole page, so
   navigating with view transitions cannot accumulate listeners or rAF loops. */
const liveObservers = new Set();
const scrollTasks = [];
let scrollRaf = 0;
let scrollBound = false;

function onceInView(elements, cb, { threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  if (!elements.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        cb(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold, rootMargin }
  );

  liveObservers.add(io);
  elements.forEach((el) => io.observe(el));
}

function runScrollTasks() {
  scrollRaf = 0;
  for (const task of scrollTasks) task();
}

function scheduleScroll() {
  if (!scrollRaf) scrollRaf = requestAnimationFrame(runScrollTasks);
}

function onScroll(task) {
  scrollTasks.push(task);
  if (!scrollBound) {
    scrollBound = true;
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleScroll);
  }
  task();
}

/* ── 2. Home process rail ───────────────────────────────────────────── */
function initHomeProcess() {
  const ol = document.querySelector('ol.home-process');
  if (!ol || ol.dataset.fxInit) return;
  ol.dataset.fxInit = '1';

  const steps = [...ol.children];
  if (!steps.length) return;

  ol.style.setProperty('--process-p', '0');

  onceInView(
    steps,
    (el) => {
      const i = steps.indexOf(el);
      ol.style.setProperty('--process-p', String((i + 1) / steps.length));
    },
    { threshold: 0.4, rootMargin: '0px 0px -12% 0px' }
  );
}

/* ── 8. Pillar cards entering on scroll (FX-3) ──────────────────────── */
function initPillarCards() {
  const grid = document.querySelector('[data-fx-cards]');
  if (!grid || grid.dataset.fxInit) return;
  grid.dataset.fxInit = '1';

  const cards = [...grid.children];
  if (!cards.length) return;

  /* deterministic stagger instead of the demo's random one: same row, same
     rhythm every visit, so the entry never looks like a glitch */
  cards.forEach((card, i) => {
    card.style.setProperty('--fx-delay', `${(i * 0.12).toFixed(2)}s`);
  });

  onceInView(
    cards,
    (card) => {
      /* Measured against the grid, not offsetParent: the strip is not
         positioned, so offsetParent is <body> and its width is the viewport,
         which would call a single stacked column "off centre". */
      const gridRect = grid.getBoundingClientRect();
      const rect = card.getBoundingClientRect();
      const stacked = rect.width > gridRect.width - 8;
      const dirX = stacked ? 0 : rect.left + rect.width / 2 < gridRect.left + gridRect.width / 2 ? -1 : 1;
      const dirY = rect.top < 0 ? -1 : 1;

      /* The vars feed the transform that .is-in transitions *from*. Writing
         them normally would start a transform transition of their own, and
         .is-in would then restart from the in-flight value (x ≈ 0), so the
         card would only ever rise. Suppress, commit, restore. */
      card.style.transition = 'none';
      card.style.setProperty('--fx-x', `${dirX * 56}px`);
      card.style.setProperty('--fx-y', `${dirY * 64}px`);
      card.style.setProperty('--fx-sx', `${dirX * 22}px`);
      void card.offsetWidth;
      card.style.transition = '';
      card.classList.add('is-in');
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  );
}

/* ── 7. Scroll progress bar ─────────────────────────────────────────── */
function initScrollProgress() {
  const fill = document.querySelector('[data-fx-progress]');
  if (!fill) return;

  onScroll(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.setProperty('--p', p.toFixed(4));
  });
}

export function initMotionExtra() {
  if (reduced()) return;

  resetMotionState();

  initHomeProcess();
  initPillarCards();
  initScrollProgress();
}

function resetMotionState() {
  for (const io of liveObservers) io.disconnect();
  liveObservers.clear();
  scrollTasks.length = 0;
}
