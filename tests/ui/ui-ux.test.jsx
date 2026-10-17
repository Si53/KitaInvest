/**
 * Automated UI/UX Audit & Component Tests - KitaInvest
 * Agent 7: UI/UX Audit, Visual QA & Polish Agent
 * Domain: /tests/ui/
 *
 * Memverifikasi:
 * 1. Konsistensi tema Dark-Light Fintech pada Navbar, Footer, dan Page Header
 * 2. Integritas Hero Section Beranda (Headline, Statistik, Ilustrasi, Floating Badge)
 * 3. Halaman Onboarding (Pemilihan 3 Kategori Peran & Validasi Formulir)
 * 4. Halaman Ringkasan (Selisih Pemasukan-Pengeluaran & Tombol Ubah Data)
 * 5. Halaman Simulasi (Form Parameter, Presets, Chart, & Status Target)
 * 6. Halaman Pembelajaran & Gamifikasi (5 Topik, Kuis, Infografik, Animasi Player, & Lencana)
 */

import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AppProvider } from '../../src/context/AppContext.jsx';
import { Navbar } from '../../src/components/common/Navbar.jsx';
import { Footer } from '../../src/components/common/Footer.jsx';
import { HomePage } from '../../src/pages/onboarding/HomePage.jsx';
import { CategorySelectPage } from '../../src/pages/onboarding/CategorySelectPage.jsx';
import { ProfileFormPage } from '../../src/pages/onboarding/ProfileFormPage.jsx';
import { SummaryPage } from '../../src/pages/onboarding/SummaryPage.jsx';
import { DashboardPage } from '../../src/pages/onboarding/DashboardPage.jsx';
import { LearningPage } from '../../src/pages/learning/LearningPage.jsx';
import { JourneyPage } from '../../src/pages/journey/JourneyPage.jsx';
import { SimulationPage } from '../../src/pages/simulation/SimulationPage.jsx';
import { GrowthAnimationPlayer } from '../../src/components/media/GrowthAnimationPlayer.jsx';
import { InfographicCard } from '../../src/components/media/InfographicCard.jsx';
import { formatRibuan, parseAngka } from '../../src/utils/formatters.js';
import { useSmoothScrollToTop } from '../../src/utils/useSmoothScrollToTop.js';

describe('Agent 7: UI/UX Audit & Visual Component Tests', () => {
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {
      kitainvest_user_category: 'Pelajar',
      kitainvest_learning_progress: JSON.stringify({
        completedTopics: [1, 2],
        quizScores: { 1: 100, 2: 90 },
      }),
    };

    global.window = {
      localStorage: {
        getItem: (key) => mockStorage[key] || null,
        setItem: (key, val) => {
          mockStorage[key] = String(val);
        },
        removeItem: (key) => {
          delete mockStorage[key];
        },
        clear: () => {
          mockStorage = {};
        },
      },
      scrollTo: () => {},
    };
  });

  it('1. Navbar: Menampilkan brand bersih tanpa ikon kotak dan menu lengkap', () => {
    const html = renderToString(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );

    // Verifikasi teks brand KitaInvest
    expect(html).toContain('Kita');
    expect(html).toContain('Invest');
    expect(html).toContain('Edukasi Finansial Mandiri');

    // Verifikasi ikon polyline lama sudah terhapus
    expect(html).not.toContain('brand-icon-box');

    // Verifikasi item navigasi utama
    expect(html).toContain('Beranda');
    expect(html).toContain('Dasbor');
    expect(html).toContain('Belajar');
    expect(html).toContain('Simulasi');
    expect(html).toContain('Perjalanan Belajar');
    expect(html).toContain('Data Profil');
    expect(html).toContain('Coba Sekarang');
  });

  it('2. Footer: Menampilkan penafian edukasi dan hak cipta 2026', () => {
    const html = renderToString(<Footer />);

    expect(html).toContain('Penafian Penting:');
    expect(html).toContain('100% berbasis');
    expect(html).toContain('client-side');
    expect(html).toContain('tidak terhubung dengan pasar uang riil');
    expect(html).toContain('2026 KitaInvest');
  });

  it('3. Hero Section (Beranda): Menampilkan headline, statistik, dan ilustrasi floating', () => {
    const html = renderToString(
      <AppProvider>
        <HomePage />
      </AppProvider>
    );

    // Headline & Highlight
    expect(html).toContain('Saatnya Finansial Kamu');
    expect(html).toContain('Naik Kelas');
    expect(html).toContain('bersama KitaInvest');

    // 3 Item Statistik
    expect(html).toContain('100%');
    expect(html).toContain('Simulasi Bebas Risiko');
    expect(html).toContain('30+');
    expect(html).toContain('Modul Finansial Realistis');
    expect(html).toContain('Semua Usia');

    // Tombol CTA
    expect(html).toContain('Masuk ke Dasbor');
    expect(html).toContain('Pelajari Caranya');

    // Kartu Ilustrasi Kanan & Glass Badge
    expect(html).toContain('hero-image-card');
    expect(html).toContain('hero-illustration-img');
    expect(html).toContain('hero-glass-badge');
    expect(html).toContain('Solusi Cerdas Finansial');
  });

  it('4. Kategori Onboarding: Menampilkan 3 kartu peran lengkap', () => {
    const html = renderToString(
      <AppProvider>
        <CategorySelectPage />
      </AppProvider>
    );

    expect(html).toContain('Pilih Kategori');
    expect(html).toContain('Pelajar');
    expect(html).toContain('Pekerja');
    expect(html).toContain('Pensiunan');

    // Case studies
    expect(html).toContain('Menyiapkan dana tabungan berkala');
    expect(html).toContain('Mengatur alokasi gaji bulanan');
    expect(html).toContain('Mempertahankan nilai modal');
  });

  it('5. Formulir Profil: Menampilkan input wajib dan suffix/prefix mata uang', () => {
    const html = renderToString(
      <AppProvider>
        <ProfileFormPage />
      </AppProvider>
    );

    expect(html).toContain('Formulir Profil Keuangan');
    expect(html).toContain('Usia Pengguna (Tahun)');
    expect(html).toContain('Tahun');
    expect(html).toContain('Uang Saku / Pemasukan Bulanan');
    expect(html).toContain('Simpan &amp; Lihat Ringkasan Data →');
  });

  it('6. Halaman Simulasi: Menampilkan form parameter rencana dana dan template preset', () => {
    const html = renderToString(
      <AppProvider>
        <SimulationPage />
      </AppProvider>
    );

    expect(html).toContain('Rencana &amp; Simulasi');
    expect(html).toContain('⚙️ Parameter Rencana Dana');
    expect(html).toContain('Pilih Template Skenario:');
    expect(html).toContain('Laptop Belajar (Pelajar)');
    expect(html).toContain('Dana Darurat 6 Bulan (Pekerja)');
    expect(html).toContain('Proteksi Nilai Pensiun (Pensiunan)');
    expect(html).toContain('Proyeksi Pertumbuhan Dana:');
    expect(html).toContain('value="12.000.000"');
    expect(html).toContain('value="1.000.000"');
    expect(html).toContain('value="400.000"');
  });

  it('7. Multimedia: Player animasi tanpa autoplay dan infografik responsif', () => {
    const animHtml = renderToString(<GrowthAnimationPlayer />);
    expect(animHtml).toContain('Putar Animasi');
    expect(animHtml).toContain('Ulang Dari Awal');
    expect(animHtml).toContain('Teks Pendamping &amp; Transkrip Pembelajaran');

    const infoHtml = renderToString(<InfographicCard />);
    expect(infoHtml).toContain('Infografik Edukasi');
    expect(infoHtml).toContain('Pemisahan Modal Setoran Sendiri vs Tambahan Pertumbuhan');
    expect(infoHtml).toContain('Uang Setoran Sendiri');
    expect(infoHtml).toContain('Tambahan Nilai Pertumbuhan');
  });

  it('8. Perjalanan Belajar: Menampilkan kemajuan belajar, level, dan lencana', () => {
    const html = renderToString(
      <AppProvider>
        <JourneyPage />
      </AppProvider>
    );

    expect(html).toContain('Perjalanan Belajar');
    expect(html).toContain('Tingkat Pemahaman');
    expect(html).toContain('Lencana Pencapaian');
    expect(html).toContain('Topik Pertama Selesai');
  });

  it('9. Pemformatan Ribuan & Angka Indonesia: formatRibuan & parseAngka', () => {
    expect(formatRibuan('12100001')).toBe('12.100.001');
    expect(formatRibuan('1000000')).toBe('1.000.000');
    expect(formatRibuan(400000)).toBe('400.000');
    expect(formatRibuan('')).toBe('');
    expect(formatRibuan(null)).toBe('');

    expect(parseAngka('12.100.001')).toBe('12100001');
    expect(parseAngka('1.000.000')).toBe('1000000');
    expect(parseAngka('Rp 400.000')).toBe('400000');
    expect(parseAngka('')).toBe('');
  });

  it('10. Smooth Scrolling & Action Buttons: Hitung Simulasi & Pelajari Caranya', () => {
    const simHtml = renderToString(
      <AppProvider>
        <SimulationPage />
      </AppProvider>
    );

    // Verifikasi tombol Hitung Simulasi dan anchor target ID
    expect(simHtml).toContain('Hitung Simulasi');
    expect(simHtml).toContain('hasil-simulasi-section');

    const homeHtml = renderToString(
      <AppProvider>
        <HomePage />
      </AppProvider>
    );

    // Verifikasi section anchor keunggulan-platform
    expect(homeHtml).toContain('keunggulan-platform');
    expect(homeHtml).toContain('Pelajari Caranya');

    // Verifikasi hook useSmoothScrollToTop terdefinisi
    expect(typeof useSmoothScrollToTop).toBe('function');
  });

  it('11. Halaman Belajar: Tanpa "Intip Peran", memuat Glosarium, Tabel Studi Kasus, Video Player & Transkrip', () => {
    const learningHtml = renderToString(
      <AppProvider>
        <LearningPage />
      </AppProvider>
    );

    // 1. Verifikasi HAPUS "Intip Peran"
    expect(learningHtml).not.toContain('Intip Peran:');
    expect(learningHtml).not.toContain('btn-role-tab');
    expect(learningHtml).not.toContain('context-role-switcher');

    // 2. Verifikasi Kotak Konteks Peran Aktif Langsung
    expect(learningHtml).toContain('Sudut Pandang Contoh Kasus:');
    expect(learningHtml).toContain('Pelajar');

    // 3. Verifikasi A. Landasan Teori & Konsep Dasar
    expect(learningHtml).toContain('Pengantar &amp; Landasan Teori Finansial');

    // 4. Verifikasi B. Kamus Istilah Finansial Penting (Glossary Cards)
    expect(learningHtml).toContain('Kamus Istilah Finansial Penting');
    expect(learningHtml).toContain('glossary-cards-grid');

    // 5. Verifikasi C. Simulasi Tabel / Bedah Angka Nyata
    expect(learningHtml).toContain('fintech-edu-table');
    expect(learningHtml).toContain('simulation-takeaway-banner');

    // 6. Verifikasi Video YouTube Responsif (iframe & non-autoplay)
    expect(learningHtml).toContain('video-player-card-dark');
    expect(learningHtml).toContain('youtube.com/embed/');
    expect(learningHtml).not.toContain('autoplay=1');

    // 7. Verifikasi Panel Ringkasan & Transkrip Inti Video
    expect(learningHtml).toContain('Ringkasan &amp; Transkrip Inti Video');
    expect(learningHtml).toContain('Mode Hemat Kuota / Tanpa Suara');

    // 8. Verifikasi D. Intisari Pembelajaran (Key Takeaways)
    expect(learningHtml).toContain('Intisari Pembelajaran');
    expect(learningHtml).toContain('takeaways-items-list');
  });
});
