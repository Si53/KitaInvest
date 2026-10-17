# 📈 KitaInvest - Platform Edukasi & Simulasi Literasi Finansial

> **"Belajar. Rencanakan. Tumbuhkan."**  
> *Tugas Besar Sistem Multimedia 2026*  
> **Kelompok 1:** Sion Marcelyo Gunawan & Yuhen Aditya Gunawan

[![Vite](https://img.shields.io/badge/Vite-^8.3.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-^4.5.1-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0.5-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Tests](https://img.shields.io/badge/Automated%20Tests-36%20Passed%20(100%25)-65D61E)](#-pengujian--quality-assurance-qa)

---

## 🌟 Tentang KitaInvest

**KitaInvest** adalah aplikasi web edukasi literasi keuangan mandiri berbasis *Single Page Application* (SPA) yang dirancang untuk membantu masyarakat—khususnya kalangan **Pelajar**, **Pekerja**, dan **Pensiunan**—memahami prinsip dasar pengelolaan uang, manajemen risiko, efek pertumbuhan majemuk (*compound interest*), serta perlindungan daya beli terhadap inflasi.

Aplikasi ini beroperasi **100% di sisi klien (*client-side*)**, tanpa ketergantungan pada backend server atau database luar, sehingga seluruh simulasi keuangan bersifat aman, privat, bebas risiko finansial, dan murni untuk tujuan edukasi.

---

## 🚀 Fitur Unggulan

### 1. 🧭 Alur Masuk & Profil Dinamis (Onboarding)
- **3 Kategori Pengguna:** Pemilihan peran yang relevan:
  - **Pelajar / Mahasiswa:** Contoh kasus menyiapkan dana membeli laptop melalui tabungan uang saku berkala.
  - **Pekerja / Profesional:** Mengatur pendapatan bulanan, kebutuhan rutin, serta persiapan dana darurat.
  - **Pensiunan / Masa Tenang:** Menjaga likuiditas pengeluaran rutin dari dana simpanan yang sudah ada.
- **Formulir Profil Interaktif:** Validasi data input *inline* anti-angka negatif dengan pemisah ribuan otomatis (`Rp`).
- **Halaman Ringkasan & Dasbor:** Menghitung selisih pemasukan vs pengeluaran bulanan disertai catatan edukasi bahwa selisih bukan otomatis dana siap diinvestasikan.

### 2. 📚 Modul Pembelajaran Interaktif (5 Topik Wajib)
Setiap modul pembelajaran dirancang komprehensif dengan struktur baku:
1. **Pengelolaan Uang dan Aliran Kas:** Pemahaman arus kas masuk/keluar, kebutuhan vs keinginan, dan perbedaan esensial antara menabung vs berinvestasi tanpa aturan persentase yang kaku.
2. **Tujuan Keuangan dan Jangka Waktu:** Prinsip SMART, hubungan Target Dana, Modal Awal, dan Setoran Bulanan terhadap horizon waktu.
3. **Memahami Risiko dan Fluktuasi Nilai:** Menyadari potensi fluktuasi nilai di bawah modal awal dan mengapa asumsi *return* bukan jaminan keuntungan pasti.
4. **Setoran Berkala dan Pertumbuhan Majemuk:** Mekanisme *compounding interest* (efek bola salju) dan peran setoran akhir bulan.
5. **Inflasi dan Daya Beli Riil:** Ilustrasi penurunan daya beli uang tunai seiring waktu dan perhitungannya terhadap nilai riil.

Setiap modul dilengkapi:
- **A. Pengantar & Konsep Dasar:** Penjelasan mendalam minimal 3-4 paragraf terstruktur.
- **B. Kamus Istilah Finansial (Glossary Cards):** Kartu glosarium interaktif dengan ikon dan definisi istilah baru.
- **C. Simulasi Tabel / Bedah Angka Nyata:** Tabel perbandingan angka riil dalam format Rupiah (`Rp`) dan pemisah ribuan.
- **D. Intisari Pembelajaran (Key Takeaways):** Poin-poin kesimpulan praktis sebelum kuis.
- **Kuis Pilihan Ganda Interaktif:** Feedback instan dengan penjelasan jawaban benar/salah dan integrasi skor ke sistem gamifikasi.

### 3. 🎬 Multimedia Edukatif & Visual Asset
- **Pemutar Video YouTube Edukasi Bahasa Indonesia:**
  - Desain responsif rasio 16:9 dengan bingkai gelap modern (`#0B0F19`).
  - Mematuhi regulasi non-autoplay (`autoplay=0`)—video hanya berputar saat pengguna menekan tombol play.
  - Dilengkapi panel collapsible **"📄 Ringkasan & Transkrip Inti Video"** untuk pengguna dengan audio dimatikan (*muted*) atau hemat kuota.
- **Infografik Edukasi (*Stacked Bar*):** Visualisasi pemisahan modal setoran sendiri vs pertumbuhan majemuk dengan opsi horizon waktu (1, 3, 5, 10 tahun).
- **Pemutar Animasi Pertumbuhan Saldo:** Visualisasi bulan ke bulan yang mengikuti rumus hitung eksak mesin keuangan KitaInvest.

### 4. ⚙️ Rencana & Simulasi Interaktif (Financial Engine & Chart.js)
- **Simulasi Proyeksi Rencana Dana:** Konfigurasi Target Dana, Dana Awal, Setoran Bulanan (akhir bulan), Jangka Waktu (bulan), Asumsi Pertumbuhan Tahunan, dan Inflasi Tahunan.
- **Template Skenario Cepat (*Presets*):** Pilihan skenario siap pakai per peran (Laptop Belajar, Dana Darurat 6 Bulan, Proteksi Nilai Pensiun).
- **Grafik Interaktif Multi-Kurva (Chart.js):**
  - Garis Putus-putus Biru: **Akumulasi Modal** (total uang yang disetor sendiri).
  - Garis Hijau Neon Tebal: **Saldo Nominal** (akumulasi modal + hasil pertumbuhan).
  - Garis Oranye: **Daya Beli Riil** (saldo nominal terdiskon faktor inflasi kumulatif).
  - Garis Pemandu Merah: **Target Dana**.
- **Evaluasi Target Dana & Tabel Breakdown Bulanan:** Evaluasi bulan pertama target tercapai atau nominal defisit dana jika belum tercapai.

### 5. 🏆 Gamifikasi & Perjalanan Belajar
- **Persentase Kemajuan:** Dihitung transparan `(Topik Selesai / 5) * 100%`.
- **3 Tingkat Pemahaman:** *Awal*, *Sebagian Selesai*, dan *Seluruh Topik Selesai*.
- **2 Lencana Pencapaian:** Lencana *Topik Pertama Selesai* & *Semua Topik Selesai*.
- **Opsi Reset Data:** Pengguna dapat menghapus riwayat belajar kapan saja.

---

## 🔒 Privasi & Arsitektur Data

Aplikasi ini menerapkan pemisahan *state* yang tegas sesuai prinsip privasi:
- **`window.localStorage` (Data Persisten):** HANYA menyimpan data gamifikasi (kategori peran terpilih, ID topik yang selesai, skor kuis, dan lencana). Tersedia fallback aman jika penyimpanan peramban diblokir.
- **`React In-Memory State` (Data Sementara):** Seluruh angka keuangan (usia, uang saku, gaji, pengeluaran, tabungan, serta konfigurasi simulasi) HANYA disimpan di memori React. Saat halaman di-*reload* atau tab ditutup, seluruh angka finansial terhapus kembali kosong demi menjaga privasi pengguna.

---

## 🛠️ Tech Stack

- **UI Framework:** [React 19.2.0](https://react.dev/) (ES2022)
- **Build Tool & Dev Server:** [Vite 8.3.4](https://vitejs.dev/)
- **Visualisasi Grafik:** [Chart.js 4.5.1](https://www.chartjs.org/) & [react-chartjs-2 5.3.1](https://react-chartjs-2.js.org/)
- **Styling:** Custom CSS Responsif (Fintech Dark/Light System, Zero Horizontal Overflow, Accessibility Focus Rings)
- **Test Runner:** [Vitest 5.0.5](https://vitest.dev/)

---

## 📂 Struktur Direktori Proyek

```text
kitainvest/
├── public/                 # Aset publik statis (hero background & ilustrasi)
├── memory/                 # Dokumen arsitektur, aturan domain (RULES.md), dan status kerja
├── src/
│   ├── assets/media/       # File media gambar & ilustrasi
│   ├── components/
│   │   ├── charts/         # Komponen grafik garis Chart.js (SimulationChart.jsx)
│   │   ├── common/         # Komponen bersama (Navbar, Footer, Alert)
│   │   ├── media/          # GrowthAnimationPlayer, InfographicCard, VideoPlayerCard
│   │   └── quiz/           # Kuis interaktif (QuizComponent.jsx)
│   ├── context/            # React Context untuk manajemen state in-memory (AppContext.jsx)
│   ├── data/topics/        # Sumber data 5 modul materi, kuis, studi kasus & video
│   ├── engine/             # Mesin matematika keuangan murni (calculator.js)
│   ├── pages/
│   │   ├── onboarding/     # HomePage, CategorySelectPage, ProfileFormPage, SummaryPage, DashboardPage
│   │   ├── learning/       # Halaman membaca materi & kuis (LearningPage.jsx)
│   │   ├── simulation/     # Halaman rencana & simulasi (SimulationPage.jsx)
│   │   └── journey/        # Halaman gamifikasi (JourneyPage.jsx)
│   ├── styles/             # Stylesheet terpadu (main.css)
│   ├── utils/              # Helper formatters, storage fallback, smooth scroll
│   ├── App.jsx             # Root router & page dispatcher
│   └── main.jsx            # Entry point aplikasi
├── tests/                  # Unit test & UI automated test suite
│   ├── calculator.test.js  # Pengujian matematika bunga majemuk & inflasi
│   ├── learning.test.js    # Pengujian modul materi, video, kuis & gamifikasi
│   ├── simulation.test.js  # Pengujian mesin simulasi target dana & skenario
│   ├── storage.test.js     # Pengujian localStorage & pemisahan in-memory state
│   └── ui/ui-ux.test.jsx   # Pengujian render komponen UI, form, & aksesibilitas
├── index.html              # Template HTML utama
├── package.json            # Daftar dependensi & scripts
└── vite.config.js          # Konfigurasi Vite & Vitest
```

---

## 🧪 Pengujian & Quality Assurance (QA)

Pengujian unit dan pengujian komponen UI otomatis diintegrasikan menggunakan **Vitest**:

```bash
npm run test
```

### Ringkasan Hasil Pengujian Terakhir:
```text
Test Files  5 passed (5)
     Tests  36 passed (36)
  Duration  ~950ms
```

Daftar cakupan pengujian:
1. `tests/calculator.test.js`: Akumulasi modal bunga 0%, bunga majemuk 12%, penanganan desimal, penurunan daya beli inflasi, dan validasi input batas.
2. `tests/learning.test.js`: Validasi 5 topik wajib, kuis & penjelasan jawaban, pengacakan urutan topik berdasarkan kategori peran, formula gamifikasi, paritas rumus animasi dengan engine, pengantar 3-4 paragraf, glosarium, tabel studi kasus format `Rp`, dan 5 video YouTube non-autoplay.
3. `tests/simulation.test.js`: Simulasi target tercapai di tengah periode, modal awal >= target (Bulan 0), target belum tercapai (defisit dana akhir), struktur data Chart.js, dan helper formatRupiah.
4. `tests/storage.test.js`: Persistence data gamifikasi di `localStorage`, simulasi reload menghapus angka keuangan di memori, dan fungsi reset catatan belajar.
5. `tests/ui/ui-ux.test.jsx`: Navbar & Footer bersih, Hero section, pemilihan 3 peran, form profil, parameter simulasi, multimedia & transkrip, gamifikasi, format ribuan, smooth scroll, serta verifikasi penghapusan tombol "Intip Peran".

---

## 💻 Panduan Instalasi & Menjalankan Proyek

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18.x atau lebih baru
- `npm` versi 9.x atau lebih baru

### 1. Kloning Repositori
```bash
git clone https://github.com/Si53/KitaInvest.git
cd KitaInvest
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser pada tautan lokal `http://localhost:5173`.

### 4. Menjalankan Pengujian Otomatis
```bash
npm run test
```

### 5. Membangun Bundle Produksi (*Build*)
```bash
npm run build
```
Hasil build produksi akan dibuat di folder `dist/`.

---

## ⚖️ Penafian Edukasi (Disclaimer)

Aplikasi **KitaInvest** dikembangkan murni sebagai instrumen media edukasi literasi keuangan mandiri untuk Tugas Besar Sistem Multimedia 2026. Aplikasi ini **tidak melayani** penghimpunan dana, transaksi keuangan riil, penjualan produk investasi, penasihat keuangan berlisensi, maupun penarikan data harga pasar waktu nyata (*real-time market data*). Seluruh proyeksi dan simulasi angka menggunakan model matematika rata-rata untuk tujuan ilustrasi belajar.

---

© 2026 **KitaInvest** — *Kelompok 1: Sion Marcelyo Gunawan & Yuhen Aditya Gunawan*.
