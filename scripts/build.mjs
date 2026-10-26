// Builds the static site into the repository root, which is what GitHub Pages serves.
// Usage: node scripts/build.mjs   (no dependencies; Node 18+)
//
// Design: an engineering-drawing layout on a paper-and-ink palette. Light theme is warm paper, dark theme soft charcoal.
// The one bold element is the process-flow line on the home page, where the three areas of work are
// drawn as unit operations; everything else stays quiet so the evidence reads first.
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';
import { config, url, liveUrl, esc, strip, img, fig } from '../src/lib.mjs';
import {
  person, education, experience, skillEvidence, recognition, pillars, timeline, gallery, projects, kinds, credentials,
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
// Fonts (IBM Plex Serif, Sans and Mono) are self-hosted from fonts/ (SIL Open Font License), so no third-party requests are made.
// The stylesheet refers to them relative to assets/, i.e. ../fonts/.
const CSS = asset('site.css');
const JS = asset('site.js');

const ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 3 57 17.5v29L32 61 7 46.5v-29z" fill="#15191F"/><text x="32" y="40" font-family="Georgia,serif" font-size="22" fill="#F7F6F2" text-anchor="middle">AS</text></svg>',
)}`;

// Old single-page links such as /#/project/x or /#/cv keep working.
const HASH_REDIRECT = `<script>(function(){var h=location.hash;if(h.indexOf('#/')!==0)return;var p=h.slice(2),m={'':'','projects':'projects/','journey':'about/','cv':'cv/'};var t=p.indexOf('project/')===0?'projects/'+p.slice(8)+'/':m[p];if(t!==undefined)location.replace('${config.basePath}'+t);})();</script>`;

// Runs before first paint: applies a saved theme, marks JS as available and enables motion only when allowed.
const THEME_INIT = `<script>(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t==='light'||t==='dark')d.setAttribute('data-theme',t);d.classList.add('js');if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');})();</script>`;

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
    'Chemical engineer working across catalysis, electrochemistry and process engineering. M.Tech in Catalysis Technology, IIT Madras (2026), with a research semester at NTNU, Norway (2025).',
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
    'Chemical engineering', 'Catalysis', 'Catalyst synthesis', 'Bi-modified Pt/C catalysts', 'Electrochemistry', 'Electrocatalysis',
    'Formic acid oxidation', 'Cyclic voltammetry', 'Chronoamperometry', 'Electrochemical surface area', 'Catalyst inks and electrodes',
    'SEM-EDX', 'XRD', 'DFT (Gaussian 16)', 'Oxygen reduction reaction', 'Process design', 'Process economics', 'Process safety',
    'SNCR NOx reduction', 'Reaction kinetics (Cantera)', 'Process simulation (DWSIM)', 'Effluent treatment', 'Electrocoagulation',
  ],
  knowsLanguage: ['English', 'Hindi'],
  sameAs: [person.linkedin, person.github],
};
const ld = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: liveUrl(path) })),
});

/* ---------- small pieces ---------- */
const KIND = Object.fromEntries(kinds.map(([k, label]) => [k, label]));
const tags = (ks, cls = '') => `<ul class="tags ${cls}">${ks.map((k) => `<li class="tag ${k}">${KIND[k]}</li>`).join('')}</ul>`;
const projectUrl = (slug) => url(`projects/${slug}/`);
const DL = '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10"/></svg>';
const MARK = `<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5z"/><text x="20" y="25">AS</text></svg>`;

// Line-art unit-operation symbols for the process-flow line (drawn in currentColor).
const SYMBOL = {
  // packed-bed reactor
  catalysis: `<svg class="sym" viewBox="0 0 80 96" aria-hidden="true"><path d="M40 2v8"/><rect x="18" y="10" width="44" height="76" rx="22"/><path d="M18 36h44M18 62h44"/><path class="fill" d="M22 40l8 8m-8 4 12 12M30 40l16 16m-4-16 16 16M42 40l16 16m-8 2 4 4M26 56l2 2" /><path d="M40 86v8"/></svg>`,
  // electrochemical cell
  electrochemistry: `<svg class="sym" viewBox="0 0 80 96" aria-hidden="true"><path d="M10 30v52a6 6 0 0 0 6 6h48a6 6 0 0 0 6-6V30"/><path d="M14 50c6-3 10 3 16 0s10 3 16 0 10 3 16 0 6 2 8 0"/><path d="M28 14v58M52 14v58"/><rect x="24" y="44" width="8" height="30" rx="1"/><rect x="48" y="44" width="8" height="30" rx="1"/><path d="M24 8h8M28 4v8M48 8h8"/></svg>`,
  // tray column
  process: `<svg class="sym" viewBox="0 0 80 96" aria-hidden="true"><path d="M40 2v6"/><rect x="24" y="8" width="32" height="80" rx="16"/><path d="M24 30h22M34 42h22M24 54h22M34 66h22"/><path d="M8 48h16M56 22h16M40 88v6"/></svg>`,
};
const STREAMS = ['catalyst and ink', 'measured performance', ''];

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
    <a class="brand" href="${url()}">${MARK}<span class="brand-name">Ayush Suryawanshi</span></a>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>${links}<li><a href="#contact">Contact</a></li></ul>
    </nav>
    <button class="theme-btn" type="button" aria-label="Switch colour theme"><svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7z"/></svg><svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg></button>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav"><span class="sr-only">Open menu</span><span class="burger" aria-hidden="true"></span></button>
  </div>
</header>`;
}

// The footer is drawn as the title block of an engineering drawing: who drew it, how to reach them, revision.
function footer(sheet) {
  return `<footer class="site-foot" id="contact">
  <div class="wrap">
    <div class="titleblock">
      <div class="tb-main">
        <h2 class="tb-title">Get in touch</h2>
        <p>If you work on catalysts, electrochemistry or process design, I’d be glad to connect. Questions about anything on this site are welcome too. Email is the quickest way to reach me.</p>
        <div class="tb-actions">
          <a class="btn btn-solid" href="mailto:${person.email}">Email me</a>
          <a class="btn btn-line" href="${url(person.cv)}" download="Ayush_CV.pdf">${DL}Download CV (PDF)</a>
        </div>
      </div>
      <dl class="tb-cells">
        <div><dt>Email</dt><dd><a href="mailto:${person.email}">${person.email}</a></dd></div>
        <div><dt>LinkedIn</dt><dd><a href="${person.linkedin}" rel="me noopener" target="_blank">linkedin.com/in/ayush-suryawanshi</a></dd></div>
        <div><dt>Based in</dt><dd>${person.location}</dd></div>
        <div><dt>Sheet</dt><dd>${sheet}</dd></div>
        <div><dt>Drawn by</dt><dd>${person.name}</dd></div>
        <div><dt>Revised</dt><dd><time datetime="${person.updatedISO}">${person.updated}</time></dd></div>
      </dl>
    </div>
    <p class="foot-note">© 2026 ${person.name}. <a href="${url()}">Home</a> <a href="${url('projects/')}">Work</a> <a href="${url('about/')}">About</a> <a href="${url('cv/')}">CV</a></p>
  </div>
</footer>
<dialog class="lightbox" aria-label="Enlarged image">
  <form method="dialog"><button class="lb-close" type="submit" aria-label="Close">Close <kbd>Esc</kbd></button></form>
  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="">
  <p class="lb-cap"></p>
  <a class="lb-full" href="#" target="_blank" rel="noopener">Open full size in a new tab</a>
  <div class="lb-nav"><button type="button" data-step="-1" aria-label="Previous image">‹</button><button type="button" data-step="1" aria-label="Next image">›</button></div>
</dialog>`;
}

function page({ path, title, description, active, sheet, body, jsonld = [], image, extraHead = '', bodyClass = '' }) {
  const canonical = liveUrl(path);
  const ogImage = liveUrl(image || 'images/portrait-of-ayush-suryawanshi.jpg');
  const robots = config.staging ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1';
  return `<!DOCTYPE html>
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
<meta name="theme-color" content="#F7F6F2" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111419" media="(prefers-color-scheme: dark)">
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
<link rel="preload" href="${url('fonts/ibm-plex-sans-latin-400.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${url('fonts/ibm-plex-serif-latin-400.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${CSS}">
<script src="${JS}" defer></script>
${extraHead}${jsonld.length ? ld(jsonld) : ''}
</head>
<body class="${bodyClass}">
${header(active)}
<main id="main">
${body}
</main>
${footer(sheet || strip(title).split(' – ')[0])}
</body>
</html>
`;
}

/* ---------- card visuals ---------- */
// Projects without a shareable photo (company work) get a small drawn block diagram instead.
const ART = {
  train: `<svg class="art" viewBox="0 0 360 200" role="img" aria-label="Block diagram: effluent, electrochemical pretreatment, polishing, reverse osmosis, crystalliser, salt product">
  <g class="art-line"><path d="M18 100h324"/><path d="M332 94l10 6-10 6"/></g>
  ${['Effluent', 'EC', 'Polish', 'RO', 'Cryst.', 'Na₂SO₄']
    .map((t, i) => `<g class="art-u u${i}" transform="translate(${14 + i * 56} 76)"><rect width="50" height="48" rx="6"/><text x="25" y="28">${t}</text></g>`)
    .join('')}
  <path class="art-rec" d="M291 124v26h-56v-26"/><text class="art-small" x="263" y="168">recycle</text>
  <path class="art-rec" d="M207 76V44"/><text class="art-small" x="207" y="34">water</text>
</svg>`,
};

function cardMedia(p, sizes) {
  if (p.cardArt) return `<div class="media art-media">${ART[p.cardArt]}</div>`;
  const [file, alt, pos] = p.cardImg;
  return `<div class="media${p.cardContain ? ' contain' : ''}">${img(file, alt, { sizes, pos })}</div>`;
}

const stat = ([v, k]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`;

/* ---------- intro video (home hero) ---------- */
// Plays muted on arrival, with captions drawn by site.js so they stay readable on phones.
// Without JavaScript the native controls and the caption track still work.
const INTRO = { seconds: 99, label: '1:39', uploaded: '2026-10-26' };
const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-play" d="M8 5.5v13l10.5-6.5z"/><path class="i-pause" d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg>';
const ICON_SOUND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="i-on" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/><path class="i-off" d="m15.5 9.5 5 5m0-5-5 5"/></svg>';
const ICON_CC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M10.5 10.3a2.3 2.3 0 1 0 0 3.4M17 10.3a2.3 2.3 0 1 0 0 3.4"/></svg>';
const ICON_FS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
function introVideo() {
  return `<figure class="intro-video" aria-labelledby="iv-title">
      <div class="iv-frame" data-state="idle">
        <video class="iv-video" muted playsinline preload="metadata" controls width="1920" height="1080"
          poster="${url('media/intro-poster.webp')}" aria-describedby="iv-desc">
          <source src="${url('media/intro-720p.mp4')}" type="video/mp4" media="(max-width: 767px)">
          <source src="${url('media/intro-1080p.mp4')}" type="video/mp4">
          <track kind="captions" src="${url('media/intro.en.vtt')}" srclang="en" label="English" default>
        </video>
        <p class="iv-caption" aria-hidden="true"></p>
        <button class="iv-sound" type="button" hidden><span class="iv-sound-ic">${ICON_SOUND}</span><span>Watch with sound</span></button>
        <button class="iv-big" type="button" aria-label="Play the introduction" hidden>${ICON_PLAY}</button>
        <div class="iv-bar" hidden>
          <button class="iv-btn iv-toggle" type="button" aria-label="Pause">${ICON_PLAY}</button>
          <input class="iv-seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek">
          <span class="iv-time" aria-hidden="true">0:00 / ${INTRO.label}</span>
          <button class="iv-btn iv-cc" type="button" aria-label="Hide captions" aria-pressed="true">${ICON_CC}</button>
          <button class="iv-btn iv-mute" type="button" aria-label="Turn sound on">${ICON_SOUND}</button>
          <button class="iv-btn iv-fs" type="button" aria-label="Full screen">${ICON_FS}</button>
        </div>
      </div>
      <figcaption class="iv-meta">
        <span id="iv-title">A short introduction, ${INTRO.label}</span>
        <span id="iv-desc">My background and work across catalysis, electrochemistry and process engineering. Captions on; narrated with an AI version of my own voice.</span>
      </figcaption>
    </figure>`;
}
const introVideoLd = {
  '@type': 'VideoObject',
  '@id': liveUrl('#intro-video'),
  name: 'Ayush Suryawanshi – a short introduction',
  description: 'A short introduction: education, catalyst synthesis, electrochemical testing, process design and effluent-treatment work, in Ayush’s own words.',
  thumbnailUrl: liveUrl('media/intro-poster.jpg'),
  contentUrl: liveUrl('media/intro-1080p.mp4'),
  uploadDate: INTRO.uploaded,
  duration: `PT${Math.floor(INTRO.seconds / 60)}M${INTRO.seconds % 60}S`,
  inLanguage: 'en',
  creator: { '@id': liveUrl('#person') },
};

/* ---------- home ---------- */
function home() {
  const [thesis, loxim, sncr, ...rest] = projects;
  const pfd = pillars
    .map(
      (p, i) => `<li class="unit ${p.key}">
        <div class="unit-sym">${SYMBOL[p.key]}<span class="unit-tag">${['R-101', 'E-201', 'C-301'][i]}</span></div>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
        <ul class="unit-links">${p.links.map(([slug, label]) => `<li><a href="${projectUrl(slug)}">${label}</a></li>`).join('')}</ul>
      </li>${i < pillars.length - 1 ? `<li class="stream" aria-hidden="true"><svg viewBox="0 0 100 24" preserveAspectRatio="none"><path class="flow" d="M0 12H96"/><path d="M88 5l9 7-9 7"/></svg><span>${STREAMS[i]}</span></li>` : `<li class="stream out" aria-hidden="true"><svg viewBox="0 0 100 24" preserveAspectRatio="none"><path class="flow" d="M0 12H70"/></svg><span class="offpage">Process decisions</span></li>`}`,
    )
    .join('\n      ');

  const body = `
<section class="hero sheet" aria-labelledby="hero-name">
  <div class="wrap hero-grid">
    <div class="hero-id">
      <figure class="hero-photo">${img('portrait-of-ayush-suryawanshi.jpg', 'Portrait of Ayush Suryawanshi', { eager: true, sizes: '(min-width: 768px) 112px, 84px', pos: '50% 22%' })}</figure>
      <div>
        <h1 class="hero-name" id="hero-name">Ayush Suryawanshi</h1>
        <p class="hero-role">Chemical engineer working across catalysis, electrochemistry and process engineering</p>
      </div>
    </div>
    <div class="hero-text">
      <p class="hero-lede">I’ve made catalysts, tested them in electrochemical cells, and designed and costed processes, most recently a treatment-train study for an industrial effluent. This site shows that work, what each result means, and where its limits are.</p>
      <div class="cta">
        <a class="btn btn-solid" href="${url('projects/')}">See my work</a>
        <a class="btn btn-line" href="${url(person.cv)}" download="Ayush_CV.pdf">${DL}Download CV (PDF)</a>
      </div>
      <dl class="facts">
        <div><dt>Now</dt><dd>Management Trainee, LOXIM Industries, Ahmedabad</dd></div>
        <div><dt>M.Tech</dt><dd>Catalysis Technology, IIT Madras, 2026</dd></div>
        <div><dt>Abroad</dt><dd>Research semester, NTNU, Norway, 2025</dd></div>
      </dl>
    </div>
    ${introVideo()}
  </div>
</section>

<section class="pfd sheet" aria-labelledby="pfd-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="pfd-h">From catalyst powder to process decisions</h2>
      <p class="lede">The three areas I’ve worked in, drawn as one flow. Each unit links to the projects behind it.</p>
    </div>
    <ol class="flowline">
      ${pfd}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="work-h">
  <div class="wrap">
    <div class="section-head split">
      <h2 id="work-h">Selected work</h2>
      <a class="more-link" href="${url('projects/')}">All ${projects.length} projects</a>
    </div>

    <article class="feature">
      <a class="feature-media" href="${projectUrl(thesis.slug)}" tabindex="-1" aria-hidden="true">${img(thesis.hero[0], thesis.hero[1], { sizes: '(min-width: 1200px) 1180px, 100vw', pos: '60% 50%' })}</a>
      <div class="feature-body">
        <div class="fb-text">
          ${tags(thesis.kind)}
          <h3><a href="${projectUrl(thesis.slug)}">${thesis.title}</a></h3>
          <p>For my M.Tech thesis I modified commercial Pt/C with small amounts of bismuth to resist carbon monoxide poisoning during formic acid oxidation, and tested a quinone mediator. The catalyst with the least bismuth held its current best; the mediator lowered one-hour retention.</p>
          <a class="btn btn-line" href="${projectUrl(thesis.slug)}">Read the thesis project</a>
        </div>
        <div class="fb-data">
          <dl class="readings">
            <div><dt>Bi(1.25)-Pt/C, current kept after a one-hour hold</dt><dd>92.9%</dd></div>
            <div><dt>Commercial Pt/C, same test</dt><dd>58.5%</dd></div>
          </dl>
          <p class="note">Three-electrode half-cell results in acid, relative to each catalyst’s own current after the first minute, so they measure decay rather than output. No replicate counts are reported.</p>
        </div>
      </div>
    </article>

    <div class="pair">
      ${[loxim, sncr].map((p) => `<article class="tile">
        <a class="tile-link" href="${projectUrl(p.slug)}">
          ${cardMedia(p, '(min-width: 1000px) 540px, 100vw')}
          <div class="tile-body">
            ${tags(p.kind)}
            <h3>${p.title}</h3>
            <p>${p.short}</p>
            <dl class="mini-stats">${p.stats.map(stat).join('')}</dl>
          </div>
        </a>
      </article>`).join('\n      ')}
    </div>

    <ul class="also">
      ${rest.map((p) => `<li><a href="${projectUrl(p.slug)}">${cardMedia(p, '120px')}<span><strong>${p.title}</strong><span>${p.short}</span></span></a></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section path-sec" aria-labelledby="path-h">
  <div class="wrap">
    <div class="section-head split">
      <div><h2 id="path-h">Where I’ve been</h2><p class="lede">Most recent first.</p></div>
      <a class="more-link" href="${url('about/')}">The full story</a>
    </div>
    <ol class="path">
      <li><span class="yr">2026–</span><strong>Management Trainee</strong><span>LOXIM Industries, Ahmedabad</span></li>
      <li><span class="yr">2025</span><strong>Research semester</strong><span>KinCat group, NTNU, Trondheim, on a UTFORSK scholarship</span></li>
      <li><span class="yr">2024–26</span><strong>M.Tech, Catalysis Technology</strong><span>IIT Madras, CGPA 8.51/10</span></li>
      <li><span class="yr">2024</span><strong>GATE, Chemical Engineering</strong><span>All India Rank 864 of 13,937</span></li>
      <li><span class="yr">2019–23</span><strong>B.Tech, Chemical Engineering</strong><span>Indore Institute of Science and Technology</span></li>
    </ol>
  </div>
</section>`;
  return page({
    path: '',
    title: 'Ayush Suryawanshi – Chemical Engineer | Catalysis, Electrochemistry, Process Engineering',
    description:
      'Ayush Suryawanshi is a chemical engineer (M.Tech Catalysis Technology, IIT Madras) working across catalyst synthesis, electrochemical testing, modelling and process engineering, now at LOXIM Industries.',
    active: 'home',
    sheet: 'Home',
    body,
    bodyClass: 'home',
    extraHead: HASH_REDIRECT,
    jsonld: [
      personLd,
      { '@type': 'WebSite', '@id': liveUrl('#website'), url: liveUrl(), name: person.name, inLanguage: 'en', publisher: { '@id': liveUrl('#person') } },
      {
        '@type': 'ProfilePage', '@id': liveUrl('#profile'), url: liveUrl(), name: 'Ayush Suryawanshi – Chemical Engineer | Catalysis, Electrochemistry, Process Engineering',
        dateModified: person.updatedISO, isPartOf: { '@id': liveUrl('#website') }, mainEntity: { '@id': liveUrl('#person') },
      },
      introVideoLd,
    ],
  });
}

/* ---------- projects index ---------- */
function projectsIndex() {
  const count = (k) => projects.filter((p) => p.kind.includes(k)).length;
  const body = `
<section class="page-head sheet">
  <div class="wrap">
    <h1>Work</h1>
    <p class="lede">Lab research, modelling and process engineering from my M.Tech at IIT Madras, my semester at NTNU and my first industry role. Each project page covers the problem, my part in it, the methods, the results and their limits.</p>
    <div class="filters" role="group" aria-label="Show projects by area">
      ${kinds.map(([k, label], i) => `<button type="button" class="${k}" data-filter="${k}" aria-pressed="${i === 0}">${label} <span class="n">${k === 'all' ? projects.length : count(k)}</span></button>`).join('\n      ')}
    </div>
    <p class="count sr-only" aria-live="polite" data-count>${projects.length} projects</p>
  </div>
</section>
<section class="section tight">
  <div class="wrap">
    <ol class="worklist">
      ${projects
        .map(
          (p) => `<li class="work-row" data-kind="${p.kind.join(' ')}">
        <a class="work-link" href="${projectUrl(p.slug)}">
          ${cardMedia(p, '(min-width: 800px) 280px, 100vw')}
          <div class="work-body">
            ${tags(p.kind)}
            <h2>${p.title}</h2>
            <p>${p.short}</p>
            <p class="work-meta"><span>${p.when}</span><span>${strip(p.where)}</span></p>
          </div>
          <dl class="work-stats">${p.stats.map(stat).join('')}</dl>
        </a>
      </li>`,
        )
        .join('\n      ')}
    </ol>
    <p class="earlier"><strong>Earlier work.</strong> As a B.Tech student I presented a paper at SCHEMCON 2021, organised by MANIT and IISER Bhopal.</p>
  </div>
</section>`;
  return page({
    path: 'projects/',
    title: 'Work – Ayush Suryawanshi',
    sheet: 'Work',
    description: 'Projects by Ayush Suryawanshi: Bi-modified Pt/C catalysts for formic acid fuel cells, an effluent treatment-train study at LOXIM, an SNCR retrofit design, catalyst synthesis at NTNU and DFT of oxygen reduction on Pt13.',
    active: 'work',
    body,
    jsonld: [
      crumbs([['Home', ''], ['Work', 'projects/']]),
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
  const heading = p.pageTitle || p.title;
  const glance = p.showGlance !== false;
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const sheetRows = p.heroMeta
    ? p.heroMeta
    : [['When', p.when], ['Where', p.where], ...p.meta.filter(([k]) => k !== 'Type')];
  const heroFig = p.hero
    ? `<div class="wrap">${fig(p.hero[0], p.hero[1], p.hero[2], { cls: `proj-hero${p.heroFit === 'natural' ? ' natural' : ''}`, sizes: p.heroFit === 'natural' ? '(min-width: 900px) 760px, 100vw' : '(min-width: 1200px) 1100px, 100vw' })}</div>`
    : '';
  const body = `
<article class="project">
<header class="page-head sheet proj-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${url('projects/')}">Work</a><span aria-hidden="true">/</span><span aria-current="page">${p.title}</span></nav>
    ${tags(p.kind)}
    <h1>${heading}</h1>
    <p class="lede">${p.pageShort || p.short}</p>${p.lead ? `\n    ${p.lead}` : ''}
    <dl class="datasheet">
      <div class="ds-type"><dt>Type</dt><dd>${p.kindLabel}</dd></div>
      ${sheetRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n      ')}
    </dl>
  </div>
</header>
${heroFig}
<div class="wrap proj-layout">
  <aside class="toc" aria-label="On this page">
    <p class="toc-h">On this page</p>
    <ol>${[...(glance ? [['glance', 'At a glance']] : []), ...sections].map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol>
  </aside>
  <div class="prose">${glance ? `
    <section id="glance" class="glance" aria-labelledby="glance-h">
      <h2 id="glance-h">At a glance</h2>
      <dl>${p.glance.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </section>` : ''}
    ${sections.map(([id, title, html]) => `<section id="${id}" aria-labelledby="${id}-h"><h2 id="${id}-h">${title}</h2>${html}</section>`).join('\n')}
    <nav class="pager" aria-label="More projects">
      ${prev ? `<a class="prev" href="${projectUrl(prev.slug)}"><span>Previous</span>${prev.title}</a>` : '<span></span>'}
      ${next ? `<a class="next" href="${projectUrl(next.slug)}"><span>Next</span>${next.title}</a>` : `<a class="next" href="${url('projects/')}"><span>Back to</span>All work</a>`}
    </nav>
  </div>
</div>
</article>`;
  const title = `${strip(heading)} – Ayush Suryawanshi`;
  return page({
    path: `projects/${p.slug}/`,
    title,
    sheet: strip(p.title),
    description: p.description,
    active: 'work',
    body,
    image: p.hero ? `images/${p.hero[0]}` : undefined,
    jsonld: [
      crumbs([['Home', ''], ['Work', 'projects/'], [strip(heading), `projects/${p.slug}/`]]),
      {
        '@type': 'CreativeWork', name: strip(heading), headline: strip(heading), description: p.description, url: liveUrl(`projects/${p.slug}/`),
        author: { '@id': liveUrl('#person') }, inLanguage: 'en', keywords: p.tags.join(', '),
      },
    ],
  });
}

/* ---------- about ---------- */
function about() {
  const body = `
<section class="page-head sheet">
  <div class="wrap about-head">
    <div>
      <h1>About</h1>
      <p class="lede">I studied chemical engineering in Indore, specialised in catalysis at IIT Madras, made my thesis catalysts in Trondheim, and now work at LOXIM Industries in Ahmedabad. Along the way I’ve worked the whole loop: make the catalyst, build the electrode, test it honestly, model what the data can’t show, and think about the process around it.</p>
      <nav class="jump" aria-label="On this page">
        <a href="#journey">Journey</a><a href="#interests">What I enjoy working on</a><a href="#photos">People and places</a><a href="#credentials">Credentials</a>
      </nav>
    </div>
    <figure class="about-photo">${img('portrait-of-ayush-suryawanshi.jpg', 'Portrait of Ayush Suryawanshi', { sizes: '(min-width: 900px) 280px, 60vw', eager: true })}</figure>
  </div>
</section>

<section class="section" id="journey" aria-labelledby="journey-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="journey-h">Journey</h2>
      <p class="lede">Most recent first. The M.Tech entry has the thesis summary and my placement role.</p>
    </div>
    <ol class="timeline">
      ${timeline
        .map(
          (t) => `<li${t.id ? ` id="${t.id}"` : ''}${t.photo ? ' class="has-photo"' : ''}>
        <p class="tl-when">${t.when}</p>
        <div class="tl-body">
          <h3>${t.title}</h3>
          <p class="tl-where">${t.where}</p>
          <p>${t.text}${t.link ? ` <a href="${url(t.link[0])}">${t.link[1]}</a>` : ''}</p>
          ${t.blocks ? `<dl class="tl-blocks">${t.blocks.map(([k, v, link]) => `<div><dt>${k}</dt><dd>${v}${link ? ` <a href="${url(link)}">Read more</a>` : ''}</dd></div>`).join('')}</dl>` : ''}
        </div>
        ${t.photo ? fig(t.photo[0], t.photo[1], t.photo[2], { cls: 'tl-photo', sizes: '(min-width: 900px) 320px, 100vw' }) : ''}
      </li>`,
        )
        .join('\n      ')}
    </ol>
  </div>
</section>

<section class="section interests" id="interests" aria-labelledby="int-h">
  <div class="wrap narrow">
    <h2 id="int-h">What I enjoy working on</h2>
    <p>Problems where the chemistry and the engineering have to be solved together: how a catalyst behaves once it becomes an electrode, how a lab result changes on the way to a plant, and what a process really costs, stage by stage. I’m open to work in catalysis, electrochemistry or process engineering, on its own or where they meet.</p>
    <p class="note">My device-level experience so far is in three-electrode half-cells; full fuel cells and electrolysers are interests rather than work I’ve done.</p>
  </div>
</section>

<section class="section" id="photos" aria-labelledby="gallery-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="gallery-h">People and places</h2>
      <p class="lede">Conferences, the groups I worked with, and some of life around the work.</p>
    </div>
    <div class="gallery">${gallery.map(([f, a, c]) => fig(f, a, c, { cls: 'g', sizes: '(min-width: 1000px) 360px, (min-width: 600px) 50vw, 100vw' })).join('')}</div>
  </div>
</section>

<section class="section" id="credentials" aria-labelledby="cred-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="cred-h">Selected credentials</h2>
      <p class="lede">Certificates are available on request; they aren’t shown because they carry signatures, seals and identification numbers.</p>
    </div>
    <ul class="creds">
      ${credentials
        .map(
          (c) => `<li>
        <p class="cred-when">${c.when}</p>
        <div><h3>${c.title}</h3><p class="cred-meta">${c.issuer}</p><p>${c.note}${c.link ? ` <a href="${url(c.link[0])}">${c.link[1]}</a>` : ''}</p></div>
      </li>`,
        )
        .join('\n      ')}
    </ul>
    <p class="note">Also on record: GATE 2024 Chemical Engineering, All India Rank 864 of 13,937 candidates, and a UTFORSK mobility scholarship from NTNU for August–December 2025.</p>
  </div>
</section>`;
  return page({
    path: 'about/',
    title: 'About – Ayush Suryawanshi',
    sheet: 'About',
    description: 'About Ayush Suryawanshi: B.Tech in chemical engineering, M.Tech in Catalysis Technology at IIT Madras, a research semester at NTNU, Norway, and now LOXIM Industries.',
    active: 'about',
    body,
    jsonld: [crumbs([['Home', ''], ['About', 'about/']]), personLd],
  });
}

/* ---------- CV ---------- */
function cv() {
  const row = (title, org, when, extra = '') =>
    `<div class="cv-row"><p class="cv-when">${when}</p><div><h3>${title}</h3><p class="cv-org">${org}</p>${extra}</div></div>`;
  const body = `
<section class="page-head sheet">
  <div class="wrap">
    <h1>Curriculum vitae</h1>
    <p class="lede">The web version of my CV. The PDF has the same content in one file for applications.</p>
    <div class="cta">
      <a class="btn btn-solid" href="${url(person.cv)}" download="Ayush_CV.pdf">${DL}Download CV (PDF)</a>
      <a class="btn btn-line" href="mailto:${person.email}">Email me</a>
    </div>
  </div>
</section>
<section class="section tight">
  <div class="wrap cv">
    <section aria-labelledby="cv-exp"><h2 id="cv-exp">Experience</h2>
      ${experience.map((e) => row(e.title, e.org, e.when, `<ul>${e.points.map((x) => `<li>${x}</li>`).join('')}</ul>`)).join('\n      ')}
    </section>
    <section aria-labelledby="cv-edu"><h2 id="cv-edu">Education</h2>
      ${education.map((e) => row(e.title, e.org, e.when, `<p>${e.detail}</p>`)).join('\n      ')}
    </section>
    <section aria-labelledby="cv-res"><h2 id="cv-res">Projects</h2>
      ${projects.map((p) => row(`<a href="${projectUrl(p.slug)}">${p.title}</a>`, p.where, p.when, `<p><strong>Contribution.</strong> ${p.glance[1][1]}</p><p><strong>Result.</strong> ${p.glance[2][1]}</p>`)).join('\n      ')}
    </section>
    <section aria-labelledby="cv-skills"><h2 id="cv-skills">Skills, and where each one comes from</h2>
      <p class="skills-intro">Sorted by how I came by them, so a method learned in a course isn’t presented as project experience. Skills used in a project link to it.</p>
      ${skillEvidence
        .map(
          (g) => `<div class="skill-group"><h3>${g.title}</h3><p class="note">${g.note}</p>
      <dl class="skills">${g.rows
        .map(([k, v, links]) => `<div><dt>${k}</dt><dd>${v}${links.length ? `<span class="skill-links">${links.map(([slug, label]) => `<a href="${projectUrl(slug)}">${label}</a>`).join('')}</span>` : ''}</dd></div>`)
        .join('')}</dl></div>`,
        )
        .join('\n      ')}
      <dl class="skills"><div><dt>Languages</dt><dd>English (IELTS Academic 7.0, CEFR C1, July 2026), Hindi</dd></div></dl>
    </section>
    <section aria-labelledby="cv-rec"><h2 id="cv-rec">Conferences, awards and scholarships</h2>
      ${recognition.map((r) => row(r.title, r.where, r.when)).join('\n      ')}
    </section>
    <p class="note">Last updated ${person.updated}.</p>
  </div>
</section>`;
  return page({
    path: 'cv/',
    title: 'CV – Ayush Suryawanshi',
    sheet: 'CV',
    description: 'CV of Ayush Suryawanshi: M.Tech Catalysis Technology (IIT Madras, CGPA 8.51/10), NTNU research semester, Management Trainee at LOXIM Industries, catalyst synthesis, electrochemical testing and process engineering.',
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
    sheet: 'Not found',
    description: 'This page does not exist.',
    active: '',
    extraHead: HASH_REDIRECT,
    body: `<section class="page-head sheet"><div class="wrap"><h1>That page isn’t here</h1><p class="lede">It may have moved when the site was reorganised. Try one of these instead.</p><div class="cta"><a class="btn btn-solid" href="${url()}">Home</a><a class="btn btn-line" href="${url('projects/')}">Work</a><a class="btn btn-line" href="${url('cv/')}">CV</a></div></div></section>`,
  });
}

/* ---------- write everything ---------- */
rmSync(ROOT + 'projects', { recursive: true, force: true });
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

> ${person.name} is an Indian chemical engineer working across catalysis, electrochemistry and process engineering. Ayush holds an M.Tech in Catalysis Technology from IIT Madras (2026, CGPA 8.51/10), spent a research semester at NTNU, Norway (2025), and has been a Management Trainee at LOXIM Industries Ltd., Ahmedabad, since July 2026. The work spans catalyst synthesis and characterisation, electrode preparation and three-electrode electrochemical testing, DFT and reaction-kinetics modelling, process design and costing, and effluent treatment.

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
${skillEvidence.map((g) => `### ${g.title}\n${g.rows.map(([k, v]) => `- ${k}: ${strip(v)}`).join('\n')}`).join('\n\n')}

## Conferences, awards and scholarships
${recognition.map((r) => `- ${r.title}, ${r.where} (${r.when})`).join('\n')}
`,
);

console.log(`Built ${pages.length + 1} pages (${config.staging ? 'staging, noindex' : 'live'}) with base ${config.basePath}`);
