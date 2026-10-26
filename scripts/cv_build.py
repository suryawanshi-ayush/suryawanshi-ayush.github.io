"""Build Ayush_CV_revised.pdf (served as Ayush_CV.pdf) from the content below.

Why a generator: the earlier revised CV was made by patching text into the original PDF. That left
the content stream out of reading order (the summary, the contact line and several edited lines
were drawn last), so text extraction and ATS parsers read them in the wrong place. Generating the
whole document in one pass draws every line in reading order.

Style follows the previous CV: US Letter, 48 pt side margins, Liberation Serif, 20 pt name,
11.5 pt spaced capitals for section headings over a 0.75 pt rule, 11 pt entry titles with dates
after a bar, 10.5 pt italic grey organisation lines, 10.5 pt justified text and 10 pt bullets.

Content comes from the master resume of 23 Oct 2026 (documents repository), with the website's
disclosure rules: no phone number on the public copy, no LOXIM cost figures in rupees, and no
plant-specific SNCR figures from the industry partners. Bullets are kept to two lines and no entry
is split across pages; the script checks both.

Usage: python3 scripts/cv_build.py   (needs reportlab and the Liberation fonts)
"""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (Flowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "Ayush_CV_revised.pdf"
FONTDIR = "/usr/share/fonts/truetype/liberation/"
for name, file in [("LS", "LiberationSerif-Regular.ttf"), ("LS-B", "LiberationSerif-Bold.ttf"),
                   ("LS-I", "LiberationSerif-Italic.ttf"), ("LS-BI", "LiberationSerif-BoldItalic.ttf")]:
    pdfmetrics.registerFont(TTFont(name, FONTDIR + file))
pdfmetrics.registerFontFamily("LS", normal="LS", bold="LS-B", italic="LS-I", boldItalic="LS-BI")

INK = HexColor("#000000")
GREY = HexColor("#404040")
MARGIN = 48

S_NAME = ParagraphStyle("name", fontName="LS-B", fontSize=20, leading=23, alignment=TA_CENTER, textColor=INK)
S_SEC = ParagraphStyle("sec", fontName="LS-B", fontSize=11.5, leading=14, textColor=INK)
S_BODY = ParagraphStyle("body", fontName="LS", fontSize=10.5, leading=12.4, alignment=TA_JUSTIFY, textColor=INK)
S_TITLE = ParagraphStyle("title", fontName="LS", fontSize=11, leading=13.2, alignment=TA_LEFT, textColor=INK)
S_ORG = ParagraphStyle("org", fontName="LS-I", fontSize=10.5, leading=12.4, textColor=GREY)
S_NOTE = ParagraphStyle("note", parent=S_BODY, fontSize=10, leading=11.8)
S_BUL = ParagraphStyle("bul", fontName="LS", fontSize=10, leading=11.6, alignment=TA_JUSTIFY, leftIndent=14,
                       bulletIndent=4, bulletFontName="LS", bulletFontSize=10, textColor=INK)
S_SKILL = ParagraphStyle("skill", parent=S_BODY, fontSize=10.5, leading=12.2, spaceAfter=2.2)

EMAIL = "ayush.suryawanshi0803@gmail.com"
LINKEDIN = ("linkedin.com/in/ayush-suryawanshi", "https://www.linkedin.com/in/ayush-suryawanshi")
SITE = ("suryawanshi-ayush.github.io", "https://suryawanshi-ayush.github.io/")


class Contact(Flowable):
    """Email | LinkedIn | website, centred, each with a small drawn icon and a link.

    The icons are vector drawings, not font glyphs, so they add no stray characters to the text layer.
    """
    SIZE, GAP, ICON = 10.5, 4, 8.6

    def __init__(self, width):
        super().__init__()
        self.width, self.height = width, 14
        self.items = [("mail", EMAIL, "mailto:" + EMAIL), ("in", *LINKEDIN), ("web", *SITE)]

    def _w(self, t):
        return pdfmetrics.stringWidth(t, "LS", self.SIZE)

    def draw(self):
        c = self.canv
        sep = "  |  "
        total = sum(self.ICON + self.GAP + self._w(t) for _, t, _ in self.items) + 2 * self._w(sep)
        x0, y = (self.width - total) / 2, 3
        # Icons first (vector art), then the whole line as ONE text object, so extractors read it as a single line.
        x = x0
        for i, (kind, text, href) in enumerate(self.items):
            self._icon(c, kind, x, y - 0.6)
            c.linkURL(href, (x, y - 2, x + self.ICON + self.GAP + self._w(text), y + 9), relative=1)
            x += self.ICON + self.GAP + self._w(text) + (self._w(sep) if i < len(self.items) - 1 else 0)
        t = c.beginText(x0, y)
        t.setFont("LS", self.SIZE)
        t.setFillColor(INK)
        for i, (kind, text, href) in enumerate(self.items):
            t.moveCursor(self.ICON + self.GAP, 0)
            t.textOut(text + (sep if i < len(self.items) - 1 else ""))
            # moveCursor is relative to the start of the current line, so carry the advance forward
            t.moveCursor(self._w(text + (sep if i < len(self.items) - 1 else "")), 0)
        c.drawText(t)

    def _icon(self, c, kind, x, y):
        s = self.ICON
        c.saveState()
        c.setStrokeColor(INK)
        c.setFillColor(INK)
        c.setLineWidth(0.8)
        if kind == "mail":
            c.rect(x, y + 0.6, s, s * 0.68, stroke=1, fill=0)
            p = c.beginPath()
            p.moveTo(x, y + 0.6 + s * 0.68)
            p.lineTo(x + s / 2, y + 0.6 + s * 0.3)
            p.lineTo(x + s, y + 0.6 + s * 0.68)
            c.drawPath(p, stroke=1, fill=0)
        elif kind == "in":
            c.roundRect(x, y, s, s, 1.4, stroke=0, fill=1)
            c.setFillColor(HexColor("#ffffff"))
            c.rect(x + 1.5, y + 1.3, 1.25, 3.9, stroke=0, fill=1)
            c.circle(x + 2.12, y + 6.35, 0.75, stroke=0, fill=1)
            c.rect(x + 3.7, y + 1.3, 1.2, 3.9, stroke=0, fill=1)
            p = c.beginPath()
            p.moveTo(x + 4.9, y + 1.3)
            p.lineTo(x + 4.9, y + 3.8)
            p.curveTo(x + 4.9, y + 4.9, x + 6.4, y + 5.0, x + 6.4, y + 3.8)
            p.lineTo(x + 6.4, y + 1.3)
            p.lineTo(x + 7.5, y + 1.3)
            p.lineTo(x + 7.5, y + 4.1)
            p.curveTo(x + 7.5, y + 6.1, x + 5.0, y + 6.0, x + 4.9, y + 4.9)
            p.close()
            c.drawPath(p, stroke=0, fill=1)
        else:
            r = s / 2
            cx, cy = x + r, y + r
            c.circle(cx, cy, r, stroke=1, fill=0)
            c.ellipse(cx - r * 0.45, cy - r, cx + r * 0.45, cy + r, stroke=1, fill=0)
            c.line(cx - r, cy, cx + r, cy)
            c.line(cx, cy - r, cx, cy + r)
        c.restoreState()


class SectionHead(Flowable):
    """Spaced capitals over a full-width 0.75 pt rule, drawn as one text run so it extracts as plain words."""

    def __init__(self, title, width):
        super().__init__()
        self.title, self.width, self.height = title.upper(), width, 17

    def draw(self):
        c = self.canv
        t = c.beginText(0, 5.2)
        t.setFont("LS-B", 11.5)
        t.setCharSpace(1.05)
        t.textOut(self.title)
        c.drawText(t)
        c.setLineWidth(0.75)
        c.line(0, 0, self.width, 0)


def section(title):
    return [Spacer(1, 6), SectionHead(title, FRAME_W), Spacer(1, 4.5)]


PROBLEMS = []


def lines(par):
    par.wrap(FRAME_W, 1000)
    return len(par.blPara.lines)


def entry(title, dates, org=None, bullets=(), notes=(), gap=4.5):
    head = Paragraph(f"<b>{title}</b>&nbsp;&nbsp;|&nbsp;&nbsp;{dates}", S_TITLE)
    if lines(head) > 1:
        PROBLEMS.append(f"title wraps: {title}")
    block = [head]
    if org:
        block += [Spacer(1, 0.6), Paragraph(org, S_ORG)]
    for n in notes:
        block += [Spacer(1, 1), Paragraph(n, S_NOTE)]
    if bullets:
        block.append(Spacer(1, 1.5))
        for b in bullets:
            par = Paragraph(b, S_BUL, bulletText="•")
            if lines(par) > 2:
                PROBLEMS.append(f"bullet over two lines: {b[:60]}")
            block.append(par)
    return [KeepTogether(block), Spacer(1, gap)]


FRAME_W = letter[0] - 2 * MARGIN

SUMMARY = (
    "Chemical engineer with an M.Tech in Catalysis Technology from IIT Madras, working across catalysis, "
    "electrochemistry and process engineering. Synthesised Bi-modified Pt/C catalysts, including in the KinCat group "
    "at NTNU, prepared inks and electrodes, and tested them in three-electrode cells on an Autolab potentiostat (CV, "
    "chronoamperometry, ECSA, durability). Modelled SNCR kinetics in Python (Cantera) with Aspen HYSYS process "
    "simulation, completed a DFT course project, and at LOXIM Industries led a two-month study that proposed a "
    "lower-cost effluent treatment train. Careful about safety, evidence and the limits of results."
)


def story():
    s = [Paragraph("Ayush Suryawanshi", S_NAME), Spacer(1, 4), Contact(FRAME_W)]

    s += section("Professional Summary")
    s += [Paragraph(SUMMARY, S_BODY)]

    s += section("Education")
    s += entry("Master of Technology, Catalysis Technology — CGPA 8.51/10", "Jun 2024 – May 2026",
               "Indian Institute of Technology Madras, Chennai",
               notes=["<b>Coursework:</b> Advanced Chemical Engineering Thermodynamics, Chemical Reactor Theory, Transport "
                      "Phenomena, Experimental Methods in Catalysis, Catalyst Preparation and Characterization Lab, "
                      "Computational Methods in Catalysis."])
    s += entry("Semester Exchange, Chemical Engineering", "Aug 2025 – Dec 2025",
               "Norwegian University of Science and Technology (NTNU), Trondheim, Norway; UTFORSK mobility scholarship")
    s += entry("Bachelor of Technology, Chemical Engineering — CGPA 8.17/10", "2019 – 2023",
               "Indore Institute of Science and Technology, Indore, affiliated to RGPV Bhopal; First Division with Honours",
               notes=["<b>Coursework:</b> Material and Energy Balance, Chemical Reaction Engineering, Heat and Mass Transfer, "
                      "Fluid Particle Mechanics, Process Equipment Design I and II, Chemical Process Modeling and Simulation, "
                      "Process Safety and Hazards Management, Process Plant Economics and Management."])
    s += entry("Senior School Certificate, Class XII, CBSE — 84.2%", "2019", "Delhi Public School, Chhindwara", gap=0)

    s += section("Professional Experience")
    s += entry("Management Trainee", "Jul 2026 – Present", "LOXIM Industries Ltd., Ahmedabad", [
        "Led a two-month study on treating a high-sulphate dye effluent: built a stage-wise cost baseline and compared "
        "electrochemical, membrane and crystallisation routes.",
        "Evaluated electrocoagulation and electroflocculation as pretreatment options; ran screening, sample trials and "
        "feasibility checks with more than ten technology vendors.",
        "Proposed a treatment train that recovers the waste salt as a product (DWSIM simulation, stage-wise OPEX model), at "
        "about two-thirds lower modelled operating cost; handed over with a validation roadmap.",
        "Trained on HPLC, GC-MS, FTIR and UV-Vis; completed plant safety induction and HSE training.",
    ], gap=0)

    s += section("Research Experience")
    s += entry("M.Tech Thesis: Bi-Modified Pt/C Anode Catalysts for Formic Acid Fuel Cells", "May 2025 – May 2026",
               "IIT Madras, Chennai | Guide: Prof. Raghuram Chetty", [
        "Synthesised a Bi-modified Pt/C series from commercial Pt/C at four Bi precursor concentrations (1.25–10 mM) by "
        "aqueous adsorption, NaBH4 reduction and heat treatment at 300 °C under argon.",
        "Assembled and ran three-electrode cells (glassy carbon and carbon paper working electrodes, Pt counter, Ag/AgCl "
        "reference) on an Autolab potentiostat for CV, chronoamperometry, ECSA and mass activity.",
        "Optimised ionomer loading: cutting Nafion in the catalyst ink from 20 µL to 5 µL raised the formic acid oxidation "
        "peak current by about 2.5–2.8 times.",
        "In one-hour holds at 0.55 V vs RHE, Bi(1.25)-Pt/C retained <b>92.9%</b> of its current versus 58.5% for commercial "
        "Pt/C; with 1 mM AQSA mediator, retention fell for every catalyst (70.4% and 55.6%).",
        "Identified an activity-durability trade-off: Bi(5)-Pt/C gave the highest peak mass activity but retained only "
        "52.8%; related Bi loading to morphology and structure by FE-SEM, EDX, XRD and BET.",
    ])
    s += entry("Thesis Catalyst Synthesis, KinCat Group, NTNU", "Aug 2025 – Dec 2025",
               "Trondheim, Norway | UTFORSK mobility scholarship | Host: Prof. Edd Anders Blekkan", [
        "Prepared the thesis catalyst batches; troubleshot low recovery from filtration losses and an ignition of "
        "residual NaBH4 on the filter in a scaled-up batch.",
        "Revised the route (aqueous NaBH4, less reductant, modified filtration): the third batch gave the highest "
        "recovered mass, about 220 mg, with no ignition observed; checked morphology by SEM.",
    ], gap=0)

    s += section("Projects")
    s += entry("SNCR Retrofit for NOx Reduction in a Biomass Boiler", "Aug 2025 – Nov 2025",
               "NTNU process design project, team of four | Industry partners: Billerud Viken, Vardar Varme", [
        "Carried out the literature survey and built the Python (Cantera) models: equilibrium combustion and plug-flow "
        "SNCR kinetics, mapping NO reduction and ammonia slip against temperature and NSR.",
        "Performed the hand calculations for the design basis and contributed Aspen HYSYS process simulation.",
        "Idealised modelling predicted above 90% NO reduction; the design adopted a conservative ~60%, keeping modelled "
        "NOx within the 300 mg/Nm³ limit.",
        "The team's design covered reagent selection, equipment sizing, safety measures and CAPEX/OPEX estimates; "
        "presented the poster at Treforedlingsforum 2025, Oslo.",
    ])
    s += entry("DFT Study of the Oxygen Reduction Reaction on a Pt13 Cluster", "Jan 2025 – May 2025",
               "IIT Madras | Individual course project | Guide: Dr. Jithin John Varghese", [
        "Optimised O2, OOH*, O*, OH* and H2O on Pt13 in Gaussian 16 (UB3LYP) and confirmed minima by frequency analysis; "
        "all step energies were negative in electronic (SCF) energy, without free-energy corrections.",
    ], gap=0)

    s += section("Technical Skills")
    skills = [
        ("Electrochemical Testing", "three-electrode cells; Autolab potentiostat/galvanostat (NOVA); cyclic voltammetry; "
         "chronoamperometry; ECSA; mass activity; durability testing (current retention); Ag/AgCl to RHE conversion"),
        ("Electrocatalysts and Electrodes", "wet-chemical synthesis (aqueous adsorption, NaBH4 reduction); heat treatment "
         "under argon; catalyst-ink formulation and Nafion loading; drop-cast electrodes on glassy carbon and carbon paper"),
        ("Materials Characterisation", "FE-SEM, SEM-EDX, XRD (Scherrer size, lattice parameter), N2 physisorption (BET); "
         "XPS data analysis (coursework)"),
        ("Process Engineering", "mass and energy balances; technology screening, vendor trials and feasibility "
         "assessment; electrocoagulation and electroflocculation; CAPEX and OPEX estimation; process safety"),
        ("Modelling and Software", "Python (Cantera); Aspen HYSYS; DWSIM; CHEMCAD (B.Tech labs); Gaussian 16 and "
         "Avogadro (DFT); OriginPro; Excel"),
        ("Training and Familiarity", "HPLC, GC-MS, FTIR and UV-Vis (industrial training); LSV, EIS, chronopotentiometry "
         "and TGA (coursework and lab sessions); plant HSE and SOP training"),
        ("Languages", "English (IELTS Academic, overall band 7.0, CEFR C1, July 2026); Hindi"),
    ]
    s += [Paragraph(f"<b>{k}:</b> {v}", S_SKILL) for k, v in skills]

    s += section("Positions of Responsibility")
    s += entry("Deputy Placement and Internship Coordinator", "Aug 2024 – Jul 2025",
               "Placement and Internship Cell, IIT Madras", [
        "Handled placements and internships for the 2023–25 and 2024–26 M.Tech batches; 75% of M.Tech chemical "
        "engineers were placed.",
    ], gap=0)

    s += section("Conferences and Workshops")
    s += [Paragraph(t, S_BUL, bulletText="•") for t in [
        "Poster on SNCR technology for NOx reduction in a bio-boiler, Treforedlingsforum 2025, Oslo, November 2025.",
        "Attended EuropaCat 2025, the European Congress on Catalysis, Trondheim, Norway.",
        "GIAN course: Characterization of Heterogeneous Catalysts, IIT Madras, April–May 2025.",
        "Paper presentation, SCHEMCON 2021, MANIT and IISER Bhopal, October 2021.",
    ]]

    s += section("Awards and Scholarships")
    s += [Paragraph(t, S_BUL, bulletText="•") for t in [
        "GATE 2024, Chemical Engineering: All India Rank 864 of 13,937 candidates.",
        "UTFORSK mobility scholarship from NTNU for a research semester in Norway, August–December 2025.",
    ]]
    return s


def build():
    doc = SimpleDocTemplate(
        str(OUT), pagesize=letter, leftMargin=MARGIN - 6, rightMargin=MARGIN - 6, topMargin=22, bottomMargin=20,
        title="Ayush Suryawanshi – CV", author="Ayush Suryawanshi", subject="Curriculum vitae",
        keywords="chemical engineering, catalysis, electrochemistry, process engineering, catalyst synthesis, "
                 "electrodes, potentiostat, cyclic voltammetry, chronoamperometry, ECSA, SEM-EDX, XRD, BET, "
                 "Cantera, Aspen HYSYS, DWSIM, process design, effluent treatment",
        creator="Ayush Suryawanshi", lang="en-IN",
    )
    flow = story()
    if PROBLEMS:
        raise SystemExit("Layout problems:\n" + "\n".join(PROBLEMS))
    doc.build(flow)
    return OUT


if __name__ == "__main__":
    print(build())
