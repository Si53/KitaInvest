import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import heroIllustration from '../../assets/media/hero-illustration.png';

export function HomePage() {
  const { navigateTo, category } = useApp();

  const handleEnterDashboard = () => {
    navigateTo(category ? 'dashboard' : 'category');
  };

  const handleLearnHow = () => {
    const el = document.getElementById('keunggulan-platform');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigateTo('learning');
    }
  };

  const handleAccessSimulation = () => {
    navigateTo(category ? 'simulation' : 'category');
  };

  return (
    <div className="home-page-wrapper">
      {/* =========================================================
          3. HERO SECTION (DARK FINTECH #0B0F19 - #111827)
          ========================================================= */}
      <section className="landing-hero-outer">
        <div className="landing-hero-container">
          {/* Kolom Kiri */}
          <div className="hero-left-col">
            {/* a. Pill Badge Gelap */}
            <div className="hero-pill-badge">
              <span className="hero-pill-dot" aria-hidden="true">●</span>
              <span>Aplikasi Pembelajaran Finansial Mandiri</span>
            </div>

            {/* b. Headline Besar */}
            <h1 className="hero-headline">
              Saatnya Finansial Kamu{' '}
              <span className="text-lime-highlight">Naik Kelas</span>{' '}
              bersama KitaInvest
            </h1>

            {/* c. Paragraf Deskripsi & Disclaimer Rules */}
            <p className="hero-paragraph">
              Media edukasi interaktif untuk memahami dasar-dasar pengelolaan dana, simulasi
              pertumbuhan modal, pengaruh inflasi daya beli, dan membangun kebiasaan finansial yang
              sehat secara aman tanpa risiko.
            </p>
            <p className="hero-disclaimer-note">
              * Catatan: Aplikasi ini murni media edukasi simulasi finansial mandiri (client-side) tanpa risiko
              finansial nyata dan tidak melayani transaksi pembelian produk investasi.
            </p>

            {/* d. Dua Tombol Berdampingan */}
            <div className="hero-button-group">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={handleEnterDashboard}
              >
                Masuk ke Dasbor &rarr;
              </button>
              <button
                type="button"
                className="btn-hero-secondary"
                onClick={handleLearnHow}
              >
                Pelajari Caranya
              </button>
            </div>

            {/* e. Baris Statistik (3 Item) */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number-white">100%</span>
                <span className="stat-label">Simulasi Bebas Risiko</span>
              </div>
              <div className="stat-item">
                <span className="stat-number-lime">30+</span>
                <span className="stat-label">Modul Finansial Realistis</span>
              </div>
              <div className="stat-item">
                <span className="stat-number-white">Semua Usia</span>
                <span className="stat-label">Pelajar hingga Pensiun</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ilustrasi & Floating Glass Badge */}
          <div className="hero-right-col">
            <div className="hero-image-card">
              <img
                src={heroIllustration}
                alt="Ilustrasi Edukasi Finansial KitaInvest"
                className="hero-illustration-img"
                loading="eager"
              />

              {/* Floating Glassmorphism Badge */}
              <div className="hero-glass-badge">
                <div className="glass-badge-icon" aria-hidden="true">
                  <span>$</span>
                </div>
                <div className="glass-badge-text">
                  Solusi Cerdas Finansial - Untuk Pelajar, Pekerja & Keluarga
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. SECTION KEUNGGULAN PLATFORM (BACKGROUND PUTIH #FFFFFF)
          ========================================================= */}
      <section id="keunggulan-platform" className="keunggulan-section">
        <div className="keunggulan-container">
          {/* Bagian Atas (Tengah) */}
          <div className="keunggulan-header">
            <div className="keunggulan-pill-badge">KEUNGGULAN PLATFORM</div>
            <h2 className="keunggulan-title">
              Mengapa Belajar di{' '}
              <span className="keunggulan-title-highlight">KitaInvest</span>?
            </h2>
            <p className="keunggulan-subtitle">
              Kami mengubah konsep keuangan yang rumit menjadi simulasi praktis dan ramah pengguna,
              siap memandu perjalanan finansial Anda langkah demi langkah.
            </p>
          </div>

          {/* Grid 3 Kartu Sejajar */}
          <div className="keunggulan-grid">
            {/* Kartu 1 */}
            <div className="keunggulan-card">
              <div className="keunggulan-card-icon-box" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="keunggulan-card-title">Simulasi Pertumbuhan Modal</h3>
              <p className="keunggulan-card-desc">
                Eksplorasi kalkulasi bunga berbunga (compound interest) dan proyeksi diversifikasi
                aset secara visual tanpa khawatir kehilangan aset asli.
              </p>
            </div>

            {/* Kartu 2 */}
            <div className="keunggulan-card">
              <div className="keunggulan-card-icon-box" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3 className="keunggulan-card-title">Pemahaman Inflasi & Daya Beli</h3>
              <p className="keunggulan-card-desc">
                Pahami bagaimana laju inflasi menggerus nilai uang tunai serta strategi konkret
                melindungi nilai daya beli keluarga untuk masa depan.
              </p>
            </div>

            {/* Kartu 3 */}
            <div className="keunggulan-card">
              <div className="keunggulan-card-icon-box" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <h3 className="keunggulan-card-title">Roadmap Belajar Terstruktur</h3>
              <p className="keunggulan-card-desc">
                Kurikulum bertahap mulai dari dana darurat, manajemen arus kas harian, hingga
                instrumen investasi pasar modal untuk jangka panjang.
              </p>
            </div>
          </div>

          {/* =========================================================
              5. BOTTOM CTA BANNER (BANNER GELAP #0B0F19)
              ========================================================= */}
          <div className="landing-cta-banner">
            <div className="cta-banner-left">
              <h3 className="cta-banner-title">
                Mulai langkah pertama finansial mandiri hari ini
              </h3>
              <p className="cta-banner-subtext">
                Bergabung bersama ribuan pengguna lainnya yang telah membangun perencanaan keuangan
                sadar risiko dengan KitaInvest.
              </p>
            </div>
            <div className="cta-banner-right">
              <button
                type="button"
                className="btn-cta-lime"
                onClick={handleAccessSimulation}
              >
                Akses Simulasi Gratis &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
