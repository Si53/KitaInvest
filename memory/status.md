# LAPORAN STATUS PROYEK KITAINVEST
**Tugas Besar Sistem Multimedia 2026**  
**Kelompok 1:** Sion Marcelyo Gunawan & Yuhen Aditya Gunawan  
**Master Agent (Hermes Orchestrator)**  
**Tanggal Update:** 17 Oktober 2026  

---

## 1. Ringkasan Eksekutif & Roadmap 6 Minggu

| Minggu | Fokus / Fase | Penanggung Jawab | Status |
|---|---|---|---|
| **Minggu 1 & 3** | **Inisialisasi Lingkungan, Financial Engine, Arsitektur State & Alur Onboarding** | **Master Agent, Agent 5, Agent 6, Agent 2** | **SELESAI (100%)** |
| **Minggu 4** | **5 Topik Pembelajaran, Kuis Interaktif, Infografik, Animasi Pertumbuhan Saldo, Perjalanan Belajar** | **Agent 3 (Sion) & Agent 4 (Sion)** | **SELESAI (100%)** |
| **Minggu 5** | **Antarmuka Rencana & Simulasi Interaktif, Chart.js Responsif, Evaluasi Target Dana** | **Agent 5 (Yuhen) & Agent 4 (Sion)** | **SELESAI (100%)** |
| Minggu 6 | Audit QA Menyeluruh, Pengujian Skenario Ekstrem, Kontainerisasi Docker & VM Nginx Deployment | Agent 6 & Master Agent | Siap Dikerjakan |

---

## 2. Rincian Eksekusi Fase Inisialisasi (Minggu 1 & 3)

### Tahap 1: Pembentukan Struktur Direktori Sesuai Batas Domain RULES.md
- **Status:** SELESAI
- Struktur direktori terisolasi penuh untuk mencegah *race condition* antar agen:
  - `Master Agent`: `/kitainvest/memory/`, `/kitainvest/docs/`
  - `Agent 2`: `/src/pages/onboarding/`, `/src/context/`, `/src/utils/storage.js`, `/src/components/common/`
  - `Agent 3`: `/src/pages/learning/`, `/src/pages/journey/`, `/src/data/topics/`, `/src/components/quiz/`
  - `Agent 4`: `/src/assets/media/`, `/src/components/media/`, `/src/styles/`
  - `Agent 5`: `/src/engine/`, `/src/pages/simulation/`, `/src/components/charts/`
  - `Agent 6`: `/tests/`, `/deploy/`, `Dockerfile`, `nginx.conf`
  - `Agent 7`: `/tests/ui/`, `/src/styles/`, UI/UX Audit & Component Layouts (Dilarang mengubah `/src/engine/` & `/src/utils/storage.js`)

### Tahap 2: Inisialisasi Proyek & Toolchain
- **Status:** SELESAI
- **Tech Stack Terpasang:**
  - Vite `^8.3.4` + `@vitejs/plugin-react` `^6.1.2`
  - React `19.2.0` & React-DOM `19.2.0` (ES2022)
  - Chart.js `^4.5.1` & react-chartjs-2 `^5.3.1`
  - Vitest `^5.0.5`
- Konfigurasi: `vite.config.js`, `package.json`, `index.html`.
- Verifikasi Build: `npm run build` sukses 100% tanpa error.

### Tahap 3: Delegasi Agent 5 (Financial Engine) & Agent 6 (Unit Testing)
- **Status:** SELESAI & LULUS PENGUJIAN 100%
- Berkas Mesin: `/src/engine/calculator.js`
- Rumus Eksak Diimplementasikan:
  1. $r_{bulanan} = (1 + r_{tahunan})^{1/12} - 1$
  2. Setoran akhir bulan: $Saldo\_Nominal_t = Saldo\_Nominal_{t-1} \times (1 + r_{bulanan}) + Setoran\_Bulanan$
  3. Akumulasi modal: $Akumulasi\_Modal_t = Dana\_Awal + (Setoran\_Bulanan \times t)$
  4. Faktor inflasi & daya beli: $Faktor\_Inflasi_t = (1 + i_{tahunan})^{t/12}$, $Daya\_Beli_t = \frac{Saldo\_Nominal_t}{Faktor\_Inflasi_t}$
  5. Evaluasi pencapaian target dana (Bulan pencapaian pertama & kekurangan dana pada bulan akhir).
- **Hasil Pengujian Vitest (`/tests/calculator.test.js`):**
  - Kasus 1 (Akumulasi 0%): Dana Awal Rp1.000.000 + Setoran Rp100.000 (12 bln, bunga 0%) = **Tepat Rp2.200.000** (Akumulasi, Saldo Nominal, Daya Beli).
  - Kasus 2 (Bunga Majemuk 12%): Dana Awal Rp1.000.000 + Setoran Rp0 (12 bln, bunga 12%) = **Tepat Rp1.120.000**.
  - Kasus 3 (Format Desimal 0.12): Berfungsi konsisten.
  - Kasus 4 (Inflasi 10%): Penurunan daya beli terverifikasi akurat.
  - Kasus 5 (Validasi Input): Menolak angka negatif, input kosong, dan pertumbuhan/inflasi $\le -100\%$.

### Tahap 4: Delegasi Agent 2 (Core App, State Management & Alur Onboarding)
- **Status:** SELESAI
- **Pemisahan State Mutlak (Storage vs Memory):**
  - `/src/utils/storage.js`: Mengelola data persisten di `window.localStorage` (hanya kategori, topik selesai, skor kuis, level belajar, lencana) dengan mekanisme fallback aman jika storage diblokir.
  - `/src/context/AppContext.jsx`: Seluruh angka keuangan disimpan murni di memori React (`In-Memory State`). Saat tab dimuat ulang (*reload*), angka keuangan terhapus kembali kosong, sedangkan progres belajar tetap utuh di `localStorage`.
- **Halaman yang Telah Dibangun & Diuji:**
  1. `HomePage.jsx`: Brand KitaInvest, slogan "Belajar. Rencanakan. Tumbuhkan.", tombol CTA Mulai, gambaran materi, dan *disclaimer* edukasi eksplisit.
  2. `CategorySelectPage.jsx`: Pemilihan 3 kategori peran (Pelajar, Pekerja, Pensiunan) dengan contoh studi kasus pembuka masing-masing.
  3. `ProfileFormPage.jsx`: Formulir spesifik per peran (Pelajar: Uang Saku & Tabungan; Pekerja: Pendapatan, Pengeluaran & Tabungan; Pensiunan: Dana Dimiliki, Pemasukan Rutin & Pengeluaran) dilengkapi validasi inline anti-negatif.
  4. `SummaryPage.jsx`: Ringkasan data profil beserta perhitungan otomatis selisih bulanan (`Pemasukan - Pengeluaran`) dengan catatan edukasi bahwa selisih bukan otomatis dana siap diinvestasikan. Menyediakan tombol *Ubah Data* dan *Lanjut ke Dasbor*.
  5. `DashboardPage.jsx`: Hub navigasi ke 3 pilar (Belajar, Rencana & Simulasi, Perjalanan Belajar), status profil in-memory, visualisasi kemajuan belajar, dan tombol reset catatan belajar.
- **Hasil Pengujian Vitest (`/tests/storage.test.js`):**
  - Verifikasi penyimpanan persisten & kalkulasi gamifikasi.
  - Verifikasi simulasi reload halaman: angka keuangan terhapus, data belajar di localStorage tetap utuh.

---

## 3. Log Pengujian Terpadu (QA Test Run)

```text
RUN  v5.0.5 /home/ubuntu/kitainvest

 ✓ tests/calculator.test.js (5 tests)
   ✓ 1. Test Akumulasi Nol Persen: Dana Awal = 1.000.000, Setoran = 100.000, 12 bulan, pertumbuhan 0%, inflasi 0% menghasilkan tepat Rp2.200.000
   ✓ 2. Test Pertumbuhan Majemuk 12%: Dana Awal = 1.000.000, Setoran = 0, 12 bulan, pertumbuhan 12% menghasilkan tepat Rp1.120.000
   ✓ 3. Test Pertumbuhan Majemuk 12% dengan input desimal (0.12)
   ✓ 4. Test Efek Inflasi terhadap Daya Beli
   ✓ 5. Test Validasi Input

 ✓ tests/storage.test.js (5 tests)
   ✓ Menyimpan dan memuat pilihan kategori pengguna di localStorage
   ✓ Menyimpan dan memuat progres belajar dan kalkulasi gamifikasi
   ✓ 5 topik selesai menghasilkan 100% dan lencana Semua Topik Selesai
   ✓ Test Sesi & Storage: Simulasi reload halaman menghapus angka keuangan di memori, tetapi mempertahankan kemajuan belajar di localStorage
   ✓ Menghapus data pembelajaran (clearStoredLearningData)

Test Files  2 passed (2)
     Tests  10 passed (10)
  Duration  330ms
```

---

## 4. Rincian Eksekusi Modul Pembelajaran & Gamifikasi (Minggu 4 - Fase 1)
- **Status:** SELESAI (100%) & Terverifikasi
- **Pekerjaan Selesai:**
  1. `Agent 3 - Materi Belajar & Kuis`:
     - `/src/data/topics/topicsData.js`: 5 topik finansial lengkap (Pengelolaan Uang, Tujuan Keuangan, Risiko, Bunga Majemuk, Inflasi & Daya Beli), sudut pandang peran dinamis, dan penyesuaian urutan materi per kategori peran.
     - `/src/components/quiz/QuizComponent.jsx`: Sistem kuis pilihan ganda, kunci validasi jawaban, feedback instan dengan penjelasan jawaban benar/salah, fitur ulangi kuis, dan pencatatan skor.
     - `/src/pages/learning/LearningPage.jsx`: Halaman membaca materi terstruktur, tab navigasi 5 topik responsif, integrasi media infografik & animasi, serta navigasi antar topik.
     - `/src/pages/journey/JourneyPage.jsx`: Halaman gamifikasi dengan indikator kemajuan belajar ((selesai/5)*100%), 3 level pemahaman (Awal, Sebagian Selesai, Seluruh Topik Selesai), 2 lencana (Topik Pertama Selesai & Semua Topik Selesai), tabel riwayat topik, dan tombol reset catatan belajar.
  2. `Agent 4 - Multimedia & Visual Asset`:
     - `/src/components/media/InfographicCard.jsx`: Visualisasi pemisahan modal setoran vs pertumbuhan majemuk dengan selector jangka waktu (1, 3, 5, 10 thn) dan stacked bar kontras tinggi.
     - `/src/components/media/GrowthAnimationPlayer.jsx`: Pemutar animasi pertumbuhan saldo bulan ke bulan yang mengikuti rumus hitung eksak `calculator.js`, dilengkapi tombol Play/Pause/Replay, timeline scrubber, pengatur kecepatan (1x/2x), dan transkrip teks pendamping lengkap.
     - `/src/styles/main.css`: Tambahan styling responsif untuk seluruh modul pembelajaran, kuis, infografik, animasi, dan gamifikasi.
  3. `Agent 6 - QA & Testing`:
     - `/tests/learning.test.js`: 6 kasus uji memvalidasi 5 topik wajib, struktur kuis, pergeseran urutan kategori peran, rumus gamifikasi, dan paritas rumus animasi dengan engine.
     - Hasil pengujian: **3 test files, 16 passed (100%)**.
  4. `Integrasi Navigasi & Web Server`:
     - `App.jsx` dan `Navbar.jsx` diperbarui untuk routing halaman Belajar dan Perjalanan Belajar.
     - Web server Vite berjalan aktif di port 5173.

---

## 5. Rincian Eksekusi Rencana & Simulasi Interaktif (Minggu 5)
- **Status:** SELESAI (100%) & Terverifikasi
- **Pekerjaan Selesai:**
  1. `Agent 5 - Financial Engine & Chart.js (Domain Yuhen)`:
     - `/src/components/charts/SimulationChart.jsx`: Grafik garis interaktif Chart.js dengan 3 kurva (*Akumulasi Modal* - garis putus biru, *Saldo Nominal* - garis hijau tebal, *Daya Beli Riil* - garis oranye terdiskon inflasi), garis pemandu target merah, dan tooltip interaktif dalam Rupiah.
     - `/src/pages/simulation/SimulationPage.jsx`: Halaman simulasi rencana dana lengkap dengan formulir konfigurasi parameter (Target Dana, Dana Awal, Setoran Rutin Bulanan Akhir Bulan, Jangka Waktu, Return Tahunan, Inflasi Tahunan), validasi inline anti-negatif, skenario cepat (*presets*), banner status pencapaian target, 4 metrik finansial terpadu, tabel breakdown bulanan (Bulan 0 s.d. N), dan disclaimer edukasi.
  2. `Agent 4 - Multimedia & Visual Asset (Domain Sion)`:
     - `/src/styles/main.css`: Styling responsif untuk form simulasi, banner status tercapai/belum tercapai, card grafik Chart.js, preset buttons, dan tabel rincian bulanan.
  3. `Agent 2 - Core App / Master`:
     - Menghubungkan route `currentPage === 'simulation'` di `App.jsx` dan navigasi di `Navbar.jsx`.
  4. `Agent 6 - QA & Testing`:
     - `/tests/simulation.test.js`: 6 kasus uji memvalidasi input simulasi, skenario target tercapai di tengah periode, modal awal >= target (Bulan 0), target belum tercapai (perhitungan defisit dana akhir), struktur data bulanan Chart.js, dan helper formatRupiah.
     - Hasil pengujian: **4 test files, 22 passed (100%)**.

---

## 6. Rincian Eksekusi Agent 7 (UI/UX Audit, Visual QA & Polish)
- **Status:** SELESAI (100%) & Terverifikasi
- **Pekerjaan Selesai:**
  1. `Perbaikan Form Validation & Error Styling`:
     - Menambahkan selektor CSS `.input-group-modern:has(.input-error)` dan `.input-modern.input-error` dengan border merah tajam `#EF4444` dan latar `#FFF5F5`.
     - Membungkus input `namaTujuan` pada `SimulationPage.jsx` dengan `.input-group-modern` agar tinggi, border, dan focus state konsisten.
  2. `Aksesibilitas Papan Ketik & Overflow`:
     - Menambahkan aturan `:focus-visible` global dengan outline hijau neon `#65D61E` dan glow lembut sesuai Proposal Bagian D.4.
     - Menambahkan `html, body { overflow-x: hidden; max-width: 100vw; }` untuk pencegahan mutlak *horizontal overflow* di ponsel.
  3. `Penyelarasan Warna Chart.js`:
     - Menyelaraskan kurva Saldo Nominal pada `SimulationChart.jsx` dengan palet hijau neon KitaInvest `#65D61E` dan kurva Akumulasi Modal dengan biru cerah `#3B82F6`.
  4. `Automated UI/UX Tests`:
     - Berkas: `/tests/ui/ui-ux.test.jsx` (10 skenario pengujian komprehensif menguji Navbar, Footer, Hero Section, Onboarding, Formulir Profil, Simulasi Rencana, Multimedia, Gamifikasi, Pemformatan Ribuan, dan Smooth Scrolling).
     - Hasil Pengujian: **5 test files, 36 passed (100%)**.
  5. `Perombakan & Pengayaan Modul Pembelajaran (Master Agent, Agent 3, 4, 7)`:
     - Hapus fitur "Intip Peran": Menghilangkan baris tab switcher dan divider pada kotak sudut pandang kasus di `LearningPage.jsx`; sekarang langsung menampilkan profil peran aktif dan studi kasusnya.
     - Pengayaan Materi 5 Topik (`topicsData.js`):
       * A. Pengantar & Konsep Dasar: 3-4 paragraf terstruktur per topik.
       * B. Kamus Istilah Penting: Kartu glosarium mini (Glosarium Cards) dengan ikon dan definisi istilah baru.
       * C. Simulasi Tabel / Bedah Angka Nyata: Aliran kas (Topik 1), Skenario waktu (Topik 2), Fluktuasi pasar modal (Topik 3), Efek bola salju compounding (Topik 4), Erosi daya beli inflasi (Topik 5) dengan format `Rp` dan pemisah ribuan.
       * D. Intisari Pembelajaran (Key Takeaways): 4 poin kesimpulan praktis per modul.
     - Komponen Video YouTube Responsif (`VideoPlayerCard.jsx`):
       * Rasio 16:9, border-radius 16px, bingkai gelap `#0B0F19`, non-autoplay (`autoplay=0`).
       * Video edukasi Bahasa Indonesia untuk kelima topik (`q59ekdLC7u8`, `CQa_-zbJ9Sg`, `Cgib1vmWEC8`, `RpF13dQurZ0`, `NmxeJmuOF1g`).
       * Collapsible panel "Ringkasan & Transkrip Inti Video" untuk mode hemat kuota / tanpa suara (muted).
     - Automated Tests diperluas dari 32 menjadi **36 passed tests (100%)** dan build Vite lolos tanpa error.
  6. `Smooth Scrolling & Transisi Halaman`:
     - Menambahkan `html { scroll-behavior: smooth; scroll-padding-top: 88px; }` dengan fallback `prefers-reduced-motion: reduce`.
     - Kustomisasi scrollbar tema gelap fintech `#0B0F19` & `#65D61E` (Webkit & Firefox).
     - Custom hook `useSmoothScrollToTop` untuk auto scroll-to-top saat navigasi halaman utama dan pergantian 5 topik belajar.
     - Transisi halus `pageFadeIn` (`0.35s cubic-bezier(0.22, 1, 0.36, 1)`) saat berganti halaman.
     - Smooth scroll pada tombol anchor Beranda ("Pelajari Caranya" ke `#keunggulan-platform`) dan tombol "Hitung Simulasi →" ke kartu hasil simulasi.
  6. `Zero Horizontal Overflow & Grid Metrik 2x2 pada Halaman Simulasi`:
     - Kunci kontainer utama `.simulation-main-container`: `max-width: 1280px; width: 100%; margin: 0 auto; padding: 2.25rem 24px 4.5rem 24px; box-sizing: border-box;`.
     - Layout 2 kolom: `grid-template-columns: 340px minmax(0, 1fr); gap: 24px;` dengan `min-width: 0; width: 100%; overflow: hidden;` pada kolom kanan.
     - Grid 4 Kartu Metrik diubah ke Grid 2x2 (`grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;`) dengan typography clamp `clamp(1.15rem, 1.5vw, 1.45rem)` sehingga kartu tidak terpotong dan angka Rupiah tampil lega.
     - Banner status kuning dan kartu Chart.js dijamin tidak pernah melebar keluar layar pada zoom 100%.
     - Format pemisah titik ribuan otomatis pada input form simulasi (`Target Dana`, `Modal Awal`, `Setoran Bulanan`) menggunakan `Intl.NumberFormat('id-ID')`.
  7. `Perbaikan Spasi & Isolasi Form Parameter vs Chart.js (Agent 5 & Agent 7)`:
     - Mengubah lebar kolom kiri parameter menjadi proporsional tetap: `grid-template-columns: 320px minmax(0, 1fr);` dan `max-width: 320px;` dengan padding kartu `20px`.
     - Menambah jarak antar kolom utama menjadi `gap: 36px;` untuk mencegah form menimpa elemen grafik.
     - Memperbaiki baris input berdampingan `.form-row-compact` (Return dan Inflasi) dengan `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px;` dan `box-sizing: border-box; width: 100%; min-width: 0;` sehingga tidak meluber keluar kartu.
     - Memberikan ruang aman kiri pada wrapper Chart.js `.chart-canvas-wrapper` (`padding-left: 12px;`) serta `layout.padding.left: 12` pada Chart.js options agar label sumbu Y "Jumlah Dana (Rupiah)" bernapas lega tanpa tabrakan.

---

## 7. Status Kesiapan Menuju Minggu ke-6 (Audit QA, Kontainerisasi & VM Deployment)
- Seluruh fitur aplikasi (Onboarding, Learning, Quiz, Infographic, Animation, Gamification, Simulation & Chart.js) telah selesai 100%, terverifikasi UI/UX, dan terintegrasi penuh.
- Pekerjaan berikutnya untuk Minggu ke-6:
  - Agent 6: Pembuatan berkas `Dockerfile`, konfigurasi `nginx.conf`, pengujian skenario ekstrem, dan deployment produksi ke web server Nginx VM.
