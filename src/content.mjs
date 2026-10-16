// All facts on the site live here, so a date or number only ever needs changing once.
// Sources: Ayush_CV.pdf (October 2026), the thesis, UTFORSK and SNCR report figures already
// published on the site, and the photos in images/.
import { fig, img } from './lib.mjs';

export const person = {
  name: 'Ayush Suryawanshi',
  email: 'ayush.suryawanshi0803@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayush-suryawanshi',
  github: 'https://github.com/suryawanshi-ayush',
  cv: 'Ayush_CV_revised.pdf',  // revised summary; Ayush_CV.pdf is the preserved original
  role: 'Chemical engineer',
  location: 'Ahmedabad, India',
  updated: 'October 2026',
  updatedISO: '2026-10-16',
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
      'Leading technology selection for sulphate removal from plant effluent. Options shortlisted so far point to a projected 50–60% lower operating cost, from INR 2.5/L to about INR 1.0–1.2/L.',
      'Evaluated electrocoagulation and electroflocculation as pretreatment options.',
      'Running screening, sample trials and feasibility checks with more than ten technology vendors.',
      'Trained on HPLC, GC-MS, FTIR and UV-Vis; completed plant safety induction and HSE training.',
    ],
  },
  {
    title: 'Deputy Placement and Internship Coordinator',
    org: 'Placement and Internship Cell, IIT Madras',
    when: 'Aug 2024 – Jul 2025',
    points: [
      'Handled placements and internships for the 2023–25 and 2024–26 M.Tech batches; 75% of M.Tech chemical engineers were placed.',
    ],
  },
];

export const skills = [
  ['Electrochemical testing', 'Autolab potentiostat, three-electrode cell, CV, LSV, EIS, chronoamperometry, chronopotentiometry, ECSA, durability testing'],
  ['Electrodes and catalysts', 'Wet-chemical catalyst synthesis, catalyst ink formulation, ionomer loading, drop-cast electrodes on glassy carbon and carbon paper'],
  ['Characterisation', 'SEM-EDX, XRD, BET, XPS, TGA, FTIR, UV-Vis'],
  ['Software', 'OriginPro, Excel, Python (Cantera), Gaussian 16, Avogadro'],
  ['Process engineering', 'Mass and energy balances, technology evaluation, process safety'],
  ['Lab safety', 'Handling acids and reducing agents, inert-gas work, plant HSE and SOP training'],
];

export const coursework =
  'Catalyst Preparation and Characterization Lab, Experimental Methods in Catalysis, Transport Phenomena, Process Safety and Hazards Management';

export const recognition = [
  { title: 'Poster on SNCR NOx reduction, Treforedlingsforum 2025', where: 'Oslo, Norway', when: 'Nov 2025' },
  { title: 'Attended EuropaCat 2025, the European catalysis congress', where: 'Trondheim, Norway', when: '2025' },
  { title: 'UTFORSK mobility scholarship', where: 'NTNU, for a research semester in Norway', when: '2025' },
  { title: 'GIAN course on characterisation of heterogeneous catalysts', where: 'IIT Madras', when: 'Apr – May 2025' },
  { title: 'GATE 2024, Chemical Engineering: All India Rank 864', where: 'Out of 13,937 candidates', when: 'Feb 2024' },
  { title: 'Paper presentation, SCHEMCON 2021', where: 'MANIT and IISER Bhopal', when: 'Oct 2021' },
];

// The four stages the home page uses to show how the work connects.
export const stages = [
  {
    n: '01',
    title: 'Catalyst synthesis',
    text: 'Wet-chemical modification of commercial Pt/C: adsorption, borohydride reduction and annealing under argon, then reworking the route at NTNU when it proved unsafe to scale.',
    links: [['thesis-bi-pt-formic-acid', 'Bi-modified Pt/C series'], ['ntnu-synthesis-scale-up', 'Synthesis rework at NTNU']],
  },
  {
    n: '02',
    title: 'Electrodes and electrochemistry',
    text: 'Catalyst inks and drop-cast electrodes on glassy carbon and carbon paper, tested in a three-electrode cell: CV, ECSA, mass activity and one-hour holds, backed by FE-SEM, EDX, XRD and BET.',
    links: [['thesis-bi-pt-formic-acid', 'Durability results']],
  },
  {
    n: '03',
    title: 'Modelling and simulation',
    text: 'DFT of oxygen reduction intermediates on a Pt<sub>13</sub> cluster in Gaussian 16, and combustion and SNCR reaction kinetics modelled in Python with Cantera.',
    links: [['dft-orr-pt13', 'DFT of oxygen reduction'], ['sncr-biomass-boiler', 'SNCR kinetic model']],
  },
  {
    n: '04',
    title: 'Process engineering',
    text: 'Design and technology selection under real constraints: an SNCR retrofit for a biomass boiler with Norwegian industry partners, and effluent treatment options at LOXIM Industries.',
    links: [['sncr-biomass-boiler', 'SNCR retrofit design'], ['#now', 'Current work at LOXIM']],
  },
];

export const timeline = [
  {
    when: 'Jul 2026 – present',
    title: 'Management Trainee, LOXIM Industries',
    where: 'Ahmedabad',
    text: 'My first industry role: technology selection for sulphate removal from plant effluent, including electrocoagulation and electroflocculation as pretreatment, with vendor screening, sample trials and feasibility checks.',
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
      ['Thesis', 'Formic acid can power small fuel cells, but the platinum catalyst that oxidises it gets clogged by carbon monoxide from a side reaction, and the current fades within an hour. With Prof. Raghuram Chetty I tested two remedies: a sub-monolayer of bismuth on commercial Pt/C, which leaves fewer of the neighbouring platinum sites that CO needs to form, and a dissolved quinone (AQSA) that acts as a redox mediator. In three-electrode half-cell tests the catalyst with the least bismuth worked best, keeping 92.9% of its current over a one-hour hold against 58.5% for unmodified Pt/C.', 'projects/thesis-bi-pt-formic-acid/'],
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

// Certificates chosen because each one evidences a thread of the portfolio. Previews are
// cropped JPEGs made by scripts/certificates.py; IDs and QR codes are painted out.
export const credentials = [
  {
    slug: 'mtech-degree-iit-madras',
    title: 'Master of Technology, Catalysis Technology',
    issuer: 'IIT Madras',
    when: '17 July 2026',
    note: 'Degree certificate.',
    alt: 'IIT Madras degree certificate conferring the degree of Master of Technology in Catalysis Technology on Ayush Suryawanshi, dated 17 July 2026',
  },
  {
    slug: 'treforedlingsforum-2025-poster',
    title: 'Poster: SNCR technology for reduction of NOx emissions in a bio-boiler',
    issuer: 'Treforedlingsforum 2025 (PTF), Oslo',
    when: '18–19 November 2025',
    note: 'Certificate for presenting the SNCR design study.',
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

const durability = [
  // catalyst, retention with formic acid only, with 1 mM AQSA (current at 3600 s as % of current at 61 s)
  ['Bi(1.25)-Pt/C', 92.89, 70.38],
  ['Bi(2.5)-Pt/C', 67.35, 49.13],
  ['Commercial Pt/C', 58.53, 55.6],
  ['Bi(5)-Pt/C', 52.76, 35.48],
  ['Bi(10)-Pt/C', 39.27, 38.28],
];

function durabilityChart() {
  const rows = durability
    .map(
      ([name, fa, aq]) => `<div class="bars-row" role="listitem">
      <span class="bars-label">${name}</span>
      <span class="bars-pair">
        <span class="bar s1" style="--v:${fa}" data-series="fa"><span class="bar-val">${fa.toFixed(1)}%</span><span class="sr-only">, formic acid only</span></span>
        <span class="bar s2" style="--v:${aq}" data-series="aq"><span class="bar-val">${aq.toFixed(1)}%</span><span class="sr-only">, with 1 mM AQSA</span></span>
      </span>
    </div>`,
    )
    .join('');
  const table = durability
    .map(([n, fa, aq]) => `<tr><th scope="row">${n}</th><td>${fa.toFixed(2)}%</td><td>${aq.toFixed(2)}%</td></tr>`)
    .join('');
  return `<figure class="chart" data-chart="durability" aria-labelledby="dur-title">
  <div class="chart-head">
    <p class="chart-title" id="dur-title">Current kept after one hour at 0.55 V vs RHE</p>
    <p class="chart-sub">Separate durability experiment on 1 cm² carbon paper electrodes (not the glassy carbon disk used for voltammetry), in a half-cell with 0.5 M HCOOH in 0.5 M H<sub>2</sub>SO<sub>4</sub>. Current at 3600 s as a share of the current at 61 s, after the first-minute charging transient.</p>
    <div class="seg" role="group" aria-label="Series shown">
      <button type="button" aria-pressed="true" data-show="both">Both</button>
      <button type="button" aria-pressed="false" data-show="fa">Formic acid only</button>
      <button type="button" aria-pressed="false" data-show="aq">With 1 mM AQSA</button>
    </div>
    <ul class="legend" aria-hidden="true"><li><i class="sw s1"></i>Formic acid only</li><li><i class="sw s2"></i>With 1 mM AQSA</li></ul>
  </div>
  <div class="bars" role="list">${rows}
    <div class="bars-axis" aria-hidden="true"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div>
  </div>
  <details class="table-toggle"><summary>Show the numbers as a table</summary>
    <table><thead><tr><th scope="col">Catalyst</th><th scope="col">Formic acid only</th><th scope="col">With 1 mM AQSA</th></tr></thead><tbody>${table}</tbody></table>
  </details>
</figure>`;
}

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
    <p class="chart-title" id="dft-title">Electronic energy change of each step (eV)</p>
    <p class="chart-sub">Associative four-electron pathway on Pt<sub>13</sub>, UB3LYP. All four steps are negative, so each is downhill in electronic energy. No zero-point, thermal or entropy corrections.</p>
  </div>
  <div class="neg" role="list">${rows}
    <div class="neg-axis" aria-hidden="true"><span>−5</span><span>−4</span><span>−3</span><span>−2</span><span>−1</span><span>0</span></div>
  </div>
</figure>`;
}

// The animated explainer of why bismuth helps. Schematic only; the JS in site.js runs it.
export function mechanism({ compact = false } = {}) {
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
    <desc id="mech-d">Formic acid molecules arrive at a row of platinum atoms. On plain platinum some of them leave adsorbed carbon monoxide that blocks sites. With bismuth atoms sitting on the surface, the molecules go straight to carbon dioxide.</desc>
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
    <div><span class="k">Free Pt sites</span><span class="v" data-free>11 / 11</span></div>
    <div class="meter" aria-hidden="true"><span data-meter></span></div>
    <p class="mech-note" aria-live="polite" data-note>On plain platinum, part of the formic acid takes the indirect path and leaves CO stuck to the surface. Each blocked site stops contributing current.</p>
  </div>
  <figcaption>Schematic, not to scale and not a simulation. Direct path: HCOOH → CO<sub>2</sub> + 2H<sup>+</sup> + 2e<sup>−</sup>. Indirect path: HCOOH → CO<sub>ads</sub> + H<sub>2</sub>O, which needs several neighbouring Pt atoms. Bismuth sitting on the surface breaks up those groups of sites.</figcaption>
</figure>`;
}

export const projects = [
  {
    slug: 'thesis-bi-pt-formic-acid',
    kind: ['lab'],
    kindLabel: 'Experimental research · M.Tech thesis',
    title: 'Keeping platinum clean in formic acid fuel cells',
    short: 'Bi-modified Pt/C catalysts and a quinone mediator, tested for how long they hold their current.',
    description:
      'M.Tech thesis by Ayush Suryawanshi at IIT Madras: Bi-modified Pt/C catalysts and AQSA quinone mediation for formic acid oxidation, with synthesis, characterisation and half-cell durability testing.',
    when: 'May 2025 – May 2026',
    where: 'IIT Madras, with synthesis at NTNU, Norway',
    card: 'half-cell-electrodes',
    cardImg: ['ayush-suryawanshi-photo-7d467c05.jpg', 'Glassy carbon working electrode, platinum coil and reference electrode inside a glass half-cell'],
    stats: [
      ['92.9%', 'current kept after 1 h, best catalyst (half-cell)'],
      ['58.5%', 'commercial Pt/C, same test'],
      ['2.4–2.8×', 'peak current with a thinner Nafion film'],
    ],
    tags: ['Electrocatalysis', 'Formic acid oxidation', 'Potentiostat', 'FE-SEM / EDX / XRD'],
    meta: [
      ['Type', 'M.Tech thesis'],
      ['Supervisor', 'Prof. Raghuram Chetty, IIT Madras'],
      ['At NTNU', 'KinCat group; hosted and supervised by Prof. Edd Anders Blekkan'],
      ['Methods', 'Wet-chemical synthesis, catalyst inks, CV, chronoamperometry, ECSA, FE-SEM, EDX, XRD, BET'],
      ['Tools', 'Autolab potentiostat with NOVA, OriginPro'],
      ['Full title', 'Feasibility Study and Performance Evaluation of Hybrid Quinone–Formic Acid Systems as Alternative Fuels for Proton Exchange Membrane Fuel Cells'],
    ],
    glance: [
      ['Problem', 'Platinum oxidises formic acid well at first, but adsorbed CO builds up and the current falls within an hour.'],
      ['What I did', 'Made four Bi-modified Pt/C catalysts, tuned the catalyst ink, and tested them with and without a quinone mediator (AQSA).'],
      ['Key result', 'Bi(1.25)-Pt/C, with the least bismuth, kept 92.9% of its current over a one-hour hold, against 58.5% for commercial Pt/C.'],
      ['Limits', 'All results are from a three-electrode half-cell in acid. No membrane electrode assembly or full-cell test yet.'],
    ],
    hero: ['ayush-suryawanshi-photo-7d467c05.jpg', 'Close-up of a glass three-electrode cell: a coiled platinum wire, an Ag/AgCl reference electrode and a catalyst-coated glassy carbon working electrode', 'Inside the half-cell: a coiled platinum wire as the counter electrode, an Ag/AgCl reference electrode, and the catalyst-coated glassy carbon working electrode used for the voltammetry.'],
    sections: () => [
      ['question', 'The question', `
<p>Formic acid is an attractive fuel for small fuel cells: it is liquid, easy to store, and crosses a Nafion membrane far less than methanol does. Platinum oxidises it well at first, but a side reaction leaves carbon monoxide stuck to the surface. As the platinum fills up, the current drops within the first hour.</p>
<p>I tested two fixes, and whether they help or hinder each other. The first was decorating commercial Pt/C with bismuth, which is known to block the CO-forming path. The second was adding a dissolved quinone, anthraquinone-2-sulfonic acid (AQSA), as a redox mediator in the electrolyte.</p>
${mechanism()}`],
      ['approach', 'What I did', `
<ol class="steps">
  <li><h3>Made four catalysts</h3><p>Commercial 20 wt% Pt/C was soaked for 48 hours in bismuth nitrate at 1.25, 2.5, 5 and 10 mM in dilute sulphuric acid under nitrogen, then reduced with sodium borohydride and annealed at 300 °C under argon.</p></li>
  <li><h3>Tracked where the bismuth went</h3><p>FE-SEM, EDX averaged over four spots per sample, powder XRD and, for the best catalyst, nitrogen physisorption (BET).</p></li>
  <li><h3>Tuned the catalyst ink</h3><p>5 mg of catalyst in water and isopropanol, with either 5 µL or 20 µL of Nafion as binder.</p></li>
  <li><h3>Built and tested electrodes</h3><p>For voltammetry and active-area measurements, 4 µL of ink was drop-cast on a polished glassy carbon disk (0.0707 cm²), the electrode in the photos. For the separate one-hour durability holds, the same ink was spread on 1 cm² carbon paper at the same loading, which gives a larger, more even area for long tests. Both were measured in a three-electrode cell with a platinum-coil counter and an Ag/AgCl reference on an Autolab potentiostat. AQSA was screened at 0, 1, 2 and 10 mM.</p></li>
  <li><h3>Ran durability holds</h3><p>Each catalyst, on carbon paper, was held at 0.55 V vs RHE for 3600 s, with and without 1 mM AQSA.</p></li>
</ol>
<details class="more"><summary>Synthesis route and test setup</summary>
${fig('ayush-suryawanshi-six-step-schematic-of-the-catalyst-synthesis.jpg', 'Six-step schematic of the catalyst synthesis', 'How each catalyst was made, step by step: bismuth adsorbed onto commercial Pt/C under nitrogen, filtered, reduced with borohydride, filtered again and annealed under argon. The same route was used at every bismuth level, so differences in performance come from the bismuth, not the method.', { sizes: '(min-width: 1100px) 720px, 100vw' })}
<div class="fig-row">
${fig('ayush-suryawanshi-glass-cell-with-glassy-carbon-electrode-and-potentiostat.jpg', 'Sealed glass cell with a glassy carbon electrode, connected to the potentiostat leads', 'The cell ready for cyclic voltammetry: glassy carbon working electrode, platinum counter and Ag/AgCl reference, each clipped to the potentiostat.', { cls: 'tall', sizes: '(min-width: 720px) 340px, 50vw' })}
${fig('ayush-suryawanshi-glass-cell-with-a-carbon-paper-electrode-and.jpg', 'Glass cell with formic acid electrolyte, a glassy carbon working electrode and a coiled platinum counter electrode', 'The same three-electrode cell filled with formic acid electrolyte for a voltammetry run.', { cls: 'tall', sizes: '(min-width: 720px) 340px, 50vw' })}
</div>
</details>`],
      ['results', 'What I found', `
<h3>Where the bismuth went</h3>
<p>At the two lowest loadings there were no separate bismuth crystals in SEM or XRD: bismuth sat on the platinum as a thin decoration. At 10 mM, bright Bi-rich clusters appeared and covered much of the platinum.</p>
<div class="table-wrap"><table>
  <caption>Composition from EDX (four-spot average) and Pt crystallite size from XRD</caption>
  <thead><tr><th scope="col">Catalyst</th><th scope="col">Bi (wt%)</th><th scope="col">Bi : Pt ratio</th><th scope="col">Pt crystallite (nm)</th></tr></thead>
  <tbody>
    <tr><th scope="row">Commercial Pt/C</th><td>0</td><td>0</td><td>2.51</td></tr>
    <tr class="hl"><th scope="row">Bi(1.25)-Pt/C</th><td>0.60</td><td>0.034</td><td>3.52</td></tr>
    <tr><th scope="row">Bi(2.5)-Pt/C</th><td>1.08</td><td>0.132</td><td>3.53</td></tr>
    <tr><th scope="row">Bi(5)-Pt/C</th><td>9.35</td><td>0.706</td><td>2.68</td></tr>
    <tr><th scope="row">Bi(10)-Pt/C</th><td>20.49</td><td>2.200</td><td>3.44</td></tr>
  </tbody>
</table></div>
<p class="note">Crystallite sizes from the Pt(111) reflection with the Scherrer equation. The best catalyst had a BET surface area of about 122 m²/g.</p>
<details class="more"><summary>Electron micrographs and EDX maps</summary>
<div class="fig-row">
${fig('ayush-suryawanshi-grid-of-five-fe-sem-micrographs-of-the.jpg', 'Grid of five FE-SEM micrographs of the catalyst series', 'Electron micrographs of the five catalysts at similar magnification. The low-bismuth samples look like plain Pt/C; bright bismuth-rich clusters only appear at the highest loadings.', { sizes: '(min-width: 720px) 340px, 100vw' })}
${fig('ayush-suryawanshi-edx-maps-for-carbon-platinum-bismuth-and-oxygen.jpg', 'EDX maps for carbon, platinum, bismuth and oxygen', 'Element maps of Bi(2.5)-Pt/C: bismuth is spread evenly across the sample rather than gathered in patches, which is what a thin surface decoration should look like.', { sizes: '(min-width: 720px) 340px, 100vw' })}
</div>
</details>

<h3>Less Nafion, more current</h3>
<p>On the glassy carbon electrode, the thinner Nafion film (5 µL per 5 mg of catalyst) gave 2.4–2.8× higher peak current than the thicker one (20 µL), even though the thicker film showed slightly more active area on plain Pt/C. The active-area measurement only needs protons to reach the platinum, but formic acid has to diffuse through the film, so a thick ionomer layer wins one test and loses the other.</p>

<h3>Which catalyst lasted</h3>
${durabilityChart()}
<p>The catalyst with the least bismuth lasted longest in both electrolytes. Adding 1 mM AQSA lowered the retention of every catalyst in this test, though with AQSA present Bi(1.25)-Pt/C gave the highest mass activity, 496.7 mA per mg of Pt.</p>
<p>One result surprised me. Bi(5)-Pt/C had the most impressive voltammogram, 851.7 mA per mg of Pt, but most of that peak came from oxidising CO that had already formed. It was recovering from poisoning rather than avoiding it, and kept only 52.8% of its current. On the activity that comes from the direct pathway, before any CO is burned off, Bi(1.25)-Pt/C led at 494.9 mA per mg of Pt, 5.5 times commercial Pt/C.</p>
<details class="more"><summary>The measured curves behind these numbers</summary>
<div class="fig-row">
${fig('ayush-suryawanshi-cyclic-voltammograms-of-three-catalysts-in-formic-acid.jpg', 'Cyclic voltammograms of three catalysts in formic acid', 'Cyclic voltammograms of Pt/C, Bi(1.25)-Pt/C and Bi(10)-Pt/C on the glassy carbon electrode in 0.5 M formic acid at 50 mV/s. A large peak late in the forward scan is CO being burned off, so peak height alone can flatter a catalyst.', { sizes: '(min-width: 720px) 340px, 100vw' })}
${fig('ayush-suryawanshi-current-retention-curves-over-one-hour-for-five.jpg', 'Current retention curves over one hour for five catalysts', 'The full one-hour current traces on carbon paper at 0.55 V vs RHE, behind the chart above. The flatter the curve, the less the catalyst is being poisoned.', { sizes: '(min-width: 720px) 340px, 100vw' })}
</div>
</details>`],
      ['limits', 'What it doesn’t show yet', `
<p>Everything was measured in a three-electrode half-cell in acid, so these numbers rank catalysts against each other; they are not fuel-cell performance. The next steps written into the thesis are building a membrane electrode assembly with Bi(1.25)-Pt/C and testing it in a single cell, and using in situ spectroscopy to watch the bismuth layer while it works.</p>`],
      ['learned', 'What I took from it', `
<p>A good-looking voltammogram is not the same as a durable catalyst, and an active-area number is not the same as usable activity. I now check durability before ranking anything, and I think about what each measurement can and cannot see.</p>`],
    ],
  },
  {
    slug: 'ntnu-synthesis-scale-up',
    kind: ['lab'],
    kindLabel: 'Experimental research · KinCat group, NTNU',
    title: 'Making the catalyst synthesis safe to scale',
    short: 'Three batches of Bi-modified Pt/C, one ignition on the filter, and a cleaner aqueous route.',
    description:
      'Catalyst synthesis rework at NTNU, Norway, by Ayush Suryawanshi: three batches of Bi-modified Pt/C, a borohydride ignition during filtration, and a safer aqueous route.',
    when: 'Aug – Dec 2025',
    where: 'KinCat group, Department of Chemical Engineering, NTNU, Trondheim',
    cardImg: ['ayush-suryawanshi-photo-baa04525.jpg', 'Ayush in cleanroom gear at an SEM workstation'],
    stats: [
      ['3', 'synthesis batches'],
      ['~220 mg', 'recovered from the final batch'],
    ],
    tags: ['Catalyst synthesis', 'Process safety', 'SEM'],
    meta: [
      ['Type', 'Lab research, part of the thesis'],
      ['Supervisor at NTNU', 'Prof. Edd Anders Blekkan'],
      ['Funding', 'UTFORSK mobility scholarship'],
      ['Methods', 'Aqueous chemical reduction, filtration and drying, SEM'],
    ],
    glance: [
      ['Problem', 'The literature procedure lost most of the catalyst during filtration, and scaling it up made it unsafe.'],
      ['What I did', 'Ran three batches and changed the route after each one.'],
      ['Key result', 'An aqueous borohydride step with less reductant removed the ignition risk and gave the highest yield, about 220 mg.'],
      ['Limits', 'Yield and morphology were the checks here; activity was tested on the thesis series.'],
    ],
    hero: ['ayush-suryawanshi-photo-baa04525.jpg', 'Ayush in cleanroom gear at an SEM workstation', 'At the SEM in the NTNU cleanroom, checking a batch.'],
    sections: () => [
      ['question', 'The problem', `
<p>The thesis needed one synthesis route I could rely on, and the first route I tried did not give it. I ran the Bi-modified Pt/C synthesis in three batches in the KinCat group at NTNU and changed it after each one.</p>`],
      ['approach', 'Batch by batch', `
<ol class="steps">
  <li><h3>Batch 1: following the paper</h3><p>The literature procedure recovered very little catalyst. Most of the loss happened during filtration, and SEM showed irregular, sheet-like features that pointed to contamination during recovery.</p></li>
  <li><h3>Batch 2: scaling up</h3><p>A larger batch raised the yield, but leftover sodium borohydride ignited on the filter.</p></li>
  <li><h3>Batch 3: changing the route</h3><p>I replaced the solvent-based reduction with an aqueous borohydride step, used less reductant and changed the filtration. There was no ignition, and the batch gave the highest recovered mass, about 220 mg.</p></li>
</ol>
<div class="fig-row">
${fig('ayush-suryawanshi-catalyst-slurry-stirring-on-a-hotplate.jpg', 'A flask of black catalyst slurry on a magnetic stirrer', 'Adsorbing Bi³⁺ onto Pt/C under stirring, the first step of every batch.', { cls: 'tall', sizes: '(min-width: 720px) 340px, 50vw' })}
${fig('ayush-at-a-fume-hood-in-the-ntnu.jpg', 'Ayush working at a fume hood in the NTNU lab', 'Working through the synthesis at the fume hood in the NTNU lab.', { cls: 'tall', sizes: '(min-width: 720px) 340px, 50vw' })}
</div>`],
      ['results', 'What the material looked like', `
<p>SEM of the later batches showed densely packed nanoclusters with a rough, raspberry-like surface and metal particles spread evenly over the carbon support, without the irregular features of the first batch.</p>
${fig('ayush-suryawanshi-sem-micrograph-of-agglomerated-catalyst-nanoclusters.jpg', 'SEM micrograph of agglomerated catalyst nanoclusters', 'A later batch at 25,000×: nanoclusters with a rough, raspberry-like surface and none of the sheet-like contamination seen in the first batch.', { sizes: '(min-width: 1100px) 720px, 100vw' })}
${fig('ayush-suryawanshi-two-high-magnification-sem-micrographs.jpg', 'Two high-magnification SEM micrographs', 'Batch 3 at 450,000× and 250,000×. The bright specks are metal particles spread evenly over the carbon support, the sign of a usable catalyst.', { sizes: '(min-width: 1100px) 720px, 100vw' })}`],
      ['learned', 'What I took from it', `
<p>Procedures that work at milligram scale can behave differently when scaled, and safety problems often show up in the handling steps rather than the reaction itself. The thesis catalyst series was made with the fully aqueous route.</p>`],
    ],
  },
  {
    slug: 'dft-orr-pt13',
    kind: ['computation'],
    kindLabel: 'Modelling and simulation · Course project',
    title: 'Oxygen reduction on a 13-atom platinum cluster',
    short: 'A DFT study of the four-electron oxygen reduction pathway on Pt<sub>13</sub>.',
    description:
      'DFT study by Ayush Suryawanshi of the four-electron oxygen reduction pathway on a Pt13 cluster in Gaussian 16 (UB3LYP), IIT Madras.',
    when: 'Jan – May 2025',
    where: 'IIT Madras',
    cardImg: ['ayush-suryawanshi-photo-4972ceff.jpg', 'Energy plot with optimised structures along the oxygen reduction pathway'],
    cardContain: true,
    stats: [
      ['4 / 4', 'steps downhill in electronic energy'],
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
      ['Problem', 'Oxygen reduction limits fuel cell cathodes. How do its intermediates sit on a small Pt cluster?'],
      ['What I did', 'Optimised O<sub>2</sub>, OOH*, O*, OH* and H<sub>2</sub>O on Pt<sub>13</sub> and checked each was a true minimum.'],
      ['Key result', 'Every step of the associative four-electron pathway was downhill in electronic energy.'],
      ['Limits', 'Electronic energies only, no corrections or transition states, so no rates.'],
    ],
    sections: () => [
      ['question', 'The question', `
<p>Oxygen reduction is slow even on platinum, and it is the reaction that limits fuel cell cathodes. Small clusters like Pt<sub>13</sub> have edge and corner sites that behave differently from flat surfaces. I wanted to see how the reaction intermediates sit on such a cluster and whether each step is energetically favourable.</p>`],
      ['approach', 'What I did', `
<ol class="steps">
  <li><h3>Built the structures</h3><p>The Pt<sub>13</sub> cluster and the O<sub>2</sub>, OOH, O, OH and H<sub>2</sub>O species were built in Avogadro.</p></li>
  <li><h3>Optimised them</h3><p>Gaussian 16 with the spin-unrestricted B3LYP functional, LANL2DZ for platinum and 6-31G(d,p) for hydrogen and oxygen.</p></li>
  <li><h3>Checked them</h3><p>A frequency calculation on every structure confirmed it was a true minimum, with no imaginary frequencies.</p></li>
  <li><h3>Compared the steps</h3><p>Reaction energies for each step of the associative four-electron pathway, from the electronic (SCF) energies.</p></li>
</ol>`],
      ['results', 'What I found', `
${dftChart()}
<p>All four steps were downhill, which fits the known activity of platinum for this reaction and supports using small clusters for mechanistic work.</p>
<details class="more"><summary>See the optimised structures</summary>
${fig('ayush-suryawanshi-photo-4972ceff.jpg', 'Plot of step energies with the optimised structure drawn at each point', 'The same four step energies drawn along the reaction pathway, with the optimised structure of each intermediate. The line only guides the eye: no transition states were calculated.', { sizes: '(min-width: 1100px) 720px, 100vw' })}
</details>`],
      ['limits', 'Limits', `
<p>These are electronic energies only, without zero-point, thermal or entropy corrections, and no transition states were located. They show which intermediates are stable, not how fast each step goes.</p>`],
    ],
  },
  {
    slug: 'sncr-biomass-boiler',
    kind: ['process', 'computation'],
    kindLabel: 'Process engineering · NTNU, team of four',
    title: 'Cutting NOx from a biomass boiler',
    short: 'Process design for an SNCR retrofit, modelled in Cantera and presented in Oslo.',
    description:
      'SNCR retrofit design for NOx reduction in a biomass boiler, a four-person NTNU process design project with Billerud Viken and Vardar Varme, modelled in Python with Cantera.',
    when: 'Aug – Nov 2025',
    where: 'NTNU, Trondheim',
    cardImg: ['ayush-suryawanshi-photo-5ee7ac61.jpg', 'Ayush and two teammates beside their SNCR poster', '50% 8%'],
    stats: [
      ['~60%', 'modelled NOx reduction'],
      ['300', 'mg/Nm³ limit to stay under'],
    ],
    tags: ['Process design', 'Kinetic modelling', 'Python / Cantera'],
    meta: [
      ['Type', 'Process design project (TKP4170)'],
      ['Team', 'Four students'],
      ['Supervisor', 'Prof. Øyvind Weiby Gregersen'],
      ['Industry partners', 'Billerud Viken; boiler operated by Vardar Varme AS'],
      ['Tools', 'Python, Cantera, Excel'],
      ['Presented at', 'Treforedlingsforum 2025, Oslo'],
    ],
    glance: [
      ['Problem', 'An upgraded biomass boiler must stay under 300 mg/Nm³ NOx. Could an SNCR retrofit get it there?'],
      ['What I did', 'As one of four, estimated baseline NOx, checked the operating window, and modelled combustion and SNCR chemistry in Cantera.'],
      ['Key result', 'About 60% reduction, bringing NOx to roughly 95–120 mg/Nm³ in the model.'],
      ['Limits', 'A design study built on incomplete plant data, not a plant trial.'],
    ],
    hero: ['ayush-suryawanshi-photo-5ee7ac61.jpg', 'Ayush and two teammates standing beside their SNCR poster at a conference', 'With two of my teammates beside our poster at Treforedlingsforum 2025 in Oslo.'],
    heroFit: 'natural',
    sections: () => [
      ['question', 'The question', `
<p>An existing biomass boiler, run for district heating by Vardar Varme, is to be upgraded to 30–35 MW to supply steam to Billerud Viken’s planned bleached chemi-thermomechanical pulp (BCTMP) mill. Burning biomass produces NOx, and the plant has to stay under 300 mg/Nm³. Our team of four looked at whether a selective non-catalytic reduction (SNCR) retrofit could get it there.</p>`],
      ['approach', 'How we approached it', `
<ol class="steps">
  <li><h3>Estimated the starting point</h3><p>Uncontrolled NOx came out at 280–330 mg/Nm³, in the range where SNCR is effective.</p></li>
  <li><h3>Checked the operating window</h3><p>Mass and energy balances gave a flame temperature near 1250 °C and a flue-gas residence time of 0.6–2 s, both suitable for SNCR.</p></li>
  <li><h3>Modelled the chemistry</h3><p>A combustion equilibrium model and a plug-flow SNCR kinetic model in Python with Cantera, using the GRI-Mech 3.0 and San Diego mechanisms.</p></li>
  <li><h3>Designed the system</h3><p>Ammonia was chosen as the reagent for cost and performance. We laid out storage, mixing and injection, sized the main equipment, set out ammonia safety measures and estimated capital and operating costs.</p></li>
</ol>`],
      ['results', 'What we found', `
<p>A realistic reduction of about 60% brings emissions to roughly 95–120 mg/Nm³, well under the limit. Because both performance and ammonia slip depend strongly on temperature, the study recommends injecting towards the upper end of the temperature window. Reagent use dominates the running cost.</p>
<div class="fig-row">
${fig('ayush-suryawanshi-plot-of-nox-and-ammonia-slip-against-sncr.jpg', 'Plot of NOx and ammonia slip against SNCR temperature', 'Modelled NOx with and without SNCR across injection temperatures. The dashed line is the 300 mg/Nm³ limit and the shaded band is the usual SNCR window: inject too cold and ammonia slips through, too hot and it burns to NOx itself.', { sizes: '(min-width: 720px) 340px, 100vw' })}
${fig('ayush-suryawanshi-plot-of-no-reduction-and-ammonia-slip-against.jpg', 'Plot of NO reduction and ammonia slip against the normalised stoichiometric ratio', 'More ammonia removes more NO, but past a point the unreacted ammonia slipping through rises steeply. The design dose sits where reduction is high and slip is still low.', { sizes: '(min-width: 720px) 340px, 100vw' })}
</div>
<p>I presented the work as a poster at Treforedlingsforum 2025 in Oslo on 18–19 November 2025.</p>
${fig('sncr-poster-treforedlingsforum-2025.jpg', 'Conference poster titled SNCR Technology for Reduction of NOx Emissions in a Bio-Boiler, with sections on motivation, modelling, reagent use and economics', 'The poster we presented in Oslo. It condenses the study into one page: why the boiler needs NOx control, how we modelled it, how much ammonia it takes and what it costs. Select it to read it at full size.', { cls: 'poster', sizes: '(min-width: 900px) 420px, 90vw' })}`],
      ['learned', 'What I took from it', `
<p>This was my first design project for an industry client. It taught me to work from incomplete plant data, state assumptions clearly, and give a recommendation a client can act on.</p>`],
    ],
  },
];

export const kinds = [
  ['all', 'All', ''],
  ['lab', 'Experimental research', 'Making catalysts and electrodes and measuring what they do.'],
  ['computation', 'Modelling and simulation', 'DFT of reaction intermediates and reaction-kinetics models.'],
  ['process', 'Process engineering', 'Designing and choosing processes under cost, safety and emission limits.'],
];
