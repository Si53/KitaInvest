import { describe, it, expect } from 'vitest';
import {
  calculateSimulation,
  validateSimulationInput,
  formatRupiah,
} from '../src/engine/calculator.js';

describe('Financial Engine - Calculator Tests (Agent 6 QA)', () => {
  it('1. Test Akumulasi Nol Persen: Dana Awal = 1.000.000, Setoran = 100.000, 12 bulan, pertumbuhan 0%, inflasi 0% menghasilkan tepat Rp2.200.000', () => {
    const input = {
      namaTujuan: 'Dana Tabungan',
      targetDana: 2500000,
      danaAwal: 1000000,
      setoranBulanan: 100000,
      jangkaWaktuBulan: 12,
      pertumbuhanTahunan: 0,
      inflasiTahunan: 0,
    };

    const result = calculateSimulation(input);

    // Verifikasi nilai numerik eksak
    expect(result.akumulasiModalAkhir).toBe(2200000);
    expect(result.saldoNominalAkhir).toBe(2200000);
    expect(result.dayaBeliAkhir).toBe(2200000);

    // Verifikasi formatting Rupiah
    expect(formatRupiah(result.saldoNominalAkhir)).toBe('Rp2.200.000');
    expect(formatRupiah(result.akumulasiModalAkhir)).toBe('Rp2.200.000');
    expect(formatRupiah(result.dayaBeliAkhir)).toBe('Rp2.200.000');

    // Verifikasi evaluasi target
    expect(result.tercapai).toBe(false);
    expect(result.kekuranganDana).toBe(300000);
  });

  it('2. Test Pertumbuhan Majemuk 12%: Dana Awal = 1.000.000, Setoran = 0, 12 bulan, pertumbuhan 12% menghasilkan tepat Rp1.120.000', () => {
    const input = {
      namaTujuan: 'Investasi Awal',
      targetDana: 1100000,
      danaAwal: 1000000,
      setoranBulanan: 0,
      jangkaWaktuBulan: 12,
      pertumbuhanTahunan: 12, // Mendukung format persen (12) maupun desimal (0.12)
      inflasiTahunan: 0,
    };

    const result = calculateSimulation(input);

    // Verifikasi nilai numerik eksak (tepat 1.120.000)
    expect(result.saldoNominalAkhir).toBe(1120000);
    expect(result.akumulasiModalAkhir).toBe(1000000);
    expect(result.totalPertumbuhan).toBe(120000);

    // Verifikasi formatting Rupiah
    expect(formatRupiah(result.saldoNominalAkhir)).toBe('Rp1.120.000');

    // Verifikasi pencapaian target (Bulan target tercapai)
    expect(result.tercapai).toBe(true);
    expect(result.bulanTercapai).not.toBeNull();
  });

  it('3. Test Pertumbuhan Majemuk 12% dengan input desimal (0.12)', () => {
    const input = {
      namaTujuan: 'Investasi Desimal',
      targetDana: 1120000,
      danaAwal: 1000000,
      setoranBulanan: 0,
      jangkaWaktuBulan: 12,
      pertumbuhanTahunan: 0.12,
      inflasiTahunan: 0,
    };

    const result = calculateSimulation(input);
    expect(result.saldoNominalAkhir).toBe(1120000);
    expect(result.tercapai).toBe(true);
    expect(result.bulanTercapai).toBe(12);
  });

  it('4. Test Efek Inflasi terhadap Daya Beli', () => {
    const input = {
      namaTujuan: 'Dana Inflasi',
      targetDana: 1000000,
      danaAwal: 1000000,
      setoranBulanan: 0,
      jangkaWaktuBulan: 12,
      pertumbuhanTahunan: 0,
      inflasiTahunan: 0.10, // 10% inflasi
    };

    const result = calculateSimulation(input);
    expect(result.saldoNominalAkhir).toBe(1000000);
    // Daya beli = 1000000 / (1 + 0.10)^(12/12) = 1000000 / 1.10 = 909090.909...
    expect(result.dayaBeliAkhir).toBeCloseTo(909090.91, 1);
  });

  it('5. Test Validasi Input', () => {
    const invalidInput = {
      namaTujuan: '',
      targetDana: -500,
      danaAwal: -100,
      setoranBulanan: -20,
      jangkaWaktuBulan: 0,
      pertumbuhanTahunan: -150,
      inflasiTahunan: -200,
    };

    const validation = validateSimulationInput(invalidInput);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.namaTujuan).toBeDefined();
    expect(validation.errors.targetDana).toBeDefined();
    expect(validation.errors.danaAwal).toBeDefined();
    expect(validation.errors.setoranBulanan).toBeDefined();
    expect(validation.errors.jangkaWaktuBulan).toBeDefined();
    expect(validation.errors.pertumbuhanTahunan).toBeDefined();
    expect(validation.errors.inflasiTahunan).toBeDefined();
  });
});
