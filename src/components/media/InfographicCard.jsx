/**
 * Komponen Infografik Finansial - KitaInvest
 * Agent 4: Multimedia & Visual Asset
 * Domain: /src/components/media/
 *
 * Mematuhi RULES.md:
 * - Memisahkan uang setoran vs tambahan nilai pertumbuhan dengan label dan warna yang jelas di ponsel dan desktop.
 * - Desain responsif, mobile-friendly tanpa perlu zoom.
 */

import React, { useState } from 'react';

export function InfographicCard({
  danaAwal = 1000000,
  setoranBulanan = 200000,
  pertumbuhanTahunan = 10,
}) {
  const [selectedHorizon, setSelectedHorizon] = useState(36); // default 3 tahun (36 bulan)

  // Opsi jangka waktu: 12 bln (1 thn), 36 bln (3 thn), 60 bln (5 thn), 120 bln (10 thn)
  const horizons = [
    { label: '1 Tahun', months: 12 },
    { label: '3 Tahun', months: 36 },
    { label: '5 Tahun', months: 60 },
    { label: '10 Tahun', months: 120 },
  ];

  const rTahunan = pertumbuhanTahunan / 100;
  const rBulanan = Math.pow(1 + rTahunan, 1 / 12) - 1;

  // Hitung modal setoran sendiri vs pertumbuhan
  const modalSetoran = danaAwal + setoranBulanan * selectedHorizon;

  let saldoBerjalan = danaAwal;
  for (let t = 1; t <= selectedHorizon; t++) {
    saldoBerjalan = saldoBerjalan * (1 + rBulanan) + setoranBulanan;
  }

  const saldoNominal = Math.round(saldoBerjalan);
  const tambahanPertumbuhan = Math.max(0, saldoNominal - modalSetoran);

  const total = saldoNominal > 0 ? saldoNominal : 1;
  const persenModal = Math.round((modalSetoran / total) * 100);
  const persenPertumbuhan = Math.max(0, 100 - persenModal);

  const formatRupiah = (val) =>
    'Rp' + Number(val).toLocaleString('id-ID');

  return (
    <div className="infographic-container">
      <div className="infographic-header">
        <span className="infographic-badge">📊 Infografik Edukasi</span>
        <h3 className="infographic-title">
          Pemisahan Modal Setoran Sendiri vs Tambahan Pertumbuhan
        </h3>
        <p className="infographic-subtitle">
          Lihat bagaimana porsi keuntungan majemuk (*compounding*) tumbuh semakin besar melampaui modal yang Anda tabung sendiri seiring bertambahnya waktu.
        </p>
      </div>

      {/* Selector Jangka Waktu */}
      <div className="infographic-horizon-selector">
        <span className="selector-label">Pilih Jangka Waktu:</span>
        <div className="horizon-buttons-group">
          {horizons.map((h) => (
            <button
              key={h.months}
              type="button"
              className={`btn-horizon ${selectedHorizon === h.months ? 'active' : ''}`}
              onClick={() => setSelectedHorizon(h.months)}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visualisasi Bar Terpisah */}
      <div className="infographic-visual-wrapper">
        <div className="infographic-stacked-bar-container">
          <div
            className="bar-segment bar-modal"
            style={{ width: `${persenModal}%` }}
            title={`Modal Setoran Sendiri: ${formatRupiah(modalSetoran)} (${persenModal}%)`}
          >
            {persenModal > 15 && (
              <span className="bar-label">{persenModal}%</span>
            )}
          </div>
          <div
            className="bar-segment bar-growth"
            style={{ width: `${persenPertumbuhan}%` }}
            title={`Tambahan Pertumbuhan: ${formatRupiah(tambahanPertumbuhan)} (${persenPertumbuhan}%)`}
          >
            {persenPertumbuhan > 12 && (
              <span className="bar-label">+{persenPertumbuhan}%</span>
            )}
          </div>
        </div>

        {/* Legend & Penjelasan Warna (Jelas di HP) */}
        <div className="infographic-cards-grid">
          <div className="infographic-stat-card card-modal">
            <div className="stat-indicator dot-modal"></div>
            <div className="stat-content">
              <span className="stat-label">Uang Setoran Sendiri (Modal Pokok)</span>
              <span className="stat-value">{formatRupiah(modalSetoran)}</span>
              <span className="stat-detail">
                Dana Awal {formatRupiah(danaAwal)} + Setoran Rutin {selectedHorizon} Bulan ({formatRupiah(setoranBulanan * selectedHorizon)})
              </span>
            </div>
          </div>

          <div className="infographic-stat-card card-growth">
            <div className="stat-indicator dot-growth"></div>
            <div className="stat-content">
              <span className="stat-label">Tambahan Nilai Pertumbuhan (Bunga Majemuk)</span>
              <span className="stat-value">{formatRupiah(tambahanPertumbuhan)}</span>
              <span className="stat-detail">
                Akumulasi imbal hasil yang dihasilkan oleh modal yang terus bertumbuh ({pertumbuhanTahunan}%/thn)
              </span>
            </div>
          </div>
        </div>

        {/* Total Hasil Akhir */}
        <div className="infographic-summary-bar">
          <div className="summary-col">
            <span className="summary-title">Total Saldo Terakumulasi:</span>
            <span className="summary-amount">{formatRupiah(saldoNominal)}</span>
          </div>
          <div className="summary-note">
            💡 <em>Pada periode {selectedHorizon / 12} tahun, tambahan nilai pertumbuhan memberikan kontribusi sebesar {persenPertumbuhan}% dari total saldo akhir Anda.</em>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfographicCard;
