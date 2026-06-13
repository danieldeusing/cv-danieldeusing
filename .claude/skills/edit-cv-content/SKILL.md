---
name: edit-cv-content
description: >-
  Add or edit content in this CV generator repo — a project, job, skill,
  education entry, certificate, award, language, or the profile summary. Use
  this skill whenever the user wants to add, change, or remove anything that
  shows up on the CV (e.g. "add a project to my CV", "update my job title",
  "add Rust to my skills", "rewrite my summary", "add a certification", "drop
  the old VW project", "fix the typo in my education section"), even if they
  don't mention files or languages. The CV exists in four languages that must
  stay in sync and
  the outputs must be regenerated, which is easy to get wrong by hand — that's
  what this skill is for. Do NOT use it for layout or styling changes (colors,
  fonts, spacing, section order); those live in the generator scripts.
---

# Edit CV content

CV content lives in four JSON files — `data/cv.de.json`, `data/cv.en.json`,
`data/cv.es.json`, `data/cv.pt.json` — that share one identical schema and
differ only in language. The generator scripts turn that JSON into DOCX, and
LibreOffice converts those to PDF. The website (danieldeusing.de) reads the same
JSON directly.

The whole point of this skill is that a content edit isn't done until **all four
languages are updated, properly translated, and the outputs are regenerated**.
Forgetting a language ships a CV that's inconsistent across translations;
forgetting to regenerate ships stale DOCX/PDFs that no longer match the JSON.

## Workflow

1. **Find the entry in all four files.** A piece of content (a given project,
   job, skill category, etc.) appears once per language file. Locate it — or the
   array to append to — in `data/cv.de.json`, `data/cv.en.json`,
   `data/cv.es.json`, and `data/cv.pt.json`.

2. **Apply the change in every language, translated.** Make the edit in all four
   files. Translate the human-readable text into each language (DE/EN/ES/PT) —
   never paste English (or German) into the other files. Proper nouns (company
   names, product names, technologies) stay as-is across languages. If you're
   unsure of a translation, say so rather than guessing silently.

   Before moving on, sanity-check that the four files stayed in sync — the
   edited array should have the same length across all four, which catches a
   forgotten language:
   `node -e "['de','en','es','pt'].forEach(l=>console.log(l, JSON.parse(require('fs').readFileSync('data/cv.'+l+'.json')).projects.length))"`
   (swap `projects` for the array you touched).

3. **Match the schema.** Use the exact entry shapes for each section — they're
   documented in `.claude/rules/content.md`. A few things that bite:
   - Keep the schema **additive**: the website consumes these files, so add new
     keys but never rename or remove existing ones.
   - Keep entries **positionally aligned**: a given project/job/etc. must sit at
     the same array index in all four files, since each language renders in
     array order — a new entry goes in the same position everywhere.
   - Ongoing dates use the language's own word: `heute` (DE), `Present` (EN),
     `actualidad` (ES), `atualmente` (PT). A `"to"` of `null` renders just the
     start year.
   - The `--personal` build uses the `*Personal` keys
     (`projectsNotePersonal`, `labels.sections.profilePersonal`); the twiceD
     build uses their plain counterparts. Update both sides when relevant.

4. **Regenerate the outputs.** Run `./generate_all.sh` from the repo root. This
   rebuilds all 8 DOCX variants (twiceD + personal × 4 languages) and converts
   them to PDF via LibreOffice. The Node `ExperimentalWarning: localStorage`
   line is harmless.

5. **Stage the regenerated files.** The DOCX/PDF outputs are committed binaries
   that the website links to, so they're part of the change. `git add` the
   touched JSON files and the regenerated `*_Daniel_Deusing_*.docx/pdf`. Leave
   the actual commit to the user unless they asked you to commit.

## Verifying

Confirm the change landed by inspecting an output rather than trusting the run,
e.g. `pdftotext Daniel_Deusing_DE.pdf - | grep -i "<new text>"`. Spot-check at
least one twiceD and one personal output if the edit touches variant-specific
content.

## Out of scope

Layout and styling — brand colors, fonts, sizes, spacing, section order, the
variant gating logic — live in the generator scripts and `.claude/rules/
generators.md`, not here. If the request is "make the headers bigger" or "change
the accent color", that's a generator change, not a content change.
