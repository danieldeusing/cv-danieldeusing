---
paths:
  - create_cv.js
---

# Generator Script (create_cv.js)

`create_cv.js <lang> [--personal]` renders one language at a time and contains
layout/styling only. Content (texts, links, table data) belongs in
`data/cv.<lang>.json`, never in the script. `./generate_all.sh` runs it across
all four languages × both variants and converts to PDF.

## Variants

The script builds two variants: default (twiceD, `TD_Daniel_Deusing_<LANG>.docx`)
and `--personal` (`Daniel_Deusing_<LANG>.docx`). Anything twiceD-branded — header
logo, brand name, company intro section, footer contact — must be gated on the
`personal` flag, as must the `*Personal` JSON keys
(`projectsNotePersonal`, `labels.sections.profilePersonal`).

## Brand colors

Use the `BRAND` constants; never hardcode hex values.

| Name        | Hex       | Usage                                   |
|-------------|-----------|-----------------------------------------|
| `primary`   | `1E3A5F`  | Headers, name, links, main brand color  |
| `accent`    | `D0520F`  | Job titles, companies, institutions     |
| `dark`      | `2D4A6F`  | Project titles                          |
| `gray`      | `666666`  | Secondary text, descriptions, footer    |
| `lightGray` | `F5F5F5`  | Alternating skill-row backgrounds       |

Body text color is `333333` (the `Normal` style).

## Typography

Font is **Nunito** everywhere. Sizes are in half-points (docx convention), so
`size: 22` ≈ 11pt.

| Element         | Size | Style                          |
|-----------------|------|--------------------------------|
| Name            | 56   | bold, `primary`                |
| Title           | 28   | `accent`                       |
| Section header  | 26   | bold, `primary`, ALL CAPS      |
| Project title   | 24   | bold, `dark`                   |
| Company/role    | 22   | `accent`                       |
| Body            | 22   | color `333333`                 |
| Footer          | 18   | `gray`                         |

## Layout values

- Page margins: `720` DXA (0.5") on all sides.
- All tables borderless — use the `noBorders` constant.
- Paragraph spacing (DXA): section header `before: 400, after: 150`; project
  title `before: 340, after: 60`; normal paragraphs `after: 60`.
- Bullet points: `indent: { left: 360, hanging: 200 }`.

## Section order

Header → twiceD intro (twiceD variant only) → Profile → Key Strengths →
Technical Skills → Selected Projects → Employment → Education →
Certificates & Publications → Awards → Languages.

## Verifying changes

Run `./generate_all.sh`, then inspect output, e.g.
`pdftotext Daniel_Deusing_DE.pdf - | grep -i <text>`.
