import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { formatRupiah } from '../../engine/calculator.js';

export function DashboardPage() {
  const {
    category,
    financialData,
    learningProgress,
    navigateTo,
    resetLearningData,
  } = useApp();

  const handleReset = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin menghapus seluruh catatan kemajuan belajar dan kategori Anda? Tindakan ini tidak dapat dibatalkan.'
      )
    ) {
      resetLearningData();
      navigateTo('home');
    }
  };

  const hasFinancialData = financialData.usia !== '';

  return (
    <div className="fintech-subpage-wrapper">
      {/* Header Banner (Dark Fintech) */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="dashboard-banner-top-row">
            <div className="fintech-pill-badge">
              <span className="hero-pill-dot" aria-hidden="true">●</span>
              <span>Mode {category || 'Umum'} Aktif</span>
            </div>
            <div className="dashboard-quick-actions">
              <button
                type="button"
                className="btn-banner-action"
                onClick={() => navigateTo('category')}
              >
                Ganti Kategori Peran
              </button>
              <button
                type="button"
                className="btn-banner-danger"
                onClick={handleReset}
              >
                Reset Data Belajar
              </button>
            </div>
          </div>

          <h1 className="fintech-page-title">
            Selamat Datang di <span className="text-lime-highlight">Dasbor KitaInvest</span>
          </h1>
          <p className="fintech-page-subtitle">
            Pusat kendali pembelajaran finansial, simulasi rencana pertumbuhan modal, dan pemantauan
            kemajuan literasi keuangan mandiri Anda.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="fintech-body-container">
        {/* Progress Banner (Persentase Penyelesaian Materi) */}
        <div className="dashboard-progress-banner">
          <div className="progress-banner-header">
            <div className="progress-banner-title-group">
              <span className="progress-banner-tag">Status Kurikulum</span>
              <h3 className="progress-banner-title">Kemajuan Literasi Finansial</h3>
            </div>
            <div className="progress-banner-percent-display">
              <span className="progress-percent-num">{learningProgress.progressPercent}%</span>
              <span className="progress-percent-label">
                ({learningProgress.completedTopics.length} dari 5 Topik Selesai)
              </span>
            </div>
          </div>
          <div className="progress-track-modern">
            <div
              className="progress-fill-lime"
              style={{ width: `${learningProgress.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* 3 Kartu Navigasi Utama (Ukuran Besar & Modern) */}
        <div className="dashboard-main-nav-grid">
          {/* Menu 1: Belajar */}
          <div className="dashboard-nav-card" onClick={() => navigateTo('learning')}>
            <div className="nav-card-icon-box">📚</div>
            <div className="nav-card-content">
              <div className="nav-card-badge">Pilar 1</div>
              <h3 className="nav-card-title">1. Belajar Finansial</h3>
              <p className="nav-card-desc">
                Pelajari 5 topik esensial: Pengelolaan Uang, Target Dana, Risiko, Pertumbuhan Majemuk,
                dan Inflasi dilengkapi video animasi interaktif.
              </p>
              <div className="nav-card-status">
                <span>{learningProgress.completedTopics.length} / 5 Topik Selesai</span>
                <span className="nav-card-arrow">Buka Modul →</span>
              </div>
            </div>
          </div>

          {/* Menu 2: Rencana & Simulasi */}
          <div className="dashboard-nav-card" onClick={() => navigateTo('simulation')}>
            <div className="nav-card-icon-box">📊</div>
            <div className="nav-card-content">
              <div className="nav-card-badge">Pilar 2</div>
              <h3 className="nav-card-title">2. Rencana & Simulasi</h3>
              <p className="nav-card-desc">
                Simulasikan akumulasi modal, pertumbuhan majemuk bulanan, dan evaluasi daya beli
                terhadap inflasi menggunakan visualisasi grafik Chart.js interaktif.
              </p>
              <div className="nav-card-status">
                <span>Financial Engine & Chart.js</span>
                <span className="nav-card-arrow">Mulai Simulasi →</span>
              </div>
            </div>
          </div>

          {/* Menu 3: Perjalanan Belajar */}
          <div className="dashboard-nav-card" onClick={() => navigateTo('journey')}>
            <div className="nav-card-icon-box">🏆</div>
            <div className="nav-card-content">
              <div className="nav-card-badge">Pilar 3</div>
              <h3 className="nav-card-title">3. Perjalanan Belajar</h3>
              <p className="nav-card-desc">
                Pantau grafik kemajuan belajar mandiri, tingkatan level pemahaman, dan lencana
                pencapaian Anda secara objektif tanpa tekanan sosial.
              </p>
              <div className="nav-card-status">
                <span>Level: {learningProgress.learningLevel}</span>
                <span className="nav-card-arrow">Lihat Riwayat →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ringkasan Data Sesi Aktif */}
        <div className="dashboard-panels-grid">
          {/* Panel 1: Data Keuangan (In-Memory) */}
          <div className="fintech-card dashboard-panel">
            <div className="panel-header-modern">
              <h4 className="panel-title-text">Data Keuangan Sesi Ini</h4>
              <span className="badge-volatile-tag">In-Memory (Sementara)</span>
            </div>

            {hasFinancialData ? (
              <div className="panel-content-modern">
                <div className="panel-stat-row">
                  <span className="panel-stat-label">Usia:</span>
                  <span className="panel-stat-val">{financialData.usia} Tahun</span>
                </div>
                {category === 'Pelajar' && (
                  <>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Uang Saku:</span>
                      <span className="panel-stat-val text-green">
                        {formatRupiah(Number(financialData.uangSakuBulanan))}/bln
                      </span>
                    </div>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Tabungan:</span>
                      <span className="panel-stat-val">{formatRupiah(Number(financialData.tabungan))}</span>
                    </div>
                  </>
                )}
                {category === 'Pekerja' && (
                  <>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Pendapatan:</span>
                      <span className="panel-stat-val text-green">
                        {formatRupiah(Number(financialData.pendapatanBulanan))}/bln
                      </span>
                    </div>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Pengeluaran:</span>
                      <span className="panel-stat-val text-amber">
                        {formatRupiah(Number(financialData.pengeluaranBulanan))}/bln
                      </span>
                    </div>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Tabungan:</span>
                      <span className="panel-stat-val">{formatRupiah(Number(financialData.tabungan))}</span>
                    </div>
                  </>
                )}
                {category === 'Pensiunan' && (
                  <>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Dana Dimiliki:</span>
                      <span className="panel-stat-val text-green">
                        {formatRupiah(Number(financialData.danaDimiliki))}
                      </span>
                    </div>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Pemasukan Rutin:</span>
                      <span className="panel-stat-val">
                        {formatRupiah(Number(financialData.pemasukanRutinBulanan))}/bln
                      </span>
                    </div>
                    <div className="panel-stat-row">
                      <span className="panel-stat-label">Pengeluaran:</span>
                      <span className="panel-stat-val text-amber">
                        {formatRupiah(Number(financialData.pengeluaranBulanan))}/bln
                      </span>
                    </div>
                  </>
                )}

                <div className="panel-actions-row">
                  <button
                    type="button"
                    className="btn-secondary-light btn-sm"
                    onClick={() => navigateTo('form')}
                  >
                    Ubah Data Profil
                  </button>
                </div>
              </div>
            ) : (
              <div className="panel-empty-modern">
                <p>Belum ada data keuangan untuk sesi aktif ini.</p>
                <button
                  type="button"
                  className="btn-primary-lime btn-sm"
                  onClick={() => navigateTo('form')}
                >
                  Isi Data Profil Sekarang →
                </button>
              </div>
            )}
            <small className="panel-disclaimer-note">
              * Angka keuangan tersimpan murni di memori React dan terhapus otomatis saat tab ditutup/reload.
            </small>
          </div>

          {/* Panel 2: Pencapaian Gamifikasi (localStorage) */}
          <div className="fintech-card dashboard-panel">
            <div className="panel-header-modern">
              <h4 className="panel-title-text">Pencapaian Gamifikasi</h4>
              <span className="badge-persistent-tag">Tersimpan Permanen</span>
            </div>

            <div className="panel-content-modern">
              <div className="panel-stat-row">
                <span className="panel-stat-label">Tingkat Belajar:</span>
                <span className="panel-stat-val text-role">{learningProgress.learningLevel}</span>
              </div>
              <div className="panel-stat-row">
                <span className="panel-stat-label">Materi Selesai:</span>
                <span className="panel-stat-val">{learningProgress.completedTopics.length} dari 5 Topik</span>
              </div>

              <div className="panel-badges-section">
                <span className="panel-badges-title">Lencana Diraih:</span>
                {learningProgress.badges.length > 0 ? (
                  <div className="panel-badges-chips">
                    {learningProgress.badges.map((b) => (
                      <span key={b} className="badge-chip-lime">
                        🎖️ {b}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="no-badge-note">
                    Selesaikan kuis topik pertama untuk membuka lencana perdana Anda!
                  </p>
                )}
              </div>

              <div className="panel-actions-row">
                <button
                  type="button"
                  className="btn-secondary-light btn-sm"
                  onClick={() => navigateTo('journey')}
                >
                  Buka Detail Perjalanan →
                </button>
              </div>
            </div>
            <small className="panel-disclaimer-note">
              * Progres topik dan lencana tersimpan aman di peramban lokal (localStorage).
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
