#!/bin/bash
# taruh-video.sh — menaruh berkas unduhan ke dist/video/ SETELAH `npm run build`.
#
# Kenapa perlu: Vite membersihkan seluruh isi dist/ setiap build, jadi video yang
# ditempel manual di dalamnya selalu hilang. Skrip ini menyalinnya kembali.
#
# Pakai:
#   npm run build && bash scripts/taruh-video.sh
# atau sekali jalan:  npm run build:video
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
SRC="/home/ubuntu/lab/kitainvest-video/out"
DST="$REPO/dist/video"

if [ ! -d "$REPO/dist" ]; then
  echo "✗ dist/ belum ada. Jalankan 'npm run build' dulu." >&2
  exit 1
fi
if [ ! -d "$SRC" ]; then
  echo "✗ Sumber video tidak ada di $SRC" >&2
  exit 1
fi

mkdir -p "$DST"
for f in kitainvest-kirim.mp4 kitainvest-720p.mp4 Script-Video-KitaInvest-Kelompok-Yuhen.md; do
  if [ -f "$SRC/$f" ]; then
    cp -f "$SRC/$f" "$DST/$f"
    printf '✓ %-46s %s\n' "$f" "$(du -h "$DST/$f" | cut -f1)"
  else
    echo "⚠ tidak ditemukan: $SRC/$f" >&2
  fi
done

# halaman unduhan (index.html) ikut disalin bila ada di repo
if [ -f "$REPO/scripts/halaman-unduhan.html" ]; then
  cp -f "$REPO/scripts/halaman-unduhan.html" "$DST/index.html"
  echo "✓ index.html (halaman unduhan)"
fi

echo "→ siap: $DST"
