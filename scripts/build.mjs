// Builds the static site into the repository root, which is what GitHub Pages serves.
// Usage: node scripts/build.mjs   (no dependencies; Node 18+)
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';
import { config, url, liveUrl, esc, strip, img, fig } from '../src/lib.mjs';
import {
  person, education, experience, skills, coursework, recognition, stages, timeline, gallery, projects, kinds, mechanism, credentials,
} from '../src/content.mjs';

const ROOT = new URL('../', import.meta.url).pathname;
const out = (p, s) => {
  const f = ROOT + p;
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, s);
};

/* ---------- assets, fingerprinted so browsers never keep a stale copy ---------- */
rmSync(ROOT + 'assets', { recursive: true, force: true });
const asset = (name) => {
  const src = readFileSync(ROOT + 'src/' + name);
  const hash = createHash('sha1').update(src).digest('hex').slice(0, 8);
  const [base, ext] = name.split('.');
  out(`assets/${base}.${hash}.${ext}`, src);
  return url(`assets/${base}.${hash}.${ext}`);
};
const CSS = asset('site.css');
const JS = asset('site.js');

const FONTS =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Serif:wght@400;500&display=swap';

const ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#15191F"/><text x="32" y="41" font-family="Georgia,serif" font-size="27" fill="#F7F6F2" text-anchor="middle">AS</text></svg>',
)}`;

// Old single-page links such as /#/project/x or /#/cv keep working.
const HASH_REDIRECT = `<script>(function(){var h=location.hash;if(h.indexOf('#/')!==0)return;var p=h.slice(2),m={'':'','projects':'projects/','journey':'about/','cv':'cv/'};var t=p.indexOf('project/')===0?'projects/'+p.slice(8)+'/':m[p];if(t!==undefined)location.replace('${config.basePath}'+t);})();</script>`;

// Runs before first paint: applies a saved theme and enables motion only when the visitor allows it.
// If site.js never loads, everything is revealed after 2.5 s so no content stays hidden.
const THEME_INIT = `<script>(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t==='light'||t==='dark')d.setAttribute('data-theme',t);d.classList.add('js');if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!window.__siteReady)d.classList.remove('motion')},2500)}})();</script>`;

/* ---------- structured data ---------- */
const personLd = {
  '@type': 'Person',
  '@id': liveUrl('#person'),
  name: person.name,
  givenName: 'Ayush',
  familyName: 'Suryawanshi',
  url: liveUrl(),
  image: liveUrl('images/portrait-of-ayush-suryawanshi.jpg'),
  email: 'mailto:' + person.email,
  jobTitle: 'Management Trainee',
  description:
    'Chemical engineer working across catalyst synthesis, electrode preparation, electrochemical testing, simulation and process engineering. M.Tech in Catalysis Technology, IIT Madras (2026), with a research semester at NTNU, Norway (2025).',
  worksFor: { '@type': 'Organization', name: 'LOXIM Industries Ltd.', address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressCountry: 'IN' } },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology Madras', alternateName: 'IIT Madras', sameAs: 'https://www.iitm.ac.in/' },
    { '@type': 'CollegeOrUniversity', name: 'Norwegian University of Science and Technology', alternateName: 'NTNU', sameAs: 'https://www.ntnu.edu/' },
    { '@type': 'CollegeOrUniversity', name: 'Indore Institute of Science and Technology', alternateName: 'IIST Indore' },
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'M.Tech, Catalysis Technology, IIT Madras (2026)' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'B.Tech, Chemical Engineering, Indore Institute of Science and Technology (2023)' },
  ],
  award: ['GATE 2024 Chemical Engineering, All India Rank 864 of 13,937', 'UTFORSK mobility scholarship, NTNU (2025)'],
  knowsAbout: [
    'Electrocatalysis', 'Electrochemistry', 'Fuel cells', 'Direct formic acid fuel cells', 'Formic acid oxidation', 'Green hydrogen',
    'AEM electrolysis', 'Bi-modified Pt/C catalysts', 'Catalyst synthesis', 'Catalyst inks and electrodes', 'Cyclic voltammetry',
    'Electrochemical surface area', 'Chronoamperometry', 'SEM-EDX', 'XRD', 'DFT (Gaussian 16)', 'Oxygen reduction reaction',
    'Process design', 'SNCR NOx reduction', 'Process safety', 'Effluent treatment', 'Electrocoagulation', 'Chemical engineering',
  ],
  knowsLanguage: ['English', 'Hindi'],
  sameAs: [person.linkedin, person.github],
};
const ld = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: liveUrl(path) })),
});

/* ---------- shared chrome ---------- */
const NAV = [
  ['projects/', 'Work', 'work'],
  ['about/', 'About', 'about'],
  ['cv/', 'CV', 'cv'],
];

function header(active) {
  const links = NAV.map(
    ([p, label, key]) => `<li><a href="${url(p)}"${active === key ? ' aria-current="page"' : ''}>${label}</a></li>`,
  ).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="${url()}" aria-label="Ayush Suryawanshi, home"><span class="mono-mark" aria-hidden="true">AS</span><span class="brand-name">Ayush Suryawanshi</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav"><span class="sr-only">Open menu</span><span class="burger" aria-hidden="true"></span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>${links}<li><a href="#contact">Contact</a></li></ul>
    </nav>
    <button class="theme-btn" type="button" aria-label="Switch colour theme"><svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7z"/></svg><svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg></button>
  </div>
</header>`;
}

const ARROW = '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/></svg>';
const DL = '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10"/></svg>';

function footer() {
  return `<footer class="site-foot" id="contact">
  <div class="wrap">
    <div class="contact-grid">
      <div>
        <p class="eyebrow">Contact</p>
        <h2 class="contact-title">Let’s talk about catalysts, cells or process design</h2>
        <p class="contact-lede">Questions about a project, a collaboration, or something you read here are all welcome. Email is the quickest way to reach me.</p>
      </div>
      <div class="contact-actions">
        <a class="btn btn-primary" href="mailto:${person.email}">Email me ${ARROW}</a>
        <a class="btn btn-ghost" href="${url(person.cv)}" download="Ayush_CV.pdf">Download CV (PDF) ${DL}</a>
        <ul class="contact-list">
          <li><span class="k">Email</span><a href="mailto:${person.email}">${person.email}</a></li>
          <li><span class="k">LinkedIn</span><a href="${person.linkedin}" rel="me noopener" target="_blank">linkedin.com/in/ayush-suryawanshi</a></li>
          <li><span class="k">Based in</span><span>${person.location}</span></li>
        </ul>
      </div>
    </div>
    <div class="foot-row">
      <p>© 2026 ${person.name}. Last updated ${person.updated}.</p>
      <p><a href="${url()}">Home</a> · <a href="${url('projects/')}">Work</a> · <a href="${url('about/')}">About</a> · <a href="${url('cv/')}">CV</a></p>
    </div>
  </div>
</footer>
<dialog class="lightbox" aria-label="Enlarged image">
  <form method="dialog"><button class="lb-close" aria-label="Close">Close <kbd>Esc</kbd></button></form>
  <img alt="">
  <p class="lb-cap"></p>
  <a class="lb-full" href="#" target="_blank" rel="noopener">Open full size in a new tab</a>
  <div class="lb-nav"><button type="button" data-step="-1" aria-label="Previous image">←</button><button type="button" data-step="1" aria-label="Next image">→</button></div>
</dialog>`;
}

function page({ path, title, description, active, body, jsonld = [], image, extraHead = '', bodyClass = '' }) {
  const canonical = liveUrl(path);
  const ogImage = liveUrl(image || 'images/portrait-of-ayush-suryawanshi.jpg');
  const robots = config.staging ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${THEME_INIT}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${person.name}">
<meta name="robots" content="${robots}">${config.staging ? '<!-- STAGING COPY: kept out of search. The live build uses index, follow. -->' : ''}
<link rel="canonical" href="${canonical}">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="${ICON}">
<meta property="og:type" content="${path === '' ? 'profile' : 'article'}">
<meta property="og:site_name" content="${person.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${CSS}">
<script src="${JS}" defer></script>
${extraHead}${jsonld.length ? ld(jsonld) : ''}
</head>
<body class="${bodyClass}">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}

const projectUrl = (slug) => url(`projects/${slug}/`);
const linkFor = (slug) => (slug.startsWith('#') ? slug : projectUrl(slug));

function projectCard(p, { headingLevel = 3 } = {}) {
  const [file, alt, pos] = p.cardImg;
  const h = `h${headingLevel}`;
  return `<article class="card" data-kind="${p.kind.join(' ')}" data-reveal>
  <a class="card-link" href="${projectUrl(p.slug)}">
    <div class="card-media${p.cardContain ? ' contain' : ''}">${img(file, alt, { sizes: '(min-width: 1100px) 360px, (min-width: 720px) 45vw, 100vw', pos })}</div>
    <div class="card-body">
      <p class="eyebrow">${p.kindLabel}</p>
      <${h} class="card-title">${p.title}</${h}>
      <p class="card-text">${p.short}</p>
      <dl class="card-stats">${p.stats.map(([v, k]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <span class="card-more">Read the project ${ARROW}</span>
    </div>
  </a>
</article>`;
}

/* ---------- home ---------- */
function home() {
  const thesis = projects[0];
  const others = projects.slice(1);
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow" data-reveal>Chemical engineer · Catalysis · Electrochemistry · Process design</p>
      <h1 class="hero-title" data-reveal>Ayush Suryawanshi</h1>
      <p class="hero-lede" data-reveal>My work runs from the lab bench to the plant: making catalysts, building and testing electrodes, modelling reactions on a computer, and weighing process options against cost and safety, while being clear about what each result can and can’t show. It started with fuel-cell catalysts and now includes industrial effluent treatment.</p>
      <div class="hero-cta" data-reveal>
        <a class="btn btn-primary" href="${url('projects/')}">Explore my work ${ARROW}</a>
        <a class="btn btn-ghost" href="${url('cv/')}">View CV</a>
      </div>
      <ul class="facts" data-reveal>
        <li><span class="k">Now</span>Management Trainee, LOXIM Industries</li>
        <li><span class="k">M.Tech</span>Catalysis Technology, IIT Madras, 2026</li>
        <li><span class="k">Abroad</span>Research semester, KinCat group, NTNU, Norway, 2025</li>
      </ul>
    </div>
    <figure class="hero-photo" data-reveal>
      ${img('portrait-of-ayush-suryawanshi.jpg', 'Portrait of Ayush Suryawanshi', { eager: true, sizes: '(min-width: 900px) 380px, 70vw' })}
    </figure>
  </div>
  <svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M0 92 C 120 92 190 90 260 84 C 330 78 380 40 420 22 C 450 10 470 30 486 58 C 500 82 520 88 560 86 C 640 82 700 80 760 74 C 820 68 850 56 880 50 C 910 44 940 60 980 72 C 1040 88 1110 92 1200 92"/></svg>
</section>

<section class="section" aria-labelledby="chain-h">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">How my work connects</p>
      <h2 id="chain-h">From catalyst powder to process decisions</h2>
      <p class="section-lede">Most of my work has followed one thread: make a catalyst, turn it into an electrode, measure what it really does, and think about what it would take to use it. Each stage links to the project behind it.</p>
    </div>
    <ol class="chain">
      ${stages
        .map(
          (s) => `<li class="stage" data-reveal>
        <span class="stage-n">${s.n}</span>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
        <ul class="stage-links">${s.links.map(([slug, label]) => `<li><a href="${linkFor(slug)}">${label}</a></li>`).join('')}</ul>
      </li>`,
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section feature" aria-labelledby="thesis-h">
  <div class="wrap feature-grid">
    <div class="feature-text" data-reveal>
      <p class="eyebrow">Featured · M.Tech thesis, 2025–26</p>
      <h2 id="thesis-h">${thesis.title}</h2>
      <p>Platinum oxidises formic acid well until carbon monoxide blocks its surface. I modified commercial Pt/C with bismuth, added a quinone mediator, and tested which combination held its current longest.</p>
      <dl class="big-stats">
        <div><dt>current kept after a one-hour hold at 0.55 V vs RHE by Bi(1.25)-Pt/C, the catalyst with the least bismuth</dt><dd>92.9%</dd></div>
        <div><dt>commercial Pt/C in the same test</dt><dd>58.5%</dd></div>
      </dl>
      <p class="note">Three-electrode half-cell results in acid. They rank catalysts against each other; full-cell testing is the next step.</p>
      <a class="btn btn-primary" href="${projectUrl(thesis.slug)}">Problem, methods, results and limits ${ARROW}</a>
    </div>
    <div class="feature-visual" data-reveal>${mechanism({ compact: true })}</div>
  </div>
</section>

<section class="section" aria-labelledby="work-h">
  <div class="wrap">
    <div class="section-head row" data-reveal>
      <div><p class="eyebrow">Selected work</p><h2 id="work-h">More projects</h2></div>
      <a class="text-link" href="${url('projects/')}">All projects ${ARROW}</a>
    </div>
    <div class="cards">${others.map((p) => projectCard(p)).join('')}</div>
  </div>
</section>

<section class="section places" aria-labelledby="places-h">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">Where the work happened</p>
      <h2 id="places-h">Labs, cleanrooms and conference halls</h2>
    </div>
    <div class="place-grid">
      ${fig('ayush-at-a-fume-hood-in-the-ntnu.jpg', 'Ayush working at a fume hood in the NTNU lab', 'Synthesising catalyst at the fume hood, NTNU.', { cls: 'p1', sizes: '(min-width: 900px) 300px, 50vw', pos: '50% 30%' })}
      ${fig('ayush-suryawanshi-photo-baa04525.jpg', 'Ayush in cleanroom gear at an SEM workstation', 'Checking a batch on the SEM in the NTNU cleanroom.', { cls: 'p2', sizes: '(min-width: 900px) 560px, 100vw' })}
      ${fig('ayush-in-front-of-the-europacat-2025-trondheim.jpg', 'Ayush standing in front of the EuropaCat 2025 Trondheim backdrop', 'At EuropaCat 2025 in Trondheim.', { cls: 'p3', sizes: '(min-width: 900px) 300px, 50vw', pos: '72% 50%' })}
    </div>
  </div>
</section>

<section class="section" id="now" aria-labelledby="now-h">
  <div class="wrap now-grid">
    <div class="now-card" data-reveal>
      <p class="eyebrow">Now</p>
      <h2 id="now-h">Effluent treatment at LOXIM Industries</h2>
      <p>Since July 2026 I’ve been a Management Trainee in Ahmedabad, leading technology selection for sulphate removal from plant effluent. I evaluated electrocoagulation and electroflocculation as pretreatment and run screening, sample trials and feasibility checks with more than ten vendors.</p>
      <p class="note">The options shortlisted so far point to a projected 50–60% lower operating cost, from INR 2.5/L to about INR 1.0–1.2/L. The selection is still in progress.</p>
    </div>
    <div class="now-card next" data-reveal>
      <p class="eyebrow">What interests me</p>
      <h2>From half-cells to working devices</h2>
      <p>The questions I keep coming back to sit where electrochemistry meets process engineering: how a catalyst that looks good in a half-cell behaves in a membrane electrode assembly or a full electrolyser, how it ages over hundreds of hours, and what it takes to run it at plant scale. AEM electrolysis, fuel cells and green hydrogen are where those questions are most alive.</p>
      <p class="note">These are interests, not work I have done yet; my device-level experience so far is in three-electrode half-cells.</p>
    </div>
  </div>
</section>

<section class="section path" aria-labelledby="path-h">
  <div class="wrap">
    <div class="section-head row" data-reveal>
      <div><p class="eyebrow">Path so far</p><h2 id="path-h">Indore → IIT Madras → Trondheim → Ahmedabad</h2></div>
      <a class="text-link" href="${url('about/')}">Full story ${ARROW}</a>
    </div>
    <ol class="path-line" data-reveal>
      <li><span class="when">2019–23</span><strong>B.Tech, Chemical Engineering</strong><span>IIST Indore (RGPV)</span></li>
      <li><span class="when">2024</span><strong>GATE, AIR 864</strong><span>of 13,937 candidates</span></li>
      <li><span class="when">2024–26</span><strong>M.Tech, Catalysis Technology</strong><span>IIT Madras · CGPA 8.51/10</span></li>
      <li class="abroad"><span class="when">2025</span><strong>Research semester</strong><span>KinCat group, NTNU · UTFORSK</span></li>
      <li><span class="when">2026–</span><strong>Management Trainee</strong><span>LOXIM Industries</span></li>
    </ol>
  </div>
</section>`;
  return page({
    path: '',
    title: 'Ayush Suryawanshi – Chemical Engineer | Catalysis, Electrochemistry, Process Design',
    description:
      'Ayush Suryawanshi is a chemical engineer (M.Tech Catalysis Technology, IIT Madras) whose work spans catalyst synthesis, electrochemical testing, DFT and kinetic modelling, and process design.',
    active: 'home',
    body,
    bodyClass: 'home',
    extraHead: HASH_REDIRECT,
    jsonld: [
      personLd,
      { '@type': 'WebSite', '@id': liveUrl('#website'), url: liveUrl(), name: person.name, inLanguage: 'en', publisher: { '@id': liveUrl('#person') } },
      {
        '@type': 'ProfilePage', '@id': liveUrl('#profile'), url: liveUrl(), name: 'Ayush Suryawanshi – Chemical Engineer | Catalysis, Electrochemistry, Process Design',
        dateModified: person.updatedISO, isPartOf: { '@id': liveUrl('#website') }, mainEntity: { '@id': liveUrl('#person') },
      },
    ],
  });
}

/* ---------- projects index ---------- */
function projectsIndex() {
  const body = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Work</p>
    <h1>Projects</h1>
    <p class="page-lede">Experimental research, modelling and process engineering from my M.Tech at IIT Madras and my semester at NTNU. Each project page covers the problem, my part in it, the methods, the results and their limits.</p>
    <ul class="strands">
      ${kinds.slice(1).map(([k, label, text]) => `<li><span class="strand-n">${label}</span><span>${text}</span> <span class="muted">${projects.filter((p) => p.kind.includes(k)).length} project${projects.filter((p) => p.kind.includes(k)).length === 1 ? '' : 's'}</span></li>`).join('')}
    </ul>
  </div>
</section>
<section class="section tight">
  <div class="wrap">
    <div class="filters" role="group" aria-label="Filter projects">
      ${kinds.map(([k, label], i) => `<button type="button" data-filter="${k}" aria-pressed="${i === 0}">${label}</button>`).join('')}
      <p class="count" aria-live="polite" data-count>${projects.length} projects</p>
    </div>
    <div class="cards cards-2">${projects.map((p) => projectCard(p, { headingLevel: 2 })).join('')}</div>
    <div class="aside-row">
      <aside class="earlier" data-reveal>
        <h2>Current industrial work</h2>
        <p>At LOXIM Industries in Ahmedabad I’m leading technology selection for sulphate removal from plant effluent, including electrocoagulation and electroflocculation as pretreatment, with vendor screening, sample trials and feasibility checks. It is ongoing, so it is summarised <a href="${url('#now')}">on the home page</a> rather than written up as a project.</p>
      </aside>
      <aside class="earlier" data-reveal>
        <h2>Earlier work</h2>
        <p>As a B.Tech student I presented a paper at SCHEMCON 2021, organised by MANIT and IISER Bhopal.</p>
      </aside>
    </div>
  </div>
</section>`;
  return page({
    path: 'projects/',
    title: 'Projects – Ayush Suryawanshi',
    description: 'Projects by Ayush Suryawanshi: Bi-modified Pt/C catalysts for formic acid fuel cells, catalyst synthesis at NTNU, DFT of oxygen reduction on Pt13, and an SNCR retrofit design.',
    active: 'work',
    body,
    jsonld: [
      crumbs([['Home', ''], ['Projects', 'projects/']]),
      {
        '@type': 'ItemList', name: 'Projects by Ayush Suryawanshi',
        itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: liveUrl(`projects/${p.slug}/`), name: strip(p.title) })),
      },
    ],
  });
}

/* ---------- project pages ---------- */
function projectPage(p, i) {
  const sections = p.sections();
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const heroFig = p.hero
    ? `<div class="wrap">${fig(p.hero[0], p.hero[1], p.hero[2], { cls: `proj-hero${p.heroFit === 'natural' ? ' natural' : ''}`, sizes: p.heroFit === 'natural' ? '(min-width: 900px) 760px, 100vw' : '(min-width: 1200px) 1160px, 100vw' })}</div>`
    : '';
  const body = `
<article class="project">
<header class="page-head proj-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${url('projects/')}">Projects</a><span aria-hidden="true">/</span><span aria-current="page">${p.title}</span></nav>
    <p class="eyebrow">${p.kindLabel}</p>
    <h1>${p.title}</h1>
    <p class="page-lede">${p.short}</p>
    <dl class="proj-meta">
      <div><dt>When</dt><dd>${p.when}</dd></div>
      <div><dt>Where</dt><dd>${p.where}</dd></div>
      ${p.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl>
  </div>
</header>
${heroFig}
<div class="wrap proj-layout">
  <aside class="toc" aria-label="On this page">
    <p class="eyebrow">On this page</p>
    <ol>${['At a glance', ...sections.map((s) => s[1])].map((t, j) => `<li><a href="#${j === 0 ? 'glance' : sections[j - 1][0]}">${t}</a></li>`).join('')}</ol>
  </aside>
  <div class="prose">
    <section id="glance" class="glance" aria-labelledby="glance-h">
      <h2 id="glance-h" class="sr-only">At a glance</h2>
      <dl>${p.glance.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </section>
    ${sections.map(([id, title, html]) => `<section id="${id}" aria-labelledby="${id}-h"><h2 id="${id}-h">${title}</h2>${html}</section>`).join('\n')}
    <nav class="pager" aria-label="More projects">
      ${prev ? `<a class="prev" href="${projectUrl(prev.slug)}"><span class="eyebrow">Previous</span>${prev.title}</a>` : '<span></span>'}
      ${next ? `<a class="next" href="${projectUrl(next.slug)}"><span class="eyebrow">Next</span>${next.title}</a>` : `<a class="next" href="${url('projects/')}"><span class="eyebrow">Back to</span>All projects</a>`}
    </nav>
  </div>
</div>
</article>`;
  const title = `${strip(p.title)} – Ayush Suryawanshi`;
  return page({
    path: `projects/${p.slug}/`,
    title,
    description: p.description,
    active: 'work',
    body,
    image: p.hero ? `images/${p.hero[0]}` : undefined,
    jsonld: [
      crumbs([['Home', ''], ['Projects', 'projects/'], [strip(p.title), `projects/${p.slug}/`]]),
      {
        '@type': 'CreativeWork', name: strip(p.title), headline: strip(p.title), description: p.description, url: liveUrl(`projects/${p.slug}/`),
        author: { '@id': liveUrl('#person') }, inLanguage: 'en', keywords: p.tags.join(', '),
      },
    ],
  });
}

/* ---------- about ---------- */
function about() {
  const body = `
<section class="page-head">
  <div class="wrap about-head">
    <div>
      <p class="eyebrow">About</p>
      <h1>Chemical engineer, from the lab bench to the plant</h1>
      <p class="page-lede">I started in core chemical engineering in Indore, specialised in catalysis at IIT Madras, did my synthesis work in Trondheim, and now work on effluent treatment at LOXIM Industries. Along the way I learned to run the whole loop: make the catalyst, build the electrode, test it honestly, model what the data can’t show, and think about the process around it.</p>
    </div>
    <figure class="about-photo">${img('portrait-of-ayush-suryawanshi.jpg', 'Portrait of Ayush Suryawanshi', { sizes: '(min-width: 900px) 300px, 60vw', eager: true })}</figure>
  </div>
  <div class="wrap">
    <nav class="jump" aria-label="On this page">
      <span class="eyebrow">On this page</span>
      <ul>
        <li><a href="#journey">Journey</a></li>
        <li><a href="#mtech">M.Tech at IIT Madras</a></li>
        <li><a href="#photos">People and places</a></li>
        <li><a href="#credentials">Credentials</a></li>
      </ul>
    </nav>
  </div>
</section>
<section class="section tight" id="journey" aria-labelledby="journey-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="journey-h" class="section-title">Journey, most recent first</h2>
      <p class="section-lede">From a B.Tech in Indore to an M.Tech at IIT Madras, a research semester in Trondheim and industry in Ahmedabad. The M.Tech entry has the thesis summary and my placement role.</p>
    </div>
    <ol class="timeline">
      ${timeline
        .map(
          (t) => `<li data-reveal${t.id ? ` id="${t.id}"` : ''}${t.photo ? ' class="has-photo"' : t.blocks ? ' class="wide"' : ''}>
        <div class="tl-text">
          <span class="when">${t.when}</span>
          <h3>${t.title}</h3>
          <p class="where">${t.where}</p>
          <p>${t.text}</p>
          ${t.blocks ? `<dl class="tl-blocks">${t.blocks.map(([k, v, link]) => `<div class="tl-block${k === 'Role' ? ' role' : ''}"><dt>${k}</dt><dd>${v}${link ? ` <a href="${url(link)}">Read more</a>` : ''}</dd></div>`).join('')}</dl>` : ''}
        </div>
        ${t.photo ? fig(t.photo[0], t.photo[1], t.photo[2], { cls: 'tl-photo', sizes: '(min-width: 900px) 360px, 100vw' }) : ''}
      </li>`,
        )
        .join('')}
    </ol>
  </div>
</section>
<section class="section" id="photos" aria-labelledby="gallery-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="gallery-h" class="section-title">People and places</h2>
      <p class="section-lede">Conferences, the groups I worked with, and some of life around the work.</p>
    </div>
    <div class="gallery">${gallery.map(([f, a, c, pos, wide], i) => fig(f, a, c, { cls: `g${i + 1}${wide ? ' wide' : ''}`, sizes: wide ? '(min-width: 900px) 760px, 100vw' : '(min-width: 900px) 380px, 100vw', pos })).join('')}</div>
  </div>
</section>
<section class="section" id="credentials" aria-labelledby="cred-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="cred-h" class="section-title">Selected credentials</h2>
      <p class="section-lede">Supporting documents for the degree and the talks and courses above. Select one to see it at full size.</p>
    </div>
    <ul class="creds">
      ${credentials
        .map(
          (c) => `<li class="cred" data-reveal>
        <figure>
          <div class="cred-thumb"><img src="${url(`images/certificates/${c.slug}-640.jpg`)}" alt="${esc(c.alt)}" loading="lazy" decoding="async" data-zoom="${url(`images/certificates/${c.slug}-1600.jpg`)}"></div>
          <figcaption>
            <h3>${c.title}</h3>
            <p class="cred-meta">${c.issuer} · <time>${c.when}</time></p>
            <p class="cred-note">${c.note}${c.link ? ` <a href="${url(c.link[0])}">${c.link[1]}</a>` : ''}</p>
          </figcaption>
        </figure>
      </li>`,
        )
        .join('')}
    </ul>
    <p class="note">Also on record: GATE 2024 Chemical Engineering, All India Rank 864 of 13,937 candidates, and a UTFORSK mobility scholarship from NTNU for August–December 2025. Identification numbers and QR codes on the certificates are hidden.</p>
  </div>
</section>
`;
  return page({
    path: 'about/',
    title: 'About – Ayush Suryawanshi',
    description: 'About Ayush Suryawanshi: B.Tech in chemical engineering, M.Tech in Catalysis Technology at IIT Madras, a research semester at NTNU, Norway, and now effluent treatment at LOXIM Industries.',
    active: 'about',
    body,
    jsonld: [crumbs([['Home', ''], ['About', 'about/']]), personLd],
  });
}

/* ---------- CV ---------- */
function cv() {
  const row = (title, org, when, extra = '') =>
    `<div class="cv-row"><div><h3>${title}</h3><p class="org">${org}</p>${extra}</div><p class="when">${when}</p></div>`;
  const body = `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">CV</p>
    <h1>Curriculum vitae</h1>
    <p class="page-lede">The web version of my CV. The PDF has the same content in a one-file format for applications.</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="${url(person.cv)}" download="Ayush_CV.pdf">Download CV (PDF) ${DL}</a>
      <a class="btn btn-ghost" href="mailto:${person.email}?subject=Regarding%20your%20CV">Email me about a role</a>
    </div>
  </div>
</section>
<section class="section tight">
  <div class="wrap cv">
    <section aria-labelledby="cv-edu"><h2 id="cv-edu">Education</h2>
      ${education.map((e) => row(e.title, e.org, e.when, `<p>${e.detail}</p>`)).join('')}
    </section>
    <section aria-labelledby="cv-exp"><h2 id="cv-exp">Experience</h2>
      ${experience.map((e) => row(e.title, e.org, e.when, `<ul>${e.points.map((x) => `<li>${x}</li>`).join('')}</ul>`)).join('')}
    </section>
    <section aria-labelledby="cv-res"><h2 id="cv-res">Research and projects</h2>
      ${projects.map((p) => row(`<a href="${projectUrl(p.slug)}">${p.title}</a>`, p.where, p.when, `<p>${p.glance[2][1]}</p>`)).join('')}
    </section>
    <section aria-labelledby="cv-skills"><h2 id="cv-skills">Technical skills</h2>
      <dl class="skills">${skills.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}<div><dt>Relevant coursework</dt><dd>${coursework}</dd></div><div><dt>Languages</dt><dd>English (IELTS Academic 7.0, CEFR C1, July 2026), Hindi</dd></div></dl>
    </section>
    <section aria-labelledby="cv-rec"><h2 id="cv-rec">Conferences, awards and scholarships</h2>
      ${recognition.map((r) => row(r.title, r.where, r.when)).join('')}
    </section>
    <p class="note">Last updated ${person.updated}.</p>
  </div>
</section>`;
  return page({
    path: 'cv/',
    title: 'CV – Ayush Suryawanshi',
    description: 'CV of Ayush Suryawanshi: M.Tech Catalysis Technology (IIT Madras, CGPA 8.51/10), NTNU research semester, electrochemical testing, catalyst synthesis and process engineering.',
    active: 'cv',
    body,
    jsonld: [
      crumbs([['Home', ''], ['CV', 'cv/']]),
      { '@type': 'DigitalDocument', name: 'Ayush Suryawanshi – CV', url: liveUrl(person.cv), encodingFormat: 'application/pdf', author: { '@id': liveUrl('#person') } },
    ],
  });
}

function notFound() {
  return page({
    path: '404.html',
    title: 'Page not found – Ayush Suryawanshi',
    description: 'This page does not exist.',
    active: '',
    extraHead: HASH_REDIRECT,
    body: `<section class="page-head"><div class="wrap"><p class="eyebrow">404</p><h1>That page isn’t here</h1><p class="page-lede">It may have moved when the site was reorganised. Try one of these instead.</p><div class="hero-cta"><a class="btn btn-primary" href="${url()}">Home ${ARROW}</a><a class="btn btn-ghost" href="${url('projects/')}">Projects</a><a class="btn btn-ghost" href="${url('cv/')}">CV</a></div></div></section>`,
  });
}

/* ---------- write everything ---------- */
out('index.html', home());
out('projects/index.html', projectsIndex());
projects.forEach((p, i) => out(`projects/${p.slug}/index.html`, projectPage(p, i)));
out('about/index.html', about());
out('cv/index.html', cv());
out('404.html', notFound());

const pages = ['', 'projects/', ...projects.map((p) => `projects/${p.slug}/`), 'about/', 'cv/'];
const imagesFor = (p) => (p === '' ? ['portrait-of-ayush-suryawanshi.jpg'] : []);
out(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url><loc>${liveUrl(p)}</loc><lastmod>${person.updatedISO}</lastmod>${imagesFor(p)
      .map((f) => `<image:image><image:loc>${liveUrl('images/' + f)}</image:loc></image:image>`)
      .join('')}</url>`,
  )
  .join('\n')}
  <url><loc>${liveUrl(person.cv)}</loc><lastmod>${person.updatedISO}</lastmod></url>
</urlset>
`,
);

out(
  'robots.txt',
  config.staging
    ? `# STAGING COPY: not for search engines or AI crawlers. The live site is ${liveUrl()}\nUser-agent: *\nDisallow: /\n`
    : `# Search engines and AI assistants are welcome to read and cite this site.\nUser-agent: *\nAllow: /\n\n${[
        'Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
        'PerplexityBot', 'Perplexity-User', 'Applebot', 'Applebot-Extended', 'CCBot',
      ]
        .map((b) => `User-agent: ${b}\nAllow: /\n`)
        .join('\n')}\nSitemap: ${liveUrl('sitemap.xml')}\n`,
);

// Plain-text profile for AI assistants, generated from the same content as the pages.
out(
  'llms.txt',
  `# ${person.name}

> ${person.name} is an Indian chemical engineer working across electrocatalyst synthesis, electrode preparation, electrochemical testing and process engineering. Ayush holds an M.Tech in Catalysis Technology from IIT Madras (2026, CGPA 8.51/10), spent a research semester at NTNU, Norway (2025), and is currently a Management Trainee at LOXIM Industries Ltd., Ahmedabad, working on effluent treatment technology. The work spans catalyst synthesis, electrode preparation and three-electrode electrochemical testing, DFT and reaction-kinetics modelling, and process design. Research interests include electrochemical energy conversion such as AEM electrolysis, fuel cells and green hydrogen.

Website: ${liveUrl()}
LinkedIn: ${person.linkedin}
Email: ${person.email}
CV (PDF): ${liveUrl(person.cv)}

## Education
${education.map((e) => `- ${e.title}, ${e.org}, ${e.when}. ${e.detail}`).join('\n')}

## Experience
${experience.map((e) => `- ${e.title}, ${e.org} (${e.when}): ${e.points.join(' ')}`).join('\n')}

## Projects
${projects.map((p) => `- ${strip(p.title)} (${p.when}, ${strip(p.where)}): ${p.glance.map(([k, v]) => `${k}: ${strip(v)}`).join(' ')} Details: ${liveUrl(`projects/${p.slug}/`)}`).join('\n')}

## Skills
${skills.map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Conferences, awards and scholarships
${recognition.map((r) => `- ${r.title}, ${r.where} (${r.when})`).join('\n')}
`,
);

console.log(`Built ${pages.length + 1} pages (${config.staging ? 'staging, noindex' : 'live'}) with base ${config.basePath}`);
