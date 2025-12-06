const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, BorderStyle, WidthType,
        TabStopType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// twiceD Brand Colors
const BRAND = {
  primary: "1E3A5F",      // Deep navy blue
  accent: "D0520F",       // Burnt orange
  dark: "2D4A6F",         // Lighter navy
  gray: "666666",
  lightGray: "F5F5F5"
};

// Borders
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const accentBorderBottom = {
  top: noBorder, left: noBorder, right: noBorder,
  bottom: { style: BorderStyle.SINGLE, size: 12, color: BRAND.accent }
};

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
        paragraph: { spacing: { before: 300, after: 150 } } },
      { id: "ProjectTitle", name: "ProjectTitle", basedOn: "Normal",
        run: { size: 24, bold: true, color: BRAND.dark, font: "Nunito" },
        paragraph: { spacing: { before: 200, after: 60 } } },
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
      default: new Header({ children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: "twiceD", bold: true, color: BRAND.primary, size: 20, font: "Nunito" }),
            new TextRun({ text: " Technology GmbH", color: BRAND.gray, size: 20, font: "Nunito" })
          ]
        })
      ]})
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ children: [PageNumber.CURRENT], color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ text: " | info@twiced.de | +49-7664-5050608", color: BRAND.gray, size: 18, font: "Nunito" })
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
                  new Paragraph({ style: "Name", children: [new TextRun("Daniel Deusing")] }),
                  new Paragraph({ style: "Title", children: [new TextRun("Managing Director & Senior Software Engineer")] }),
                  new Paragraph({ children: [
                    new TextRun({ text: "📍 ", size: 20 }),
                    new TextRun({ text: "Freiburg, Germany  |  ", color: BRAND.gray, size: 20, font: "Nunito" }),
                    new TextRun({ text: "🌐 ", size: 20 }),
                    new TextRun({ text: "German (Native), English & Spanish (Fluent)", color: BRAND.gray, size: 20, font: "Nunito" })
                  ]})
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 3500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.TOP,
                children: [
                  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 60 }, children: [
                    new TextRun({ text: "Available: ", color: BRAND.gray, size: 20, font: "Nunito" }),
                    new TextRun({ text: "Immediately", bold: true, color: BRAND.accent, size: 20, font: "Nunito" })
                  ]}),
                  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 60 }, children: [
                    new TextRun({ text: "Locations: DE, CH, AT, Remote", color: BRAND.gray, size: 20, font: "Nunito" })
                  ]}),
                  new Paragraph({ alignment: AlignmentType.RIGHT, children: [
                    new TextRun({ text: "M.Sc. Computer Science", color: BRAND.gray, size: 20, font: "Nunito" })
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

      // === PROFESSIONAL SUMMARY ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Professional Summary")] }),
      new Paragraph({ children: [
        new TextRun({ text: "Results-driven software engineer and entrepreneur with ", font: "Nunito" }),
        new TextRun({ text: "13+ years of experience", bold: true, font: "Nunito" }),
        new TextRun({ text: " in full-stack development, IoT, embedded systems, and enterprise software. Founder and Managing Director of twiceD Technology GmbH, specializing in custom software solutions for industry and enterprise. Proven track record leading international development teams (up to 100+ developers) and delivering mission-critical systems for automotive, defense, and industrial clients.", font: "Nunito" })
      ]}),

      // === CORE COMPETENCIES ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Core Competencies")] }),
      new Table({
        columnWidths: [3333, 3333, 3334],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders: noBorders, width: { size: 3333, type: WidthType.DXA }, children: [
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Java / Spring Boot", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Python / Flask", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "TypeScript / Angular", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "C / C++ / Embedded", font: "Nunito" })] })
              ]}),
              new TableCell({ borders: noBorders, width: { size: 3333, type: WidthType.DXA }, children: [
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Docker / Kubernetes", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Linux / Yocto / Drivers", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "IoT / Smart Home", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "AI Implementation", font: "Nunito" })] })
              ]}),
              new TableCell({ borders: noBorders, width: { size: 3334, type: WidthType.DXA }, children: [
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Team Leadership", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Agile / Scrum", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Software Architecture", font: "Nunito" })] }),
                new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [new TextRun({ text: "Project Management", font: "Nunito" })] })
              ]})
            ]
          })
        ]
      }),

      // === KEY ACHIEVEMENTS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Key Achievements")] }),
      new Table({
        columnWidths: [1200, 8800],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 1200, type: WidthType.DXA },
              shading: { fill: BRAND.accent, type: ShadingType.CLEAR },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2014", bold: true, color: "FFFFFF", font: "Nunito" })] })] }),
            new TableCell({ borders: noBorders, width: { size: 8800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 60, after: 60 }, indent: { left: 100 }, children: [
                new TextRun({ text: "Winner - Baden-Württemberg Goes Mobile", bold: true, font: "Nunito" }),
                new TextRun({ text: " (Category: Mobile Housemate 2.0)", font: "Nunito" })
              ] })
            ] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 1200, type: WidthType.DXA },
              shading: { fill: BRAND.primary, type: ShadingType.CLEAR },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2013", bold: true, color: "FFFFFF", font: "Nunito" })] })] }),
            new TableCell({ borders: noBorders, width: { size: 8800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 60, after: 60 }, indent: { left: 100 }, children: [
                new TextRun({ text: "Winner - Regional Cup Elevator Pitch Baden-Württemberg", bold: true, font: "Nunito" }),
                new TextRun({ text: " (Südschwarzwald)", font: "Nunito" })
              ] })
            ] })
          ]})
        ]
      }),

      // === SELECTED PROJECTS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Selected Projects")] }),

      // Project 1: CrossNG
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("CrossNG – Sales Front Office Platform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Porsche Informatik GmbH | Senior Software Developer | 2021 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Development of global sales support system for Volkswagen Group dealers (100+ developers, 10-person Scrum team).", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Full-stack development with Java Spring Boot & Angular", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Technical analysis, effort estimation, code reviews", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Led retrospectives and stand-ups", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, Spring Boot, Angular, TypeScript, Docker, Jenkins, Solr, Kibana", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project 2: LiMAPS
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("LiMAPS – Navigation System Interface")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Northrop Grumman LITEF GmbH | Project Lead & Developer | 2020 – 2021")] }),
      new Paragraph({ children: [new TextRun({ text: "Control interface for defense-grade navigation system displaying real-time measurements and configuration.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Led 5-person development team", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Designed software architecture and cloud migration", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Python Flask, Java, Spring Boot", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project 3: GigE-Vision
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("GigE-Vision Linux Driver Development")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 GmbH / Daimler AG | Project Lead & Developer | 2018 – 2020")] }),
      new Paragraph({ children: [new TextRun({ text: "High-performance Linux driver for 4x10Gbit/s video data processing via FPGA grabber card.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Linux kernel driver development in C", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "GigE-Vision protocol implementation", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C, Linux Kernel, GigE-Vision, FPGA", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project 4: IHK
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Digital Transformation Platform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben | Full-Stack Developer | 2019 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Nationwide unified applications including certificate verification system with multi-chamber routing.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Frontend development with Angular", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Backend REST API, caching, proxy server", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL, Docker, SOAP/REST", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project 5: BaseCON
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("BaseCON – IoT Gateway Platform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Kundo xT GmbH | Software Developer | 2015 – 2017")] }),
      new Paragraph({ children: [new TextRun({ text: "IP-based wireless network system for energy-autonomous sensors/actuators with Z-Wave certification.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Z-Wave certification, OSGi development", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Built alarm system, rule engine, MQTT cloud integration", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java OSGi, Python, Angular, MongoDB, MQTT, Z-Wave, Yocto", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // PAGE BREAK
      new Paragraph({ children: [new PageBreak()] }),

      // === PROFESSIONAL EXPERIENCE ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Professional Experience")] }),

      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2019 – Present", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Managing Director & Software Developer", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "twiceD Technology GmbH, Freiburg", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2015 – 2019", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Managing Director & Software Developer", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Ingenieurbüro Deusing GbR / twiceD Technology & Sales GmbH", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2015 – 2016", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Academic Staff (PhD Track)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen (Part-time)", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2017", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Lecturer – Internet of Things", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen, Master Programs", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2010", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Software Developer Intern", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Volkswagen de México, Puebla", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === EDUCATION ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Education")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2014", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Master of Science – Computer Science", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen University", color: BRAND.gray, font: "Nunito", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Thesis: Coordination and Combination of Heterogeneous Technologies in Smart Home Context", italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2012", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Bachelor of Science – Computer Science", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen University", color: BRAND.gray, font: "Nunito", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Thesis: Homogenization of Building Automation via TCP/IP", italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
            ]})
          ]})
        ]
      }),

      // === CERTIFICATIONS & PUBLICATIONS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Certifications & Publications")] }),
      new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [
        new TextRun({ text: "ITIL Version 2 Foundation Examination", bold: true, font: "Nunito" }),
        new TextRun({ text: " (2010)", color: BRAND.gray, font: "Nunito" })
      ]}),
      new Paragraph({ numbering: { reference: "skills-bullets", level: 0 }, children: [
        new TextRun({ text: "Peer-reviewed Publication: ", bold: true, font: "Nunito" }),
        new TextRun({ text: "\"Investigation of the Peer-to-Peer Web Standard WebRTC\" – InformatikJournal 2013, pp. 23-32, Hochschule Furtwangen. ISBN: 978-3-00-0443221-3", italics: true, font: "Nunito", size: 20 })
      ]}),

      // === TECHNICAL SKILLS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Technical Skills")] }),
      new Table({
        columnWidths: [2500, 7500],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ children: [new TextRun({ text: "Languages", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7500, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Java (Expert), Python (Expert), C (Advanced), TypeScript/JavaScript (Advanced), C++ (Intermediate), Bash (Advanced)", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ children: [new TextRun({ text: "Frameworks", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7500, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Spring Boot, Angular, Flask, OSGi, Hibernate, JUnit, JPA", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ children: [new TextRun({ text: "Infrastructure", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7500, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Docker, Kubernetes, Jenkins, Git, Linux, Yocto/OpenEmbedded, SQL/NoSQL", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ children: [new TextRun({ text: "Domains", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7500, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "IoT, Smart Home, Embedded Systems, Linux Drivers, Enterprise Software, AI/ML Integration", font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === LANGUAGES ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Languages")] }),
      new Table({
        columnWidths: [2500, 2500, 2500, 2500],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "German", bold: true, font: "Nunito" })
              ]}),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "Native", color: BRAND.accent, font: "Nunito", size: 20 })
              ]})
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "English", bold: true, font: "Nunito" })
              ]}),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "Fluent", color: BRAND.accent, font: "Nunito", size: 20 })
              ]})
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "Spanish", bold: true, font: "Nunito" })
              ]}),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "Fluent", color: BRAND.accent, font: "Nunito", size: 20 })
              ]})
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2500, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "French", bold: true, font: "Nunito" })
              ]}),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "Basic", color: BRAND.gray, font: "Nunito", size: 20 })
              ]})
            ]})
          ]})
        ]
      }),

      // Spacer before additional info
      new Paragraph({ spacing: { before: 300 }, children: [] }),

      // Additional note
      new Paragraph({
        alignment: AlignmentType.CENTER,
        shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "Full project history and references available upon request", italics: true, color: BRAND.gray, font: "Nunito", size: 20 })
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("TD_Daniel_Deusing_2025.docx", buffer);
  console.log("CV created: TD_Daniel_Deusing_2025.docx");
});
