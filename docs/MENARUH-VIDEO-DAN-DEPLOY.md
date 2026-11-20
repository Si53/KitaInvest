# Menaruh Video & Men-deploy

Video tugas **tidak masuk git** (25 MB, dan GitHub menolak file > 100 MB per commit
serta menggelembungkan riwayat repo selamanya). Ia hidup di folder `dist/` saat
aplikasi disajikan, dan `dist/` sendiri sudah di-gitignore.

## Kalau repo baru dikloning di mesin lain

```bash
npm install
mkdir -p video-src                     # folder ini di-gitignore
# taruh 3 berkas ini ke video-src/:
#   kitainvest-kirim.mp4   (1080p, 25,4 MB)
#   kitainvest-720p.mp4    (720p, 10,2 MB)
#   Script-Video-KitaInvest-Kelompok-Yuhen.md

npm run build:video                    # build + salin berkas ke dist/video/
```

Atau arahkan ke folder lain tanpa menyalin:

```bash
VIDEO_SRC=/path/ke/folder/berisi/tiga/berkas npm run build:video
```

Hasilnya: `dist/video/` berisi ketiga berkas + `index.html` (halaman unduhan).
Sajikan `dist/` dengan server statis apa pun, lalu buka:

```
http://<host>/video/            → halaman unduhan
http://<host>/video/kitainvest-kirim.mp4
```

## Kenapa ada skrip terpisah

`vite build` membersihkan seluruh isi `dist/`, jadi video yang ditempel manual
selalu hilang setiap build. `scripts/taruh-video.sh` menyalinnya kembali, dan
`npm run build:video` merangkai keduanya jadi satu perintah. Tanpa ini, video
hilang diam-diam dan halaman unduhan jadi 404 total.

## Deploy (rencana minggu ke-6)

Karena semuanya statis, tidak ada backend yang perlu dijalankan:

```bash
npm run build:video
# lalu sajikan folder dist/ sebagai root situs
```

- **Nginx:** `root /srv/kitainvest/dist;` + `try_files $uri $uri/ /index.html;`
- **Docker:** image `nginx:alpine`, `COPY dist/ /usr/share/nginx/html/`
- **Hosting statis** (Netlify/Vercel/Pages): publish directory = `dist/`

Catatan: hosting statis biasanya **tidak** menyimpan file 25 MB dalam repo gratis
sebagai artefak build — kalau kebutuhan utamanya adalah video yang bisa diunduh,
taruh berkasnya di rilis GitHub (Release asset) atau object storage, lalu ubah
`href` di `scripts/halaman-unduhan.html`. Untuk demo tugas, menyajikan `dist/`
dari VM kampus sudah cukup.
