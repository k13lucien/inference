#!/usr/bin/env python3
"""
Vérification visuelle de l'engrènement des rouages du hero.

Capture le SVG des engrenages (animation figée) puis produit :
  - une vue d'ensemble
  - deux zooms sur les points de contact (grande/moyenne, moyenne/petite)
  - une planche de comparaison avant/après si un dossier "avant" existe

Usage:
  python3 scripts/verify-gears.py before   # capture la référence
  python3 scripts/verify-gears.py after    # capture + planche de comparaison
"""

import asyncio
import sys
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

URL = "http://localhost:8080"
OUT = Path("/mnt/documents/gears")
# Points de contact en coordonnées viewBox du SVG ("60 90 470 300", rendu 720x460)
VIEWBOX = (60, 90, 470, 300)
RENDER = (720, 460)
CONTACTS = [("contact-26-17", 270.4, 190.6), ("contact-17-11", 390.1, 168.0)]
ZOOM_HALF = 60  # demi-taille de la fenêtre de zoom en unités viewBox


def vb_to_px(x, y):
    sx = RENDER[0] / VIEWBOX[2]
    sy = RENDER[1] / VIEWBOX[3]
    return (x - VIEWBOX[0]) * sx, (y - VIEWBOX[1]) * sy


async def capture(label: str):
    target = OUT / label
    target.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await context.new_page()
        await page.goto(URL, wait_until="domcontentloaded")
        await page.wait_for_timeout(1500)
        # Figer les rotations pour comparer des états identiques
        await page.add_style_tag(content="*{animation-play-state:paused !important}")
        svg = await page.query_selector("svg")
        overview = target / "overview.png"
        await svg.screenshot(path=str(overview))
        await browser.close()

    img = Image.open(overview)
    scale_x = img.width / RENDER[0]
    scale_y = img.height / RENDER[1]
    for name, cx, cy in CONTACTS:
        px, py = vb_to_px(cx, cy)
        hx = ZOOM_HALF * (RENDER[0] / VIEWBOX[2]) * scale_x
        hy = ZOOM_HALF * (RENDER[1] / VIEWBOX[3]) * scale_y
        box = (
            max(0, int(px * scale_x - hx)),
            max(0, int(py * scale_y - hy)),
            min(img.width, int(px * scale_x + hx)),
            min(img.height, int(py * scale_y + hy)),
        )
        crop = img.crop(box)
        crop = crop.resize((crop.width * 3, crop.height * 3), Image.LANCZOS)
        crop.save(target / f"{name}.png")
    print(f"captures ({label}) -> {target}")


def compare():
    before, after = OUT / "before", OUT / "after"
    if not before.exists():
        print("aucune référence 'before' : planche de comparaison ignorée")
        return
    names = ["overview.png"] + [f"{n}.png" for n, _, _ in CONTACTS]
    rows = []
    for n in names:
        b, a = before / n, after / n
        if b.exists() and a.exists():
            rows.append((Image.open(b), Image.open(a)))
    if not rows:
        return
    gap = 24
    width = max(b.width + a.width + gap for b, a in rows)
    height = sum(max(b.height, a.height) for b, a in rows) + gap * (len(rows) - 1)
    sheet = Image.new("RGB", (width, height), (250, 250, 247))
    y = 0
    for b, a in rows:
        sheet.paste(b, (0, y))
        sheet.paste(a, (b.width + gap, y))
        y += max(b.height, a.height) + gap
    out = OUT / "comparison.png"
    sheet.save(out)
    print(f"planche avant/après -> {out}")


if __name__ == "__main__":
    label = sys.argv[1] if len(sys.argv) > 1 else "after"
    asyncio.run(capture(label))
    if label == "after":
        compare()
