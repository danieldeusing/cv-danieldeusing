const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, BorderStyle, WidthType,
        TabStopType, ShadingType, VerticalAlign, PageNumber, PageBreak, ImageRun, ExternalHyperlink } = require('docx');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'cv.en.json'), 'utf8'));

// --personal: no twiceD branding/intro, output Daniel_Deusing_*.docx
const personal = process.argv.includes('--personal');

// twiceD Brand Colors
const BRAND = {
  primary: "1E3A5F",
  accent: "D0520F",
  dark: "2D4A6F",
  gray: "666666",
  lightGray: "F5F5F5"
};

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const formatPeriod = (entry) => entry.to ? `${entry.from} – ${entry.to}` : entry.from;

const socialLinks = data.person.socials.flatMap((social, index) => [
  ...(index > 0 ? [new TextRun({ text: "  |  ", color: BRAND.gray, size: 18, font: "Nunito" })] : []),
  new ImageRun({ data: fs.readFileSync(path.join(__dirname, 'logo', social.icon)), transformation: { width: 9, height: 9 }, type: 'png' }),
  new TextRun({ text: " ", size: 18 }),
  new ExternalHyperlink({ link: social.url, children: [
    new TextRun({ text: social.network, color: BRAND.primary, size: 18, font: "Nunito" })
  ]})
]);

const skillsRows = data.skills.map((skill, index) => {
  const shading = index % 2 === 1 ? { fill: BRAND.lightGray, type: ShadingType.CLEAR } : undefined;
  return new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, shading, children: [
      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: skill.category, bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
    ]}),
    new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, shading, children: [
      new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: skill.items.join(", "), font: "Nunito", size: 20 })] })
    ]})
  ]});
});

const projectBlocks = data.projects.flatMap(project => [
  new Paragraph({ style: "ProjectTitle", children: [new TextRun(project.title)] }),
  new Paragraph({ style: "CompanyRole", children: [new TextRun(`${project.client} | ${project.role} | ${formatPeriod(project)}`)] }),
  new Paragraph({ children: [new TextRun({ text: project.description, font: "Nunito", size: 20 })] }),
  ...project.bullets.map(bullet =>
    new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: bullet, font: "Nunito", size: 20 })] })
  ),
  new Paragraph({ spacing: { after: 40 }, children: [
    new TextRun({ text: data.labels.techPrefix, bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
    new TextRun({ text: project.technologies.join(", "), color: BRAND.gray, font: "Nunito", size: 18 })
  ]})
]);

const employmentRows = data.employment.map(job =>
  new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: formatPeriod(job), bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
    ]}),
    new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: job.role, bold: true, font: "Nunito" })] }),
      new Paragraph({ children: [new TextRun({ text: job.company, color: BRAND.accent, font: "Nunito", size: 20 })] })
    ]})
  ]})
);

const educationRows = data.education.map(entry =>
  new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: entry.year, bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
    ]}),
    new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: entry.degree, bold: true, font: "Nunito" })] }),
      new Paragraph({ children: [new TextRun({ text: entry.institution, color: BRAND.accent, font: "Nunito", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: entry.thesis, italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
    ]})
  ]})
);

const certificateRows = data.certificates.map(certificate =>
  new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: certificate.year, bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
    ]}),
    new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: certificate.title, bold: true, font: "Nunito" })] }),
      ...(certificate.details ? [new Paragraph({ children: [new TextRun({ text: certificate.details, color: BRAND.gray, font: "Nunito", size: 20 })] })] : [])
    ]})
  ]})
);

const awardRows = data.awards.map(award =>
  new TableRow({ children: [
    new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: award.year, bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
    ]}),
    new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
      new Paragraph({ children: [new TextRun({ text: award.title, bold: true, font: "Nunito" })] }),
      new Paragraph({ children: [new TextRun({ text: award.details, color: BRAND.gray, font: "Nunito", size: 20 })] })
    ]})
  ]})
);

const languageCells = data.languages.map(entry =>
  new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
    new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: entry.language, bold: true, font: "Nunito" })] }),
    new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: entry.level, color: entry.muted ? BRAND.gray : BRAND.accent, font: "Nunito", size: 20 })] })
  ]})
);

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Nunito", size: 22 } } },
    paragraphStyles: [
      { id: "Name", name: "Name", basedOn: "Normal",
        run: { size: 56, bold: true, color: BRAND.primary, font: "Nunito" },
        paragraph: { spacing: { after: 60 } } },
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 28, color: BRAND.accent, font: "Nunito" },
        paragraph: { spacing: { after: 200 } } },
      { id: "SectionHeader", name: "SectionHeader", basedOn: "Normal",
        run: { size: 26, bold: true, color: BRAND.primary, font: "Nunito", allCaps: true },
        paragraph: { spacing: { before: 400, after: 150 } } },
      { id: "ProjectTitle", name: "ProjectTitle", basedOn: "Normal",
        run: { size: 24, bold: true, color: BRAND.dark, font: "Nunito" },
        paragraph: { spacing: { before: 340, after: 60 } } },
      { id: "CompanyRole", name: "CompanyRole", basedOn: "Normal",
        run: { size: 22, color: BRAND.accent, font: "Nunito" },
        paragraph: { spacing: { after: 60 } } },
      { id: "Normal", name: "Normal",
        run: { size: 22, color: "333333", font: "Nunito" },
        paragraph: { spacing: { after: 60 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "skills-bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } } }] },
      { reference: "project-bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
    },
    headers: {
      default: new Header({ children: [] })
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: data.labels.footerPagePrefix, color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ children: [PageNumber.CURRENT], color: BRAND.gray, size: 18, font: "Nunito" }),
            ...(personal ? [] : [new TextRun({ text: ` | ${data.company.email} | ${data.company.phone}`, color: BRAND.gray, size: 18, font: "Nunito" })])
          ]
        })
      ]})
    },
    children: [
      // === HEADER SECTION ===
      new Table({
        columnWidths: [6500, 3500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 6500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({ style: "Name", children: [new TextRun(data.person.name)] }),
                  new Paragraph({ style: "Title", children: [new TextRun(data.person.title)] }),
                  new Paragraph({ children: [
                    new TextRun({ text: data.person.location, color: BRAND.gray, size: 20, font: "Nunito" })
                  ]}),
                  new Paragraph({ spacing: { before: 60 }, children: socialLinks })
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 3500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.TOP,
                children: personal ? [new Paragraph({ children: [] })] : [
                  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 160 }, children: [
                    new ImageRun({
                      data: fs.readFileSync(path.join(__dirname, 'logo', 'blue_D_1E3A5F.png')),
                      transformation: { width: 46, height: 46 },
                      type: 'png'
                    })
                  ]}),
                  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 40 }, children: [
                    new TextRun({ text: data.company.brandName, bold: true, color: BRAND.primary, size: 20, font: "Nunito" }),
                    new TextRun({ text: data.company.brandSuffix, color: BRAND.gray, size: 20, font: "Nunito" })
                  ]})
                ]
              })
            ]
          })
        ]
      }),

      // Divider
      new Paragraph({
        spacing: { before: 200, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BRAND.accent } },
        children: []
      }),

      // === TWICED (omitted in personal variant) ===
      ...(personal ? [] : [
        new Paragraph({ style: "SectionHeader", children: [new TextRun(data.company.name)] }),
        ...data.company.intro.map(paragraph => new Paragraph({ children: [
          new TextRun({ text: paragraph, font: "Nunito", size: 22 })
        ]})),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: data.company.overviewNote.prefix, font: "Nunito", size: 22 }),
          new ExternalHyperlink({ link: data.company.overviewNote.url, children: [
            new TextRun({ text: data.company.overviewNote.linkText, font: "Nunito", color: BRAND.primary, size: 22 })
          ]}),
          new TextRun({ text: data.company.overviewNote.suffix, font: "Nunito", size: 22 })
        ]})
      ]),

      // === EMPLOYEE PROFILE ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun(personal ? data.labels.sections.profilePersonal : data.labels.sections.profile)] }),
      ...data.profile.map(runs => new Paragraph({
        children: runs.map(run => new TextRun({ text: run.text, bold: run.bold, font: "Nunito" }))
      })),

      // === TECHNICAL SKILLS (moved to first page) ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.skills)] }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2800, 7200],
        rows: skillsRows
      }),

      // === SELECTED PROJECTS ===
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.projects)] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: personal ? data.projectsNotePersonal : data.projectsNote, font: "Nunito", color: BRAND.gray, size: 20 })
      ]}),
      ...projectBlocks,

      // === EMPLOYMENT ===
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.employment)] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: employmentRows
      }),

      // === EDUCATION ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.education)] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: educationRows
      }),

      // === CERTIFICATIONS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.certificates)] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: certificateRows
      }),

      // === AWARDS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.awards)] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: awardRows
      }),

      // === LANGUAGES ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun(data.labels.sections.languages)] }),
      new Table({
        columnWidths: [2000, 2000, 2000, 2000, 2000],
        rows: [new TableRow({ children: languageCells })]
      })
    ]
  }]
});

const outputFile = personal ? "Daniel_Deusing_EN.docx" : "TD_Daniel_Deusing_EN.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`English CV created: ${outputFile}`);
});
