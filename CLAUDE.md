# CV Generator

Generates Daniel Deusing's CV as DOCX (+ PDF) in four languages (DE/EN/ES/PT),
each in two variants: twiceD-branded (default) and personal (`--personal`).

## Commands

```bash
npm install                       # once
./generate_all.sh                 # all 8 DOCX variants + PDF conversion
node create_cv.js de              # single: twiceD German → TD_Daniel_Deusing_DE.docx
node create_cv.js de --personal   # single: personal German → Daniel_Deusing_DE.docx
```

PDF conversion needs LibreOffice (`brew install --cask libreoffice` → `soffice` on PATH).

## Architecture

- **Content**: `data/cv.{de,en,es,pt}.json` — identical schema, translated
  content. Single source of truth, also consumed by the danieldeusing.de website.
  Schema and editing rules: `.claude/rules/content.md`.
- **Layout**: `create_cv.js <lang> [--personal]` — one parametrized script,
  styling only, that maps over the JSON. Design system (colors, typography,
  spacing, section order): `.claude/rules/generators.md`.
- **Variants**: the `personal` flag gates all twiceD branding (header logo/brand,
  intro section, footer contact) and selects the `*Personal` JSON keys.

## Gotchas

- Output DOCX/PDF files are committed binaries. After any content or layout
  change, run `./generate_all.sh` and commit the regenerated files — the website
  links to the PDFs.
- The website reads `data/cv.*.json` directly: schema changes must be additive
  (new keys only; never rename or remove existing ones).
- Node prints `ExperimentalWarning: localStorage` on every run — harmless, ignore it.
