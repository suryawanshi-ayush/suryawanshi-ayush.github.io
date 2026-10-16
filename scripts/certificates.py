"""Make web-ready JPEG previews of the selected certificates.

Reads the original PDFs/JPGs from a local clone of the private documents repository
(they are never copied into this site), crops each to its certificate boundary, paints
over IDs that do not need to be public, and writes:

    images/certificates/<slug>-1600.jpg   full view, opened in the lightbox
    images/certificates/<slug>-640.jpg    card preview

Usage:  python3 scripts/certificates.py /path/to/documents
Needs:  pdftoppm (poppler-utils) and Pillow.
"""
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

OUT = Path(__file__).resolve().parent.parent / "images" / "certificates"

# slug: (source file, page to render, crop mode, redaction boxes as fractions of the cropped image)
CERTS = {
    "mtech-degree-iit-madras": (
        "M Tech Degree.pdf", 1, "margin",
        [(0.095, 0.425, 0.18, 0.53),     # QR code
         (0.81, 0.555, 0.885, 0.578)],   # roll number under the photo
    ),
    "treforedlingsforum-2025-poster": (
        "Treforedlingsforum 2025 CERTIFICATE OF PARTICIPATION_Ayush Suryawanshi.pdf", 1, "border", [],
    ),
    "gian-heterogeneous-catalysts-2025": (
        "Gian Course HeteroCatalysis Certificate of Participation.pdf", 1, "trim", [],
    ),
    "schemcon-2021-paper": (
        "schemcon certificate.JPG", None, "none",
        [(0.775, 0.0, 1.0, 0.07)],       # certificate number, top right
    ),
}


def render(src: Path, page):
    if page is None:
        return ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    with tempfile.TemporaryDirectory() as tmp:
        stem = Path(tmp) / "p"
        subprocess.run(["pdftoppm", "-r", "220", "-jpeg", "-singlefile", "-f", str(page), "-l", str(page), str(src), str(stem)], check=True)
        return Image.open(f"{stem}.jpg").convert("RGB")


def bbox_of_ink(im, threshold=200):
    """Bounding box of everything darker than `threshold` (the printed area)."""
    g = im.convert("L").point(lambda v: 255 if v < threshold else 0)
    return g.getbbox()


def crop(im, mode):
    if mode == "border":   # page with a drawn frame: crop just outside the frame
        x0, y0, x1, y1 = bbox_of_ink(im, 120)
        pad = 6
        return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))
    if mode == "trim":     # scan with white margins
        x0, y0, x1, y1 = bbox_of_ink(im, 235)
        return im.crop((x0, y0, x1, y1))
    if mode == "margin":   # photographed paper: trim the scanner edge
        w, h = im.size
        return im.crop((int(w * 0.007), int(h * 0.008), int(w * 0.994), int(h * 0.993)))
    return im


def redact(im, boxes):
    d = ImageDraw.Draw(im)
    w, h = im.size
    for fx0, fy0, fx1, fy1 in boxes:
        box = (int(fx0 * w), int(fy0 * h), int(fx1 * w), int(fy1 * h))
        # Fill with the paper colour sampled just below the box, so the patch is unobtrusive.
        sy = min(h - 8, box[3] + 4)
        sample = im.crop((box[0], sy, box[2], sy + 6)).resize((1, 1), Image.BOX).getpixel((0, 0))
        d.rectangle(box, fill=sample)
    return im


def save(im, slug):
    OUT.mkdir(parents=True, exist_ok=True)
    for long_edge in (1600, 640):
        c = im.copy()
        c.thumbnail((long_edge, long_edge), Image.LANCZOS)
        c.save(OUT / f"{slug}-{long_edge}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    return im.size


def main(docs: Path):
    for slug, (name, page, mode, boxes) in CERTS.items():
        im = redact(crop(render(docs / name, page), mode), boxes)
        print(slug, save(im, slug))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
