// Small helpers shared by the content and the page templates.
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
export const config = JSON.parse(readFileSync(new URL('site.config.json', root), 'utf8'));
const images = JSON.parse(readFileSync(new URL('images.json', import.meta.url), 'utf8'));

export const BASE = config.basePath;           // '/portfolio-staging/' on staging, '/' on the live site
export const ORIGIN = config.canonicalOrigin;  // canonical URLs always point at the live site

/** Site-relative URL for a path like 'projects/x/' or 'images/a.jpg'. */
export const url = (p = '') => BASE + p.replace(/^\//, '');
/** Absolute URL on the live site, for canonical links, Open Graph and structured data. */
export const liveUrl = (p = '') => ORIGIN + '/' + p.replace(/^\//, '');

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const strip = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/**
 * Responsive <img> from an original JPG in images/. Serves WebP variants from images/w/
 * and keeps width/height so the layout does not jump while images load.
 */
export function img(file, alt, { sizes = '100vw', eager = false, cls = '', zoom = false, pos = '' } = {}) {
  const m = images[file];
  if (!m) throw new Error(`Unknown image ${file}`);
  const srcs = m.widths.map((w) => `${url(`images/w/${m.name}-${w}.webp`)} ${w}w`);
  const largest = url(`images/w/${m.name}-${m.widths[m.widths.length - 1]}.webp`);
  const attrs = [
    `src="${url(`images/w/${m.name}-${m.widths[0]}.webp`)}"`,
    srcs.length > 1 ? `srcset="${srcs.join(', ')}" sizes="${sizes}"` : '',
    `width="${m.w}" height="${m.h}"`,
    `alt="${esc(alt)}"`,
    eager ? 'fetchpriority="high"' : 'loading="lazy"',
    'decoding="async"',
    cls ? `class="${cls}"` : '',
    pos ? `style="object-position:${pos}"` : '',
    zoom ? `data-zoom="${largest}"` : '',
  ].filter(Boolean);
  return `<img ${attrs.join(' ')}>`;
}

/** Figure with caption. `source` is shown as a quiet attribution line under the caption. */
export function fig(file, alt, caption, { source = '', cls = '', sizes, zoom = true, pos } = {}) {
  return `<figure class="fig ${cls}">${img(file, alt, { sizes, zoom, pos })}<figcaption>${caption}${
    source ? ` <span class="src">${source}</span>` : ''
  }</figcaption></figure>`;
}
