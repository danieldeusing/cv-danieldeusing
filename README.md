# CV Generator — twiceD Technology GmbH

Generates Daniel Deusing's CV as DOCX (and PDF) in four languages — German,
English, Spanish, Portuguese — each in a twiceD-branded and a personal variant.

## Quick Start

```bash
npm install
./generate_all.sh   # all 8 DOCX variants + PDF conversion
```

Build a single variant:

```bash
node create_cv.js de              # twiceD German   → TD_Daniel_Deusing_DE.docx
node create_cv.js de --personal   # personal German → Daniel_Deusing_DE.docx
```

(swap `de` for `en`, `es`, or `pt`)

## How it works

- **Content** lives in `data/cv.{de,en,es,pt}.json` — one identical schema per
  language and the single source of truth (also consumed by the website).
- **Layout** lives in `create_cv.js` — styling only.

To change the CV, edit the JSON and regenerate. To change the look, edit the
generator scripts.

## Variants

- **twiceD** (default): company logo, brand name, intro section, and contact
  footer. Output `TD_Daniel_Deusing_<LANG>.docx`.
- **personal** (`--personal`): the same CV without company framing.
  Output `Daniel_Deusing_<LANG>.docx`.

## PDF conversion

`generate_all.sh` converts via LibreOffice headless, so `soffice` must be on
your `PATH` (`brew install --cask libreoffice`). To convert a single file
manually: `soffice --headless --convert-to pdf <file>.docx`.

## License

The generator code is released under the [MIT License](LICENSE). The CV content
under `data/` and the twiceD branding and logos are © twiceD Technology GmbH and
are not covered by that license.

## Contact

twiceD Technology GmbH · info@twiced.de · +49-151-16545891
