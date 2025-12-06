const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, BorderStyle, WidthType,
        TabStopType, ShadingType, VerticalAlign, PageNumber, PageBreak, ImageRun, ExternalHyperlink } = require('docx');
const fs = require('fs');
const path = require('path');

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
            new TextRun({ text: "Page ", color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ children: [PageNumber.CURRENT], color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ text: " | info@twiced.de | +49-151-16545891", color: BRAND.gray, size: 18, font: "Nunito" })
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
                    new TextRun({ text: "Ribeirão Claro, Brasil", color: BRAND.gray, size: 20, font: "Nunito" })
                  ]}),
                  new Paragraph({ spacing: { before: 60 }, children: [
                    new ImageRun({ data: fs.readFileSync(path.join(__dirname, 'logo', 'github_icon.png')), transformation: { width: 9, height: 9 }, type: 'png' }),
                    new TextRun({ text: " ", size: 18 }),
                    new ExternalHyperlink({ link: "https://github.com/danieldeusing/", children: [
                      new TextRun({ text: "GitHub", color: BRAND.primary, size: 18, font: "Nunito" })
                    ]}),
                    new TextRun({ text: "  |  ", color: BRAND.gray, size: 18, font: "Nunito" }),
                    new ImageRun({ data: fs.readFileSync(path.join(__dirname, 'logo', 'linkedin_icon.png')), transformation: { width: 9, height: 9 }, type: 'png' }),
                    new TextRun({ text: " ", size: 18 }),
                    new ExternalHyperlink({ link: "https://www.linkedin.com/in/daniel-deusing-6859b987/", children: [
                      new TextRun({ text: "LinkedIn", color: BRAND.primary, size: 18, font: "Nunito" })
                    ]}),
                    new TextRun({ text: "  |  ", color: BRAND.gray, size: 18, font: "Nunito" }),
                    new ImageRun({ data: fs.readFileSync(path.join(__dirname, 'logo', 'xing_icon.png')), transformation: { width: 9, height: 9 }, type: 'png' }),
                    new TextRun({ text: " ", size: 18 }),
                    new ExternalHyperlink({ link: "https://www.xing.com/profile/Daniel_Deusing/", children: [
                      new TextRun({ text: "Xing", color: BRAND.primary, size: 18, font: "Nunito" })
                    ]})
                  ]})
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 3500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.TOP,
                children: [
                  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 160 }, children: [
                    new ImageRun({
                      data: fs.readFileSync(path.join(__dirname, 'logo', 'blue_D_1E3A5F.png')),
                      transformation: { width: 46, height: 46 },
                      type: 'png'
                    })
                  ]}),
                  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 40 }, children: [
                    new TextRun({ text: "twiceD", bold: true, color: BRAND.primary, size: 20, font: "Nunito" }),
                    new TextRun({ text: " Technology GmbH", color: BRAND.gray, size: 20, font: "Nunito" })
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

      // === TWICED ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("twiceD Technology GmbH")] }),
      new Paragraph({ children: [
        new TextRun({ text: "twiceD Technology GmbH is a software company based in Germany, specializing in custom development solutions for industry and enterprise. We deliver complete projects or support client teams with experienced developers in the areas of IoT, embedded systems, enterprise software, and full-stack development. The following employee profile presents one of our experts.", font: "Nunito", size: 22 })
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "A complete project overview is currently being developed at ", font: "Nunito", size: 22 }),
        new ExternalHyperlink({ link: "https://twiced-homepage.daniel-deusing.workers.dev/", children: [
          new TextRun({ text: "twiced-homepage.daniel-deusing.workers.dev", font: "Nunito", color: BRAND.primary, size: 22 })
        ]}),
        new TextRun({ text: ".", font: "Nunito", size: 22 })
      ]}),

      // === EMPLOYEE PROFILE ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Employee Profile")] }),
      new Paragraph({ children: [
        new TextRun({ text: "Results-driven software engineer with ", font: "Nunito" }),
        new TextRun({ text: "13+ years of experience", bold: true, font: "Nunito" }),
        new TextRun({ text: " in full-stack development, IoT, embedded systems, and enterprise software. Proven track record leading development teams and delivering mission-critical systems for automotive, defense, and industrial clients. Excels at systematic debugging and root cause analysis of complex problems. Experienced in code review with focus on knowledge transfer and team development. Combines hands-on technical expertise with leadership skills – from architecture planning through implementation to production operations. Strong communication skills in German, English, and Spanish. Experienced in agile, distributed teams and international projects.", font: "Nunito" })
      ]}),

      // === TECHNICAL SKILLS (moved to first page) ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Technical Skills")] }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2800, 7200],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Programming", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Java, Python, C, TypeScript/JavaScript, C++, Bash", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Frameworks", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Spring Boot, Angular, Flask, OSGi, Hibernate, JUnit, JPA", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Cloud & Infrastructure", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "AWS, Docker, Linux, Yocto/OpenEmbedded", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "DevOps & Tools", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Git, Jenkins, CI/CD Pipelines, Atlassian Suite (Jira/Confluence)", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Databases", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "MySQL, Oracle SQL, PostgreSQL, Redis, MongoDB", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Architecture & Design", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Domain-Driven Design, Microservices, Event-Driven Architecture", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Protocols & APIs", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "REST, SOAP, Swagger/OpenAPI, MQTT, WebSocket", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Observability", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Grafana, Prometheus, ELK Stack, Application Logging", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Security", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "OAuth2, TLS/SSL, LDAP, Identity Provider Integration", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Methodology", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Scrum, Kanban, Test Driven Development, Requirements Engineering, Code Review", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Domains", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "IoT, Smart Home, Embedded Systems, Linux Drivers, Enterprise Software, Automotive", font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === SELECTED PROJECTS ===
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Selected Projects")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "The following projects comprise development work only. Activities in leadership roles are not listed.", font: "Nunito", color: BRAND.gray, size: 20 })
      ]}),

      // Project: LiMAPS (2022 – Present)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("LiMAPS – Real-Time Measurement Analysis Platform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("LITEF GmbH (Northrop Grumman) | Lead Developer & Team Lead | 2022 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Leading development of real-time measurement analysis system for inertial navigation systems.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Architected real-time data pipeline from shared memory ring buffer to web frontend", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Led team of 4 developers; also deployed in LiRED (related platform)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integrated C library from LITEF for high-performance shared memory access", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Ongoing maintenance: security updates, performance optimizations, and bug fixes", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Python, C, Shared Memory, Real-Time Systems", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: VU3 (2021 – Present)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("VU3 – Enterprise Vehicle Sales Platform (Volkswagen Group)")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Cloudflight GmbH / Porsche Informatik GmbH | Software Developer & Architect | 2021 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Contributing to VW Group's central sales platform serving dealerships across 28+ countries for Audi, VW, Skoda, Seat, Cupra, and Porsche brands.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "2 years SFO1 team: Stocklist, Add-Ons, Buildability & Actuality Check, Salesperson Management, Performance Board, Vehicle Management, Contract Broker, Sales Folder", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "2+ years SFO4 team (ongoing): Multi-Currency, Special Tax, Porsche Vehicle Integration, DocFlow Integration, Selections, Datahub", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "½+ year SWP team (ongoing): Legacy sales application Italy – Bug fixing, security/regulatory features, maintenance until migration 2027", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "2+ years Technical Architecture Team (ongoing): Cross-domain team defining overall system architecture", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, Oracle SQL, Redis, Solr, SOAP, REST API, AWS", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: GigE Vision Driver (2021 – 2023)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("GigE Vision Linux Driver – High-Speed Camera Interface")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 Design GmbH / Mercedes-Benz & Bosch | Lead Developer | 2021 – 2023")] }),
      new Paragraph({ children: [new TextRun({ text: "Developed high-performance Linux kernel driver for industrial camera systems used in automotive production.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Achieved 40 Gbit/s data throughput with zero packet loss and minimal CPU usage", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Implemented kernel-space driver with optimized kernel-to-userspace data transfer", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Collaborated with PLC2 hardware/FPGA team and 20+ Mercedes/Bosch engineers", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C, Linux Kernel, GigE Vision", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: IHK eFaktura (2020 – Present)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("IHK eFaktura – Electronic Invoice Management")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben | Team Lead & Developer | 2020 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Leading development of electronic invoicing system for IHK member companies.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Led team of 3 developers building invoice management and SOAP integration", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integrated with existing IHK backend infrastructure for seamless data exchange", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Ongoing maintenance: security updates, performance optimizations, and bug fixes", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL, SOAP", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: IHK Themen (2020 – Present)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("IHK Themen – Exam Topic Management")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben | Team Lead & Developer | 2020 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Leading development of exam topic submission and management platform for apprenticeship exams.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Built complete workflow for exam topic submission, review, and approval", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Shares backend infrastructure with eFaktura; custom Angular frontend", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Ongoing maintenance: security updates, performance optimizations, and bug fixes", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL, SOAP", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: LiPAD (2020 – Present)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("LiPAD – Portable Precision Alignment App")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("LITEF GmbH (Northrop Grumman) | Developer | 2020 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "Native Android app for portable inertial measurement device used in precision surveying (e.g., oil drilling).", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Built complete Android app with real-time 3D orientation visualization (pitch, roll, azimuth)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Implemented Bluetooth LE connectivity, offline project management, and CSV export", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Published on Google Play; ongoing maintenance for security and feature updates", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Android, Java, Bluetooth LE", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: PGC-1000 (2020)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("PGC-1000 – High-Speed Grabber Card Software")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 Design GmbH | Developer | 2020")] }),
      new Paragraph({ children: [new TextRun({ text: "Software development for PCIe-based grabber card used in automotive data acquisition.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Adapted existing GigE Vision driver (from Athena/Mercedes project) for PGC-1000 hardware", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Developed Qt control application for capture configuration, stream monitoring, and image conversion", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Achieved 40 Gbit/s throughput with ~0% CPU load via DMA transfers", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C, Qt, Linux, PCIe, DMA", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Promonco (2019 – Present)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Promonco – Enterprise Project & Time Management")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("twiceD Technology GmbH | Lead Developer & Team Lead | 2019 – Present")] }),
      new Paragraph({ children: [new TextRun({ text: "In-house developed SaaS platform for project management, time tracking, and business analytics.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Led core team of 4 developers (8+ total contributors) building full-stack platform", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Implemented LDAP integration, DATEV export, and MS Access data migration", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Deployed internally at twiceD offices; served external customers as SaaS", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Ongoing maintenance: security updates, performance optimizations, and bug fixes", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, Spring Boot, Angular, MySQL, Python, Docker, LDAP, DATEV", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: FPGA Conference (2019 – 2021)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("FPGA Conference Europe – Registration & Booking System")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 GmbH | Backend Developer | 2019 – 2021")] }),
      new Paragraph({ children: [new TextRun({ text: "Conference registration platform for Europe's leading FPGA developer conference (500+ attendees).", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Developed Spring Boot backend: registration flow, session booking, payment processing", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Implemented real-time seat management, waitlist handling, and conflict detection", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Platform served conference successfully for 3 consecutive years", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, Spring Boot, MySQL, REST API", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: IHK Zeugnischeck (2019 – 2020)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("IHK Zeugnischeck – Certificate Verification Portal")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben / IHK München | Developer | 2019 – 2020")] }),
      new Paragraph({ children: [new TextRun({ text: "Joint development with IHK München for digital verification of vocational training certificates.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Built secure verification system for employers to validate apprenticeship certificates", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Collaborated with IHK München development team on shared platform architecture", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: 4NEEDS (2018)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("4NEEDS – Influencer ICO Platform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("4NEEDS | Blockchain Developer | 01/2018 – 10/2018")] }),
      new Paragraph({ children: [new TextRun({ text: "Developed an ICO platform for influencer marketing based on Blockchain technology.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Smart contract development for token issuance and trading", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Full-stack development: Angular frontend, Java backend, Python services", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration of Blockchain SDK for wallet management and transaction processing", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Blockchain, Angular, Java, Python", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Obsidian (2017)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Obsidian – Embedded OS & Drivers")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 Design GmbH | Embedded Developer | 08/2017 – 12/2017")] }),
      new Paragraph({ children: [new TextRun({ text: "Developed complete embedded Linux system for PLC2 hardware with bootloader, kernel, and drivers.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Yocto-based Linux image with custom kernel and device tree for Xilinx Zynq", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Developed kernel drivers for FPGA communication and hardware interfaces", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Bootloader configuration (U-Boot) and boot optimization for fast system startup", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Yocto, C, Python, Linux Kernel, U-Boot, Device Tree", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: BaseCON (2015 – 2017)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("baseCON – Smart Home & Assisted Living System")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("KUNDO xT GmbH | Developer & Architect | 2015 – 2017")] }),
      new Paragraph({ children: [new TextRun({ text: "Co-architected Z-Wave certified smart home platform for elderly care, deployed in housing cooperatives across Germany.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Co-designed system architecture for embedded Linux gateway (RaspberryPi → ODROID-C2)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Developed core backend in Java/OSGi: rule engine, alarm system, MQTT cloud integration", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Led Z-Wave certification for 4-button companion device; supported baseCON hub certification", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integrated Z-Wave, HomeMatic, SML, M-Bus protocols into unified control layer", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, OSGi, Angular, Python, C, MQTT, Z-Wave, Yocto", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: SafeGuard Solutions (2015 – 2017)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("SafeGuard Solutions – Mobile Emergency System")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("SafeGuard Solutions GmbH | Android Developer | 05/2015 – 02/2017")] }),
      new Paragraph({ children: [new TextRun({ text: "Developed a mobile emergency system with BLE beacons for indoor localization of at-risk individuals.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Native Android app with Bluetooth LE beacon scanning and trilateration for positioning", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration of push notifications and backend communication for real-time alerting", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Optimized power consumption for continuous background BLE scanning", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration with external systems for alarm forwarding and data exchange", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Android, Java, Bluetooth LE, REST API", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Elaborated Networks (2014 – 2015)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Elaborated Networks – JSON RESTful API for WireGate")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Elaborated Networks GmbH | Backend Developer | 12/2014 – 01/2015")] }),
      new Paragraph({ children: [new TextRun({ text: "Developed RESTful API for WireGate smart home gateway to integrate various building automation protocols.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "JSON-based REST API for KNX/EIB device control and configuration", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration with existing Python backend of WireGate system", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Python, REST API, JSON, KNX/EIB", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: myHOA (2013 – 2014)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("myHOA – Smart Home Startup")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Own Startup | Co-Founder | 03/2013 – 12/2014")] }),
      new Paragraph({ children: [new TextRun({ text: "Co-founded and led technical development of a smart home startup with custom gateway and integrated home automation.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Custom embedded Linux gateway (Yocto) with multi-protocol support (Z-Wave, EnOcean, DigitalSTROM, M-Bus, HomeMatic, ZigBee)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Complete development from hardware selection to backend to Android app (focus: backend)", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Yocto, C, Python, Android, REST API", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Visioneering (2011 – 2012)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Visioneering – EnOcean Integration into DigitalSTROM")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Visioneering AG | Software Developer | 07/2011 – 10/2012")] }),
      new Paragraph({ children: [new TextRun({ text: "Integration of EnOcean wireless protocol into DigitalSTROM ecosystem as wrapper for virtual DigitalSTROM devices.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Protocol integration: EnOcean sensors mapped as virtual DigitalSTROM devices", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Developed virtual DSM (DigitalSTROM-Meter) to integrate EnOcean devices into DigitalSTROM system", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Custom web UI for configuration and management of EnOcean devices", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C++, Python, JavaScript, HTML, EnOcean, DigitalSTROM", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // PAGE BREAK
      new Paragraph({ children: [new PageBreak()] }),

      // === EMPLOYMENT ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Employment")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2018 – Present", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Managing Director & Software Developer", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "twiceD Technology GmbH", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2015 – 2018", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Managing Director & Software Developer", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Ingenieurbüro Deusing GbR", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2015 – 2017", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Academic Staff & Lecturer (Part-time)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2010", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Software Developer Intern", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Volkswagen de México", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2009 – 2012", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Network Administrator (volunteer)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Studentenwerk Freiburg, Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2009 – 2010", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Software Developer (student assistant)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "IT Data Center Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] })
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
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen University", color: BRAND.accent, font: "Nunito", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Thesis: Coordination and Combination of Heterogeneous Technologies in Smart Home Context (Grade: 1.0)", italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2012", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Bachelor of Science – Computer Science", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen University", color: BRAND.accent, font: "Nunito", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Thesis: Homogenization of Building Automation via TCP/IP (Grade: 1.3)", italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
            ]})
          ]})
        ]
      }),

      // === CERTIFICATIONS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Certifications & Publications")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2013", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Peer-reviewed Publication – Investigation of the Peer-to-Peer Web Standard WebRTC", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "InformatikJournal (2013), Hochschule Furtwangen University, pp. 23-32. ISBN: 978-3-00-0443221-3", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2010", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "ITIL Version 2 Foundation Examination", bold: true, font: "Nunito" })] })
            ]})
          ]})
        ]
      }),

      // === AWARDS ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Awards")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2014", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Baden-Württemberg Goes Mobile – Winner", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Category: Mobile Housemate 2.0", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2013", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Elevator Pitch BW Regional Cup – Winner", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Südschwarzwald Region", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === LANGUAGES ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Languages")] }),
      new Table({
        columnWidths: [2000, 2000, 2000, 2000, 2000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "German", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Native", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "English", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Fluent", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Spanish", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Fluent", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Portuguese", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Intermediate", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "French", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Basic", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("TD_Daniel_Deusing_EN.docx", buffer);
  console.log("English CV created: TD_Daniel_Deusing_EN.docx");
});
