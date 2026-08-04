from pathlib import Path

from reportlab.lib.colors import HexColor, black, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "thirty3-creative-corner.pdf"
PAGE_W, PAGE_H = letter

INK = HexColor("#17191B")
YELLOW = HexColor("#F4D40A")
BLUE = HexColor("#2F5BEA")
CORAL = HexColor("#FF705F")
MINT = HexColor("#8ED7AE")
PAPER = HexColor("#F4F5F3")
LIGHT = HexColor("#E7E8E5")
MUTED = HexColor("#666A6D")

FONT_REGULAR = "DejaVuSans"
FONT_BOLD = "DejaVuSans-Bold"
pdfmetrics.registerFont(TTFont(FONT_REGULAR, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont(FONT_BOLD, "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


def rounded_box(pdf, x, y, w, h, fill=white, stroke=INK, radius=12, width=1.5):
    pdf.setLineWidth(width)
    pdf.setStrokeColor(stroke)
    pdf.setFillColor(fill)
    pdf.roundRect(x, y, w, h, radius, stroke=1, fill=1)


def label(pdf, text, x, y, color=INK, size=8):
    pdf.setFillColor(color)
    pdf.setFont(FONT_BOLD, size)
    pdf.drawString(x, y, text.upper())


def fit_title(pdf, text, x, y, max_width, size=30, color=INK):
    current = size
    while pdf.stringWidth(text, FONT_BOLD, current) > max_width and current > 15:
        current -= 1
    pdf.setFillColor(color)
    pdf.setFont(FONT_BOLD, current)
    pdf.drawString(x, y, text)


def line_field(pdf, prompt, x, y, width):
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawString(x, y + 4, prompt)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1)
    pdf.line(x + 68, y, x + width, y)


def spark(pdf, cx, cy, radius=22, fill=YELLOW):
    points = []
    for i in range(16):
        import math

        angle = math.radians(-90 + i * 22.5)
        r = radius if i % 2 == 0 else radius * 0.48
        points.extend([cx + math.cos(angle) * r, cy + math.sin(angle) * r])
    path = pdf.beginPath()
    path.moveTo(points[0], points[1])
    for i in range(2, len(points), 2):
        path.lineTo(points[i], points[i + 1])
    path.close()
    pdf.setFillColor(fill)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1.5)
    pdf.drawPath(path, stroke=1, fill=1)
    pdf.setFillColor(INK)
    pdf.circle(cx - 7, cy + 2, 1.5, fill=1, stroke=0)
    pdf.circle(cx + 7, cy + 2, 1.5, fill=1, stroke=0)
    pdf.setLineWidth(1.4)
    pdf.arc(cx - 8, cy - 10, cx + 8, cy + 2, 205, 130)


def footer(pdf, page_number):
    pdf.setStrokeColor(LIGHT)
    pdf.line(36, 30, PAGE_W - 36, 30)
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_BOLD, 7)
    pdf.drawString(36, 18, "THIRTY3 CREATIVE CORNER")
    pdf.drawCentredString(PAGE_W / 2, 18, "MIGUELTHIRTY3.COM")
    pdf.drawRightString(PAGE_W - 36, 18, f"PAGE {page_number} OF 2")


def flyer_page(pdf):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(YELLOW)
    pdf.rect(0, PAGE_H - 116, PAGE_W, 116, fill=1, stroke=0)
    spark(pdf, PAGE_W - 64, PAGE_H - 55, 28, CORAL)

    label(pdf, "Thirty3 Creative Corner", 36, PAGE_H - 34)
    fit_title(pdf, "DESIGN YOUR OWN FLYER", 36, PAGE_H - 72, 470, 28)
    pdf.setFillColor(INK)
    pdf.setFont(FONT_REGULAR, 9)
    pdf.drawString(36, PAGE_H - 92, "Make an event impossible to miss. Big words, clear details, and your own style.")

    rounded_box(pdf, 36, 584, 540, 70, white)
    label(pdf, "1. Start with the important stuff", 52, 636)
    line_field(pdf, "Event name", 52, 615, 245)
    line_field(pdf, "Date + time", 310, 615, 250)
    line_field(pdf, "Place", 52, 594, 508)

    rounded_box(pdf, 36, 220, 360, 348, white)
    label(pdf, "2. Design the flyer", 52, 546)
    pdf.setFillColor(LIGHT)
    pdf.setFont(FONT_BOLD, 24)
    pdf.drawCentredString(216, 504, "BIG HEADLINE")
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawCentredString(216, 487, "What should people notice first?")
    pdf.setDash(5, 4)
    pdf.setStrokeColor(MUTED)
    pdf.roundRect(58, 306, 316, 156, 14, stroke=1, fill=0)
    pdf.setDash()
    pdf.setFillColor(MUTED)
    pdf.drawCentredString(216, 374, "DRAW THE STAR OF THE SHOW")
    pdf.drawCentredString(216, 358, "Person, place, food, mascot, trophy, or big idea")
    pdf.setStrokeColor(LIGHT)
    pdf.line(68, 278, 364, 278)
    pdf.line(68, 252, 364, 252)
    pdf.setFillColor(MUTED)
    pdf.drawString(68, 286, "Add the details people need")

    rounded_box(pdf, 410, 392, 166, 176, white)
    label(pdf, "3. Pick 3 colors", 426, 546)
    for index, color in enumerate([YELLOW, BLUE, CORAL]):
        cy = 510 - index * 46
        pdf.setFillColor(color)
        pdf.setStrokeColor(INK)
        pdf.circle(446, cy, 13, fill=1, stroke=1)
        pdf.setFillColor(MUTED)
        pdf.setFont(FONT_REGULAR, 8)
        pdf.drawString(468, cy - 3, "My color: __________")

    rounded_box(pdf, 410, 220, 166, 156, white)
    label(pdf, "4. Who is it for?", 426, 354)
    choices = ["Kids", "Families", "Teachers", "Neighbors", "Everyone"]
    for index, choice in enumerate(choices):
        y = 326 - index * 23
        pdf.setFillColor(white)
        pdf.setStrokeColor(INK)
        pdf.rect(426, y - 2, 10, 10, fill=1, stroke=1)
        pdf.setFillColor(INK)
        pdf.setFont(FONT_REGULAR, 8)
        pdf.drawString(444, y, choice)

    rounded_box(pdf, 36, 52, 540, 148, white)
    label(pdf, "5. The five-second test", 52, 178)
    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 12)
    pdf.drawString(52, 151, "Show your flyer to someone for five seconds, then hide it.")
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 9)
    questions = [
        "What is happening? _________________________________________________",
        "When and where is it? ______________________________________________",
        "What should someone do next? _______________________________________",
    ]
    for index, question in enumerate(questions):
        pdf.drawString(52, 126 - index * 24, question)
    footer(pdf, 1)
    pdf.showPage()


def logo_page(pdf):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(BLUE)
    pdf.rect(0, PAGE_H - 126, PAGE_W, 126, fill=1, stroke=0)
    spark(pdf, PAGE_W - 64, PAGE_H - 60, 28, YELLOW)

    label(pdf, "Thirty3 Creative Corner", 36, PAGE_H - 34, white)
    fit_title(pdf, "BUILD A LOGO FOR YOUR BIG IDEA", 36, PAGE_H - 74, 470, 26, white)
    pdf.setFillColor(white)
    pdf.setFont(FONT_REGULAR, 9)
    pdf.drawString(36, PAGE_H - 96, "A club, team, classroom, business, invention, or idea can all have a mark.")

    rounded_box(pdf, 36, 574, 540, 74, white)
    label(pdf, "1. Name the idea", 52, 627)
    line_field(pdf, "Name", 52, 604, 508)
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawString(52, 585, "What does it do? ____________________________________________________________")

    rounded_box(pdf, 36, 474, 540, 84, white)
    label(pdf, "2. Choose 3 personality words", 52, 536)
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawString(52, 516, "Examples: bold, friendly, fast, smart, playful, brave, calm, curious")
    for index in range(3):
        x = 52 + index * 172
        pdf.setStrokeColor(INK)
        pdf.line(x, 492, x + 142, 492)
        pdf.setFillColor(MUTED)
        pdf.drawCentredString(x + 71, 480, f"WORD {index + 1}")

    label(pdf, "3. Sketch 3 tiny ideas", 36, 448)
    for index in range(3):
        x = 36 + index * 184
        rounded_box(pdf, x, 306, 172, 128, white)
        pdf.setFillColor(MUTED)
        pdf.setFont(FONT_REGULAR, 7)
        pdf.drawCentredString(x + 86, 316, f"IDEA {index + 1}")

    rounded_box(pdf, 36, 88, 360, 198, white)
    label(pdf, "4. Build the final logo", 52, 264)
    pdf.setDash(5, 4)
    pdf.setStrokeColor(MUTED)
    pdf.roundRect(58, 118, 316, 122, 14, stroke=1, fill=0)
    pdf.setDash()
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawCentredString(216, 173, "DRAW YOUR FAVORITE VERSION BIGGER")
    pdf.drawCentredString(216, 157, "Try it with and without the name")

    rounded_box(pdf, 410, 88, 166, 198, white)
    label(pdf, "5. Try it small", 426, 264)
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawString(426, 246, "Can you still recognize it?")
    sizes = [46, 32, 20]
    y_values = [202, 152, 112]
    for radius, cy in zip(sizes, y_values):
        pdf.setFillColor(white)
        pdf.setStrokeColor(INK)
        pdf.circle(458, cy, radius / 2, fill=1, stroke=1)
        pdf.setFillColor(MUTED)
        pdf.setFont(FONT_REGULAR, 7)
        pdf.drawString(490, cy - 3, "Yes / Not yet")

    pdf.setFillColor(CORAL)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1.5)
    pdf.roundRect(36, 44, 540, 28, 10, fill=1, stroke=1)
    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 9)
    pdf.drawCentredString(PAGE_W / 2, 54, "GREAT LOGOS ARE CLEAR, MEMORABLE, AND FULL OF PERSONALITY.")
    footer(pdf, 2)
    pdf.save()


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("Thirty3 Creative Corner - Flyer and Logo Activity")
    pdf.setAuthor("Miguel De Jesus, Thirty3 Digital Designs")
    flyer_page(pdf)
    logo_page(pdf)
    print(OUTPUT)


if __name__ == "__main__":
    main()
