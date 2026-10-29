"""Regenerate responsive WebP copies of every photo in images/ and src/images.json.

Originals stay at images/<name>.jpg (old links keep working). The pages use
images/w/<short-name>-<width>.webp at 240, 480, 640 and 1280 px (or the original width
if smaller), plus the original size for width/height attributes.

Usage: python3 scripts/images.py
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "images"
OUT = IMG / "w"
# Clearer public names for files whose original names carry no meaning.
RENAME = {
    "ayush-suryawanshi-photo-baa04525": "ayush-sem-workstation-ntnu-cleanroom",
    "ayush-suryawanshi-photo-4972ceff": "dft-orr-pt13-step-energies-figure",
    "ayush-suryawanshi-photo-5ee7ac61": "sncr-team-poster-treforedlingsforum-oslo",
}


def main():
    OUT.mkdir(exist_ok=True)
    meta = {}
    for src in sorted(IMG.glob("*.jpg")):
        stem = src.stem
        name = RENAME.get(stem, stem.replace("ayush-suryawanshi-", ""))
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        w, h = im.size
        # 240 and 480 px serve small slots (profile photo, thumbnails); 640 and 1280 px the rest.
        widths = sorted({min(x, w) for x in (240, 480, 640, 1280)} | ({w} if 640 < w < 1280 else set()))
        widths = [x for x in widths if x == w or x in (240, 480, 640, 1280)]
        if 'banner' in stem and w > 1280:
            widths.append(min(w, 2400))  # wide banners need a sharper copy for high-density screens
        if 'poster' in stem and w > 1280:
            widths.append(w)  # posters need full resolution to be readable when enlarged
        figure = stem.startswith("thesis-figure-")
        if figure and w > 1280:
            widths.append(min(w, 2000))  # data figures: a sharper copy for the enlarged view
        for ww in widths:
            target = OUT / f"{name}-{ww}.webp"
            if not target.exists():
                im.resize((ww, round(h * ww / w)), Image.LANCZOS).save(target, "WEBP", quality=92 if figure else 80, method=6)
        meta[src.name] = {"name": name, "w": w, "h": h, "widths": widths}
    (ROOT / "src" / "images.json").write_text(json.dumps(meta, indent=1) + "\n")
    print(f"{len(meta)} images")


if __name__ == "__main__":
    main()
