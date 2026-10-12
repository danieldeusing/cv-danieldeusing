#!/usr/bin/env bash
# Generates all CV variants (twiceD + personal, DE/EN/ES/PT) and converts them to PDF.
set -euo pipefail
cd "$(dirname "$0")"

for lang in de en es pt; do
  node create_cv.js "$lang"
  node create_cv.js "$lang" --personal
done

for tool in soffice pdffonts; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "$tool not on PATH — DOCX built, but skipping PDF conversion. See README." >&2
    exit 1
  fi
done

# LibreOffice 26.8 on macOS no longer sees the system's fonts, only the ones it manages itself.
# A throwaway profile with Nunito in its user/fonts folder is a font source it still reads.
shopt -s nullglob
nunito=("$HOME"/Library/Fonts/Nunito*.ttf /Library/Fonts/Nunito*.ttf)
if (( ${#nunito[@]} == 0 )); then
  echo "Nunito is not installed (~/Library/Fonts or /Library/Fonts) — the PDFs would use another font." >&2
  exit 1
fi
profile=$(mktemp -d)
trap 'rm -rf "$profile"' EXIT
mkdir -p "$profile/user/fonts"
cp "${nunito[@]}" "$profile/user/fonts/"

pdfs=(TD_Daniel_Deusing_{DE,EN,ES,PT}.pdf Daniel_Deusing_{DE,EN,ES,PT}.pdf)
soffice -env:UserInstallation="file://$profile" --headless --convert-to pdf "${pdfs[@]/%.pdf/.docx}"

# A PDF without Nunito once went live with serif fallback fonts; fail instead of shipping that.
for pdf in "${pdfs[@]}"; do
  pdffonts "$pdf" 2>/dev/null | grep -q Nunito ||{ echo "$pdf does not embed Nunito." >&2; exit 1; }
done
