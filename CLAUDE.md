# Talia & Yoni Wedding Website

A single-page bilingual wedding invitation website for Talia & Yoni's wedding on Tuesday 25 August 2026.

## Language

Controlled by query param `?lang=fr` (default) or `?lang=he`. The full page renders in the selected language — French or Hebrew.

## Structure

Two visual sections, each with a full-width watercolor background image:

1. **Details section** (`background1.png`) — invitation text: families, couple names, date, venue, WAZE button, reception note, memorial dedication.
2. **Form section** (`background-blank.png` + `background2.png` stacked) — RSVP form: name, attendance, guest count, bus interest, message, submit button, Kedar logo.

Background 1 overlaps the form section via a negative `margin-bottom` with a mask gradient fade at the bottom edge.

## Colors & Fonts

- All text: `#8f5b3e`
- Submit button: `#f69b47` (border + text, transparent bg)
- WAZE button: `#e7cfba` background, white text
- Body background: `#f0e8dc`

### French page fonts
- Base: Montserrat Regular
- Bold (only): "AVANT LE COUCHER DU SOLEIL" and the date block
- Couple name "Talia & Yoni": Slight
- Hebrew text within French page (מרים, אברהם יוסף): Hadasim CLM Bold

### Hebrew page fonts
- Base: Hadasim CLM Regular
- Bold: same elements as French equivalents
- Couple name: Slight

## Responsive

All font sizes and margins use `clamp(min, vw, max)` to scale proportionally with viewport width (designed for 560px max-width). All `padding` percentages on overlays are relative to container width so they scale identically on phone and desktop.

## Parallax

- Content overlays drift at factor `−42` (text moves slower than background).
- Form section background images have additional parallax: `background-blank.png` at factor `18`, `background2.png` at factor `40`.
- Uses live `getBoundingClientRect()` per frame — no stale cache.
- Uses `visualViewport.height` for accurate height on iOS Safari.

## WAZE link

`https://waze.com/ul?ll=31.736648,35.319092&navigate=yes` — opens navigation directly.
