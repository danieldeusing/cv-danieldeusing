# CV Generator

Generates Daniel Deusing's CV as DOCX (+ PDF) in four languages (DE/EN/ES/PT),
each in two variants: twiceD-branded (default) and personal (`--personal`).

**`README.md` (section "For AI Assistants") is the authoritative spec** for brand
colors, typography, section order, layout values, and the JSON schema. Read it
before changing layout or content.

## Commands

```bash
npm install                       # once
./generate_all.sh                 # all 8 DOCX variants + PDF conversion
node create_cv_de.js              # single: twiceD German → TD_Daniel_Deusing_DE.docx
node create_cv_de.js --personal   # single: personal German → Daniel_Deusing_DE.docx
```

PDF conversion needs LibreOffice (`brew install --cask libreoffice` → `soffice` on PATH).

## Architecture

- **Content**: `data/cv.{de,en,es,pt}.json` — identical schema, translated content.
  Single source of truth, also consumed directly by the danieldeusing.de website.
- **Layout**: `create_cv_{de,en,es,pt}.js` — styling only, four near-identical
  scripts that map over the JSON. No content in scripts.
- **Variants**: the `personal` flag (`--personal`) gates all twiceD branding
  (header logo/brand, intro section, footer contact) and selects the
  personal-variant keys `projectsNotePersonal` and `labels.sections.profilePersonal`.

## Gotchas

- Output DOCX/PDF files are committed binaries. After any content or layout
  change, run `./generate_all.sh` and commit the regenerated files — the website
  links to the PDFs.
- The website reads `data/cv.*.json` directly: schema changes must be additive
  (new keys only; never rename or remove existing ones).
- Node prints `ExperimentalWarning: localStorage` on every run — harmless, ignore it.
