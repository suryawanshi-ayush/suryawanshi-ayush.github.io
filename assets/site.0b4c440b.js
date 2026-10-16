/* Ayush Suryawanshi – portfolio interactions. No dependencies. */
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  window.__siteReady = true;

  /* ---------- theme ---------- */
  const themeBtn = $('.theme-btn');
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const labelTheme = () => themeBtn && themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  labelTheme();
  themeBtn?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: theme just won't persist */ }
    labelTheme();
  });

  /* ---------- mobile menu ---------- */
  const menuBtn = $('.menu-btn');
  const nav = $('#site-nav');
  const setMenu = (open) => {
    if (!menuBtn) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    nav.classList.toggle('open', open);
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- reveal on scroll ---------- */
  const reveal = $$('[data-reveal], .chart');
  if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
    // Stagger items that share a parent (cards, stages) so they arrive in reading order.
    reveal.forEach((el) => {
      const sibs = Array.from(el.parentElement.children).filter((c) => c.hasAttribute('data-reveal'));
      const i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    reveal.forEach((el) => io.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add('in'));
  }

  /* ---------- chart series toggle ---------- */
  $$('[data-chart="durability"]').forEach((chart) => {
    const bars = $('.bars', chart);
    $$('.seg button', chart).forEach((b) =>
      b.addEventListener('click', () => {
        $$('.seg button', chart).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        bars.dataset.show = b.dataset.show;
      }),
    );
  });

  /* ---------- project filters ---------- */
  const filters = $('.filters');
  if (filters) {
    const cards = $$('.card[data-kind]');
    const count = $('[data-count]', filters);
    $$('button', filters).forEach((b) =>
      b.addEventListener('click', () => {
        $$('button', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const k = b.dataset.filter;
        let n = 0;
        cards.forEach((c) => {
          const show = k === 'all' || c.dataset.kind.split(' ').includes(k);
          c.hidden = !show;
          if (show) { n++; c.classList.add('in'); }
        });
        count.textContent = `${n} project${n === 1 ? '' : 's'}`;
      }),
    );
  }

  /* ---------- table of contents highlight ---------- */
  const tocLinks = $$('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(tocLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const seen = new Set();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => (en.isIntersecting ? seen.add(en.target.id) : seen.delete(en.target.id)));
        const first = [...map.keys()].find((id) => seen.has(id));
        if (first) tocLinks.forEach((a) => a.classList.toggle('active', a === map.get(first)));
      },
      { rootMargin: '-90px 0px -55% 0px' },
    );
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- lightbox ---------- */
  const box = $('.lightbox');
  const zoomables = $$('[data-zoom]');
  if (box && zoomables.length && typeof box.showModal === 'function') {
    const big = $('img', box);
    const cap = $('.lb-cap', box);
    const navEl = $('.lb-nav', box);
    let group = [];
    let idx = 0;
    let opener = null;
    const show = (i) => {
      idx = (i + group.length) % group.length;
      const im = group[idx];
      big.src = im.dataset.zoom;
      const full = $('.lb-full', box);
      if (full) full.href = im.dataset.zoom;
      big.alt = im.alt;
      const fc = im.closest('figure')?.querySelector('figcaption');
      cap.textContent = fc ? fc.innerText.trim().replace(/\s*\n+\s*/g, ' · ') : '';
    };
    zoomables.forEach((im) => {
      im.tabIndex = 0;
      im.setAttribute('role', 'button');
      im.setAttribute('aria-label', `Enlarge image: ${im.alt}`);
      const open = () => {
        // Group by the nearest section so arrows step through related figures.
        const scope = im.closest('section') || document;
        group = $$('[data-zoom]', scope).filter((x) => x.offsetParent !== null || x === im);
        navEl.hidden = group.length < 2;
        opener = im;
        show(group.indexOf(im));
        box.showModal();
      };
      im.addEventListener('click', open);
      im.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    $$('[data-step]', box).forEach((b) => b.addEventListener('click', () => show(idx + Number(b.dataset.step))));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && group.length > 1) show(idx + 1);
      if (e.key === 'ArrowLeft' && group.length > 1) show(idx - 1);
    });
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
    box.addEventListener('close', () => opener?.focus());
  }

  /* ---------- formic acid schematic ---------- */
  const SVGNS = 'http://www.w3.org/2000/svg';
  const siteX = (i) => 60 + i * 52;
  // Two fixed, repeatable layouts so the schematic tells the same story every time.
  // Phones get fewer, larger atoms so the labels stay readable.
  const LAYOUTS = {
    wide: { n: 11, bi: [2, 5, 8], targets: [3, 7, 1, 9, 5, 0, 10, 4, 8], pt: ['co', 'co2', 'co', 'co2', 'co', 'co', 'co2', 'co', 'co'] },
    narrow: { n: 7, bi: [1, 4], targets: [2, 5, 0, 6, 3, 1, 4], pt: ['co', 'co2', 'co', 'co2', 'co', 'co', 'co2'] },
  };
  const NOTES = {
    pt: 'On plain platinum, part of the formic acid takes the indirect path and leaves CO stuck to the surface. Each blocked site stops contributing current.',
    bi: 'With bismuth on the surface, the groups of neighbouring Pt atoms that CO formation needs are broken up, so molecules take the direct path to CO₂ and the sites stay free.',
  };
  const LABEL = { fa: 'HCOOH', co2: 'CO₂', co: 'CO' };
  const WIDTH = { fa: 66, co2: 48, co: 40 };

  function pill(kind) {
    const g = document.createElementNS(SVGNS, 'g');
    g.setAttribute('class', `mol ${kind}`);
    const r = document.createElementNS(SVGNS, 'rect');
    r.setAttribute('height', '22');
    r.setAttribute('y', '-11');
    const t = document.createElementNS(SVGNS, 'text');
    g.append(r, t);
    setPill(g, kind);
    return g;
  }
  function setPill(g, kind) {
    g.setAttribute('class', `mol ${kind}`);
    const w = WIDTH[kind];
    const r = g.firstChild;
    r.setAttribute('width', w);
    r.setAttribute('x', -w / 2);
    g.lastChild.textContent = LABEL[kind];
  }
  const place = (g, x, y) => g.setAttribute('transform', `translate(${x} ${y})`);

  $$('[data-mech]').forEach((fig) => {
    const svg = $('svg', fig);
    const mols = $('.mols', fig);
    const ptRow = $('.pt-row', fig);
    const biRow = $('.bi-row', fig);
    const support = $('.support', fig);
    const free = $('[data-free]', fig);
    let L = LAYOUTS.wide;
    let atoms = $$('.pt', ptRow);
    const circle = (cls, cx, cy, r) => {
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('class', cls); c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
      return c;
    };
    const layout = () => {
      const next = fig.clientWidth < 520 ? LAYOUTS.narrow : LAYOUTS.wide;
      if (next === L && atoms.length === L.n) return false;
      L = next;
      ptRow.replaceChildren(...Array.from({ length: L.n }, (_, i) => circle('pt', siteX(i), 214, 21)));
      biRow.replaceChildren(...L.bi.map((i) => circle('bi', siteX(i) + 26, 186, 15)));
      atoms = $$('.pt', ptRow);
      const w = siteX(L.n - 1) - siteX(0) + 80;
      support.setAttribute('width', w);
      svg.setAttribute('viewBox', `10 50 ${w + 20} 240`);
      return true;
    };
    const meter = $('[data-meter]', fig);
    const note = $('[data-note]', fig);
    let run = 0;
    let started = false;

    const setReadout = (n) => {
      free.textContent = `${n} / ${L.n}`;
      meter.style.width = `${(n / L.n) * 100}%`;
      if (n / L.n < 0.6) fig.setAttribute('data-low', ''); else fig.removeAttribute('data-low');
    };
    const reset = () => {
      run++;
      mols.replaceChildren();
      atoms.forEach((a) => a.classList.remove('blocked'));
      setReadout(L.n);
      note.textContent = NOTES[fig.dataset.mode];
    };
    const finalState = () => {
      reset();
      if (fig.dataset.mode !== 'pt') return;
      let n = L.n;
      L.targets.forEach((t, i) => {
        if (L.pt[i] !== 'co') return;
        const g = pill('co');
        place(g, siteX(t), 172);
        mols.append(g);
        atoms[t].classList.add('blocked');
        n--;
      });
      setReadout(n);
    };
    const animate = () => {
      if (reduce.matches || !mols.animate) { finalState(); return; }
      reset();
      const id = run;
      let n = L.n;
      L.targets.forEach((t, i) => {
        const outcome = fig.dataset.mode === 'pt' ? L.pt[i] : 'co2';
        const x = siteX(t);
        setTimeout(() => {
          if (id !== run) return;
          const g = pill('fa');
          mols.append(g);
          const fall = g.animate(
            [{ transform: `translate(${x - 18}px, 50px)`, opacity: 0 }, { transform: `translate(${x - 6}px, 90px)`, opacity: 1, offset: 0.25 }, { transform: `translate(${x}px, 170px)`, opacity: 1 }],
            { duration: 1100, easing: 'cubic-bezier(.45,0,.6,1)', fill: 'forwards' },
          );
          fall.onfinish = () => {
            if (id !== run) return;
            setPill(g, outcome);
            if (outcome === 'co') {
              place(g, x, 172);
              fall.cancel();
              g.animate([{ transform: `translate(${x}px, 170px) scale(1.15)` }, { transform: `translate(${x}px, 172px) scale(1)` }], { duration: 300, easing: 'ease-out' });
              atoms[t].classList.add('blocked');
              setReadout(--n);
            } else {
              const up = g.animate(
                [{ transform: `translate(${x}px, 170px)`, opacity: 1 }, { transform: `translate(${x + 22}px, 100px)`, opacity: 0.9, offset: 0.7 }, { transform: `translate(${x + 30}px, 66px)`, opacity: 0 }],
                { duration: 1300, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' },
              );
              up.onfinish = () => g.remove();
            }
          };
        }, i * 520);
      });
    };

    $$('.seg button', fig).forEach((b) =>
      b.addEventListener('click', () => {
        $$('.seg button', fig).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        fig.dataset.mode = b.dataset.mode;
        animate();
      }),
    );
    $('[data-replay]', fig)?.addEventListener('click', animate);

    // Start the first run only when the schematic is actually on screen.
    layout();
    finalState();
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (layout()) finalState(); }, 150);
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) { started = true; io.disconnect(); animate(); }
      }, { threshold: 0.45 });
      io.observe(fig);
    }
  });
})();
