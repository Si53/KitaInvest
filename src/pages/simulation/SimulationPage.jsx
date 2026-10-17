import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  calculateSimulation,
  validateSimulationInput,
  formatRupiah,
} from '../../engine/calculator.js';
import { formatRibuan, parseAngka } from '../../utils/formatters.js';
import { SimulationChart } from '../../components/charts/SimulationChart.jsx';

export function SimulationPage() {
  const { category, simulationData, updateSimulationData, financialData } = useApp();

  const [formData, setFormData] = useState({
    namaTujuan: simulationData.namaTujuan || 'Target Pembelian Laptop',
    targetDana: simulationData.targetDana || '12000000',
    danaAwal: simulationData.danaAwal || (financialData.tabungan || '1000000'),
    setoranBulanan: simulationData.setoranBulanan || '400000',
    jangkaWaktuBulan: simulationData.jangkaWaktuBulan || '24',
    pertumbuhanTahunan: simulationData.pertumbuhanTahunan || '12',
    inflasiTahunan: simulationData.inflasiTahunan || '5',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showTableDetail, setShowTableDetail] = useState(false);

  // Template Skenario Cepat
  const presets = [
    {
      name: '💻 Laptop Belajar (Pelajar)',
      data: {
        namaTujuan: 'Dana Membeli Laptop Belajar',
        targetDana: '12000000',
        danaAwal: '1000000',
        setoranBulanan: '400000',
        jangkaWaktuBulan: '24',
        pertumbuhanTahunan: '10',
        inflasiTahunan: '5',
      },
    },
    {
      name: '🛡️ Dana Darurat 6 Bulan (Pekerja)',
      data: {
        namaTujuan: 'Dana Darurat Siaga',
        targetDana: '30000000',
        danaAwal: '5000000',
        setoranBulanan: '1000000',
        jangkaWaktuBulan: '24',
        pertumbuhanTahunan: '8',
        inflasiTahunan: '5',
      },
    },
    {
      name: '🏖️ Proteksi Nilai Pensiun (Pensiunan)',
      data: {
        namaTujuan: 'Menjaga Daya Beli Masa Pensiun',
        targetDana: '100000000',
        danaAwal: '80000000',
        setoranBulanan: '500000',
        jangkaWaktuBulan: '36',
        pertumbuhanTahunan: '9',
        inflasiTahunan: '5',
      },
    },
  ];

  const handleApplyPreset = (presetData) => {
    setFormData(presetData);
    updateSimulationData(presetData);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    updateSimulationData({ [name]: value });

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleMoneyChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = parseAngka(value);
    const updated = { ...formData, [name]: cleanValue };
    setFormData(updated);
    updateSimulationData({ [name]: cleanValue });

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleScrollToResults = () => {
    const el = document.getElementById('hasil-simulasi-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validation = validateSimulationInput(formData);
  const isValid = validation.isValid;

  const simulation = isValid
    ? calculateSimulation(formData)
    : calculateSimulation({
        namaTujuan: 'Contoh Rencana',
        targetDana: 12000000,
        danaAwal: 1000000,
        setoranBulanan: 400000,
        jangkaWaktuBulan: 24,
        pertumbuhanTahunan: 12,
        inflasiTahunan: 5,
      });

  const {
    targetDana,
    danaAwal,
    setoranBulanan,
    jangkaWaktuBulan,
    saldoNominalAkhir,
    akumulasiModalAkhir,
    dayaBeliAkhir,
    totalPertumbuhan,
    tercapai,
    bulanTercapai,
    kekuranganDana,
    monthlyData,
  } = simulation;

  return (
    <div className="fintech-subpage-wrapper">
      {/* Page Header Banner */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="fintech-pill-badge">
            <span className="hero-pill-dot" aria-hidden="true">●</span>
            <span>Financial Engine & Chart.js</span>
          </div>
          <h1 className="fintech-page-title">
            Rencana & Simulasi <span className="text-lime-highlight">Finansial Interaktif</span>
          </h1>
          <p className="fintech-page-subtitle">
            Rancang sasaran target dana Anda, bandingkan akumulasi uang setoran sendiri dengan
            pertumbuhan majemuk (*compounding*), dan amati penurunan daya beli nyata akibat inflasi
            secara akurat sesuai rumus matematika eksak KitaInvest.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="fintech-body-container simulation-main-container">
        {/* Skenario Cepat (Preset Buttons) */}
        <div className="presets-modern-container">
          <span className="presets-label-modern">Pilih Template Skenario:</span>
          <div className="presets-chips-group">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="btn-preset-chip"
                onClick={() => handleApplyPreset(p.data)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="simulation-two-columns">
          {/* Kolom Kiri: Formulir Parameter Rencana Dana */}
          <aside className="simulation-form-card">
            <div className="panel-header-modern">
              <h3 className="panel-title-text">⚙️ Parameter Rencana Dana</h3>
              <p className="panel-subtitle-text">Masukkan angka perencanaan finansial Anda.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="sim-form-modern" noValidate>
              {/* Nama Tujuan */}
              <div className="form-group-modern">
                <label htmlFor="namaTujuan" className="form-label-modern">
                  Nama Sasaran Keuangan <span className="text-required">*</span>
                </label>
                <div className="input-group-modern">
                  <input
                    type="text"
                    id="namaTujuan"
                    name="namaTujuan"
                    value={formData.namaTujuan}
                    onChange={handleChange}
                    placeholder="Contoh: Dana Laptop Belajar"
                    className={`input-modern ${validation.errors.namaTujuan ? 'input-error' : ''}`}
                  />
                </div>
                {validation.errors.namaTujuan && (
                  <div className="field-error-modern">
                    <span>⚠️</span> {validation.errors.namaTujuan}
                  </div>
                )}
              </div>

              {/* Target Dana */}
              <div className="form-group-modern">
                <label htmlFor="targetDana" className="form-label-modern">
                  Target Dana (Rupiah) <span className="text-required">*</span>
                </label>
                <div className="input-group-modern">
                  <span className="input-prefix-badge">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="targetDana"
                    name="targetDana"
                    value={formatRibuan(formData.targetDana)}
                    onChange={handleMoneyChange}
                    placeholder="12.000.000"
                    className={`input-modern ${validation.errors.targetDana ? 'input-error' : ''}`}
                  />
                </div>
                {validation.errors.targetDana && (
                  <div className="field-error-modern">
                    <span>⚠️</span> {validation.errors.targetDana}
                  </div>
                )}
              </div>

              {/* Dana Awal */}
              <div className="form-group-modern">
                <label htmlFor="danaAwal" className="form-label-modern">
                  Modal / Dana Awal (Rupiah)
                </label>
                <div className="input-group-modern">
                  <span className="input-prefix-badge">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="danaAwal"
                    name="danaAwal"
                    value={formatRibuan(formData.danaAwal)}
                    onChange={handleMoneyChange}
                    placeholder="0 jika mulai tanpa modal"
                    className={`input-modern ${validation.errors.danaAwal ? 'input-error' : ''}`}
                  />
                </div>
                {validation.errors.danaAwal && (
                  <div className="field-error-modern">
                    <span>⚠️</span> {validation.errors.danaAwal}
                  </div>
                )}
              </div>

              {/* Setoran Bulanan */}
              <div className="form-group-modern">
                <label htmlFor="setoranBulanan" className="form-label-modern">
                  Setoran Rutin Bulanan (Akhir Bulan)
                </label>
                <div className="input-group-modern">
                  <span className="input-prefix-badge">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="setoranBulanan"
                    name="setoranBulanan"
                    value={formatRibuan(formData.setoranBulanan)}
                    onChange={handleMoneyChange}
                    placeholder="400.000"
                    className={`input-modern ${validation.errors.setoranBulanan ? 'input-error' : ''}`}
                  />
                  <span className="input-suffix-badge">/bulan</span>
                </div>
                {validation.errors.setoranBulanan && (
                  <div className="field-error-modern">
                    <span>⚠️</span> {validation.errors.setoranBulanan}
                  </div>
                )}
              </div>

              {/* Jangka Waktu */}
              <div className="form-group-modern">
                <label htmlFor="jangkaWaktuBulan" className="form-label-modern">
                  Jangka Waktu (Bulan) <span className="text-required">*</span>
                </label>
                <div className="input-group-modern">
                  <input
                    type="number"
                    id="jangkaWaktuBulan"
                    name="jangkaWaktuBulan"
                    min="1"
                    max="240"
                    value={formData.jangkaWaktuBulan}
                    onChange={handleChange}
                    placeholder="24"
                    className={`input-modern ${validation.errors.jangkaWaktuBulan ? 'input-error' : ''}`}
                  />
                  <span className="input-suffix-badge">Bulan</span>
                </div>
                <small className="field-helper-modern">
                  {formData.jangkaWaktuBulan > 0
                    ? `Setara dengan ${(Number(formData.jangkaWaktuBulan) / 12).toFixed(1)} tahun durasi rencana`
                    : 'Berapa bulan rencana berjalan'}
                </small>
                {validation.errors.jangkaWaktuBulan && (
                  <div className="field-error-modern">
                    <span>⚠️</span> {validation.errors.jangkaWaktuBulan}
                  </div>
                )}
              </div>

              {/* Asumsi Return & Inflasi */}
              <div className="form-row-compact">
                <div className="form-group-modern">
                  <label htmlFor="pertumbuhanTahunan" className="form-label-modern">
                    Return /thn (%)
                  </label>
                  <div className="input-group-modern">
                    <input
                      type="number"
                      id="pertumbuhanTahunan"
                      name="pertumbuhanTahunan"
                      step="0.5"
                      value={formData.pertumbuhanTahunan}
                      onChange={handleChange}
                      className={`input-modern ${validation.errors.pertumbuhanTahunan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">%</span>
                  </div>
                  {validation.errors.pertumbuhanTahunan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {validation.errors.pertumbuhanTahunan}
                    </div>
                  )}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="inflasiTahunan" className="form-label-modern">
                    Inflasi /thn (%)
                  </label>
                  <div className="input-group-modern">
                    <input
                      type="number"
                      id="inflasiTahunan"
                      name="inflasiTahunan"
                      step="0.5"
                      value={formData.inflasiTahunan}
                      onChange={handleChange}
                      className={`input-modern ${validation.errors.inflasiTahunan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">%</span>
                  </div>
                  {validation.errors.inflasiTahunan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {validation.errors.inflasiTahunan}
                    </div>
                  )}
                </div>
              </div>

              {/* Tombol Hitung & Arahkan Hasil */}
              <div className="sim-calculate-btn-row">
                <button
                  type="button"
                  className="btn-primary-lime sim-btn-calculate"
                  onClick={handleScrollToResults}
                >
                  Hitung Simulasi &rarr;
                </button>
              </div>
            </form>
          </aside>

          {/* Kolom Kanan: Evaluasi Target, Metrik, Chart, & Detail Breakdown */}
          <div id="hasil-simulasi-section" className="simulation-display-column">
            {/* Banner Status Evaluasi Pencapaian Target */}
            <div className={`target-status-card ${tercapai ? 'status-reached' : 'status-unreached'}`}>
              <div className="status-card-icon">
                {tercapai ? '🎉' : '⚠️'}
              </div>
              <div className="status-card-body">
                <h3 className="status-card-title">
                  {tercapai
                    ? `Target ${formatRupiah(targetDana)} Berhasil Tercapai!`
                    : `Target Belum Tercapai pada Akhir Periode (${formData.jangkaWaktuBulan} Bulan)`}
                </h3>
                <p className="status-card-desc">
                  {tercapai ? (
                    <>
                      Target tercapai pertama kali pada <strong>Bulan ke-{bulanTercapai}</strong>{' '}
                      ({bulanTercapai === 0 ? 'sejak modal awal' : `sekitar ${(bulanTercapai / 12).toFixed(1)} tahun`}). Saldo akhir proyeksi Anda mencapai <strong>{formatRupiah(saldoNominalAkhir)}</strong>.
                    </>
                  ) : (
                    <>
                      Pada bulan ke-{formData.jangkaWaktuBulan}, proyeksi saldo Anda mencapai{' '}
                      <strong>{formatRupiah(saldoNominalAkhir)}</strong>, masih terdapat kekurangan sebesar{' '}
                      <strong>{formatRupiah(kekuranganDana)}</strong> dari target {formatRupiah(targetDana)}. Anda dapat menaikkan setoran rutin bulanan atau memperpanjang jangka waktu.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Grid 4 Kartu Ringkasan Metrik Finansial */}
            <div className="simulation-stats-grid">
              {/* 1. Modal Setoran Sendiri */}
              <div className="sim-stat-box box-blue">
                <span className="sim-stat-tag">Akumulasi Modal Sendiri</span>
                <span className="sim-stat-number">{formatRupiah(akumulasiModalAkhir)}</span>
                <span className="sim-stat-sub">
                  Awal ({formatRupiah(danaAwal)}) + Rutin ({formatRupiah(setoranBulanan * jangkaWaktuBulan)})
                </span>
              </div>

              {/* 2. Tambahan Pertumbuhan Nilai */}
              <div className="sim-stat-box box-lime">
                <span className="sim-stat-tag">Tambahan Nilai (Bunga Majemuk)</span>
                <span className="sim-stat-number text-green">
                  +{formatRupiah(totalPertumbuhan)}
                </span>
                <span className="sim-stat-sub">
                  Imbal hasil akumulatif ({formData.pertumbuhanTahunan}%/thn)
                </span>
              </div>

              {/* 3. Saldo Nominal Akhir */}
              <div className="sim-stat-box box-emerald">
                <span className="sim-stat-tag">Saldo Nominal Akhir</span>
                <span className="sim-stat-number">{formatRupiah(saldoNominalAkhir)}</span>
                <span className="sim-stat-sub">
                  Total saldo di rekening bulan ke-{jangkaWaktuBulan}
                </span>
              </div>

              {/* 4. Daya Beli Riil */}
              <div className="sim-stat-box box-amber">
                <span className="sim-stat-tag">Daya Beli Riil (Setelah Inflasi)</span>
                <span className="sim-stat-number">{formatRupiah(dayaBeliAkhir)}</span>
                <span className="sim-stat-sub">
                  Nilai riil barang dengan inflasi {formData.inflasiTahunan}%/thn
                </span>
              </div>
            </div>

            {/* Card Grafik Chart.js */}
            <div className="fintech-card chart-card-container">
              <div className="chart-header-row">
                <div>
                  <h3 className="chart-title-modern">📈 Proyeksi Pertumbuhan Dana: {formData.namaTujuan}</h3>
                  <p className="chart-subtitle-modern">
                    Sumbu X menampilkan waktu berjalan (Bulan), Sumbu Y menampilkan estimasi dana (Rupiah).
                  </p>
                </div>
              </div>

              <SimulationChart
                monthlyData={monthlyData}
                targetDana={targetDana}
                namaTujuan={formData.namaTujuan}
              />

              {/* Catatan Edukasi Grafik */}
              <div className="chart-legend-box">
                <div className="legend-row-item">
                  <span className="dot dot-nominal"></span>
                  <span><strong>Garis Hijau Zaitun (Saldo Nominal):</strong> Jumlah total uang di rekening (Modal Pokok + Hasil Bunga Majemuk).</span>
                </div>
                <div className="legend-row-item">
                  <span className="dot dot-modal"></span>
                  <span><strong>Garis Putus Navy Slate (Akumulasi Modal):</strong> Jumlah murni uang setoran dari kantong Anda sendiri.</span>
                </div>
                <div className="legend-row-item">
                  <span className="dot dot-dayabeli"></span>
                  <span><strong>Garis Oranye (Daya Beli Riil):</strong> Kemampuan riil belanja uang Anda setelah dipotong dampak inflasi.</span>
                </div>
              </div>
            </div>

            {/* Opsi Tampilkan Tabel Rincian Bulanan */}
            <div className="table-toggle-wrapper">
              <button
                type="button"
                className="btn-secondary-light btn-sm"
                onClick={() => setShowTableDetail(!showTableDetail)}
              >
                {showTableDetail ? '▲ Sembunyikan Tabel Rincian Bulanan' : '▼ Tampilkan Tabel Rincian Bulanan'}
              </button>
            </div>

            {showTableDetail && (
              <div className="fintech-card table-detail-card">
                <h4 className="table-detail-title">Tabel Rincian Saldo dari Bulan ke Bulan</h4>
                <div className="table-responsive-modern">
                  <table className="simulation-data-table">
                    <thead>
                      <tr>
                        <th>Bulan</th>
                        <th>Akumulasi Modal</th>
                        <th>Saldo Nominal</th>
                        <th>Daya Beli Riil</th>
                        <th>Faktor Inflasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyData.map((d) => (
                        <tr key={d.bulan}>
                          <td><strong>Bulan {d.bulan}</strong></td>
                          <td>{formatRupiah(d.akumulasiModal)}</td>
                          <td className="text-green font-bold">{formatRupiah(d.saldoNominal)}</td>
                          <td className="text-amber">{formatRupiah(d.dayaBeli)}</td>
                          <td>{d.faktorInflasi.toFixed(4)}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Disclaimer Edukasi Eksplisit */}
            <div className="simulation-disclaimer-card">
              <span>
                ⚠️ <strong>Disclaimer Edukasi:</strong> Simulasi ini menggunakan rumus matematika finansial deterministik standar untuk tujuan latihan literasi keuangan. Di pasar riil, imbal hasil investasi berfluktuasi dan tidak membentuk kurva lurus mulus. KitaInvest tidak menjamin hasil tertentu dan tidak melayani transaksi produk investasi.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationPage;
