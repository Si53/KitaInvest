# WORKSPACE RULES: PROYEK KITAINVEST (TUGAS BESAR SISTEM MULTIMEDIA 2026)

Dokumen ini adalah Sumber Kebenaran Mutlak (Single Source of Truth) untuk seluruh Sub-Agent (Antigravity & Hermes) yang bekerja pada repositori KitaInvest. Setiap agen WAJIB mematuhi batasan arsitektur, direktori, dan rumus di bawah ini tanpa terkecuali.

---

## 1. PRINSIP ARSITEKTUR & TECH STACK UTAMA
- **Nama Aplikasi:** KitaInvest
- **Slogan:** "Belajar. Rencanakan. Tumbuhkan."
- **Sifat Aplikasi:** 100% Client-Side Single Page Application (SPA).
- **LARANGAN KERAS:** Dilarang membuat layanan backend, database server, autentikasi/akun pengguna, fitur transaksi uang asli, rekomendasi produk investasi tertentu, atau menarik harga pasar real-time (API eksternal).
- **Tech Stack Wajib:**
  - Bahasa: JavaScript dengan acuan standar ECMAScript 2022 (ES2022).
  - UI Library: React versi 19.2.
  - Build Tool: Vite.
  - Markup & Styling: HTML5 & CSS Responsif (wajib terbaca jelas di laptop/berdampingan dan ponsel/turun ke bawah tanpa perlu zoom).
  - Visualisasi Grafik: Chart.js (Line Chart).

---

## 2. ATURAN PENYIMPANAN & PRIVASI DATA (STORAGE & MEMORY)
- **Data Persisten (`window.localStorage`):**
  - HANYA menyimpan: Pilihan Kategori Pengguna (`Pelajar`, `Pekerja`, `Pensiunan`), daftar topik materi yang selesai, skor kuis terakhir, persentase kemajuan belajar, tingkat belajar, dan lencana.
  - Wajib menyediakan tombol/opsi untuk menghapus catatan belajar (`localStorage.clear()` / hapus key terkait).
  - Wajib memiliki mekanisme *fallback*: Jika `localStorage` diblokir atau tidak tersedia di peramban, aplikasi tetap berjalan normal selama sesi aktif dengan menampilkan pemberitahuan bahwa kemajuan tidak tersimpan.
- **Data Sesi Sementara (`React In-Memory State`):**
  - Seluruh angka keuangan (usia, uang saku, pendapatan bulanan, pengeluaran bulanan, tabungan, dana tersedia, serta input simulasi rencana dana) HANYA disimpan di dalam memori React selama sesi berlangsung.
  - Saat halaman dimuat ulang (`reload`) atau tab ditutup, seluruh angka keuangan WAJIB hilang dan kembali kosong, sedangkan kemajuan belajar tetap utuh di `localStorage`.

---

## 3. PEMBAGIAN ROLE AGEN & BATAS DIREKTORI (FILE BOUNDARIES)
Dilarang mengedit berkas di luar direktori yang telah ditugaskan untuk mencegah *race condition*:

1. **Master Agent (Hermes Orchestrator):** `/kitainvest/memory/`, `/kitainvest/docs/`
2. **Agent 2 - Core App, Flow & Storage (Domain Yuhen):** `/src/pages/onboarding/`, `/src/context/`, `/src/utils/storage.js`, `/src/components/common/`
3. **Agent 3 - Learning, Quiz & Gamification (Domain Sion):** `/src/pages/learning/`, `/src/pages/journey/`, `/src/data/topics/`, `/src/components/quiz/`
4. **Agent 4 - Multimedia & Visual Asset (Domain Sion):** `/src/assets/media/`, `/src/components/media/`, `/src/styles/`
5. **Agent 5 - Financial Engine & Chart.js (Domain Yuhen):** `/src/engine/`, `/src/pages/simulation/`, `/src/components/charts/`
6. **Agent 6 - QA, Testing & VM Deployment:** `/tests/`, `/deploy/`, `Dockerfile`, `nginx.conf`
7. **Agent 7 - UI/UX Audit, Visual QA & Polish Agent:**
   - **Batas Akses/Domain:** Pengujian UI/UX (`/tests/ui/`), perbaikan styling (`/src/styles/`), dan penyempurnaan tata letak komponen JSX (`/src/components/` & `/src/pages/`).
   - **LARANGAN MUTLAK:** Dilarang mengubah rumus matematika di `/src/engine/calculator.js` dan logika penyimpanan di `/src/utils/storage.js`.
---

## 4. SPESIFIKASI FITUR & LOGIKA PER HALAMAN

### A. Beranda & Alur Masuk (Agent 2)
- Menampilkan nama **KitaInvest**, slogan **"Belajar. Rencanakan. Tumbuhkan."**, gambaran materi & simulasi, tombol **Mulai**, serta *disclaimer* eksplisit bahwa aplikasi hanya untuk belajar dan tidak melayani pembelian produk investasi.
- Pilihan 3 Kategori Pengguna (usia tidak memindahkan kategori secara otomatis):
  1. **Pelajar:** Input Usia, Uang Saku/Pemasukan Bulanan (Rp/bulan), dan Tabungan (Rp). Contoh pembuka: Menyiapkan dana membeli laptop.
  2. **Pekerja:** Input Usia, Pendapatan Bulanan (Rp/bulan), Pengeluaran Bulanan (Rp/bulan), dan Tabungan (Rp). Contoh pembuka: Mengatur pendapatan dan kebutuhan bulanan.
  3. **Pensiunan:** Input Usia, Dana yang Sudah Dimiliki (Rp - kolom terpisah), Pemasukan Rutin Bulanan (Rp/bulan), dan Pengeluaran Bulanan (Rp/bulan).
- **Validasi Formulir:** Kolom wajib tidak boleh kosong dan angka dana tidak boleh negatif (`< 0`). Tampilkan pesan kesalahan spesifik di dekat kolom terkait.
- **Halaman Ringkasan & Dasbor:**
  - Menampilkan data yang baru diisi. Jika pemasukan dan pengeluaran bulanan sama-sama tersedia, hitung selisihnya (`Pemasukan - Pengeluaran`) disertai keterangan bahwa angka tersebut hanya hasil pengurangan dan tidak otomatis dianggap sebagai dana yang siap diinvestasikan.
  - Menyediakan tombol **Ubah Data** (kembali ke formulir tanpa meriset ulang seluruh proses) dan tombol **Lanjut** menuju Dasbor.
  - Dasbor memuat akses ke 3 menu utama: **Belajar**, **Rencana dan Simulasi**, serta **Perjalanan Belajar**. Mengubah kategori hanya mengubah contoh pembuka dan urutan, tanpa menghapus materi yang sudah selesai.

### B. Materi Pembelajaran, Multimedia, Kuis & Perjalanan Belajar (Agent 3 & Agent 4)
- **5 Topik Wajib:**
  1. Pengelolaan Uang (pemasukan, kebutuhan, tabungan, perbedaan menabung vs investasi; tidak mematok persentase wajib).
  2. Tujuan Keuangan dan Jangka Waktu (target dana, dana awal, setoran bulanan).
  3. Risiko (nilai investasi dapat turun dan hasil tidak selalu mengikuti asumsi).
  4. Setoran Berkala dan Pertumbuhan Majemuk (pertumbuhan bulan berikutnya dihitung dari saldo terbaru).
  5. Inflasi dan Daya Beli (kenaikan jumlah uang belum tentu sama dengan kenaikan kemampuan membeli barang).
- **Aturan Multimedia (Agent 4):**
  - Menyediakan infografik (memisahkan uang setoran vs tambahan nilai pertumbuhan dengan label dan warna yang jelas di ponsel).
  - Menyediakan animasi/video pendek pertumbuhan saldo dari bulan ke bulan yang **mengikuti rumus hitung yang sama persis dengan simulasi**.
  - Video baru berjalan setelah tombol **Putar (Play)** ditekan, serta dapat dihentikan (*pause*) atau diulang (*replay*).
  - Wajib menyertakan teks pendamping/transkrip agar materi tetap dapat dipelajari saat suara dimatikan (*muted*).
- **Aturan Kuis & Perjalanan Belajar (Agent 3):**
  - Kuis pilihan ganda di akhir tiap topik dengan penjelasan alasan jawaban benar/salah. Kuis boleh diulang dan jawaban salah tidak mengunci materi berikutnya.
  - Topik tercatat selesai setelah tombol selesai ditekan dan seluruh soal kuis dijawab.
  - **Perjalanan Belajar:** Persentase kemajuan = `(Jumlah Topik Selesai / 5) * 100%` (contoh: 2 topik = 40%). Memuat 3 tingkat belajar (Awal, Sebagian Selesai, Seluruh Topik Selesai) dan 2 lencana (Topik Pertama Selesai & Semua Topik Selesai). Tidak ada papan peringkat (*leaderboard*) atau kewajiban buka harian.

### C. Mesin Perhitungan Simulasi & Grafik Chart.js (Agent 5)
- Fungsi kalkulasi wajib dipisahkan di `/src/engine/calculator.js` (murni ES2022, terpisah dari komponen UI).
- **Validasi Input Rencana Dana:**
  - Input: Nama Tujuan (teks, misal "Dana Laptop"), Target Dana (`> 0`), Dana Awal (`>= 0`), Setoran Bulanan (`>= 0`), Jangka Waktu dalam bulan penuh (`> 0`), Asumsi Pertumbuhan Tahunan (`> -100%`), Asumsi Inflasi Tahunan (`> -100%`).
- **Rumus Matematika Eksak (Wajib Diikuti 100%):**
  1. Konversi Pertumbuhan Tahunan (`r_tahunan` dalam desimal) ke Tingkat Bulanan (`r_bulanan`):
     `r_bulanan = Math.pow(1 + r_tahunan, 1 / 12) - 1`
  2. Iterasi Saldo per Bulan `t` (dari `t = 1` hingga `N` bulan, dengan `Saldo_0 = Dana_Awal`):
     Setoran masuk pada **akhir bulan** dan tidak langsung memperoleh pertumbuhan di bulan yang sama:
     `Saldo_Nominal_t = (Saldo_Nominal_{t-1} * (1 + r_bulanan)) + Setoran_Bulanan`
     `Akumulasi_Modal_t = Dana_Awal + (Setoran_Bulanan * t)`
  3. Perhitungan Daya Beli setelah Inflasi (`i_tahunan` dalam desimal) pada bulan `t`:
     `Faktor_Inflasi_t = Math.pow(1 + i_tahunan, t / 12)`
     `Daya_Beli_t = Saldo_Nominal_t / Faktor_Inflasi_t`
  4. Evaluasi Pencapaian Target:
     - Bandingkan `Target_Dana` dengan `Saldo_Nominal_t`.
     - Catat bulan pertama kali `Saldo_Nominal_t >= Target_Dana`. Jika `Dana_Awal >= Target_Dana`, catat waktu pencapaian sebagai **Bulan 0**.
     - Jika pada akhir periode (`t = N`) saldo masih kurang dari target, tampilkan nominal kekurangannya. Tetap tampilkan status akhir meskipun sempat mencapai target di tengah jalan (karena pertumbuhan negatif dapat menurunkan saldo kembali).
- **Grafik Chart.js:**
  - Grafik garis (*Line Chart*) dengan sumbu X = Bulan (`0` s.d. `N`) dan sumbu Y = Rupiah.
  - Menampilkan 3 garis sekaligus dengan legenda jelas: **Akumulasi Dana**, **Saldo Nominal**, dan **Daya Beli**.

---

## 5. STANDAR PENGUJIAN WAJIB (QA AGENT 6)
Sebelum menyatakan build berhasil, pengujian unit (`vitest`) wajib meluluskan skenario berikut:
1. **Test Akumulasi Nol Persen:** `Dana Awal = 1.000.000`, `Setoran = 100.000`, `Waktu = 12 bulan`, `Pertumbuhan = 0%`, `Inflasi = 0%` -> Akumulasi, Saldo Nominal Akhir, dan Daya Beli wajib tepat **`Rp2.200.000`**.
2. **Test Pertumbuhan Majemuk 12%:** `Dana Awal = 1.000.000`, `Setoran = 0`, `Waktu = 12 bulan`, `Pertumbuhan Tahunan = 12%` -> Saldo Nominal Akhir wajib tepat **`Rp1.120.000`** (sebelum pembulatan tampilan).
3. **Test Sesi & Storage:** Simulasi reload halaman menghapus state angka keuangan, tetapi mempertahankan progres di `localStorage`.


7. **Agent 7 - UI/UX Audit, Visual QA & Polish Agent:**
   - **Tanggung Jawab:**
     * Menguji konsistensi visual (Design System Modern Fintech Dark-Light: `#0B0F19`, `#65D61E`, `#FFFFFF`, `#F8FAFC`) di seluruh halaman.
     * Menguji dan memperbaiki responsivitas layar (Desktop/Laptop vs Mobile/Ponsel) agar tidak ada elemen yang terpotong, bertumpuk, atau mengalami *horizontal overflow* (sesuai syarat proposal: terbaca jelas tanpa perlu memperbesar layar).
     * Menguji alur interaksi UX: navigasi tombol kembali/ubah data, pesan error validasi formulir di dekat kolom terkait, kontrol video/animasi (play, pause, replay) beserta transkrip saat suara mati, dan keterbacaan label infografik/grafik Chart.js.
     * Menulis pengujian komponen/UI otomatis di `/tests/ui/` dan memperbaiki CSS/layout JSX yang belum rapi.
   - **Lingkup Direktori (Batas Akses):**
     * Akses Utama: `/src/styles/`, `/tests/ui/`
     * Akses Perbaikan Terkoordinasi (hanya untuk atribut class/style/layout JSX melalui izin Master Agent, DILARANG mengubah fungsi di `/src/engine/calculator.js` dan `/src/utils/storage.js`): `/src/components/`, `/src/pages/`
