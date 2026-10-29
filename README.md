# Ayush Suryawanshi, portfolio (STAGING COPY)

> Test copy of the live site at https://suryawanshi-ayush.github.io/ for trying changes before they go live.
> Preview: https://suryawanshi-ayush.github.io/portfolio-staging/
> This copy is kept out of search engines (`noindex` on every page and a block-all `robots.txt`).

## How the site is built

GitHub Pages serves this repository's root directly from the branch, so the built pages are committed.
There is no framework and no npm install: one Node script turns the content into static HTML.

```
src/content.mjs     every fact, date, number and project write-up (edit this to change content)
src/site.css        design tokens, layout, light (warm paper) and dark (soft charcoal) themes, motion rules
src/site.js         interactions: theme, menu, flow-line reveal, chart toggle, filters, lightbox, schematic, intro video
src/lib.mjs         image and URL helpers
src/images.json     image sizes, used for responsive srcset and width/height
scripts/build.mjs   page templates; writes the site into the repo root
fonts/              self-hosted IBM Plex Serif, Sans and Mono, SIL Open Font License
media/              intro video (1080p and 720p), poster and WebVTT captions
site.config.json    staging flag, base path and canonical origin
```

## Design

Redesigned from scratch in October 2026 (the previous version is kept in the private repository
`portfolio_n-1`, branch `staging-backup-2026-10-26`).

- Identity: an engineering-drawing layout in the Fjord palette (October 2026), following a 60-30-10 split:
  warm white (#faf8f4) as the base, deep teal (#0f5566) as the main colour and coral (#d9572b) as the accent,
  with mustard as a third colour. Dark theme is deep teal-charcoal (#0e1b20), never pure black. Colour is part
  of the structure: a tinted hero, tinted bands for the process flow and the timeline, and a deep teal footer card.
- One bold element: on the home page the three areas of work (catalysis, electrochemistry, process
  engineering) are drawn as unit operations on a process-flow line, each linking to its projects. The
  footer is a drawing title block. Everything else stays quiet so the evidence reads first.
- Colours per discipline match the intro video, which was re-rendered in the same palette: catalysis coral,
  electrochemistry teal, process mustard.
- Type: IBM Plex Serif for headings, Plex Sans for text, Plex Mono for tags and readings, as in the intro video.
- Motion: only the flow line draws in once and charts fill when seen; nothing moves with reduced motion.
- Accessibility: WCAG 2.1 AA checked with axe on every page, both themes, desktop and phone.
- Performance (PageSpeed, Oct 2026): styles are minified and inlined in each page (no render-blocking request);
  photos come in 240, 480, 640 and 1280 px WebP; the intro video plays the 720p file and switches to 1080p only in
  full screen on a large display, and its silent autoplay starts after the page has loaded (never on data-saver or
  2G connections). GitHub Pages sets a fixed 10-minute cache and no security headers, which cannot be changed there.
- Disclosure: industry-linked work (SNCR, LOXIM) shows methods, trends, percentages and public limits only;
  plant data, absolute figures from partners, costs and reports stay off the site. See the notes in src/content.mjs.
- Unpublished thesis (Oct 2026): the M.Tech thesis results appear in words and rounded ratios only (1.6x and 1.3x
  retention vs commercial Pt/C, 1.4x peak mass activity, 2.5x peak current from the thinner ink), on the site, in the
  public CV, in llms.txt and in the intro video (the two narrated sentences with exact figures were cut). No exact
  values, data plots, compositions, recipes or operating conditions until the work is published; then restore them
  with the DOI.

Build after any change, then commit the source and the generated files together:

```
node scripts/build.mjs      # or: npm run build
```

Generated (do not edit by hand): `index.html`, `projects/`, `about/`, `cv/`, `404.html`, `assets/`,
`sitemap.xml`, `robots.txt`, `llms.txt`.

Images: originals stay in `images/*.jpg` (old links keep working); the pages use WebP copies in
`images/w/` at 640 px and 1280 px wide. After adding a photo to `images/`, run
`python3 scripts/images.py` to make its WebP copies and update `src/images.json`.

Certificates: previews in `images/certificates/` are made from the private documents repository
(`suryawanshi-ayush/documents`) with `python3 scripts/certificates.py /path/to/documents`. The
script crops each certificate to its edges and paints out QR codes and ID numbers. The original
PDFs, thesis and reports are never copied into this site; only the findings are summarised in
`src/content.mjs`.

## Moving a change to the live site

Copy the repository contents over, then in the live repo set `site.config.json` to

```json
{ "staging": false, "basePath": "/", "canonicalOrigin": "https://suryawanshi-ayush.github.io" }
```

and run the build. That switches every page to `index, follow`, writes the open `robots.txt`
for search and AI crawlers, and fixes all links for the root path. Keep the live repo's
`google2a67caef4377869e.html` (Search Console verification); the build does not touch it.

## Chart colours

The two chart series were checked with a colour-vision-deficiency validator against both
backgrounds: light `#2457C5` / `#C27C1A` on `#FFFFFF`, dark `#5F8BF0` / `#B77B26` on `#161B22`.

## Visitor statistics (GoatCounter)

The live site counts visits with [GoatCounter](https://www.goatcounter.com): no cookies, no personal data, no
consent banner needed. It is switched on by one line in `site.config.json` on the live repo:

```json
"goatcounter": "your-goatcounter-code"
```

Leave it out (as on staging) and nothing is loaded. When it is on:

- the counter script is self-hosted (`src/goatcounter.js`, ISC licence) and is not loaded at all for visitors
  whose browser sends Do Not Track or Global Privacy Control;
- page views, referrers, countries, browsers and screen sizes appear in the GoatCounter dashboard;
- these actions are counted as anonymous events: `cv-download`, `email-click`, `linkedin-click`,
  `intro-video-sound` and `intro-video-complete`;
- links you share can carry a tag that shows up as the referrer, e.g. `https://suryawanshi-ayush.github.io/?ref=linkedin`
  or `?ref=application-companyname`;
- visit `https://suryawanshi-ayush.github.io/#toggle-goatcounter` once in each of your own browsers to stop
  counting your own visits;
- the footer says that visits are counted and how.

## CV

The site links to `Ayush_CV_revised.pdf` (it downloads as `Ayush_CV.pdf`). It is generated from the content in
`scripts/cv_build.py` with ReportLab, in the style of the earlier CV (US Letter, Liberation Serif, spaced section
headings over a rule):

```
python3 scripts/cv_build.py
```

The earlier copy was patched on top of the original PDF, which left parts of the text out of reading order for
ATS parsers and text extraction; generating the whole document draws every line in reading order. Content follows
the master resume of 23 Oct 2026 with the website's disclosure rules (no phone number, no LOXIM cost figures in
rupees, no plant-specific SNCR figures). The build stops if an entry title wraps or a bullet runs past two lines.
