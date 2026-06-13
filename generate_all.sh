#!/usr/bin/env bash
# Generates all CV variants (twiceD + personal, DE/EN/ES/PT) and converts them to PDF.
set -euo pipefail
cd "$(dirname "$0")"

for lang in de en es pt; do
  node "create_cv_${lang}.js"
  node "create_cv_${lang}.js" --personal
done

soffice --headless --convert-to pdf TD_Daniel_Deusing_{DE,EN,ES,PT}.docx Daniel_Deusing_{DE,EN,ES,PT}.docx
