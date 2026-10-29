// All facts on the site live here, so a date or number only ever needs changing once.
// Sources: the original CV (October 2026, kept outside this repo), the thesis, the UTFORSK, DFT and SNCR reports, the
// LOXIM study (scope and relative saving only), and the photos in images/.
import { fig, img } from './lib.mjs';

export const person = {
  name: 'Ayush Suryawanshi',
  email: 'ayush.suryawanshi0803@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayush-suryawanshi',
  github: 'https://github.com/suryawanshi-ayush',
  cv: 'Ayush_CV_revised.pdf',  // revised summary; the original is kept outside this repo
  role: 'Chemical engineer',
  location: 'Ahmedabad, India',
  updated: 'October 2026',
  updatedISO: '2026-10-26',
};

export const education = [
  {
    title: 'M.Tech, Catalysis Technology',
    org: 'Department of Chemical Engineering, IIT Madras, Chennai',
    when: 'Jun 2024 – May 2026',
    detail: 'CGPA 8.51/10. Degree conferred at the 63rd convocation, 17 July 2026.',
  },
  {
    title: 'Semester exchange',
    org: 'Department of Chemical Engineering, NTNU, Trondheim, Norway',
    when: 'Aug – Dec 2025',
    detail: 'UTFORSK mobility scholarship. Thesis catalyst synthesis in the KinCat group, hosted and supervised by Prof. Edd Anders Blekkan.',
  },
  {
    title: 'B.Tech, Chemical Engineering',
    org: 'Indore Institute of Science and Technology, affiliated to RGPV Bhopal',
    when: '2019 – 2023',
    detail: 'CGPA 8.17/10, First Division with Honours.',
  },
  {
    title: 'Senior School Certificate (Class XII, CBSE)',
    org: 'Delhi Public School, Chhindwara',
    when: '2019',
    detail: '84.2%.',
  },
];

export const experience = [
  {
    title: 'Management Trainee',
    org: 'LOXIM Industries Ltd., Ahmedabad',
    when: 'Jul 2026 – present',
    points: [
      // Disclosure: LOXIM's report is marked as company property. Only scope, methods and the relative saving are
      // shown (approved by Ayush, Oct 2026); no supplier names, absolute costs, effluent analysis or report figures.
      'Led a two-month study on a high-sulphate dye effluent: mapped where the treatment cost goes, compared electrochemical, membrane and crystallisation routes with suppliers, and proposed a treatment train that recovers the waste salt as a product, at about two-thirds lower modelled operating cost.',
      'Evaluated electrocoagulation and electroflocculation as pretreatment options.',
      'Ran screening, sample trials and feasibility checks with more than ten technology vendors; handed the study over with a validation roadmap for further evaluation.',
      'Trained on HPLC, GC-MS, FTIR and UV-Vis; completed plant safety induction and HSE training.',
    ],
  },
  {
    title: 'Deputy Placement and Internship Coordinator',
    org: 'Placement and Internship Cell, IIT Madras',
    when: 'Aug 2024 – Jul 2025',
    points: [
      // REVIEW(disclosure): the 75% placement figure is institutional data; confirm it is published.
      'Handled placements and internships for the 2023–25 and 2024–26 M.Tech batches; 75% of M.Tech chemical engineers were placed.',
    ],
  },
];

// Course lists as in the master resume (23 Oct 2026), checked against the transcripts there.
export const coursework =
  'M.Tech: Advanced Chemical Engineering Thermodynamics, Chemical Reactor Theory, Transport Phenomena, Experimental Methods in Catalysis, Catalyst Preparation and Characterization Lab, Computational Methods in Catalysis. B.Tech: Material and Energy Balance, Chemical Reaction Engineering, Heat and Mass Transfer, Process Equipment Design, Chemical Process Modeling and Simulation, Process Safety and Hazards Management, Process Plant Economics and Management';

// The same skills as above, sorted by how I came by them. `used` skills appear in a project or a
// job on this site and link to it; the rest are on the CV but not shown in any project here, and
// the page says so. Where the sources do not say whether a method came from a course or a lab,
// it is listed as "not used in the projects shown" rather than guessed.
export const skillEvidence = [
  {
    title: 'Used in project work',
    note: 'Each of these appears in a project on this site.',
    rows: [
      ['Electrochemical testing', 'Autolab potentiostat with NOVA, three-electrode cell, cyclic voltammetry, chronoamperometry, ECSA, one-hour durability holds', [['thesis-bi-pt-formic-acid', 'Thesis']]],
      ['Electrodes and catalysts', 'Wet-chemical catalyst modification, catalyst ink formulation and Nafion loading, drop-cast electrodes on glassy carbon and carbon paper', [['thesis-bi-pt-formic-acid', 'Thesis'], ['ntnu-synthesis-scale-up', 'NTNU synthesis']]],
      ['Characterisation', 'FE-SEM with EDX, powder XRD, BET: reading and interpreting the results', [['thesis-bi-pt-formic-acid', 'Thesis'], ['ntnu-synthesis-scale-up', 'NTNU synthesis']]],
      ['Computational chemistry', 'Gaussian 16 (DFT), Avogadro', [['dft-orr-pt13', 'Pt13 DFT']]],
      ['Kinetic modelling and process design', 'Python with Cantera, Aspen HYSYS, Excel, mass and energy balances; capital and running-cost estimates (team project)', [['sncr-biomass-boiler', 'SNCR design']]],
      ['Data analysis', 'OriginPro', [['thesis-bi-pt-formic-acid', 'Thesis']]],
      ['Handling hazards in the lab', 'Acids, sodium borohydride, inert-gas (nitrogen and argon) work', [['thesis-bi-pt-formic-acid', 'Thesis'], ['ntnu-synthesis-scale-up', 'NTNU synthesis']]],
    ],
  },
  {
    title: 'From the current job',
    note: 'Work and training at LOXIM Industries.',
    rows: [
      ['Analytical instruments', 'HPLC, GC-MS, FTIR and UV-Vis: training', []],
      ['Plant safety', 'Plant HSE induction and SOP training', []],
      ['Technology selection and process economics', 'Supplier screening, sample trials and feasibility checks; DWSIM simulation and a stage-wise operating-cost model', [['loxim-effluent-treatment-study', 'LOXIM study']]],
    ],
  },
  {
    title: 'From coursework',
    note: 'Learned and practised in courses, not part of the projects shown here.',
    rows: [
      ['XPS', 'Analysed XPS data in M.Tech coursework', []],
      ['Courses', coursework, []],
      ['Process simulation', 'CHEMCAD in B.Tech process simulation labs; DWSIM, self-taught and used in the LOXIM study', [['loxim-effluent-treatment-study', 'LOXIM study']]],
    ],
  },
  {
    title: 'Also on my CV, not used in the projects shown',
    note: 'Listed for completeness; none of the project pages rely on them.',
    rows: [['Methods', 'Linear sweep voltammetry, electrochemical impedance spectroscopy, chronopotentiometry, TGA', []]],
  },
];

export const recognition = [
  { title: 'Poster on SNCR NOx reduction, Treforedlingsforum 2025', where: 'Oslo, Norway', when: 'Nov 2025' },
  { title: 'Attended EuropaCat 2025, the European catalysis congress', where: 'Trondheim, Norway', when: '2025' },
  { title: 'UTFORSK mobility scholarship', where: 'NTNU, for a research semester in Norway', when: '2025' },
  { title: 'GIAN course on characterisation of heterogeneous catalysts', where: 'IIT Madras', when: 'Apr – May 2025' },
  { title: 'GATE 2024, Chemical Engineering: All India Rank 864', where: 'Out of 13,937 candidates', when: 'Feb 2024' },
  { title: 'Paper presentation, SCHEMCON 2021', where: 'MANIT and IISER Bhopal', when: 'Oct 2021' },
];

// The three areas of work, shown on the home page as units on a process flow line. Each claim rests on a
// project page; nothing here goes beyond them.
export const pillars = [
  {
    key: 'catalysis',
    title: 'Catalysis',
    text: 'Making and characterising catalysts: bismuth-modified Pt/C by wet chemistry, a synthesis route reworked at NTNU after an ignition on the filter, and DFT of oxygen reduction on a 13-atom platinum cluster.',
    links: [['thesis-bi-pt-formic-acid', 'Bi-modified Pt/C'], ['ntnu-synthesis-scale-up', 'Synthesis rework at NTNU'], ['dft-orr-pt13', 'DFT on Pt₁₃']],
  },
  {
    key: 'electrochemistry',
    title: 'Electrochemistry',
    text: 'Catalyst inks and drop-cast electrodes tested in a three-electrode half-cell (cyclic voltammetry, active area, one-hour holds), and electrochemical pretreatment options for an industrial effluent.',
    links: [['thesis-bi-pt-formic-acid', 'Half-cell testing'], ['loxim-effluent-treatment-study', 'Electrochemical pretreatment']],
  },
  {
    key: 'process',
    title: 'Process engineering',
    text: 'Kinetic models, equipment sizing, safety and cost for an SNCR retrofit, and an effluent treatment-train study with DWSIM simulation and a stage-wise operating-cost model.',
    links: [['sncr-biomass-boiler', 'SNCR retrofit'], ['loxim-effluent-treatment-study', 'Treatment-train study']],
  },
];

export const timeline = [
  {
    when: 'Jul 2026 – present',
    title: 'Management Trainee, LOXIM Industries',
    where: 'Ahmedabad',
    text: 'My first industry role. I led a two-month study on treating a high-sulphate dye effluent, from a cost baseline and supplier screening to a proposed treatment train that recovers the salt, and handed it over for further evaluation.',
    link: ['projects/loxim-effluent-treatment-study/', 'The LOXIM study'],
  },
  {
    when: 'Jul 2026',
    title: 'M.Tech degree, 63rd convocation of IIT Madras',
    where: 'Chennai',
    text: 'Degree conferred on 17 July 2026, after submitting the thesis in May.',
    photo: ['ayush-receiving-his-degree-certificate-on-stage-with.jpg', 'Ayush receiving his degree certificate on stage from two faculty members', 'Receiving my M.Tech degree at the 63rd convocation of IIT Madras, July 2026.'],
  },
  {
    when: 'Aug – Dec 2025',
    title: 'Research semester at NTNU, Norway',
    where: 'Trondheim, on a UTFORSK mobility scholarship',
    text: 'Synthesised the thesis catalysts in the KinCat group, where Prof. Edd Anders Blekkan hosted and supervised the work, reworked the route after an ignition on the filter, and joined a four-person SNCR process design project for two Norwegian industry partners. Attended EuropaCat 2025 in Trondheim and presented our poster at Treforedlingsforum 2025 in Oslo.',
    photo: ['ayush-at-ntnu-main-building-trondheim.jpg', 'Ayush and a friend standing behind the large blue NTNU letters in front of the main university building in Trondheim', 'At NTNU’s main building in Trondheim during the exchange semester.'],
  },
  {
    id: 'mtech',
    when: 'Jun 2024 – May 2026',
    title: 'M.Tech, Catalysis Technology, IIT Madras',
    where: 'Department of Chemical Engineering · CGPA 8.51/10',
    text: 'Two years on how catalysts work and how to make and test them: adsorption and catalysis, solids and surfaces, reactor theory, thermodynamics and transport, a catalyst preparation and characterisation lab, and computational methods in catalysis.',
    blocks: [
      ['Thesis', 'Formic acid can power small fuel cells, but the platinum catalyst that oxidises it gets clogged by carbon monoxide from a side reaction, and the current fades within an hour. With Prof. Raghuram Chetty I tested two remedies: a sub-monolayer of bismuth on commercial Pt/C, which is thought to leave fewer of the neighbouring platinum sites that CO needs to form, and a dissolved quinone (AQSA) that acts as a redox mediator. In three-electrode half-cell tests the catalyst with the least bismuth was the most durable of the series: over a one-hour hold it kept about 1.6 times the share of its starting current that unmodified Pt/C kept.', 'projects/thesis-bi-pt-formic-acid/'],
      ['Also', 'A DFT study of oxygen reduction on a 13-atom platinum cluster (Jan – May 2025) and a GIAN course on characterising heterogeneous catalysts (Apr – May 2025).', 'projects/dft-orr-pt13/'],
      ['Role', 'Deputy Placement and Internship Coordinator, Placement and Internship Cell, IIT Madras (Aug 2024 – Jul 2025). Handled placements and internships for the 2023–25 and 2024–26 M.Tech batches; 75% of M.Tech chemical engineers were placed.'],
    ],
  },
  {
    when: 'Feb 2024',
    title: 'GATE 2024, Chemical Engineering',
    where: 'All India Rank 864 of 13,937 candidates',
    text: 'The national entrance exam that opened the door to the M.Tech at IIT Madras.',
  },
  {
    when: '2019 – 2023',
    title: 'B.Tech, Chemical Engineering',
    where: 'Indore Institute of Science and Technology (RGPV Bhopal)',
    text: 'The core of chemical engineering: transport, reaction engineering, process control, equipment design and process safety. CGPA 8.17/10, First Division with Honours. Presented a paper at SCHEMCON 2021 in Bhopal.',
  },
];

// Certificates chosen because each one evidences a thread of the portfolio. Listed as text only:
// the images carry signatures, seals and IDs, so they are not published.
export const credentials = [
  {
    slug: 'mtech-degree-iit-madras',
    title: 'Master of Technology, Catalysis Technology',
    issuer: 'IIT Madras',
    when: '17 July 2026',
    note: 'Degree conferred at the 63rd convocation.',
    alt: 'IIT Madras degree certificate conferring the degree of Master of Technology in Catalysis Technology on Ayush Suryawanshi, dated 17 July 2026',
  },
  {
    slug: 'treforedlingsforum-2025-poster',
    title: 'Poster: SNCR technology for reduction of NOx emissions in a bio-boiler',
    issuer: 'Treforedlingsforum 2025 (PTF), Oslo',
    when: '18–19 November 2025',
    note: 'Presented the SNCR design study.',
    link: ['projects/sncr-biomass-boiler/', 'The SNCR project'],
    alt: 'Certificate of participation from Treforedlingsforum 2025 in Oslo for presenting research titled SNCR-technology for reduction of NOx emissions in a bio-boiler',
  },
  {
    slug: 'gian-heterogeneous-catalysts-2025',
    title: 'Characterization of Heterogeneous Catalysts: Bulk, Surface, In-Situ and Operando Methods',
    issuer: 'GIAN course, Department of Chemical Engineering, IIT Madras',
    when: '21 April – 4 May 2025',
    note: 'Two-week course taught with Prof. Miguel A. Bañares (CSIC, Madrid).',
    alt: 'GIAN certificate of participation for the course Characterization of Heterogeneous Catalysts: Bulk, Surface, In-Situ and Operando Methods, IIT Madras, 21 April to 4 May 2025',
  },
  {
    slug: 'schemcon-2021-paper',
    title: 'Paper presentation, SCHEMCON 2021',
    issuer: 'MANIT and IISER Bhopal',
    when: '22–23 October 2021',
    note: '17th Annual Session of the Students Chemical Engineering Congress.',
    alt: 'Certificate of presentation from SCHEMCON 2021, organised by MANIT and IISER Bhopal, for a paper presented on 22 to 23 October 2021',
  },
];

// REVIEW(disclosure): photos of other people (research group, batch, teammates, friends) need
// their consent for a public site.
export const gallery = [
  // [file, alt, caption, focal point, wide]
  ['ayush-in-front-of-the-europacat-2025-trondheim.jpg', 'Ayush standing in front of the EuropaCat 2025 Trondheim backdrop', 'At EuropaCat 2025, the European catalysis congress, in Trondheim.', '72% 50%'],
  ['ayush-reading-conference-posters.jpg', 'Ayush reading posters at a conference poster session', 'Reading the poster session at EuropaCat 2025.', '50% 40%'],
  ['ayush-suryawanshi-group-selfie-of-a-research-group.jpg', 'Group selfie of a research group of about fifteen people', 'With my thesis supervisor’s research group at IIT Madras.'],
  ['sncr-project-team-dinner-trondheim.jpg', 'Ayush and friends from the SNCR project smiling around a dinner table', 'A dinner I hosted for my SNCR project group in Norway.', '50% 15%', true],
  ['hiking-with-friends-norway.jpg', 'Ayush and three friends in rain jackets beside a stone cairn on a misty hike', 'Hiking with friends in Norway.'],
  ['ayush-suryawanshi-group-photo-of-m-tech-students-in-convocation.jpg', 'Group photo of M.Tech students in convocation stoles with faculty', 'My M.Tech Catalysis Technology batch with faculty on convocation day.', '50% 20%', true],
  ['ayush-sitting-on-a-snow-covered-bench-outside.jpg', 'Ayush sitting on a snow-covered bench outside NTNU buildings', 'First snow in Trondheim during the exchange semester.'],
];

/* ------------------------------------------------------------------ projects */

const dftSteps = [
  ['O<sub>2</sub>* → OOH*', 'OOH* forms', -2.84],
  ['OOH* → O* + H<sub>2</sub>O', 'O* and water form', -2.05],
  ['O* → OH*', 'OH* forms', -1.85],
  ['OH* → H<sub>2</sub>O + Pt<sub>13</sub>', 'Water released, cluster regenerated', -3.9],
];

function dftChart() {
  const max = 5;
  const rows = dftSteps
    .map(
      ([eq, label, v]) => `<div class="neg-row" role="listitem">
      <span class="neg-label"><span class="eq">${eq}</span><span class="muted">${label}</span></span>
      <span class="neg-track"><span class="neg-val">${v.toFixed(2).replace('-', '−')} eV</span><span class="neg-bar" style="--v:${(Math.abs(v) / max) * 100}"></span></span>
    </div>`,
    )
    .join('');
  return `<figure class="chart" aria-labelledby="dft-title">
  <div class="chart-head">
    <p class="chart-title" id="dft-title">Tabulated step energies (eV)</p>
    <p class="chart-sub">Associative four-electron pathway on Pt<sub>13</sub>, UB3LYP, electronic energies only: no zero-point, thermal or entropy corrections, and no barriers.</p>
  </div>
  <div class="neg" role="list">${rows}
    <div class="neg-axis" aria-hidden="true"><span>−5</span><span>−4</span><span>−3</span><span>−2</span><span>−1</span><span>0</span></div>
  </div>
</figure>`;
}

// The animated explainer of why bismuth helps. Schematic only; the JS in site.js runs it.
export function mechanism({ compact = false, conceptual = false } = {}) {
  const pt = Array.from({ length: 11 }, (_, i) => `<circle class="pt" cx="${60 + i * 52}" cy="214" r="21"/>`).join('');
  const bi = [2, 5, 8].map((i) => `<circle class="bi" cx="${60 + i * 52 + 26}" cy="186" r="15"/>`).join('');
  return `<figure class="mech${compact ? ' compact' : ''}" data-mech data-mode="pt">
  <div class="mech-controls">
    <div class="seg" role="group" aria-label="Catalyst surface">
      <button type="button" aria-pressed="true" data-mode="pt">Pt/C</button>
      <button type="button" aria-pressed="false" data-mode="bi">Bi-modified Pt/C</button>
    </div>
    <button type="button" class="link-btn" data-replay>Replay</button>
  </div>
  <svg viewBox="10 50 620 240" role="img" aria-labelledby="mech-t mech-d">
    <title id="mech-t">Schematic of formic acid oxidation on a platinum surface</title>
    <desc id="mech-d">${conceptual
      ? 'Conceptual sketch of a proposed site-blocking mechanism. On plain platinum, some formic acid is shown leaving adsorbed carbon monoxide that blocks sites. With bismuth on the surface, fewer groups of neighbouring platinum atoms are shown available for carbon monoxide to form. Not an observation or a simulation.'
      : 'Formic acid molecules arrive at a row of platinum atoms. On plain platinum some of them leave adsorbed carbon monoxide that blocks sites. With bismuth atoms sitting on the surface, the molecules go straight to carbon dioxide.'}</desc>
    <rect class="support" x="20" y="232" width="600" height="48" rx="6"/>
    <text class="support-label" x="36" y="262">carbon support</text>
    <g class="pt-row">${pt}</g>
    <g class="bi-row">${bi}</g>
    <g class="mols"></g>
    <g class="mech-key" transform="translate(28 64)">
      <circle class="pt" cx="7" cy="7" r="7"/><text x="20" y="11">Pt</text>
      <circle class="bi" cx="60" cy="7" r="7"/><text x="73" y="11">Bi</text>
    </g>
  </svg>
  <div class="mech-readout">
    <div><span class="k">${conceptual ? 'Free sites in this sketch' : 'Free Pt sites'}</span><span class="v" data-free>11 / 11</span></div>
    <div class="meter" aria-hidden="true"><span data-meter></span></div>
    <p class="mech-note"${conceptual ? ' hidden' : ''} aria-live="polite" data-note>On plain platinum, part of the formic acid takes the indirect path and leaves CO stuck to the surface. Each blocked site stops contributing current.</p>${conceptual
      ? `
    <p class="mech-note">In the proposed mechanism, the indirect path leaves adsorbed CO that blocks platinum sites, and bismuth on the surface breaks up the groups of neighbouring platinum atoms that CO formation needs. The thesis results are consistent with this; it was not observed directly.</p>`
      : ''}
  </div>
  <figcaption>${conceptual
    ? '<strong>Conceptual interpretation, not experimental data.</strong> A sketch of the proposed site-blocking mechanism; atom and site counts are arbitrary, not measured. Direct path: HCOOH → CO<sub>2</sub> + 2H<sup>+</sup> + 2e<sup>−</sup>. Indirect path: HCOOH → CO<sub>ads</sub> + H<sub>2</sub>O, which is thought to need several neighbouring Pt atoms.'
    : 'Schematic, not to scale and not a simulation. Direct path: HCOOH → CO<sub>2</sub> + 2H<sup>+</sup> + 2e<sup>−</sup>. Indirect path: HCOOH → CO<sub>ads</sub> + H<sub>2</sub>O, which needs several neighbouring Pt atoms. Bismuth sitting on the surface breaks up those groups of sites.'}</figcaption>
</figure>`;
}

// A plain table with row headings; `hl` lists the row indexes to highlight. The wrapper scrolls
// sideways on narrow screens, so it is a labelled, focusable region.
let tableId = 0;
const table = (caption, head, rows, { hl = [], note = '' } = {}) => {
  const id = `tbl-${++tableId}`;
  return `<div class="table-wrap cols-${head.length}" role="region" aria-labelledby="${id}" tabindex="0"><table>
  <caption id="${id}">${caption}</caption>
  <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
  <tbody>${rows
    .map((r, i) => `<tr${hl.includes(i) ? ' class="hl"' : ''}><th scope="row">${r[0]}</th>${r.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('')}</tbody>
</table></div>${note ? `<p class="note">${note}</p>` : ''}`;
};

const defs = (rows) => `<dl class="defs">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

// Relative figures only (the thesis is unpublished): retention of the lowest-bismuth catalyst divided by that of
// commercial Pt/C after the one-hour hold, rounded to one decimal from the thesis tables (exact values stay offline).
function relativeRetention() {
  const rows = [
    ['Without the mediator', 1.6],
    ['With the mediator (AQSA)', 1.3],
  ];
  const bar = (label, r, cls) => `<span class="rr-bar ${cls}" style="--r:${r}"><span class="rr-val">${r.toFixed(1)}×</span><span class="sr-only"> ${label}</span></span>`;
  return `<figure class="chart rr" aria-labelledby="rr-title">
  <p class="chart-title" id="rr-title">Current retention relative to commercial Pt/C</p>
  <p class="chart-sub">Share of starting current kept after a one-hour hold, with commercial Pt/C set to 1.0. Ratios from unpublished half-cell data.</p>
  <ul class="legend" aria-hidden="true"><li><i class="sw rr-ref"></i>Commercial Pt/C</li><li><i class="sw rr-best"></i>Lowest-bismuth catalyst</li></ul>
  <div class="rr-rows" role="list">${rows
    .map(([label, r]) => `<div class="rr-row" role="listitem"><span class="rr-label">${label}</span><span class="rr-pair">${bar('commercial Pt/C', 1, 'rr-ref')}${bar('lowest-bismuth catalyst', r, 'rr-best')}</span></div>`)
    .join('')}</div>
</figure>`;
}

const projectList = [
  /* ------------------------------------------------------------------ thesis */
  {
    // Disclosure (Oct 2026): the thesis is unpublished, so the page shows findings in words and as rounded ratios
    // (relative to commercial Pt/C or between catalysts) only. No exact values, data plots, compositions, recipes or
    // operating conditions. Restore them, with the DOI, once the work is published.
    slug: 'thesis-bi-pt-formic-acid',
    kind: ['catalysis', 'electrochemistry'],
    kindLabel: 'Experimental research · M.Tech thesis',
    title: 'Keeping platinum clean in formic acid fuel cells',
    short: 'Bi-modified Pt/C catalysts and a quinone mediator, tested for how long they hold their current.',
    // Page-only heading and hero; the project keeps its short title on cards and in the CV elsewhere.
    pageTitle: 'Balancing activity and current retention in Bi-modified Pt/C',
    pageShort: 'A formic-acid oxidation study of bismuth-modified Pt/C catalysts and a quinone mediator (AQSA), tested in three-electrode half-cells. Not a full fuel-cell demonstration.',
    lead: `<div class="lead-result" role="group" aria-label="Main findings">
      <p class="lead-k">Main findings · one-hour durability tests</p>
      <dl class="lead-grid">
        <div><dt>Durability vs commercial Pt/C</dt><dd><b>1.6×</b>The lowest-bismuth catalyst kept about 1.6 times the share of its starting current that commercial Pt/C kept (about 1.3 times with the mediator).</dd></div>
        <div><dt>Activity vs durability</dt><dd><b>1.4×</b>The most active catalyst gave about 1.4 times the peak mass activity of the most durable one, but lost current faster.</dd></div>
      </dl>
      <p class="lead-note">Unpublished M.Tech research: figures are rounded ratios; exact values, data plots and recipes are held back until publication. I am happy to walk through the full dataset in an interview.</p>
    </div>`,
    heroMeta: [
      ['When', 'May 2025 – May 2026'],
      ['Project', 'M.Tech thesis, IIT Madras; catalyst synthesis at NTNU, Norway'],
      ['Methods', 'Catalyst synthesis, SEM/EDX and XRD, cyclic voltammetry, chronoamperometry'],
    ],
    showGlance: false,
    description:
      'M.Tech thesis by Ayush Suryawanshi at IIT Madras: Bi-modified Pt/C catalysts and AQSA quinone mediation for formic acid oxidation, with synthesis, characterisation and half-cell durability testing.',
    when: 'May 2025 – May 2026',
    where: 'IIT Madras, with synthesis at NTNU, Norway',
    card: 'half-cell-electrodes',
    cardImg: ['ayush-suryawanshi-glass-cell-with-glassy-carbon-electrode-and-potentiostat.jpg', 'Three-electrode glass cell with clear electrolyte, wired to the potentiostat leads', '50% 66%'],
    stats: [
      ['1.6×', 'current retention of the best catalyst vs commercial Pt/C (one-hour hold)'],
      ['1.4×', 'peak mass activity, most active vs most durable catalyst'],
      ['4', 'Bi-modified catalysts made, characterised and tested'],
    ],
    tags: ['Electrocatalysis', 'Formic acid oxidation', 'Potentiostat', 'FE-SEM / EDX / XRD'],
    meta: [
      ['Type', 'M.Tech thesis'],
      ['Supervisor', 'Prof. Raghuram Chetty, IIT Madras'],
      ['At NTNU', 'KinCat group; hosted and supervised by Prof. Edd Anders Blekkan'],
      ['Methods', 'Wet-chemical synthesis, catalyst inks, CV, chronoamperometry, FE-SEM, EDX, XRD, BET'],
      ['Tools', 'Autolab potentiostat with NOVA, OriginPro'],
      ['Full title', 'Feasibility Study and Performance Evaluation of Hybrid Quinone–Formic Acid Systems as Alternative Fuels for Proton Exchange Membrane Fuel Cells'],
    ],
    glance: [
      ['Problem', 'Platinum oxidises formic acid well at first, but adsorbed CO builds up and the current falls within an hour.'],
      ['My contribution', 'Made and characterised four Bi-modified Pt/C catalysts, tuned the catalyst ink, and tested them with and without a quinone mediator (AQSA) in a three-electrode half-cell.'],
      ['Key result', 'The lowest-bismuth catalyst was the most durable of the series: over a one-hour hold it kept about 1.6 times the share of its starting current that commercial Pt/C kept (about 1.3 times with the mediator). The most active catalyst was not the most durable, and the quinone mediator lowered retention.'],
      ['Limits', 'Half-cell tests in acid over one hour; testing in a membrane electrode assembly and a full cell is the next step. Exact values are held back until the work is published.'],
    ],
    hero: ['thesis-workflow-synthesis-testing-sem-banner.jpg', 'Three photos: catalyst slurry stirring on a hotplate, the three-electrode half-cell wired to the potentiostat, and Ayush at the SEM in the NTNU cleanroom', 'From synthesis to testing to characterisation: catalyst slurry stirring at NTNU, the three-electrode half-cell wired to the potentiostat, and SEM imaging in the NTNU cleanroom.'],
    // Statements below are checked against the thesis tables; only rounded ratios appear on the page (exact values
    // stay offline until the work is published).
    sections: () => [
      ['question', 'The question', `
<p>Platinum oxidises formic acid well at first, but a side pathway leaves adsorbed carbon monoxide (CO) on the surface and the current decays. Modifying platinum with small amounts of bismuth has been reported to reduce this poisoning.</p>
<p>The thesis asked how the amount of bismuth on commercial Pt/C trades peak activity against how well the current holds up over an hour, and how a dissolved quinone mediator, anthraquinone-2-sulfonic acid (AQSA), changes that picture. Unmodified commercial Pt/C was the reference throughout.</p>`],
      ['approach', 'My contribution and approach', `
<p>This was my M.Tech thesis at IIT Madras, supervised by Prof. Raghuram Chetty, with the catalyst synthesis carried out during my research stay at NTNU. I did the experimental work and the analysis:</p>
<ul class="tight">
  <li><strong>Made a series of catalysts</strong>: commercial Pt/C modified with bismuth at four loadings by a wet-chemical route.</li>
  <li><strong>Characterised them</strong> with electron microscopy and element mapping (FE-SEM, EDX), X-ray diffraction and, for the best catalyst, surface-area measurement.</li>
  <li><strong>Optimised the catalyst ink</strong> before the main comparisons.</li>
  <li><strong>Tested activity and durability</strong> in a three-electrode half-cell: cyclic voltammetry, and a one-hour constant-potential hold with and without AQSA.</li>
</ul>
${mechanism({ conceptual: true })}`],
      ['findings', 'Key findings', `
<h3>1. The most durable catalyst was the one with the least bismuth</h3>
<p>In one-hour constant-potential holds, the lowest-bismuth catalyst kept the largest share of its starting current of the five catalysts tested, in both electrolytes: about 1.6 times the share that commercial Pt/C kept, and still about 1.3 times with the mediator. Higher bismuth loadings retained less. Durability, not just activity, is what decides whether an anode catalyst is useful in a real cell.</p>
${relativeRetention()}

<h3>2. Peak activity and durability pulled in different directions</h3>
<p>Voltammetry ranked the series differently: a higher-loading catalyst gave the highest peak mass activity, about 1.4 times that of the most durable catalyst, which the thesis assigns largely to oxidative removal of CO that had already adsorbed, but it lost current faster over the hour. Retention measures decay, not output, so the two properties point to different choices: more current at the start, or current that holds. Mapping that trade-off, rather than reporting the best-looking voltammogram, is the main contribution of the thesis.</p>

<h3>3. The quinone mediator lowered retention</h3>
<p>With AQSA in the electrolyte, one-hour retention dropped for all five catalysts, and the lowest-bismuth catalyst stayed the most durable. This is a clear negative result for the single mediator concentration used in the durability tests, and it narrows where a mediator could help; it is not a general verdict on quinone mediation.</p>

<h3>4. Characterisation and ink optimisation backed the picture</h3>
<p>At the lowest loadings, electron microscopy and X-ray diffraction showed no separate bismuth crystallites, consistent with a thin bismuth decoration on the platinum; at the highest loading, bismuth-rich agglomerates appeared. Optimising the catalyst ink first also paid off: a thinner Nafion binder film gave about 2.5 times the peak current, and that ink was used for every comparison.</p>

<div class="data-held">
  <p class="data-held-k">Held back until publication</p>
  <p>The full dataset covers retention curves for five catalysts in two electrolytes, cyclic voltammetry and mass activity, electrochemically active surface area, FE-SEM and EDX maps, X-ray diffraction and BET surface area. It is not shown here because the work is unpublished; I am glad to walk through it in an interview.</p>
</div>`],
      ['limits', 'Evidence and study limits', `
<p>This page describes unpublished thesis results in words and rounded ratios. Exact values, data plots, recipes, compositions and operating conditions are held back until the work is published.</p>
<ul class="tight">
  <li><strong>Half-cell, not a fuel cell.</strong> All results come from three-electrode half-cell tests in acid at room temperature. They rank catalysts against each other; a membrane electrode assembly and single-cell tests are the next step named in the thesis.</li>
  <li><strong>One hour.</strong> Retention was measured over a one-hour hold; practical devices run for hundreds to thousands of hours.</li>
  <li><strong>Repeatability still to quantify.</strong> The thesis reports no replicate counts or error bars, so the differences are rankings rather than statistically tested ones; replicate runs are the natural next step.</li>
  <li><strong>Coarse loading grid.</strong> Four bismuth loadings were tested; the tested loading grid was too coarse to locate the optimum.</li>
  <li><strong>Inferred mechanism.</strong> Site blocking by bismuth is a proposed mechanism that the results are consistent with; it was not observed directly, and the illustration above is conceptual.</li>
</ul>
<p class="takeaway"><strong>What I took from it.</strong> A good-looking voltammogram is not the same as a durable catalyst, and retention is not the same as output. I now check durability before ranking anything, and I ask what each measurement can and cannot see.</p>
<details class="more"><summary>Thesis details</summary>
<dl class="details-dl">
  <div><dt>Full title</dt><dd>Feasibility Study and Performance Evaluation of Hybrid Quinone–Formic Acid Systems as Alternative Fuels for Proton Exchange Membrane Fuel Cells</dd></div>
  <div><dt>Supervisor</dt><dd>Prof. Raghuram Chetty, IIT Madras</dd></div>
  <div><dt>At NTNU</dt><dd>KinCat group; hosted and supervised by Prof. Edd Anders Blekkan</dd></div>
  <div><dt>Tools</dt><dd>Autolab potentiostat with NOVA, OriginPro</dd></div>
</dl>
</details>`],
    ],
  },

  /* ---------------------------------------------------------------- LOXIM */
  {
    // Disclosure: the study report is LOXIM's property. Approved for the portfolio (Oct 2026): scope and methods in
    // general terms and the relative saving only. No supplier names, absolute costs, effluent analysis, report
    // figures or photos.
    slug: 'loxim-effluent-treatment-study',
    kind: ['process', 'electrochemistry', 'modelling'],
    kindLabel: 'Industrial project · LOXIM Industries',
    title: 'A lower-cost treatment train for a high-sulphate effluent',
    short: 'A two-month study: where the treatment cost of a dye effluent goes, which routes could replace it, and a proposed train that recovers the waste salt as a product.',
    description:
      'Two-month industrial study by Ayush Suryawanshi at LOXIM Industries: cost baseline, supplier screening of electrochemical, membrane and crystallisation routes, DWSIM simulation and a stage-wise operating-cost model for a high-sulphate dye effluent.',
    when: '2026, two months',
    where: 'LOXIM Industries Ltd., Ahmedabad',
    cardArt: 'train',
    stats: [
      ['≈ ⅔', 'lower modelled operating cost, quantified items only'],
      ['10+', 'technology vendors screened'],
    ],
    tags: ['Effluent treatment', 'Technology selection', 'DWSIM', 'Process economics'],
    meta: [
      ['Type', 'Industrial study, Management Trainee'],
      ['My role', 'Led the study, then handed it over'],
      ['Methods', 'Cost baseline, supplier screening and trials, DWSIM simulation, stage-wise operating-cost model'],
      ['Status', 'Handed over with a validation roadmap for further evaluation'],
    ],
    glance: [
      ['Problem', 'A high-sulphate dye effluent had to be treated at a running cost, and its sulphate left the plant as a waste salt. Where does that cost go, and can the salt become a product?'],
      ['My contribution', 'Led a two-month study: built the cost baseline, screened electrochemical, membrane and crystallisation routes with more than ten vendors, simulated the proposed train in DWSIM and modelled its operating cost stage by stage.'],
      ['Key result', 'A proposed treatment train that recovers sodium sulphate as a product, at about two-thirds lower modelled operating cost than the current treatment (cost index 100 to about 36).'],
      ['Limits', 'A desk and supplier study. The cost comparison covers quantified items only, and bench validation is still pending; the study was handed over for further evaluation.'],
    ],
    sections: () => [
      ['question', 'The question', `
<p>An effluent from dye production carried a high load of sulphate. Treating it had a running cost, and the sulphate ended up as a waste salt. The study asked where that cost actually goes, which treatment routes could lower it, and whether the salt could leave the plant as a product instead of a waste.</p>`],
      ['approach', 'My contribution and approach', `
<p>I led the study during my first months as a Management Trainee at LOXIM Industries.</p>
<ol class="steps">
  <li><h3>Mapped the cost</h3><p>Built a baseline of the current treatment, stage by stage, to see which steps drive the operating cost.</p></li>
  <li><h3>Screened the routes</h3><p>Compared electrochemical, membrane and crystallisation routes, including electrocoagulation and electroflocculation as pretreatment, through screening, sample trials and feasibility checks with more than ten technology vendors.</p></li>
  <li><h3>Built the train</h3><p>Combined the shortlisted steps into one treatment train and simulated it in DWSIM.</p></li>
  <li><h3>Costed it</h3><p>Modelled the operating cost of each stage and compared the train with the current treatment on the same basis.</p></li>
</ol>`],
      ['train', 'The proposed treatment train', `
<figure class="train-fig">
  <ol class="train" aria-label="Proposed treatment train, in flow order">
    <li class="u"><b>Effluent</b><span>High-sulphate dye stream</span></li>
    <li class="u ec"><b>Electrochemical pretreatment</b><span>In place of the acid–alkali swing</span></li>
    <li class="u"><b>Polishing</b><span>Adsorption and oxidation</span></li>
    <li class="u pr"><b>High-pressure RO</b><span>Concentrates the stream; water recovered</span></li>
    <li class="u pr"><b>Chilled crystalliser</b><span>Cooling crystallisation; mother liquor recycled</span></li>
    <li class="u ok"><b>Sodium sulphate</b><span>Recovered as a product</span></li>
  </ol>
  <figcaption>Simplified block diagram of the proposed train. Bipolar membrane electrodialysis was also evaluated and not selected. Operating conditions and equipment sizes are not shown.</figcaption>
</figure>`],
      ['results', 'Result', `
<figure class="chart cost" aria-labelledby="cost-title">
  <div class="chart-head">
    <p class="chart-title" id="cost-title">Modelled operating cost, as an index</p>
    <p class="chart-sub">Current treatment set to 100. Quantified cost items only; bench validation pending.</p>
  </div>
  <div class="cost-rows" role="list">
    <div class="cost-row" role="listitem"><span class="cost-label">Current treatment</span><span class="cost-track"><span class="cost-bar base" style="--v:100"></span></span><span class="cost-val">100</span></div>
    <div class="cost-row" role="listitem"><span class="cost-label">Proposed train</span><span class="cost-track"><span class="cost-bar" style="--v:36"></span></span><span class="cost-val">≈ 36</span></div>
  </div>
</figure>
<p>The proposed train came out at about two-thirds lower modelled operating cost than the current treatment, and it turns the sulphate into a saleable salt rather than a waste. The study was handed over with a validation roadmap, so the next stage of evaluation can test these numbers at bench scale.</p>`],
      ['background', 'What earlier work brought to it', `
<ul class="tight">
  <li><strong>Electrochemistry.</strong> Electrocoagulation and electroflocculation run on electrodes and applied current, so my half-cell and electrode work helped in judging them. <a href="../thesis-bi-pt-formic-acid/">Thesis</a></li>
  <li><strong>Process economics.</strong> The SNCR design study also chose a route on performance and cost and estimated running costs. <a href="../sncr-biomass-boiler/">SNCR study</a></li>
  <li><strong>Reading claims against data.</strong> Vendor claims were checked against what each trial could actually show, the same habit as stating the limits of a half-cell result.</li>
</ul>`],
      ['limits', 'Limits and what is not shown', `
<ul class="tight">
  <li><strong>A modelled saving.</strong> The figure comes from a stage-wise operating-cost model, covers quantified items only, and has not been validated at bench or plant scale.</li>
  <li><strong>Handed over.</strong> This was a short-term study. The proposal and its validation roadmap were passed on for further evaluation; no plant decision is claimed here.</li>
  <li><strong>Company property.</strong> The effluent analysis, supplier names, absolute costs and the study report belong to LOXIM Industries and are not shown.</li>
</ul>
<p class="takeaway"><strong>What I took from it.</strong> In a plant, the best route is the one whose cost you can explain stage by stage. Mapping the cost first made the choice of technologies much clearer than comparing vendors' headline claims.</p>`],
    ],
  },

  /* -------------------------------------------------------------- NTNU synthesis */
  {
    // REVIEW(disclosure): ignition incident in a host lab, route changes, the 220 mg figure, SEM images
    // and the KinCat group name need Prof. Blekkan's agreement (source: unpublished UTFORSK report).
    slug: 'ntnu-synthesis-scale-up',
    kind: ['catalysis'],
    kindLabel: 'Experimental research · KinCat group, NTNU',
    title: 'Reworking a catalyst synthesis after an ignition on the filter',
    short: 'Three batches of Bi-modified Pt/C: a low-yield first batch, an ignition in the second, and a changed aqueous route with no ignition observed.',
    description:
      'Catalyst synthesis rework in the KinCat group at NTNU, Norway, by Ayush Suryawanshi: three batches of Bi-modified Pt/C, a borohydride ignition during filtration, and an aqueous route with no ignition observed.',
    when: 'Aug – Dec 2025',
    where: 'KinCat group, Department of Chemical Engineering, NTNU, Trondheim',
    cardImg: ['ayush-suryawanshi-photo-baa04525.jpg', 'Ayush in cleanroom gear at an SEM workstation'],
    stats: [
      ['3', 'synthesis batches'],
      ['~220 mg', 'recovered from Batch 3, the highest of the three'],
    ],
    tags: ['Catalyst synthesis', 'Process safety', 'SEM'],
    meta: [
      ['Type', 'Experimental research, part of the thesis'],
      ['Supervisor at NTNU', 'Prof. Edd Anders Blekkan'],
      ['Funding', 'UTFORSK mobility scholarship'],
      ['Methods', 'Aqueous chemical reduction, filtration and drying, SEM'],
    ],
    glance: [
      ['Problem', 'Following the literature procedure recovered very little catalyst, and the scaled-up second batch ignited on the filter.'],
      ['My contribution', 'Ran the three batches and changed the route after each one: an aqueous borohydride step, less reductant and a changed filtration.'],
      ['Key result', 'No ignition was observed in Batch 3, which also gave the highest recovered mass, about 220 mg, with uniform SEM morphology.'],
      ['Limits', 'Three batches, with a mass reported only for Batch 3. This does not validate scale-up, and no activity data are reported for the individual batches.'],
    ],
    hero: ['ayush-suryawanshi-photo-baa04525.jpg', 'Ayush in cleanroom gear at an SEM workstation', 'At the SEM in the NTNU cleanroom, checking a batch.'],
    sections: () => [
      ['problem', 'Problem and baseline', `
<p>The thesis needed one synthesis route I could rely on. The baseline was the literature procedure for Bi-modified Pt/C, which uses a dichloromethane-based reduction. Followed exactly, it recovered very little catalyst: most of the material was lost during filtration, and the surface looked contaminated under the microscope.</p>`],
      ['contribution', 'My contribution', `
<p>I ran all three batches in the KinCat group at NTNU, hosted by Prof. Edd Anders Blekkan, and changed the procedure after each one: first scaling up, then replacing the solvent-based reduction with an aqueous borohydride step, using less reductant and changing the filtration. I also took the SEM images of the batches.</p>`],
      ['methods', 'Methods and assumptions', `
<ul class="tight">
  <li><strong>Comparison basis.</strong> Batches were compared on recovered mass, what happened during filtration, and SEM morphology. Electrochemical activity was not measured on the individual batches.</li>
  <li><strong>Safety observation.</strong> The ignition was seen during filtration, when residual sodium borohydride on the filter ignited. The report does not quantify residual borohydride or describe a formal hazard assessment.</li>
  <li><strong>Final route.</strong> Aqueous borohydride in place of the dichloromethane-based reduction, a smaller amount of reductant, and modified filtration conditions.</li>
</ul>
<div class="fig-row">
${fig('ayush-suryawanshi-catalyst-slurry-stirring-on-a-hotplate.jpg', 'A flask of black catalyst slurry on a magnetic stirrer', 'Adsorbing Bi³⁺ onto Pt/C under stirring, the first step of every batch.', { cls: 'tall', sizes: '(min-width: 720px) 340px, 50vw' })}
${fig('ayush-at-a-fume-hood-in-the-ntnu.jpg', 'Ayush working at a fume hood in the NTNU lab', 'Working through the synthesis at the fume hood in the NTNU lab.', { cls: 'tall', sizes: '(min-width: 720px) 340px, 50vw' })}
</div>`],
      ['results', 'Results', `
${table(
  'Batch comparison',
  ['Batch', 'Route', 'Recovery', 'Safety observation', 'SEM morphology'],
  [
    ['1', 'Literature procedure, dichloromethane-based reduction', 'Extremely low, from filtration losses and possible contamination during recovery', 'No ignition reported', 'Heterogeneous surface, sheet-like features'],
    ['2', 'Scaled up from Batch 1', 'More material than Batch 1 (mass not reported)', 'Residual NaBH<sub>4</sub> ignited during filtration', 'Cleaner, uniform nanoparticle distribution'],
    ['3', 'Aqueous NaBH<sub>4</sub>, less reductant, modified filtration', 'Highest of the three, about 220 mg', 'No ignition observed', 'Uniform dispersion, dense raspberry-like nanoclusters'],
  ],
  { hl: [2], note: 'Batch sizes and recovered masses for Batches 1 and 2 are not given in the source report, so the table has no numbers for them.' },
)}
<p>SEM of Batches 2 and 3 showed densely packed nanoclusters with a rough surface and metal particles spread evenly over the carbon support, without the irregular, sheet-like features of Batch 1.</p>`],
      ['limits', 'Limitations', `
<ul class="tight">
  <li><strong>Not a scale-up validation.</strong> About 220 mg from a single batch shows the changed route recovered more material and ran without an ignition at this size. It does not show that the route is safe or reproducible at larger scale.</li>
  <li><strong>“No ignition observed” is not “no risk”.</strong> Three batches were run and no hazard assessment was reported, so the observation is not proof that the risk is gone.</li>
  <li><strong>No activity data per batch.</strong> The comparison rests on recovered mass and microscopy.</li>
</ul>
<p class="takeaway"><strong>What I took from it.</strong> Safety problems can sit in the handling steps rather than in the reaction itself, and a route that works at a small size needs to be checked again when it changes.</p>`],
      ['evidence', 'Supporting evidence', `
<p>This page summarises a short technical report I wrote for the UTFORSK programme at NTNU. The report is not published here.</p>
<details class="more" open><summary>SEM of the later batches</summary>
${fig('ayush-suryawanshi-sem-micrograph-of-agglomerated-catalyst-nanoclusters.jpg', 'SEM micrograph of agglomerated catalyst nanoclusters', 'A later batch at 25,000×: nanoclusters with a rough, raspberry-like surface and none of the sheet-like contamination seen in the first batch.', { sizes: '(min-width: 1100px) 720px, 100vw' })}
${fig('ayush-suryawanshi-two-high-magnification-sem-micrographs.jpg', 'Two high-magnification SEM micrographs', 'Batch 3 at 450,000× and 250,000×. The bright specks are metal particles spread evenly over the carbon support.', { sizes: '(min-width: 1100px) 720px, 100vw' })}
</details>`],
    ],
  },

  /* ------------------------------------------------------------------------ DFT */
  {
    // REVIEW(disclosure): own course project; step energies, method and route line are low risk but
    // unpublished. Confirm with the course instructor if in doubt.
    slug: 'dft-orr-pt13',
    kind: ['catalysis', 'modelling'],
    kindLabel: 'Modelling and simulation · Course project',
    title: 'Oxygen reduction on a 13-atom platinum cluster',
    short: 'A DFT study of the intermediates of the four-electron oxygen reduction pathway on Pt<sub>13</sub>.',
    description:
      'DFT study by Ayush Suryawanshi of the intermediates of the four-electron oxygen reduction pathway on a Pt13 cluster in Gaussian 16 (UB3LYP), IIT Madras. Electronic energies only.',
    when: 'Jan – May 2025',
    where: 'IIT Madras',
    cardImg: ['ayush-suryawanshi-photo-4972ceff.jpg', 'Energy plot with optimised structures along the oxygen reduction pathway'],
    cardContain: true,
    stats: [
      ['5', 'species optimised on Pt₁₃'],
      ['0', 'imaginary frequencies'],
    ],
    tags: ['DFT', 'Gaussian 16', 'Oxygen reduction'],
    meta: [
      ['Type', 'Course project, Computational Methods in Catalysis'],
      ['Guide', 'Dr. Jithin John Varghese'],
      ['Tools', 'Gaussian 16, Avogadro'],
      ['Method', 'DFT, UB3LYP; LANL2DZ for Pt, 6-31G(d,p) for H and O'],
    ],
    glance: [
      ['Problem', 'Oxygen reduction limits fuel cell cathodes. How do its intermediates sit on a small Pt cluster, and is each step favourable in electronic energy?'],
      ['My contribution', 'Individual course project: built, optimised and checked the Pt<sub>13</sub> structures and the adsorbed intermediates in Gaussian 16 and tabulated the step energies.'],
      ['Key result', 'All four tabulated step energies are negative (−1.85 to −3.90 eV, electronic energies), and all optimised structures are true minima.'],
      ['Limits', 'Gas-phase electronic energies only: no zero-point, thermal or entropy corrections, so not free energies, and no transition states, so no barriers, rates or activity predictions.'],
    ],
    sections: () => [
      ['problem', 'Problem and baseline', `
<p>Oxygen reduction is slow even on platinum, and it is the reaction that limits fuel cell cathodes. Small clusters like Pt<sub>13</sub> have edge and corner sites that behave differently from flat surfaces. The question was how the reaction intermediates sit on such a cluster and whether each step of the associative four-electron pathway is favourable in electronic energy.</p>
<p><strong>Baseline.</strong> The reference point is O<sub>2</sub> adsorbed on the cluster (energy set to zero). Platinum is the benchmark catalyst for this reaction, so the project asks what a small platinum cluster looks like at each stage, not whether it beats another material.</p>`],
      ['contribution', 'My contribution', `
<p>This was an individual project for the course Computational Methods in Catalysis at IIT Madras, guided by Dr. Jithin John Varghese. I built the structures, set up and ran the Gaussian 16 calculations, checked every structure, and tabulated and interpreted the step energies.</p>`],
      ['methods', 'Methods and assumptions', `
<ol class="steps">
  <li><h3>Built the structures</h3><p>The Pt<sub>13</sub> cluster and the O<sub>2</sub>, OOH, O, OH and H<sub>2</sub>O species were built in Avogadro, each placed in a likely binding configuration.</p></li>
  <li><h3>Optimised them</h3><p>Gaussian 16, spin-unrestricted B3LYP, LANL2DZ effective core potential for platinum and 6-31G(d,p) for hydrogen and oxygen. Route: <code>opt=calcall freq ub3lyp/genecp scf=(xqc,maxcycle=512) guess=mix int=ultrafine</code>.</p></li>
  <li><h3>Checked them</h3><p>A frequency calculation on every structure confirmed it was a true minimum, with no imaginary frequencies.</p></li>
  <li><h3>Compared the steps</h3><p>Reaction energies for each step of the associative pathway, from the electronic (SCF) energies of the optimised structures.</p></li>
</ol>
${defs([
  ['Environment', 'Gas phase, no explicit solvation.'],
  ['Energies', 'SCF electronic energies. Zero-point, thermal and entropy corrections were available from the frequency calculations but not applied.'],
  ['Configurations', 'One binding configuration per species is described; a search over adsorption sites or cluster isomers is not reported.'],
  ['Transition states', 'Not located, so the pathway has no activation energies.'],
])}`],
      ['results', 'Results', `
${table(
  'Tabulated step energies (ΔE, electronic energy, eV)',
  ['Step', 'Reaction', 'ΔE (eV)'],
  [
    ['1', 'O<sub>2</sub> adsorption on Pt<sub>13</sub> (reference)', '0'],
    ['2', 'OOH* formation', '−2.84'],
    ['3', 'O* and water formation', '−2.05'],
    ['4', 'OH* formation', '−1.85'],
    ['5', 'Water released, Pt<sub>13</sub> regenerated', '−3.90'],
  ],
)}
${dftChart()}
<p>Every tabulated step energy is negative, which fits the established role of platinum as the benchmark oxygen reduction catalyst and supports using small clusters for mechanistic questions. That is as far as these numbers go.</p>`],
      ['limits', 'Limitations', `
<ul class="tight">
  <li><strong>Not free energies.</strong> Only electronic energies are used, so the values are qualitative trends in relative stability. Zero-point, thermal and entropy terms matter, especially for gas-phase O<sub>2</sub> and H<sub>2</sub>O.</li>
  <li><strong>No barriers, no rates.</strong> Without transition states the calculations say which intermediates are stable, not how fast any step goes, which step limits the reaction, or how active the cluster is. They are not an activity or rate prediction.</li>
  <li><strong>Idealised model.</strong> A single isolated Pt<sub>13</sub> cluster in the gas phase, with no support, solvent or electrode environment.</li>
  <li><strong>Reading the figure.</strong> The original report draws the four tabulated values as points on one smoothed curve. Per-step energies are not cumulative energies, so the curve is a qualitative sketch, and its bends should not be read as barriers.</li>
</ul>
<p class="takeaway"><strong>What I took from it.</strong> A calculation is only as strong as what it includes. Being explicit about what was left out, here free-energy corrections and transition states, is part of reporting it.</p>`],
      ['evidence', 'Supporting evidence', `
<p>This page summarises my course project report. The report, the Gaussian input and output files and the structure files are not published here.</p>
<details class="more"><summary>See the optimised structures</summary>
${fig('ayush-suryawanshi-photo-4972ceff.jpg', 'Plot of the four tabulated step energies against step number, with the optimised structure drawn at each point', 'The optimised structure of each state. The curve is a smoothed guide through the four tabulated values and is not a minimum-energy path: no transition states were calculated.', { sizes: '(min-width: 1100px) 720px, 100vw' })}
</details>`],
    ],
  },

  /* ------------------------------------------------------------------------ SNCR */
  {
    // Disclosure (Oct 2026): an industry-linked student project. The poster shown publicly at Treforedlingsforum named
    // the partners, but plant data, feed flows, the old plant measurement, absolute modelled emissions, reagent volumes
    // and costs come from or depend on the partners' documentation, so the page keeps to methods, trends,
    // percentages and the public regulatory limit.
    slug: 'sncr-biomass-boiler',
    kind: ['process', 'modelling'],
    kindLabel: 'Process engineering · NTNU, team of four',
    title: 'Designing an SNCR retrofit for a biomass boiler',
    short: 'A four-person design study: can selective non-catalytic reduction bring a biomass boiler under its NOx limit, and at what cost?',
    description:
      'SNCR retrofit design study for NOx reduction in a biomass boiler by a four-person NTNU team including Ayush Suryawanshi, for Norwegian industry partners, with Cantera combustion and kinetic models and a cost estimate.',
    when: 'Aug – Nov 2025',
    where: 'NTNU, Trondheim',
    cardImg: ['ayush-suryawanshi-photo-5ee7ac61.jpg', 'Ayush and two teammates beside their SNCR poster', '50% 8%'],
    stats: [
      ['~60%', 'design NOx reduction (ideal model: above 90%)'],
      ['900–1100 °C', 'injection window found by the model'],
    ],
    tags: ['Process design', 'Kinetic modelling', 'Python / Cantera', 'Process economics'],
    meta: [
      ['Type', 'Process design project (TKP4170)'],
      ['Team', 'Four students'],
      ['Supervisor', 'Prof. Øyvind Weiby Gregersen'],
      // REVIEW(disclosure): partner names appear on the publicly presented poster; confirm the partners are
      // happy to be named on a personal site.
      ['Industry partners', 'Billerud Viken; boiler operated by Vardar Varme AS'],
      ['Tools', 'Python, Cantera, Aspen HYSYS, Excel'],
      ['Presented at', 'Treforedlingsforum 2025, Oslo'],
    ],
    glance: [
      ['Problem', 'An upgraded biomass boiler must stay under the 300 mg/Nm³ NOx limit, and its modelled uncontrolled NOx sat around that limit. Could an SNCR retrofit give a safe margin, and at what cost?'],
      ['My contribution', 'Carried out the literature survey, built the Python (Cantera) combustion and SNCR kinetic models, did the hand calculations for the design basis and contributed the Aspen HYSYS simulation. Presented the poster in Oslo.'],
      ['Key result', 'With a conservative design reduction of about 60% (the ideal model gave above 90%), modelled emissions fall well under the limit. Capital and running costs were estimated: not profitable at current NOx tax, but justified as a compliance cost.'],
      ['Limits', 'Idealised model (perfect mixing, fixed temperature profile), very limited plant data for comparison, and a design study rather than a plant trial. On-site measurement was recommended.'],
    ],
    hero: ['ayush-suryawanshi-photo-5ee7ac61.jpg', 'Ayush and two teammates standing beside their SNCR poster at a conference', 'With two of my teammates beside our poster at Treforedlingsforum 2025 in Oslo.'],
    heroFit: 'natural',
    sections: () => [
      ['problem', 'Problem and baseline', `
<p>An existing biomass boiler at a Norwegian industrial site is to be upgraded to supply process steam to a planned pulp mill. Burning biomass produces NOx, and the plant has to stay under a limit of 300 mg/Nm³. The team asked whether a selective non-catalytic reduction (SNCR) retrofit, injecting ammonia into the hot flue gas, could keep it there with a safe margin.</p>
<p><strong>Baseline.</strong> The combustion models put uncontrolled NOx around the limit for both fuel cases studied, which is the range where SNCR is known to work. Only one older plant measurement was available for comparison.</p>`],
      ['contribution', 'My contribution', `
<p>I was one of four authors of the design report. My part:</p>
<ul class="tight">
  <li><strong>Literature survey</strong> on SNCR chemistry, reagents and operating windows.</li>
  <li><strong>The Python (Cantera) models:</strong> equilibrium combustion and the one-dimensional plug-flow SNCR kinetics, mapping NO reduction and ammonia slip against injection temperature and ammonia dose.</li>
  <li><strong>Hand calculations</strong> for the design basis, and the <strong>Aspen HYSYS</strong> process simulation.</li>
  <li><strong>Presenting</strong> the work as a poster at Treforedlingsforum 2025 in Oslo, 18–19 November.</li>
</ul>
<p>Reagent selection, equipment sizing, safety measures and the cost estimates were the team’s joint work.</p>`],
      ['methods', 'Methods and assumptions', `
<ol class="steps">
  <li><h3>Checked the starting point</h3><p>Spreadsheet calculations estimated the flame temperature and the time the flue gas spends in the post-combustion zone, to see whether the boiler suits SNCR.</p></li>
  <li><h3>Modelled the combustion</h3><p>A Cantera equilibrium model with the GRI-Mech 3.0 mechanism, with the solid fuels represented by a gas-phase surrogate from their ultimate analysis, predicted flue-gas temperature and uncontrolled NO for two feed cases.</p></li>
  <li><h3>Modelled the SNCR</h3><p>A one-dimensional plug-flow reactor in Python with Cantera and the San Diego Reduced-N mechanism tracked NO reduction and ammonia slip for different injection temperatures and ammonia-to-NOx ratios (NSR).</p></li>
  <li><h3>Designed and costed the system</h3><p>Ammonia was chosen as the reagent for performance and cost. The team laid out storage, mixing and injection, sized the main equipment, set out safety measures and estimated capital and running costs.</p></li>
</ol>
${table(
  'Design assumptions and operating points',
  ['Item', 'Value used'],
  [
    // REVIEW(disclosure): boiler duty, fuel blend, excess air, furnace volume and residence time came from
    // the client's internal documentation and were removed pending clearance from the partners.
    ['SNCR temperature window', 'Reduction rises between 900 and 1000 °C and falls above it; injection recommended at the upper end, 1000–1100 °C'],
    ['Reagent and dose', '25 wt% ammonia solution; start at NSR 1.4 and tune from measurements; equipment sized at NSR 2.0'],
    ['Model simplifications', 'Perfect mixing, fixed temperature profile, steady state: an upper-bound estimate'],
    ['Economics', '8% discount rate, 20-year life, savings measured against the NOx tax'],
  ],
)}`],
      ['results', 'Results', `
${table(
  'Modelled NOx reduction for the two fuel cases',
  ['Case', 'Ideal model', 'Design case'],
  [
    ['Baseline fuel case', '94%', '63%'],
    ['Lower fuel case', '93%', '65%'],
  ],
  { note: 'The design cases are not an independent prediction: the report tuned the model to about 60% reduction, which it describes as consistent with industrial experience, by running it at an unrealistically high 1400 °C, where modelled ammonia slip is zero. The report calls this optimistic. Absolute emission levels, fuel flows and plant data are not shown here because they depend on the industry partners’ information.' },
)}
<ul class="tight">
  <li><strong>Temperature matters most.</strong> Reduction is limited below about 850 °C, rises quickly between 900 and 1000 °C and falls at higher temperatures as ammonia oxidises. At the cooler end of the window modelled ammonia slip rises sharply, so the recommendation is to inject between 900 and 1100 °C, near the upper end.</li>
  <li><strong>Reagent and cost.</strong> Reagent use dominates the running cost. Capital and running costs were estimated with standard cost correlations and public prices. At current NOx tax rates the project is not profitable, but the report judges the investment justified as a compliance measure.</li>
  <li><strong>Safety was part of the design.</strong> Ammonia is hazardous, so the design included a moat around the tank, ammonia sensors with alarms that switch off the pumps, emergency showers and enclosed mixing and distribution modules.</li>
  <li><strong>Recommendations.</strong> Measure temperature and uncontrolled NOx on site before tuning, and design for variations in load and fuel.</li>
</ul>`],
      ['limits', 'Limitations', `
<ul class="tight">
  <li><strong>Idealised models.</strong> Perfect mixing, a fixed temperature profile and steady state make the SNCR results an upper bound; real furnaces have imperfect mixing and temperature variation, and real ammonia slip is likely to be higher.</li>
  <li><strong>The 60% is an assumption.</strong> It is a conservative design value chosen from industrial experience, not a result the model produced.</li>
  <li><strong>Thin plant data.</strong> The baseline came from models, with only one older plant measurement for comparison.</li>
  <li><strong>High-level costs.</strong> The cost estimates are early-stage, and the report notes that some equipment costs are less accurate than the storage tank estimate.</li>
  <li><strong>A design study.</strong> Nothing here was tested on the boiler.</li>
</ul>
<p class="takeaway"><strong>What I took from it.</strong> This was my first design project for an industry client. It taught me to work from incomplete plant data, state assumptions clearly, and give a recommendation a client can act on, including an honest note that the economics only work as a compliance cost.</p>`],
      ['evidence', 'Supporting evidence', `
<p>This page summarises the team’s TKP4170 design report for NTNU. The report, the poster, the model code and the plant-specific inputs and outputs are not published here; one model trend is below.</p>
<details class="more"><summary>Model trend: ammonia dose against reduction and slip</summary>
${fig('ayush-suryawanshi-plot-of-no-reduction-and-ammonia-slip-against.jpg', 'Plot of NO reduction and ammonia slip against the normalised stoichiometric ratio', 'More ammonia removes more NO, but past a point the unreacted ammonia slipping through rises steeply. The design dose sits where reduction is high and slip is still low.', { sizes: '(min-width: 720px) 720px, 100vw' })}
</details>`],
    ],
  },
];

// Display order: thesis first, then industrial and design work, then the supporting studies.
const ORDER = ['thesis-bi-pt-formic-acid', 'loxim-effluent-treatment-study', 'sncr-biomass-boiler', 'ntnu-synthesis-scale-up', 'dft-orr-pt13'];
export const projects = ORDER.map((slug) => {
  const p = projectList.find((x) => x.slug === slug);
  if (!p) throw new Error('missing project ' + slug);
  return p;
});
if (projects.length !== projectList.length) throw new Error('project order is incomplete');

export const kinds = [
  ['all', 'All work', ''],
  ['catalysis', 'Catalysis', 'Making, characterising and modelling catalysts.'],
  ['electrochemistry', 'Electrochemistry', 'Electrodes, half-cell testing and electrochemical treatment.'],
  ['process', 'Process engineering', 'Designing and costing processes under emission, cost and safety limits.'],
  ['modelling', 'Modelling', 'DFT, reaction kinetics and process simulation.'],
];
