# Ayush Suryawanshi, portfolio

Live at https://suryawanshi-ayush.github.io/

Changes are tried first in the staging copy (suryawanshi-ayush/portfolio-staging, served at
https://suryawanshi-ayush.github.io/portfolio-staging/) and then copied here with
`site.config.json` set to the live values below.

## How the site is built

GitHub Pages serves this repository's root directly from the branch, so the built pages are committed.
There is no framework and no npm install: one Node script turns the content into static HTML.

```
src/content.mjs     every fact, date, number and project write-up (edit this to change content)
src/site.css        design tokens, layout, light/dark themes, motion rules
src/site.js         interactions: theme, menu, reveals, chart toggle, filters, lightbox, schematic
src/lib.mjs         image and URL helpers
src/images.json     image sizes, used for responsive srcset and width/height
scripts/build.mjs   page templates; writes the site into the repo root
site.config.json    staging flag, base path and canonical origin
```

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

## CV

`Ayush_CV.pdf` is the original CV, kept unchanged. The site links to `Ayush_CV_revised.pdf`
(it downloads as `Ayush_CV.pdf`). No editable CV source exists, so the revised copy is built
from the original by `python3 scripts/cv_revise.py`: new summary, header without a phone number
and with the website address, KinCat group, British/Indian English spellings, Languages and
EuropaCat lines, and neutral PDF metadata. Every other line keeps its text and position.

