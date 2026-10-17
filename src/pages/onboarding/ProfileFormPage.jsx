import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { formatRibuan, parseAngka } from '../../utils/formatters.js';

export function ProfileFormPage() {
  const { category, financialData, updateFinancialData, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    usia: financialData.usia || '',
    uangSakuBulanan: financialData.uangSakuBulanan || '',
    pendapatanBulanan: financialData.pendapatanBulanan || '',
    pengeluaranBulanan: financialData.pengeluaranBulanan || '',
    danaDimiliki: financialData.danaDimiliki || '',
    pemasukanRutinBulanan: financialData.pemasukanRutinBulanan || '',
    tabungan: financialData.tabungan || '',
  });

  const [errors, setErrors] = useState({});

  if (!category) {
    return (
      <div className="fintech-subpage-wrapper">
        <section className="fintech-header-banner">
          <div className="fintech-header-container">
            <h1 className="fintech-page-title">Kategori Belum Dipilih</h1>
            <p className="fintech-page-subtitle">Silakan pilih kategori peran terlebih dahulu.</p>
          </div>
        </section>
        <div className="fintech-body-container">
          <div className="fintech-card text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <p style={{ marginBottom: '1.5rem', color: '#64748B' }}>
              Anda belum memilih profil peran belajar.
            </p>
            <button
              type="button"
              className="btn-primary-lime"
              onClick={() => navigateTo('category')}
            >
              Pilih Kategori Peran Sekarang →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleMoneyChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = parseAngka(value);
    setFormData((prev) => ({
      ...prev,
      [name]: cleanValue,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const errs = {};

    // 1. Validasi Usia
    if (formData.usia === '' || formData.usia === null) {
      errs.usia = 'Usia wajib diisi.';
    } else {
      const usiaNum = Number(formData.usia);
      if (isNaN(usiaNum) || !Number.isInteger(usiaNum) || usiaNum <= 0) {
        errs.usia = 'Usia harus berupa bilangan bulat positif (> 0).';
      }
    }

    // Helper validasi angka dana (wajib & tidak boleh < 0)
    const validateAmount = (field, label) => {
      const val = formData[field];
      if (val === '' || val === null) {
        errs[field] = `${label} wajib diisi.`;
      } else {
        const num = Number(val);
        if (isNaN(num)) {
          errs[field] = `${label} harus berupa angka valid.`;
        } else if (num < 0) {
          errs[field] = `${label} tidak boleh bernilai negatif (< 0).`;
        }
      }
    };

    if (category === 'Pelajar') {
      validateAmount('uangSakuBulanan', 'Uang saku / pemasukan bulanan');
      validateAmount('tabungan', 'Tabungan saat ini');
    } else if (category === 'Pekerja') {
      validateAmount('pendapatanBulanan', 'Pendapatan bulanan');
      validateAmount('pengeluaranBulanan', 'Pengeluaran bulanan');
      validateAmount('tabungan', 'Tabungan saat ini');
    } else if (category === 'Pensiunan') {
      validateAmount('danaDimiliki', 'Dana yang sudah dimiliki');
      validateAmount('pemasukanRutinBulanan', 'Pemasukan rutin bulanan');
      validateAmount('pengeluaranBulanan', 'Pengeluaran bulanan');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateFinancialData(formData);
      navigateTo('summary');
    }
  };

  return (
    <div className="fintech-subpage-wrapper">
      {/* Page Header Banner */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="fintech-pill-badge">
            <span className="hero-pill-dot" aria-hidden="true">●</span>
            <span>Input Profil Finansial: {category}</span>
          </div>
          <h1 className="fintech-page-title">
            Formulir Profil Keuangan <span className="text-lime-highlight">({category})</span>
          </h1>
          <p className="fintech-page-subtitle">
            Data ini hanya disimpan sementara di memori peramban Anda (in-memory) dan akan otomatis
            terhapus saat halaman dimuat ulang sesuai prinsip privasi KitaInvest.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="fintech-body-container">
        <div className="fintech-form-card">
          <form onSubmit={handleSubmit} noValidate>
            {/* Input Usia */}
            <div className="form-group-modern">
              <label htmlFor="usia" className="form-label-modern">
                Usia Pengguna (Tahun) <span className="text-required">*</span>
              </label>
              <div className="input-group-modern">
                <input
                  type="number"
                  id="usia"
                  name="usia"
                  value={formData.usia}
                  onChange={handleChange}
                  placeholder="Contoh: 21"
                  className={`input-modern ${errors.usia ? 'input-error' : ''}`}
                  min="1"
                />
                <span className="input-suffix-badge">Tahun</span>
              </div>
              {errors.usia && (
                <div className="field-error-modern">
                  <span>⚠️</span> {errors.usia}
                </div>
              )}
            </div>

            {/* Kolom Khusus Kategori Pelajar */}
            {category === 'Pelajar' && (
              <>
                <div className="form-group-modern">
                  <label htmlFor="uangSakuBulanan" className="form-label-modern">
                    Uang Saku / Pemasukan Bulanan <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="uangSakuBulanan"
                      name="uangSakuBulanan"
                      value={formatRibuan(formData.uangSakuBulanan)}
                      onChange={handleMoneyChange}
                      placeholder="1.500.000"
                      className={`input-modern ${errors.uangSakuBulanan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">/bulan</span>
                  </div>
                  {errors.uangSakuBulanan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.uangSakuBulanan}
                    </div>
                  )}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="tabungan" className="form-label-modern">
                    Tabungan yang Dimiliki Saat Ini <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="tabungan"
                      name="tabungan"
                      value={formatRibuan(formData.tabungan)}
                      onChange={handleMoneyChange}
                      placeholder="3.000.000"
                      className={`input-modern ${errors.tabungan ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.tabungan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.tabungan}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Kolom Khusus Kategori Pekerja */}
            {category === 'Pekerja' && (
              <>
                <div className="form-group-modern">
                  <label htmlFor="pendapatanBulanan" className="form-label-modern">
                    Pendapatan Bulanan <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="pendapatanBulanan"
                      name="pendapatanBulanan"
                      value={formatRibuan(formData.pendapatanBulanan)}
                      onChange={handleMoneyChange}
                      placeholder="8.000.000"
                      className={`input-modern ${errors.pendapatanBulanan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">/bulan</span>
                  </div>
                  {errors.pendapatanBulanan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.pendapatanBulanan}
                    </div>
                  )}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="pengeluaranBulanan" className="form-label-modern">
                    Pengeluaran Bulanan <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="pengeluaranBulanan"
                      name="pengeluaranBulanan"
                      value={formatRibuan(formData.pengeluaranBulanan)}
                      onChange={handleMoneyChange}
                      placeholder="5.000.000"
                      className={`input-modern ${errors.pengeluaranBulanan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">/bulan</span>
                  </div>
                  {errors.pengeluaranBulanan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.pengeluaranBulanan}
                    </div>
                  )}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="tabungan" className="form-label-modern">
                    Tabungan yang Dimiliki Saat Ini <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="tabungan"
                      name="tabungan"
                      value={formatRibuan(formData.tabungan)}
                      onChange={handleMoneyChange}
                      placeholder="15.000.000"
                      className={`input-modern ${errors.tabungan ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.tabungan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.tabungan}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Kolom Khusus Kategori Pensiunan */}
            {category === 'Pensiunan' && (
              <>
                <div className="form-group-modern">
                  <label htmlFor="danaDimiliki" className="form-label-modern">
                    Dana yang Sudah Dimiliki <span className="text-required">*</span>
                  </label>
                  <p className="input-helper-modern">
                    Total dana pensiun atau tabungan akumulatif yang siap dijaga nilainya dari inflasi.
                  </p>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="danaDimiliki"
                      name="danaDimiliki"
                      value={formatRibuan(formData.danaDimiliki)}
                      onChange={handleMoneyChange}
                      placeholder="250.000.000"
                      className={`input-modern ${errors.danaDimiliki ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.danaDimiliki && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.danaDimiliki}
                    </div>
                  )}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="pemasukanRutinBulanan" className="form-label-modern">
                    Pemasukan Rutin Bulanan <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="pemasukanRutinBulanan"
                      name="pemasukanRutinBulanan"
                      value={formatRibuan(formData.pemasukanRutinBulanan)}
                      onChange={handleMoneyChange}
                      placeholder="3.500.000"
                      className={`input-modern ${errors.pemasukanRutinBulanan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">/bulan</span>
                  </div>
                  {errors.pemasukanRutinBulanan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.pemasukanRutinBulanan}
                    </div>
                  )}
                </div>

                <div className="form-group-modern">
                  <label htmlFor="pengeluaranBulanan" className="form-label-modern">
                    Pengeluaran Bulanan <span className="text-required">*</span>
                  </label>
                  <div className="input-group-modern">
                    <span className="input-prefix-badge">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="pengeluaranBulanan"
                      name="pengeluaranBulanan"
                      value={formatRibuan(formData.pengeluaranBulanan)}
                      onChange={handleMoneyChange}
                      placeholder="4.000.000"
                      className={`input-modern ${errors.pengeluaranBulanan ? 'input-error' : ''}`}
                    />
                    <span className="input-suffix-badge">/bulan</span>
                  </div>
                  {errors.pengeluaranBulanan && (
                    <div className="field-error-modern">
                      <span>⚠️</span> {errors.pengeluaranBulanan}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="form-actions-modern">
              <button
                type="button"
                className="btn-secondary-light"
                onClick={() => navigateTo('category')}
              >
                ← Ganti Kategori Peran
              </button>
              <button type="submit" className="btn-primary-lime">
                Simpan & Lihat Ringkasan Data →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileFormPage;
