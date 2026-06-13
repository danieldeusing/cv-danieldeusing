---
paths:
  - create_cv_*.js
---

# Generator Scripts (create_cv_*.js)

- The four `create_cv_<lang>.js` scripts are intentionally near-identical and
  contain layout/styling only. Apply any layout change to all four.
- Content (texts, links, table data) belongs in `data/cv.<lang>.json`, never in
  the scripts.
- Colors come from the `BRAND` constants; never hardcode hex values. Exact
  values, typography, and spacing are specified in `README.md`
  ("For AI Assistants").
- All tables use the `noBorders` constant.
- Each script builds two variants: default (twiceD, `TD_Daniel_Deusing_<LANG>.docx`)
  and `--personal` (`Daniel_Deusing_<LANG>.docx`). Anything twiceD-branded —
  logo, brand name, company intro, footer contact — must be gated on the
  `personal` flag, as must the `*Personal` JSON keys.
- Verify changes by running `./generate_all.sh` and checking the output
  (e.g. `pdftotext <file>.pdf - | grep ...`).
