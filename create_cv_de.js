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
            new TextRun({ text: "Seite ", color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ children: [PageNumber.CURRENT], color: BRAND.gray, size: 18, font: "Nunito" }),
            new TextRun({ text: " | info@twiced.de | +49-151-16545891", color: BRAND.gray, size: 18, font: "Nunito" })
          ]
        })
      ]})
    },
    children: [
      // === HEADER SECTION ===
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [6000, 4000],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 6000, type: WidthType.DXA },
                verticalAlign: VerticalAlign.TOP,
                children: [
                  new Paragraph({ style: "Name", children: [new TextRun("Daniel Deusing")] }),
                  new Paragraph({ style: "Title", children: [new TextRun("Geschäftsführer & Senior Software Engineer")] }),
                  new Paragraph({ children: [
                    new TextRun({ text: "Ribeirão Claro, Brasilien", color: BRAND.gray, size: 20, font: "Nunito" })
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
                width: { size: 4000, type: WidthType.DXA },
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
        new TextRun({ text: "twiceD Technology GmbH ist ein Softwareunternehmen mit Sitz in Deutschland, spezialisiert auf maßgeschneiderte Entwicklungslösungen für Industrie und Unternehmen. Wir realisieren komplette Projekte oder unterstützen Kundenteams mit erfahrenen Entwicklern in den Bereichen IoT, Embedded Systems, Enterprise-Software und Full-Stack-Entwicklung. Das folgende Mitarbeiterprofil stellt einen unserer Experten vor.", font: "Nunito", size: 22 })
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Eine vollständige Projektübersicht befindet sich derzeit im Aufbau unter ", font: "Nunito", size: 22 }),
        new ExternalHyperlink({ link: "https://twiced-homepage.daniel-deusing.workers.dev/", children: [
          new TextRun({ text: "twiced-homepage.daniel-deusing.workers.dev", font: "Nunito", color: BRAND.primary, size: 22 })
        ]}),
        new TextRun({ text: ".", font: "Nunito", size: 22 })
      ]}),

      // === MITARBEITERPROFIL ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Mitarbeiterprofil")] }),
      new Paragraph({ children: [
        new TextRun({ text: "Ergebnisorientierter Software-Ingenieur mit ", font: "Nunito" }),
        new TextRun({ text: "über 13 Jahren Erfahrung", bold: true, font: "Nunito" }),
        new TextRun({ text: " in Full-Stack-Entwicklung, IoT, Embedded Systems und Enterprise-Software. Nachgewiesene Erfolge in der Leitung von Entwicklungsteams und Bereitstellung missionskritischer Systeme für Automobil-, Verteidigungs- und Industriekunden. Stark im systematischen Debugging und der Root-Cause-Analyse komplexer Probleme. Erfahren im Code-Review mit Fokus auf Wissenstransfer und Teamentwicklung. Kombiniert technische Hands-on-Expertise mit Führungskompetenz – von der Architekturplanung über die Implementierung bis zum Produktivbetrieb. Kommunikationsstark in Deutsch, Englisch und Spanisch. Erfahrung in agilen, verteilten Teams und internationalen Projekten.", font: "Nunito" })
      ]}),

      // === TECHNISCHE FÄHIGKEITEN (moved to first page) ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Technische Fähigkeiten")] }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2800, 7200],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Programmierung", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
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
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Cloud & Infrastruktur", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
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
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Datenbanken", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "MySQL, Oracle SQL, PostgreSQL, Redis, MongoDB", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Architektur & Design", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Domain-Driven Design, Microservices, Event-Driven Architecture", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Protokolle & APIs", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
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
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Methodik", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA },
              shading: { fill: BRAND.lightGray, type: ShadingType.CLEAR }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Scrum, Kanban, Test Driven Development, Requirements Engineering, Code Review", font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2800, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Domänen", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 7200, type: WidthType.DXA }, children: [
              new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "IoT, Smart Home, Embedded Systems, Linux-Treiber, Enterprise-Software, Automotive", font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === AUSGEWÄHLTE PROJEKTE ===
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Ausgewählte Projekte")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: "Die nachfolgenden Projekte umfassen ausschließlich Entwicklungstätigkeiten. Tätigkeiten in leitender Funktion sind nicht aufgeführt.", font: "Nunito", color: BRAND.gray, size: 20 })
      ]}),

      // Project: LiMAPS (2022 – heute)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("LiMAPS – Echtzeit-Messanalyse-Plattform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("LITEF GmbH (Northrop Grumman) | Lead Developer & Team Lead | 2022 – heute")] }),
      new Paragraph({ children: [new TextRun({ text: "Leitung der Entwicklung eines Echtzeit-Messanalysesystems für Trägheitsnavigationssysteme.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Architektur der Echtzeit-Datenpipeline vom Shared-Memory-Ringpuffer zum Web-Frontend", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Leitung eines 4-köpfigen Entwicklerteams; auch in LiRED (verwandte Plattform) eingesetzt", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration einer C-Bibliothek von LITEF für Hochleistungs-Shared-Memory-Zugriff", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Laufende Wartung: Sicherheitsupdates, Performance-Optimierungen und Fehlerbehebung", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Python, C, Shared Memory, Echtzeitsysteme", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: VU3 (2021 – heute)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("VU3 – Enterprise Fahrzeugverkaufsplattform (Volkswagen Group)")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Cloudflight GmbH / Porsche Informatik GmbH | Softwareentwickler & Architekt | 2021 – heute")] }),
      new Paragraph({ children: [new TextRun({ text: "Beitrag zur zentralen Verkaufsplattform des VW-Konzerns für Händler in 28+ Ländern für Audi, VW, Skoda, Seat, Cupra und Porsche.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "2 Jahre SFO1-Team: Stocklist, Add-Ons, Buildability & Actuality Check, Salesperson Management, Performance Board, Vehicle Management, Contract Broker, Sales Folder", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "2+ Jahre SFO4-Team (laufend): Multi-Currency, Special Tax, Porsche Vehicle Integration, DocFlow Integration, Selections, Datahub", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "½+ Jahr SWP-Team (laufend): Legacy-Verkaufsanwendung Italien – Bug Fixing, Security-/Regulatory-Features, Wartung bis Migration 2027", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "2+ Jahre Technical Architecture Team (laufend): Domänenübergreifendes Team zur Definition der Gesamtsystemarchitektur", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, Oracle SQL, Redis, Solr, SOAP, REST API, AWS", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: GigE Vision Driver (2021 – 2023)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("GigE Vision Linux-Treiber – Hochgeschwindigkeits-Kameraschnittstelle")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 Design GmbH / Mercedes-Benz & Bosch | Lead Developer | 2021 – 2023")] }),
      new Paragraph({ children: [new TextRun({ text: "Entwicklung eines Hochleistungs-Linux-Kernel-Treibers für industrielle Kamerasysteme in der Automobilproduktion.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "40 Gbit/s Datendurchsatz mit null Paketverlust und minimalem CPU-Verbrauch erreicht", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Kernel-Space-Treiber mit optimiertem Kernel-to-Userspace-Datentransfer implementiert", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Zusammenarbeit mit PLC2 Hardware/FPGA-Team und 20+ Mercedes/Bosch-Ingenieuren", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C, Linux Kernel, GigE Vision", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: IHK eFaktura (2020 – heute)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("IHK eFaktura – Elektronisches Rechnungsmanagement")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben | Team Lead & Entwickler | 2020 – heute")] }),
      new Paragraph({ children: [new TextRun({ text: "Leitung der Entwicklung eines elektronischen Rechnungssystems für IHK-Mitgliedsunternehmen.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Leitung eines 3-köpfigen Teams für Rechnungsmanagement und SOAP-Integration", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration in bestehende IHK-Backend-Infrastruktur für nahtlosen Datenaustausch", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Laufende Wartung: Updates, Bugfixes und Erweiterungen nach Kundenfeedback", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL, SOAP", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: IHK Themen (2020 – heute)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("IHK Themen – Prüfungsthemenverwaltung")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben | Team Lead & Entwickler | 2020 – heute")] }),
      new Paragraph({ children: [new TextRun({ text: "Leitung der Entwicklung einer Plattform zur Einreichung und Verwaltung von Prüfungsthemen.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Kompletter Workflow für Themeneinreichung, Prüfung und Genehmigung entwickelt", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Gemeinsame Backend-Infrastruktur mit eFaktura; individuelles Angular-Frontend", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Laufende Wartung: Updates, Bugfixes und Erweiterungen nach Kundenfeedback", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL, SOAP", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: LiPAD (2020 – heute)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("LiPAD – Portable Präzisions-Ausrichtungs-App")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("LITEF GmbH (Northrop Grumman) | Entwickler | 2020 – heute")] }),
      new Paragraph({ children: [new TextRun({ text: "Native Android-App für tragbares Inertialmessgerät für Präzisionsvermessung (z.B. Ölbohrungen).", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Komplette Android-App mit Echtzeit-3D-Orientierungsvisualisierung (Pitch, Roll, Azimut)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Bluetooth-LE-Konnektivität, Offline-Projektverwaltung und CSV-Export implementiert", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Im Google Play Store veröffentlicht; laufende Wartung für Sicherheits- und Feature-Updates", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Android, Java, Bluetooth LE", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: PGC-1000 (2020)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("PGC-1000 – High-Speed Grabber Card Software")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 Design GmbH | Entwickler | 2020")] }),
      new Paragraph({ children: [new TextRun({ text: "Softwareentwicklung für PCIe-basierte Grabber-Karte für automotive Datenerfassung.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Anpassung des bestehenden GigE-Vision-Treibers (aus Athena/Mercedes-Projekt) für PGC-1000", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Entwicklung der Qt-Steuerungsanwendung für Capture-Konfiguration, Stream-Monitoring und Bildkonvertierung", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "40 Gbit/s Durchsatz bei ~0% CPU-Last durch DMA-Transfers erreicht", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C, Qt, Linux, PCIe, DMA", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Promonco (2019 – heute)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Promonco – Enterprise Projekt- & Zeitmanagement")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("twiceD Technology GmbH | Lead Developer & Team Lead | 2019 – heute")] }),
      new Paragraph({ children: [new TextRun({ text: "Eigenentwickelte SaaS-Plattform für Projektmanagement, Zeiterfassung und Business-Analytics.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Leitung eines Kernteams von 4 Entwicklern (8+ Mitwirkende) für Full-Stack-Plattform", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "LDAP-Integration, DATEV-Export und MS-Access-Datenmigration implementiert", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Intern bei twiceD im Einsatz; externe Kunden als SaaS bedient", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Laufende Wartung und Weiterentwicklung basierend auf Nutzerfeedback", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, Spring Boot, Angular, MySQL, Python, Docker, LDAP, DATEV", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: FPGA Conference (2019 – 2021)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("FPGA Conference Europe – Registrierungs- & Buchungssystem")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 GmbH | Backend-Entwickler | 2019 – 2021")] }),
      new Paragraph({ children: [new TextRun({ text: "Konferenz-Registrierungsplattform für Europas führende FPGA-Entwicklerkonferenz (500+ Teilnehmer).", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Spring-Boot-Backend entwickelt: Registrierungsablauf, Session-Buchung, Zahlungsabwicklung", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Echtzeit-Platzverwaltung, Wartelisten-Handling und Konflikterkennung implementiert", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Plattform diente der Konferenz erfolgreich über 3 aufeinanderfolgende Jahre", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, Spring Boot, MySQL, REST API", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: IHK Zeugnischeck (2019 – 2020)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("IHK Zeugnischeck – Zeugnisverifizierungsportal")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("IHK Schwaben / IHK München | Entwickler | 2019 – 2020")] }),
      new Paragraph({ children: [new TextRun({ text: "Gemeinsame Entwicklung mit IHK München zur digitalen Verifizierung von Berufsausbildungszeugnissen.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Sicheres Verifizierungssystem für Arbeitgeber zur Validierung von Ausbildungszeugnissen", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Zusammenarbeit mit dem Entwicklerteam der IHK München an gemeinsamer Plattformarchitektur", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Angular, Java, Spring Boot, MySQL", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: 4NEEDS (2018)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("4NEEDS – Influencer ICO Plattform")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("4NEEDS | Blockchain-Entwickler | 01/2018 – 10/2018")] }),
      new Paragraph({ children: [new TextRun({ text: "Entwicklung einer ICO-Plattform für Influencer-Marketing auf Blockchain-Basis.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Smart-Contract-Entwicklung für Token-Emission und -Handel", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Full-Stack-Entwicklung: Angular-Frontend, Java-Backend, Python-Services", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration von Blockchain-SDK für Wallet-Verwaltung und Transaktionsabwicklung", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Blockchain, Angular, Java, Python", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Obsidian (2017)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Obsidian – Embedded OS & Treiber")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("PLC2 Design GmbH | Embedded-Entwickler | 08/2017 – 12/2017")] }),
      new Paragraph({ children: [new TextRun({ text: "Entwicklung eines kompletten Embedded-Linux-Systems für PLC2-Hardware mit Bootloader, Kernel und Treibern.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Yocto-basiertes Linux-Image mit angepasstem Kernel und Device Tree für Xilinx Zynq", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Entwicklung von Kernel-Treibern für FPGA-Kommunikation und Hardware-Schnittstellen", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Bootloader-Konfiguration (U-Boot) und Boot-Optimierung für schnellen Systemstart", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Yocto, C, Python, Linux Kernel, U-Boot, Device Tree", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: BaseCON (2015 – 2017)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("baseCON – Smart Home & Assisted Living System")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("KUNDO xT GmbH | Entwickler & Architekt | 2015 – 2017")] }),
      new Paragraph({ children: [new TextRun({ text: "Co-Architektur einer Z-Wave-zertifizierten Smart-Home-Plattform für Seniorenbetreuung, im Einsatz bei Wohnungsbaugenossenschaften in Deutschland.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Mitentwicklung der Systemarchitektur für Embedded-Linux-Gateway (RaspberryPi → ODROID-C2)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Entwicklung des Kern-Backends in Java/OSGi: Rule-Engine, Alarmsystem, MQTT-Cloud-Anbindung", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Alleinige Z-Wave-Zertifizierung des 4-Tasten-Geräts; Unterstützung bei baseCON-Hub-Zertifizierung", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration von Z-Wave, HomeMatic, SML, M-Bus in einheitliche Steuerungsschicht", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Java, OSGi, Angular, Python, C, MQTT, Z-Wave, Yocto", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: SafeGuard Solutions (2015 – 2017)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("SafeGuard Solutions – Mobiles Notrufsystem")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("SafeGuard Solutions GmbH | Android-Entwickler | 05/2015 – 02/2017")] }),
      new Paragraph({ children: [new TextRun({ text: "Entwicklung eines mobilen Notrufsystems mit BLE-Beacons für die indoor Lokalisierung gefährdeter Personen.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Native Android-App mit Bluetooth LE Beacon-Scanning und Trilateration zur Positionsbestimmung", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration von Push-Benachrichtigungen und Backend-Kommunikation für Echtzeit-Alarmierung", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Optimierung des Energieverbrauchs für dauerhaftes BLE-Scanning im Hintergrund", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Anbindung an externe Systeme für erweiterte Alarmierungs- und Monitoring-Funktionen", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Android, Java, Bluetooth LE, REST API", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Elaborated Networks (2014 – 2015)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Elaborated Networks – JSON RESTful API für WireGate")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Elaborated Networks GmbH | Backend-Entwickler | 12/2014 – 01/2015")] }),
      new Paragraph({ children: [new TextRun({ text: "Entwicklung einer RESTful API für das WireGate Smart Home Gateway zur Integration verschiedener Gebäudeautomatisierungsprotokolle.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "JSON-basierte REST API für KNX/EIB-Gerätesteuerung und -konfiguration", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Integration mit bestehendem Python-Backend des WireGate-Systems", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Python, REST API, JSON, KNX/EIB", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: myHOA (2013 – 2014)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("myHOA – Smart Home Startup")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Eigenes Startup | Co-Gründer | 03/2013 – 12/2014")] }),
      new Paragraph({ children: [new TextRun({ text: "Mitgründung und technische Leitung eines Smart-Home-Startups mit eigenem Gateway und integrierter Hausautomatisierung.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Eigenentwickeltes Embedded-Linux-Gateway (Yocto) mit Multi-Protokoll-Unterstützung (Z-Wave, EnOcean, DigitalSTROM, M-Bus, HomeMatic, ZigBee)", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Entwicklung der Backend-Infrastruktur und Cloud-Anbindung", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "Yocto, C, Python, Android, REST API", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // Project: Visioneering (2011 – 2012)
      new Paragraph({ style: "ProjectTitle", children: [new TextRun("Visioneering – EnOcean-Integration in DigitalSTROM")] }),
      new Paragraph({ style: "CompanyRole", children: [new TextRun("Visioneering AG | Softwareentwickler | 07/2011 – 10/2012")] }),
      new Paragraph({ children: [new TextRun({ text: "Integration des EnOcean-Funkprotokolls in das DigitalSTROM-Ökosystem als Wrapper für virtuelle DigitalSTROM-Geräte.", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Protokoll-Integration: EnOcean-Sensoren als virtuelle DigitalSTROM-Geräte abgebildet", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Entwicklung eines virtuellen DSM (DigitalSTROM-Meter) zur Einbindung der EnOcean-Geräte ins DigitalSTROM-System", font: "Nunito", size: 20 })] }),
      new Paragraph({ numbering: { reference: "project-bullets", level: 0 }, children: [new TextRun({ text: "Eigenständige Web-UI für Konfiguration und Verwaltung der EnOcean-Geräte", font: "Nunito", size: 20 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: "Tech: ", bold: true, color: BRAND.gray, font: "Nunito", size: 18 }),
        new TextRun({ text: "C++, Python, JavaScript, HTML, EnOcean, DigitalSTROM", color: BRAND.gray, font: "Nunito", size: 18 })
      ]}),

      // === ANSTELLUNGEN ===
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Anstellungen")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2018 – heute", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Geschäftsführer & Softwareentwickler", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "twiceD Technology GmbH", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2015 – 2018", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Geschäftsführer & Softwareentwickler", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Ingenieurbüro Deusing GbR", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2015 – 2017", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Akademischer Mitarbeiter & Dozent (Teilzeit)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2010", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Softwareentwickler Praktikant", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Volkswagen de México", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2009 – 2012", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Netzwerkadministrator (ehrenamtlich)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Studentenwerk Freiburg, Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2009 – 2010", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Softwareentwickler (studentische Hilfskraft)", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "IT-Rechenzentrum Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === AUSBILDUNG ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Ausbildung")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2014", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Master of Science – Informatik", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Thesis: Koordination und Kombination heterogener Technologien im Kontext von Smart Home (Note: 1,0)", italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2012", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Bachelor of Science – Informatik", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Hochschule Furtwangen", color: BRAND.accent, font: "Nunito", size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: "Thesis: Homogenisierung von Gebäudeautomatisierung über TCP/IP (Note: 1,3)", italics: true, color: BRAND.gray, font: "Nunito", size: 18 })] })
            ]})
          ]})
        ]
      }),

      // === ZERTIFIKATE ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Zertifikate & Publikationen")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2013", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Peer-reviewed Publikation – Untersuchung des Peer-to-Peer Web-Standards WebRTC", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "InformatikJournal (2013), Hochschule Furtwangen, pp. 23-32. ISBN: 978-3-00-0443221-3", color: BRAND.gray, font: "Nunito", size: 20 })] })
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

      // === AUSZEICHNUNGEN ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Auszeichnungen")] }),
      new Table({
        columnWidths: [2000, 8000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2014", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Baden-Württemberg Goes Mobile – Gewinner", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Kategorie: Mobile Housemate 2.0", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "2013", bold: true, color: BRAND.primary, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 8000, type: WidthType.DXA }, children: [
              new Paragraph({ children: [new TextRun({ text: "Elevator Pitch BW Regionalcup – Gewinner", bold: true, font: "Nunito" })] }),
              new Paragraph({ children: [new TextRun({ text: "Region Südschwarzwald", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      }),

      // === SPRACHEN ===
      new Paragraph({ style: "SectionHeader", children: [new TextRun("Sprachen")] }),
      new Table({
        columnWidths: [2000, 2000, 2000, 2000, 2000],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Deutsch", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Muttersprache", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Englisch", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Fließend", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Spanisch", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Fließend", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Portugiesisch", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Mittelstufe", color: BRAND.accent, font: "Nunito", size: 20 })] })
            ]}),
            new TableCell({ borders: noBorders, width: { size: 2000, type: WidthType.DXA }, children: [
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Französisch", bold: true, font: "Nunito" })] }),
              new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Grundkenntnisse", color: BRAND.gray, font: "Nunito", size: 20 })] })
            ]})
          ]})
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("TD_Daniel_Deusing_DE.docx", buffer);
  console.log("German CV created: TD_Daniel_Deusing_DE.docx");
});
