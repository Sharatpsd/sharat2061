#!/usr/bin/env bash
# Prints resume/resume.html to a one-page A4 PDF in public/.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="public/Sharat_Acharja_Mugdho_Resume.pdf"
google-chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$OUT" "file://$PWD/resume/resume.html" 2>/dev/null
echo "Wrote $OUT"
