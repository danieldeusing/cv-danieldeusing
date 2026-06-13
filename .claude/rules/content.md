---
paths:
  - data/*.json
---

# CV Content (data/cv.*.json)

`cv.de.json`, `cv.en.json`, `cv.es.json`, `cv.pt.json` share an identical schema
and differ only in language.

## Editing rules

- Every content change must land in **all four** files, properly translated —
  never copy untranslated text across files.
- Schema changes must be **additive**: the danieldeusing.de website reads these
  files directly. Add new keys; never rename or remove existing ones.
- `projectsNotePersonal` and `labels.sections.profilePersonal` are used only by
  the `--personal` build; their non-`Personal` counterparts by the twiceD build.
- After editing, regenerate and commit outputs: `./generate_all.sh`.

## Schema

Top-level keys: `language`, `person`, `company`, `profile`, `strengths`,
`skills`, `projectsNote`, `projectsNotePersonal`, `projects`, `employment`,
`education`, `certificates`, `awards`, `languages`, `labels`.

Entry shapes (all keys required unless noted):

```jsonc
// skills[]
{ "category": "Programming", "items": ["Java", "Python", "..."] }

// strengths[]  — rendered as the "Key Strengths" section (bold title – text)
{ "title": "Rapid production debugging", "text": "One or two sentences." }

// projects[]
{
  "title": "Name – Short Description",
  "client": "Client",
  "role": "Role",
  "from": "2022",
  "to": "Present",          // or a year; null renders the single "from" year
  "description": "One-line summary.",
  "bullets": ["..."],
  "technologies": ["Tech1", "Tech2"]
}

// employment[]
{ "from": "2018", "to": "Present", "role": "...", "company": "..." }

// education[]
{ "year": "2014", "degree": "...", "institution": "...", "thesis": "Thesis: ..." }

// certificates[]
{ "year": "2013", "title": "...", "details": "..." }   // details may be null

// awards[]
{ "year": "2014", "title": "...", "details": "..." }

// languages[]
{ "language": "French", "level": "Basic", "muted": true }  // muted optional → gray
```

`profile` is an array of paragraphs; each paragraph is an array of runs
`{ "text": "...", "bold": true }` (`bold` optional).

## Ongoing-date wording (per language)

`heute` (DE) · `Present` (EN) · `actualidad` (ES) · `atualmente` (PT).

## Common tasks

- **Add a project / employment / education / award**: append an entry of the
  shape above to the matching array in all four JSON files, then regenerate.
- **Add a skill category**: append `{ "category": "...", "items": ["..."] }` to
  `skills` in all four files.
