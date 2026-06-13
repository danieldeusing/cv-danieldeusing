# CV Generator - twiceD Technology GmbH

This repository generates professional CV documents in German, English, Spanish, and Portuguese for twiceD Technology GmbH.

## Quick Start

```bash
npm install
./generate_all.sh     # All variants (twiceD + personal, DE/EN/ES/PT) incl. PDF conversion
```

Or run individual variants:

```bash
node create_cv_de.js  # German CV (twiceD-branded)
node create_cv_en.js  # English CV (twiceD-branded)
node create_cv_es.js  # Spanish CV (twiceD-branded)
node create_cv_pt.js  # Portuguese CV (twiceD-branded)

# Personal variant (no twiceD branding): pass --personal to any script
node create_cv_de.js --personal
node create_cv_en.js --personal
node create_cv_es.js --personal
node create_cv_pt.js --personal
```

## Variants

Each script generates one of two variants from the same JSON data:

- **twiceD (default):** company logo + brand name in the header, twiceD intro
  section ("twiceD Technology GmbH" + overview note), company contact in the
  footer. Output: `TD_Daniel_Deusing_<LANG>.docx`.
- **personal (`--personal`):** identical CV without the company framing — the
  twiceD intro section is skipped and logo/brand name/company contact are
  removed from header and footer. twiceD Technology GmbH still appears where it
  legitimately belongs (employment history, project clients). Output:
  `Daniel_Deusing_<LANG>.docx`.

**All CV content lives in JSON** (single source of truth):
- `data/cv.de.json` (German content)
- `data/cv.en.json` (English content)
- `data/cv.es.json` (Spanish content)
- `data/cv.pt.json` (Portuguese content)

All files share the identical schema and differ only in language. To change CV content, edit the JSON and regenerate — the generator scripts contain layout/styling only. The same JSON files are also consumed by the website.

**Output files:**
- `TD_Daniel_Deusing_DE.docx` (German, twiceD) / `Daniel_Deusing_DE.docx` (German, personal)
- `TD_Daniel_Deusing_EN.docx` (English, twiceD) / `Daniel_Deusing_EN.docx` (English, personal)
- `TD_Daniel_Deusing_ES.docx` (Spanish, twiceD) / `Daniel_Deusing_ES.docx` (Spanish, personal)
- `TD_Daniel_Deusing_PT.docx` (Portuguese, twiceD) / `Daniel_Deusing_PT.docx` (Portuguese, personal)

## PDF Conversion

The scripts produce DOCX only. The website downloads PDFs, so the DOCX files
must be converted (the personal buttons on the website only appear once
`Daniel_Deusing_<LANG>.pdf` exist here). Either export each DOCX manually from
Word (File → Save As → PDF), or use LibreOffice headless:

```bash
brew install --cask libreoffice
soffice --headless --convert-to pdf Daniel_Deusing_EN.docx
soffice --headless --convert-to pdf Daniel_Deusing_DE.docx
soffice --headless --convert-to pdf Daniel_Deusing_ES.docx
soffice --headless --convert-to pdf Daniel_Deusing_PT.docx
```

---

## For AI Assistants (Claude, ChatGPT, Copilot, Gemini)

### Brand Colors

Always use these exact color values:

| Name       | Hex       | RGB            | Usage                                    |
|------------|-----------|----------------|------------------------------------------|
| `primary`  | `#1E3A5F` | `30, 58, 95`   | Headers, names, links, main brand color  |
| `accent`   | `#D0520F` | `208, 82, 15`  | Job titles, companies, institutions      |
| `dark`     | `#2D4A6F` | `45, 74, 111`  | Project titles                           |
| `gray`     | `#666666` | `102, 102, 102`| Secondary text, descriptions             |
| `lightGray`| `#F5F5F5` | `245, 245, 245`| Backgrounds (rarely used)                |

### Typography

- **Font:** Nunito (all text)
- **Name:** 56pt, bold, primary color
- **Title:** 28pt, accent color
- **Section headers:** 26pt, bold, primary color, ALL CAPS
- **Project titles:** 24pt, bold, dark color
- **Body text:** 22pt (11pt equivalent), color #333333
- **Footer:** 18pt, gray color

### File Structure

```
├── data/
│   ├── cv.de.json       # German CV content (single source of truth)
│   ├── cv.en.json       # English CV content (identical schema)
│   ├── cv.es.json       # Spanish CV content (identical schema)
│   └── cv.pt.json       # Portuguese CV content (identical schema)
├── create_cv_de.js      # German CV generator (layout only, reads data/cv.de.json)
├── create_cv_en.js      # English CV generator (layout only, reads data/cv.en.json)
├── create_cv_es.js      # Spanish CV generator (layout only, reads data/cv.es.json)
├── create_cv_pt.js      # Portuguese CV generator (layout only, reads data/cv.pt.json)
├── logo/                # Brand assets
│   ├── blue_D_1E3A5F.png   # Main logo (primary color)
│   ├── white_D.png         # White logo variant
│   ├── github_icon.png     # Social icons
│   ├── linkedin_icon.png
│   └── xing_icon.png
├── package.json         # Dependencies (docx)
└── README.md            # This file
```

### CV Structure

All CVs follow this exact section order:

1. **Header** - Name, title, location, social links, logo
2. **twiceD Technology GmbH** - Company introduction (2 paragraphs)
3. **Mitarbeiterprofil / Employee Profile** - Personal summary
4. **Technische Fähigkeiten / Technical Skills** - Skills table
5. **Ausgewählte Projekte / Selected Projects** - Project details with bullets
6. **Anstellungen / Employment** - Work history table
7. **Ausbildung / Education** - Education table
8. **Zertifikate & Publikationen / Certificates & Publications** - Table format
9. **Auszeichnungen / Awards** - Awards table
10. **Sprachen / Languages** - Language proficiency table

### Document Layout

- **Page margins:** 720 DXA (0.5 inch) all sides
- **Tables:** No borders (`BorderStyle.NONE`)
- **Spacing:**
  - Section headers: `before: 400, after: 200`
  - Project titles: `before: 350, after: 60`
  - Normal paragraphs: `after: 60`
- **Bullet points:** `indent: { left: 360, hanging: 200 }`

### Content vs. Layout

All content (texts, projects, tables, links) lives in the `data/cv.*.json` files. The generator scripts only contain layout/styling and map over the JSON data.

**Adding a new project** — append to the `projects` array in all JSON files:
```json
{
  "title": "Project Name – Short Description",
  "client": "Client",
  "role": "Role",
  "from": "YYYY",
  "to": "YYYY or heute/Present (null for single year)",
  "description": "One-line summary.",
  "bullets": ["Bullet point description"],
  "technologies": ["Tech1", "Tech2", "Tech3"]
}
```

**Employment/Education** — append to the `employment` / `education` arrays following the existing entries.

### Important Rules

1. **Keep all CVs in sync** - Changes to `data/cv.de.json` must be reflected in `data/cv.en.json`, `data/cv.es.json`, and `data/cv.pt.json` (identical schema, translated content)
2. **Use BRAND constants** - Never hardcode color values
3. **Maintain table format** - Employment, Education, Certificates, Awards all use tables
4. **No borders on tables** - Use `noBorders` constant
5. **Accent color for institutions** - Companies and schools use `BRAND.accent`
6. **Gray for descriptions** - Secondary text uses `BRAND.gray`
7. **Regenerate after changes** - Run `node create_cv_de.js && node create_cv_en.js && node create_cv_es.js && node create_cv_pt.js`

### Dependencies

```json
{
  "dependencies": {
    "docx": "^9.x"
  }
}
```

### Common Tasks

**Update project description:**
1. Find the project in each `data/cv.*.json` file
2. Modify the JSON fields (`description`, `bullets`, `technologies`, ...)
3. Regenerate all CVs

**Add new skill category:**
1. Add a new `{ "category": "...", "items": ["..."] }` entry to `skills` in all JSON files

**Update employment:**
1. Add/modify an entry in the `employment` array in all JSON files
2. Regenerate all CVs

---

## Contact

- **Company:** twiceD Technology GmbH
- **Email:** info@twiced.de
- **Phone:** +49-151-16545891
