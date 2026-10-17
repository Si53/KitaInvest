/**
 * Komponen Animasi Pertumbuhan Saldo Bulanan - KitaInvest
 * Agent 4: Multimedia & Visual Asset
 * Domain: /src/components/media/
 *
 * Mematuhi RULES.md Bagian 4.B:
 * - Animasi/video pendek pertumbuhan saldo dari bulan ke bulan mengikuti rumus hitung yang SAMA PERSIS dengan simulasi (calculateSimulation).
 * - Berjalan HANYA setelah tombol Putar (Play) ditekan.
 * - Dapat dihentikan (Pause) dan diulang (Replay).
 * - Wajib menyertakan teks pendamping / transkrip agar materi tetap dapat dipelajari saat suara dimatikan (muted).
 */

import React, { useState, useEffect, useRef } from 'react';
import { calculateSimulation } from '../../engine/calculator.js';

export function GrowthAnimationPlayer({
  danaAwal = 1000000,
  setoranBulanan = 250000,
  jangkaWaktuBulan = 24,
  pertumbuhanTahunan = 12,
  inflasiTahunan = 5,
  targetDana = 7500000,
  namaTujuan = 'Dana Laptop & Kuliah',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1); // 1x = 700ms, 2x = 350ms
  const timerRef = useRef(null);

  // Jalankan perhitungan eksak menggunakan engine simulasi
  const simulation = calculateSimulation({
    danaAwal,
    setoranBulanan,
    jangkaWaktuBulan,
    pertumbuhanTahunan,
    inflasiTahunan,
    targetDana,
    namaTujuan,
  });

  const { monthlyData } = simulation;
  const totalMonths = monthlyData.length - 1;

  // Kontrol timer animasi
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(750 / speed);
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalMonths) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalMonths, speed]);

  const handlePlay = () => {
    if (currentStep >= totalMonths) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const currentData = monthlyData[currentStep] || monthlyData[0];
  const maxSaldo = monthlyData[totalMonths].saldoNominal || 1;

  // Rasio visual bar (0 - 100%)
  const widthSaldo = Math.min(100, Math.max(5, Math.round((currentData.saldoNominal / maxSaldo) * 100)));
  const widthModal = Math.min(100, Math.max(5, Math.round((currentData.akumulasiModal / maxSaldo) * 100)));
  const widthDayaBeli = Math.min(100, Math.max(5, Math.round((currentData.dayaBeli / maxSaldo) * 100)));

  const formatRupiah = (num) =>
    'Rp' + Math.round(num).toLocaleString('id-ID');

  const imbalHasilBulanIni = Math.max(0, currentData.saldoNominal - currentData.akumulasiModal);

  return (
    <div className="animation-player-card">
      <div className="player-header">
        <div className="player-tag">
          <span className="player-icon">🎬</span>
          <span>Animasi Interaktif Pertumbuhan Saldo Bulan ke Bulan</span>
        </div>
        <div className="player-title-row">
          <h3 className="player-title">Simulasi Langkah Demi Langkah: {namaTujuan}</h3>
          <span className="badge-duration">
            Bulan {currentStep} dari {totalMonths} Bulan
          </span>
        </div>
        <p className="player-description">
          Saksikan bagaimana setoran bulanan dan bunga majemuk bekerja dari waktu ke waktu secara eksak sesuai rumus matematika finansial KitaInvest.
        </p>
      </div>

      {/* Screen Monitor Animasi */}
      <div className="player-screen">
        <div className="screen-stage">
          {/* Header Status Bulan */}
          <div className="stage-topbar">
            <span className="month-counter">
              🗓️ <strong>Bulan ke-{currentStep}</strong> ({currentStep === 0 ? 'Mulai / Modal Awal' : `Tahun ${Math.floor(currentStep / 12)} Bln ${currentStep % 12}`})
            </span>
            {targetDana > 0 && currentData.saldoNominal >= targetDana && (
              <span className="target-reached-pill">
                🎉 Target {formatRupiah(targetDana)} Tercapai!
              </span>
            )}
          </div>

          {/* Visual Bars Dinamis */}
          <div className="growth-bars-container">
            {/* Bar 1: Saldo Nominal */}
            <div className="growth-bar-group">
              <div className="bar-meta">
                <span className="bar-title text-success">
                  <strong>Saldo Nominal (Modal + Imbal Hasil)</strong>
                </span>
                <span className="bar-num text-success font-bold">
                  {formatRupiah(currentData.saldoNominal)}
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill fill-nominal"
                  style={{ width: `${widthSaldo}%` }}
                ></div>
              </div>
            </div>

            {/* Bar 2: Akumulasi Modal Setoran Sendiri */}
            <div className="growth-bar-group">
              <div className="bar-meta">
                <span className="bar-title text-primary">
                  Modal Sendiri yang Disetorkan (Dana Awal + Setoran)
                </span>
                <span className="bar-num text-primary">
                  {formatRupiah(currentData.akumulasiModal)}
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill fill-modal"
                  style={{ width: `${widthModal}%` }}
                ></div>
              </div>
            </div>

            {/* Bar 3: Daya Beli Riil (Terdiskon Inflasi) */}
            <div className="growth-bar-group">
              <div className="bar-meta">
                <span className="bar-title text-warning">
                  Daya Beli Riil (Setelah Efek Inflasi {inflasiTahunan}%)
                </span>
                <span className="bar-num text-warning">
                  {formatRupiah(currentData.dayaBeli)}
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill fill-dayabeli"
                  style={{ width: `${widthDayaBeli}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stat Box Dinamis Per Step */}
          <div className="step-insights-grid">
            <div className="insight-item">
              <span className="insight-label">Dana Tambahan Majemuk:</span>
              <span className="insight-val text-success">
                +{formatRupiah(imbalHasilBulanIni)}
              </span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Faktor Inflasi:</span>
              <span className="insight-val">
                {currentData.faktorInflasi.toFixed(4)}x
              </span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Selisih Daya Beli:</span>
              <span className="insight-val text-muted">
                -{formatRupiah(Math.max(0, currentData.saldoNominal - currentData.dayaBeli))}
              </span>
            </div>
          </div>
        </div>

        {/* Kontrol Panel Tombol */}
        <div className="player-controls">
          <div className="controls-buttons">
            {!isPlaying ? (
              <button
                type="button"
                className="btn btn-primary btn-play"
                onClick={handlePlay}
                aria-label="Putar Animasi"
              >
                ▶ {currentStep === 0 ? 'Putar Animasi' : currentStep >= totalMonths ? 'Putar Ulang' : 'Lanjutkan'}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-pause"
                onClick={handlePause}
                aria-label="Jeda Animasi"
              >
                ⏸ Jeda (Pause)
              </button>
            )}

            <button
              type="button"
              className="btn btn-outline btn-replay"
              onClick={handleReplay}
              aria-label="Ulang Dari Awal"
            >
              🔄 Ulang Dari Awal
            </button>
          </div>

          {/* Slider Timeline & Speed */}
          <div className="controls-scrubber">
            <input
              type="range"
              min="0"
              max={totalMonths}
              value={currentStep}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentStep(Number(e.target.value));
              }}
              className="timeline-range"
              aria-label="Geser Bulan Simulasi"
            />
            <div className="speed-buttons">
              <span className="speed-label">Kecepatan:</span>
              <button
                type="button"
                className={`btn-speed ${speed === 1 ? 'active' : ''}`}
                onClick={() => setSpeed(1)}
              >
                1x
              </button>
              <button
                type="button"
                className={`btn-speed ${speed === 2 ? 'active' : ''}`}
                onClick={() => setSpeed(2)}
              >
                2x
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teks Pendamping / Transkrip Wajib (RULES.md) */}
      <div className="player-transcript">
        <h4 className="transcript-title">
          📝 Teks Pendamping & Transkrip Pembelajaran (Dapat Dipelajari Tanpa Audio)
        </h4>
        <div className="transcript-content">
          <p>
            <strong>Penjelasan Konsep Langkah Demi Langkah:</strong>
          </p>
          <ul>
            <li>
              <strong>Bulan 0 (Permulaan):</strong> Saldo Anda dimulai dari modal awal sebesar{' '}
              {formatRupiah(danaAwal)}. Pada titik awal ini, modal sendiri, saldo nominal, dan daya beli berada pada nilai yang persis sama karena inflasi belum berjalan.
            </li>
            <li>
              <strong>Bulan 1 hingga {totalMonths} (Proses Pertumbuhan):</strong> Setiap akhir bulan, setoran rutin sebesar{' '}
              {formatRupiah(setoranBulanan)} ditambahkan ke rekening. Saldo dari bulan sebelumnya mengalami pertumbuhan berdasarkan tingkat suku bunga majemuk bulanan ({pertumbuhanTahunan}%/tahun).
            </li>
            <li>
              <strong>Efek Compounding (Pelebaran Garis Hijau vs Biru):</strong> Semakin lama waktu berlalu, perhatikan bagaimana jarak antara Saldo Nominal (garis hijau) dan Modal Setoran Sendiri (garis biru) semakin melebar. Uang yang dihasilkan bukan hanya berasal dari kantong Anda sendiri, melainkan hasil bunga yang berbunga kembali.
            </li>
            <li>
              <strong>Ancaman Inflasi (Garis Oranye):</strong> Garis Daya Beli Riil menunjukkan berapa nilai kemampuan beli uang Anda sebenarnya setelah dikurangi inflasi {inflasiTahunan}%/tahun. Karena imbal hasil ({pertumbuhanTahunan}%) lebih tinggi dari inflasi ({inflasiTahunan}%), daya beli Anda tetap tumbuh secara positif!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GrowthAnimationPlayer;
