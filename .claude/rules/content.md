---
paths:
  - data/*.json
---

# CV Content (data/cv.*.json)

- `cv.de.json`, `cv.en.json`, `cv.es.json`, `cv.pt.json` share an identical
  schema and differ only in language. Every content change must land in all
  four files, properly translated — never copy untranslated text across files.
- Schema changes must be additive: the danieldeusing.de website reads these
  files directly. Add new keys; never rename or remove existing ones.
- Variant-specific keys: `projectsNotePersonal` and
  `labels.sections.profilePersonal` are used only by the `--personal` build;
  their non-`Personal` counterparts are used by the twiceD build.
- Entry shapes for `projects`, `employment`, and `education` are documented in
  `README.md` ("Content vs. Layout") — follow the existing entries.
- Dates: `"to": null` renders a single year; `"heute"` / `"Present"` /
  `"actualidad"` / `"atualmente"` for ongoing entries, per language.
- After editing, regenerate and commit outputs: `./generate_all.sh`.
