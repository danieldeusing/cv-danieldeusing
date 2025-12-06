# CV Generator - Daniel Deusing / twiceD Technology GmbH

This repository generates professional CV documents in German and English for twiceD Technology GmbH.

## Quick Start

```bash
npm install
node create_cv_de.js  # German CV
node create_cv_en.js  # English CV
```

**Output files:**
- `TD_Daniel_Deusing_DE.docx` (German)
- `TD_Daniel_Deusing_EN.docx` (English)

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
├── create_cv_de.js      # German CV generator
├── create_cv_en.js      # English CV generator
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

Both CVs follow this exact section order:

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

### Code Patterns

**Adding a new project:**
```javascript
new Paragraph({ style: "ProjectTitle", children: [new TextRun("Project Name – Short Description")] }),
new Paragraph({ style: "CompanyRole", children: [new TextRun("Client | Role | MM/YYYY – MM/YYYY")] }),
new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [
  new TextRun({ text: "Bullet point description", font: "Nunito" })
]}),
new Paragraph({ children: [
  new TextRun({ text: "Technologien: ", bold: true, font: "Nunito", color: BRAND.gray }),
  new TextRun({ text: "Tech1, Tech2, Tech3", font: "Nunito", color: BRAND.gray })
]}),
```

**Table row pattern (Employment/Education):**
```javascript
new TableRow({ children: [
  new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
    new Paragraph({ children: [new TextRun({ text: "MM/YYYY –", color: BRAND.gray, size: 20 })] }),
    new Paragraph({ children: [new TextRun({ text: "MM/YYYY", color: BRAND.gray, size: 20 })] })
  ]}),
  new TableCell({ borders: noBorders, children: [
    new Paragraph({ children: [new TextRun({ text: "Company/Institution", color: BRAND.accent, size: 22, bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "Role/Degree", color: BRAND.gray, size: 20 })] })
  ]})
]})
```

### Important Rules

1. **Keep both CVs in sync** - Changes to DE must be reflected in EN
2. **Use BRAND constants** - Never hardcode color values
3. **Maintain table format** - Employment, Education, Certificates, Awards all use tables
4. **No borders on tables** - Use `noBorders` constant
5. **Accent color for institutions** - Companies and schools use `BRAND.accent`
6. **Gray for descriptions** - Secondary text uses `BRAND.gray`
7. **Regenerate after changes** - Run `node create_cv_de.js && node create_cv_en.js`

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
1. Find project in `create_cv_de.js` and `create_cv_en.js`
2. Modify the `TextRun` content
3. Regenerate both CVs

**Add new skill category:**
1. Add new `TableRow` in Technical Skills section
2. Follow existing pattern with category name (bold) and skills

**Update employment:**
1. Find Employment section table
2. Add/modify `TableRow` following existing pattern
3. Use accent color for company name

---

## Contact

- **Company:** twiceD Technology GmbH
- **Email:** info@twiced.de
- **Phone:** +49-151-16545891
