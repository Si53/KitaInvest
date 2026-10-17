import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { formatRupiah } from '../../engine/calculator.js';

export function SummaryPage() {
  const { category, financialData, navigateTo } = useApp();

  if (!category) {
    return (
      <div className="fintech-subpage-wrapper">
        <section className="fintech-header-banner">
          <div className="fintech-header-container">
            <h1 className="fintech-page-title">Kategori Belum Dipilih</h1>
          </div>
        </section>
        <div className="fintech-body-container">
          <div className="fintech-card text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <p style={{ marginBottom: '1.5rem', color: '#64748B' }}>
              Silakan pilih kategori pengguna terlebih dahulu.
            </p>
            <button
              type="button"
              className="btn-primary-lime"
              onClick={() => navigateTo('category')}
            >
              Pilih Kategori Peran
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Identifikasi pemasukan & pengeluaran untuk perhitungan selisih
  let pemasukan = 0;
  let hasPemasukan = false;
  let pengeluaran = 0;
  let hasPengeluaran = false;

  if (category === 'Pelajar') {
    if (financialData.uangSakuBulanan !== '') {
      pemasukan = Number(financialData.uangSakuBulanan);
      hasPemasukan = true;
    }
  } else if (category === 'Pekerja') {
    if (financialData.pendapatanBulanan !== '') {
      pemasukan = Number(financialData.pendapatanBulanan);
      hasPemasukan = true;
    }
    if (financialData.pengeluaranBulanan !== '') {
      pengeluaran = Number(financialData.pengeluaranBulanan);
      hasPengeluaran = true;
    }
  } else if (category === 'Pensiunan') {
    if (financialData.pemasukanRutinBulanan !== '') {
      pemasukan = Number(financialData.pemasukanRutinBulanan);
      hasPemasukan = true;
    }
    if (financialData.pengeluaranBulanan !== '') {
      pengeluaran = Number(financialData.pengeluaranBulanan);
      hasPengeluaran = true;
    }
  }

  const bothAvailable = hasPemasukan && hasPengeluaran;
  const selisih = pemasukan - pengeluaran;

  return (
    <div className="fintech-subpage-wrapper">
      {/* Page Header Banner */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="fintech-pill-badge">
            <span className="hero-pill-dot" aria-hidden="true">●</span>
            <span>Konfirmasi Profil Keuangan</span>
          </div>
          <h1 className="fintech-page-title">
            Ringkasan Data <span className="text-lime-highlight">Keuangan Awal</span>
          </h1>
          <p className="fintech-page-subtitle">
            Silakan periksa kembali angka data profil Anda sebelum melangkah menuju Dasbor Pembelajaran KitaInvest.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="fintech-body-container">
        {/* Metrik Header Cards */}
        <div className="summary-metrics-grid">
          <div className="summary-metric-card">
            <span className="summary-metric-label">Peran Aktif</span>
            <span className="summary-metric-value text-role">{category}</span>
            <span className="summary-metric-sub">Kategori Pembelajaran</span>
          </div>
          <div className="summary-metric-card">
            <span className="summary-metric-label">Usia Pengguna</span>
            <span className="summary-metric-value">{financialData.usia || '-'} <small>Tahun</small></span>
            <span className="summary-metric-sub">Data Demografis</span>
          </div>
          {category === 'Pelajar' && (
            <>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Uang Saku Bulanan</span>
                <span className="summary-metric-value text-green">
                  {formatRupiah(Number(financialData.uangSakuBulanan))}
                </span>
                <span className="summary-metric-sub">Pemasukan Rutin</span>
              </div>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Tabungan Saat Ini</span>
                <span className="summary-metric-value">
                  {formatRupiah(Number(financialData.tabungan))}
                </span>
                <span className="summary-metric-sub">Modal Tersimpan</span>
              </div>
            </>
          )}

          {category === 'Pekerja' && (
            <>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Pendapatan Bulanan</span>
                <span className="summary-metric-value text-green">
                  {formatRupiah(Number(financialData.pendapatanBulanan))}
                </span>
                <span className="summary-metric-sub">Arus Kas Masuk</span>
              </div>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Pengeluaran Bulanan</span>
                <span className="summary-metric-value text-amber">
                  {formatRupiah(Number(financialData.pengeluaranBulanan))}
                </span>
                <span className="summary-metric-sub">Kebutuhan Rutin</span>
              </div>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Tabungan Saat Ini</span>
                <span className="summary-metric-value">
                  {formatRupiah(Number(financialData.tabungan))}
                </span>
                <span className="summary-metric-sub">Dana Siaga</span>
              </div>
            </>
          )}

          {category === 'Pensiunan' && (
            <>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Dana Dimiliki</span>
                <span className="summary-metric-value text-green">
                  {formatRupiah(Number(financialData.danaDimiliki))}
                </span>
                <span className="summary-metric-sub">Akumulasi Aset</span>
              </div>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Pemasukan Rutin</span>
                <span className="summary-metric-value">
                  {formatRupiah(Number(financialData.pemasukanRutinBulanan))}
                </span>
                <span className="summary-metric-sub">Dana Masuk Bulanan</span>
              </div>
              <div className="summary-metric-card">
                <span className="summary-metric-label">Pengeluaran Rutin</span>
                <span className="summary-metric-value text-amber">
                  {formatRupiah(Number(financialData.pengeluaranBulanan))}
                </span>
                <span className="summary-metric-sub">Kebutuhan Hidup</span>
              </div>
            </>
          )}
        </div>

        {/* Kartu Selisih Bulanan (Highlight Khusus) */}
        {bothAvailable && (
          <div className="selisih-highlight-card">
            <div className="selisih-header-row">
              <div className="selisih-title-group">
                <span className="selisih-badge-pill">Analisis Arus Kas</span>
                <h3 className="selisih-main-title">Selisih Rutin Bulanan (Pemasukan - Pengeluaran)</h3>
              </div>
              <div className="selisih-value-display">
                <span className={`selisih-number ${selisih >= 0 ? 'positive' : 'negative'}`}>
                  {selisih >= 0 ? '+' : ''}{formatRupiah(selisih)}
                </span>
                <span className="selisih-period">/ bulan</span>
              </div>
            </div>

            <div className="selisih-info-box">
              <div className="info-box-icon" aria-hidden="true">💡</div>
              <div className="info-box-content">
                <strong>Catatan Edukasi Literasi Finansial:</strong>
                <p>
                  Angka selisih ini merupakan murni hasil pengurangan matematis sederhana antara pemasukan dan
                  pengeluaran bulanan. Sesuai prinsip edukasi <em>RULES.md</em>, angka ini tidak otomatis dianggap
                  sebagai dana bebas yang siap diinvestasikan, melainkan perlu dipertimbangkan terlebih dahulu untuk
                  pos dana darurat keluarga dan kebutuhan tak terduga.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Actions */}
        <div className="summary-actions-modern">
          <button
            type="button"
            className="btn-secondary-light"
            onClick={() => navigateTo('form')}
          >
            ← Ubah Data Formulir
          </button>
          <button
            type="button"
            className="btn-primary-lime"
            onClick={() => navigateTo('dashboard')}
          >
            Lanjut ke Dasbor KitaInvest →
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
