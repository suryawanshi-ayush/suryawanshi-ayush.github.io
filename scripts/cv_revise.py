"""Build Ayush_CV_revised.pdf from the untouched original Ayush_CV.pdf.

There is no editable source for the CV (it was generated straight to PDF), so the edits are
made on the PDF itself, keeping the original fonts, sizes, colours and positions:

  * professional summary rewritten (same five justified lines)
  * header: phone number removed; LinkedIn and the website shown as their addresses
  * NTNU research stay names the KinCat group
  * British/Indian English spellings (sulphate, optimised, characterisation); official
    course titles are left as the institutes spell them
  * Technical skills: a Languages line (IELTS Academic)
  * Conferences & workshops: EuropaCat 2025
  * neutral document metadata

Every line that is not edited keeps its exact text; lines below an insertion move down by
exactly one line pitch. Usage: python3 scripts/cv_revise.py  (needs PyMuPDF, Liberation fonts)
"""
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "Ayush_CV.pdf", ROOT / "Ayush_CV_revised.pdf"
FONTDIR = "/usr/share/fonts/truetype/liberation/"
FONTS = {  # PDF font name -> (alias used when inserting, font file or base-14 name)
    "LiberationSerif": ("LSR", FONTDIR + "LiberationSerif-Regular.ttf"),
    "LiberationSerif-Bold": ("LSB", FONTDIR + "LiberationSerif-Bold.ttf"),
    "LiberationSerif-Italic": ("LSI", FONTDIR + "LiberationSerif-Italic.ttf"),
}
METRICS = {k: pymupdf.Font(fontfile=f) for k, (_, f) in FONTS.items()}

SUMMARY = (
    "Chemical engineer with an M.Tech in Catalysis Technology from IIT Madras, connecting hands-on "
    "electrochemistry and materials research with process engineering and simulation. Made Bi-modified "
    "Pt/C catalysts, including in the KinCat group at NTNU, prepared inks and electrodes, and tested them "
    "in a three-electrode cell on an Autolab potentiostat (CV, ECSA, activity, durability). Modelled SNCR "
    "chemistry in Cantera, completed a DFT course project, and now evaluates electrocoagulation for "
    "effluent treatment at LOXIM Industries. Careful about safety, evidence and the limits of results."
)
WEBSITE = ("suryawanshi-ayush.github.io", "https://suryawanshi-ayush.github.io/")

# (page, phrase that identifies the line, [(old, new), ...])
SPELLING_AND_FACTS = [
    (0, "in a sulfate removal project", [("sulfate", "sulphate")]),
    (0, "Leading technology selection for sulfate", [("sulfate", "sulphate")]),
    (0, "Optimized O2", [("Optimized", "Optimised")]),
    (0, "Research stay, NTNU", [("stay,", "stay, KinCat group,")]),
    (1, "Materials Characterization:", [("Characterization:", "Characterisation:")]),
    (1, "GIAN course on characterization", [("characterization", "characterisation")]),
]
LANGUAGES = [("LiberationSerif-Bold", "Languages:"),
             ("LiberationSerif", " English (IELTS Academic, overall band 7.0, CEFR C1, July 2026), Hindi")]
EUROPACAT = "Attended EuropaCat 2025, the European Congress on Catalysis, Trondheim, Norway."


def lines_of(page):
    return [l for b in page.get_text("dict")["blocks"] for l in b.get("lines", [])]


def rgb(c):
    return ((c >> 16) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255)


def ensure_fonts(page):
    for alias, f in FONTS.values():
        page.insert_font(fontname=alias, fontfile=f)


def put(page, x, y, text, font, size, color=0):
    page.insert_text((x, y), text, fontname=FONTS[font][0], fontsize=size, color=rgb(color))


def width(font, text, size):
    return METRICS[font].text_length(text, fontsize=size)


def blank(page, rect, art=False):
    page.add_redact_annot(rect, fill=None)
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                          graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED if art == "touched"
                          else pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED if art else pymupdf.PDF_REDACT_LINE_ART_NONE)


RIGHT = 564.1  # right edge of the justified text column


def snapshot(page, pred):
    """Words of matching lines, each with its own font, size, colour and exact position.

    Working word by word keeps justified spacing exactly as it was."""
    out = []
    for b in page.get_text("rawdict")["blocks"]:
        for l in b.get("lines", []):
            if not pred(l):
                continue
            words, prev_space = [], False
            for s in l["spans"]:
                for ch in s["chars"]:
                    c = ch["c"]
                    if c.isspace():
                        prev_space = True
                        continue
                    if words and not prev_space and words[-1]["font"] == s["font"] and words[-1]["size"] == s["size"]:
                        words[-1]["text"] += c
                        words[-1]["chars"].append((c, ch["origin"][0]))
                    else:
                        words.append(dict(text=c, font=s["font"], size=s["size"], color=s["color"],
                                          x=ch["origin"][0], y=ch["origin"][1], space_before=prev_space and bool(words),
                                          chars=[(c, ch["origin"][0])]))
                    prev_space = False
            out.append(dict(words=words, right=l["bbox"][2]))
    return out


def redraw(page, line, dy=0.0, replace=()):
    """Re-set a line word by word at its original positions.

    If a replacement changes a word's width, the rest of the line shifts; a line that was
    justified to the right margin is re-justified so it still ends exactly at the margin."""
    words = [dict(w, x0=w["x"]) for w in line["words"]]
    changed = False
    for w in words:
        for old, new in replace:
            if old in w["text"]:
                w["text"] = w["text"].replace(old, new)
                w["edited"] = changed = True
    if changed:
        body = 1 if words and words[0]["text"] == "\u2022" else 0   # never stretch the gap after a bullet
        wid = [width(w["font"], w["text"], w["size"]) for w in words]
        x = words[body]["x"]
        if line["right"] >= RIGHT - 0.6:   # justified line: spread the spare space over the word gaps
            gaps = sum(1 for w in words[body + 1:] if w["space_before"])
            spare = RIGHT - x - sum(wid[body:])
            gap = spare / gaps if gaps else 0
        else:                              # ragged line: keep its natural space width
            gap = width(words[body]["font"], " ", words[body]["size"])
        for i in range(body, len(words)):
            if i > body:
                x += wid[i - 1] + (gap if words[i]["space_before"] else 0)
            words[i]["x"] = x
    for w in words:
        if w.get("edited"):
            put(page, w["x"], w["y"] + dy, w["text"], w["font"], w["size"], w["color"])
        else:  # character by character, so letter-spaced headings keep their exact spacing
            shift = w["x"] - w["x0"]
            for c, cx in w["chars"]:
                put(page, cx + shift, w["y"] + dy, c, w["font"], w["size"], w["color"])


def line_box(page, phrase):
    hits = [l for l in lines_of(page) if phrase in "".join(s["text"] for s in l["spans"])]
    assert len(hits) == 1, (phrase, len(hits))
    return hits[0]


def summary(page):
    font, fs, x0, x1 = METRICS["LiberationSerif"], 10.5, 48.0, 564.1
    words, lines, cur = SUMMARY.split(), [], []
    for w in words:
        if font.text_length(" ".join(cur + [w]), fontsize=fs) <= x1 - x0:
            cur.append(w)
        else:
            lines.append(cur)
            cur = [w]
    lines.append(cur)
    assert len(lines) == 5, f"summary needs {len(lines)} lines; it must fit the original 5"
    blank(page, pymupdf.Rect(47, 90, 566, 155))
    tw = pymupdf.TextWriter(page.rect)
    for i, ws in enumerate(lines):
        ww = [font.text_length(w, fontsize=fs) for w in ws]
        gap = font.text_length(" ", fontsize=fs) if i == len(lines) - 1 else (x1 - x0 - sum(ww)) / (len(ws) - 1)
        x = x0
        for w, wd in zip(ws, ww):
            tw.append((x, 102.0 + 12.0 * i), w, font=font, fontsize=fs)
            x += wd + gap
    tw.write_text(page)


def header(page, src_page):
    """Email | LinkedIn | website, re-centred, with the original icons carried over.

    Set in Liberation Serif, which has the same metrics as the Times-Roman used originally."""
    icons = {"email": pymupdf.Rect(204.36, 54.5, 213.11, 63.4),
             "linkedin": pymupdf.Rect(391.11, 54.5, 399.86, 63.4),
             "web": pymupdf.Rect(461.67, 54.5, 469.98, 63.4)}
    sep = "   |   "
    parts = [("email", "ayush.suryawanshi0803@gmail.com", "mailto:ayush.suryawanshi0803@gmail.com"),
             ("linkedin", "linkedin.com/in/ayush-suryawanshi", "https://linkedin.com/in/ayush-suryawanshi"),
             ("web", WEBSITE[0], WEBSITE[1])]
    gap, size, base = 4.4, 10.5, 62.6
    texts = [t + (sep if i < len(parts) - 1 else "") for i, (_, t, _) in enumerate(parts)]
    total = sum(icons[k].width + gap + width("LiberationSerif", t, size) for (k, _, _), t in zip(parts, texts))
    for link in page.get_links():
        page.delete_link(link)
    blank(page, pymupdf.Rect(95, 53.5, 525, 66.5), art="touched")
    x = 306.65 - total / 2  # same centre as the original contact line
    for (key, label, uri), t in zip(parts, texts):
        ic = icons[key]
        page.show_pdf_page(pymupdf.Rect(x, ic.y0, x + ic.width, ic.y1), src_page.parent, src_page.number, clip=ic)
        tx = x + ic.width + gap
        put(page, tx, base, t, "LiberationSerif", size)
        page.insert_link({"kind": pymupdf.LINK_URI, "uri": uri,
                          "from": pymupdf.Rect(x - 1.9, 52.2, tx + width("LiberationSerif", label, size) + 1, 65.6)})
        x = tx + width("LiberationSerif", t, size)


def page_two(page):
    """Insert Languages after the skills block and EuropaCat after the first conference."""
    ls = lines_of(page)
    y_lang = max(l["bbox"][3] for l in ls if l["bbox"][1] < 170)          # end of the skills block
    y_conf = line_box(page, "Presented a poster")["bbox"][3]               # after the first conference bullet
    pitch_skill, pitch_bullet = 13.2, 12.8
    move = snapshot(page, lambda l: l["bbox"][1] > y_lang)
    rules = [d["rect"].y0 for d in page.get_drawings() if d["rect"].y0 > y_lang]
    blank(page, pymupdf.Rect(40, y_lang + 1, 570, 790), art=True)
    ensure_fonts(page)
    for line in move:
        dy = pitch_skill + (pitch_bullet if line["words"][0]["y"] > y_conf else 0)
        redraw(page, line, dy=dy)
    for y in rules:
        dy = pitch_skill + (pitch_bullet if y > y_conf else 0)
        page.draw_line((48, y + dy), (564, y + dy), color=(0, 0, 0), width=0.75)
    # Languages: next skills item, one item pitch below the last skills line
    base = 163.2 + pitch_skill
    x = 48.0
    for font, t in LANGUAGES:
        put(page, x, base, t, font, 10.5)
        x += width(font, t, 10.5)
    # EuropaCat: a bullet one bullet pitch below the (moved) first conference bullet
    poster = [l for l in move if l["words"][1]["text"] == "Presented"][0]
    b = poster["words"][0]["y"] + pitch_skill + pitch_bullet
    put(page, 52.0, b, "•", "LiberationSerif", 10.0)
    put(page, 62.0, b, EUROPACAT, "LiberationSerif", 10.5)


def main():
    # Icons are copied from a text-free copy of page 1, so no hidden duplicate text is embedded.
    src = pymupdf.open(SRC)
    src[0].add_redact_annot(src[0].rect, fill=None)
    src[0].apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
    src[0].add_redact_annot(pymupdf.Rect(0, 68, 612, 792), fill=None)   # drop the section rules below the header
    src[0].apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)
    icon_src = pymupdf.open()
    icon_src.insert_pdf(src, from_page=0, to_page=0)
    doc = pymupdf.open(SRC)
    p1, p2 = doc[0], doc[1]
    summary(p1)
    for pi, phrase, repl in SPELLING_AND_FACTS:
        page = doc[pi]
        box = line_box(page, phrase)
        line = snapshot(page, lambda l: l["bbox"] == box["bbox"])[0]
        r = pymupdf.Rect(box["bbox"])
        blank(page, pymupdf.Rect(r.x0 - 1, r.y0 + 2, 566, r.y1 - 2))
        ensure_fonts(page)
        redraw(page, line, replace=repl)
    ensure_fonts(p1)
    header(p1, icon_src[0])
    page_two(p2)
    meta = doc.metadata
    meta.update(title="Ayush Suryawanshi – CV", subject="Curriculum vitae", author="Ayush Suryawanshi",
                modDate=pymupdf.get_pdf_now())
    doc.set_metadata(meta)
    doc.save(OUT, garbage=3, deflate=True)
    print(f"wrote {OUT.name}")


if __name__ == "__main__":
    main()
