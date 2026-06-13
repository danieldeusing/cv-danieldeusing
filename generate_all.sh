#!/usr/bin/env bash
# Generates all CV variants (twiceD + personal, DE/EN/ES/PT) and converts them to PDF.
set -euo pipefail
cd "$(dirname "$0")"

for lang in de en es pt; do
  node create_cv.js "$lang"
  node create_cv.js "$lang" --personal
done

if ! command -v soffice >/dev/null 2>&1; then
  echo "soffice (LibreOffice) not on PATH — DOCX built, but skipping PDF conversion. See README." >&2
  exit 1
fi

soffice --headless --convert-to pdf TD_Daniel_Deusing_{DE,EN,ES,PT}.docx Daniel_Deusing_{DE,EN,ES,PT}.docx
