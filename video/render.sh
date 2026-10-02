#!/usr/bin/env bash
# Renders docs/cv-preview.gif: the English CV, personal and twiceD variants scrolling side by side.
# Run after ./generate_all.sh so the PDFs are current. Needs poppler (pdftoppm, pdfinfo).
set -euo pipefail
cd "$(dirname "$0")"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

pages() { pdfinfo "$1" | awk '/^Pages:/{print $2}'; }

mkdir "$tmp/public"
pdftoppm -png -r 110 ../Daniel_Deusing_EN.pdf "$tmp/public/personal"
pdftoppm -png -r 110 ../TD_Daniel_Deusing_EN.pdf "$tmp/public/twiced"

npx remotion render src/index.jsx CvPreview "$tmp/preview.mp4" --public-dir="$tmp/public" \
  --props="{\"personal\":$(pages ../Daniel_Deusing_EN.pdf),\"twiced\":$(pages ../TD_Daniel_Deusing_EN.pdf)}"

# A shared palette with few colours keeps a scrolling document GIF near 4 MB instead of 20+.
npx remotion ffmpeg -loglevel error -y -i "$tmp/preview.mp4" -r 10 \
  -vf "scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=32:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle" \
  ../docs/cv-preview.gif
