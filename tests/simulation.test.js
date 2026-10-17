import { describe, it, expect } from 'vitest';
import {
  calculateSimulation,
  validateSimulationInput,
  formatRupiah,
} from '../src/engine/calculator.js';

describe('Modul Rencana dan Simulasi Finansial (Minggu 5)', () => {
  it('1. Validasi input formulir rencana dana sesuai aturan RULES.md', () => {
    // Input kosong / invalid
    const invalidRes = validateSimulationInput({
      namaTujuan: '',
      targetDana: 0,
      danaAwal: -1000,
      setoranBulanan: -500,
      jangkaWaktuBulan: 0,
      pertumbuhanTahunan: -150,
      inflasiTahunan: -120,
    });

    expect(invalidRes.isValid).toBe(false);
    expect(invalidRes.errors.namaTujuan).toBeDefined();
    expect(invalidRes.errors.targetDana).toBeDefined();
    expect(invalidRes.errors.danaAwal).toBeDefined();
    expect(invalidRes.errors.setoranBulanan).toBeDefined();
    expect(invalidRes.errors.jangkaWaktuBulan).toBeDefined();
    expect(invalidRes.errors.pertumbuhanTahunan).toBeDefined();
    expect(invalidRes.errors.inflasiTahunan).toBeDefined();

    // Input valid
    const validRes = validateSimulationInput({
      namaTujuan: 'Dana Laptop',
      targetDana: 12000000,
      danaAwal: 1000000,
      setoranBulanan: 400000,
      jangkaWaktuBulan: 24,
      pertumbuhanTahunan: 12,
      inflasiTahunan: 5,
    });

    expect(validRes.isValid).toBe(true);
    expect(Object.keys(validRes.errors)).toHaveLength(0);
  });

  it('2. Evaluasi target tercapai di tengah periode dan mencatat bulan pertama tercapai', () => {
    // Target 10 juta, Dana awal 1 juta, setoran 500rb per bulan, 24 bulan, return 12%
    const res = calculateSimulation({
      namaTujuan: 'Dana Liburan',
      targetDana: 10000000,
      danaAwal: 1000000,
      setoranBulanan: 500000,
      jangkaWaktuBulan: 24,
      pertumbuhanTahunan: 12,
      inflasiTahunan: 5,
    });

    expect(res.tercapai).toBe(true);
    expect(res.bulanTercapai).toBeGreaterThan(0);
    expect(res.bulanTercapai).toBeLessThan(24);
    expect(res.kekuranganDana).toBe(0);

    // Pastikan pada bulan pertama tercapai saldo memang sudah >= target
    const dataBulanTercapai = res.monthlyData[res.bulanTercapai];
    expect(dataBulanTercapai.saldoNominal).toBeGreaterThanOrEqual(10000000);
  });

  it('3. Evaluasi jika modal awal sudah mencukupi target dana (Bulan 0)', () => {
    const res = calculateSimulation({
      namaTujuan: 'Dana Siap',
      targetDana: 5000000,
      danaAwal: 5000000,
      setoranBulanan: 100000,
      jangkaWaktuBulan: 12,
      pertumbuhanTahunan: 10,
      inflasiTahunan: 5,
    });

    expect(res.tercapai).toBe(true);
    expect(res.bulanTercapai).toBe(0);
    expect(res.kekuranganDana).toBe(0);
  });

  it('4. Evaluasi target belum tercapai dan menghitung kekurangan dana akhir secara presisi', () => {
    // Target 20 juta, Dana awal 0, setoran 200rb, 12 bulan -> saldo akhir jauh di bawah 20 jt
    const res = calculateSimulation({
      namaTujuan: 'Target Besar',
      targetDana: 20000000,
      danaAwal: 0,
      setoranBulanan: 200000,
      jangkaWaktuBulan: 12,
      pertumbuhanTahunan: 10,
      inflasiTahunan: 5,
    });

    expect(res.tercapai).toBe(false);
    expect(res.bulanTercapai).toBeNull();
    expect(res.kekuranganDana).toBeGreaterThan(0);
    expect(res.kekuranganDana).toBe(20000000 - res.saldoNominalAkhir);
  });

  it('5. Menghasilkan struktur data bulanan lengkap (Bulan 0 s.d. N) untuk grafik Chart.js', () => {
    const N = 36;
    const res = calculateSimulation({
      namaTujuan: 'Uji Grafik',
      targetDana: 50000000,
      danaAwal: 2000000,
      setoranBulanan: 1000000,
      jangkaWaktuBulan: N,
      pertumbuhanTahunan: 12,
      inflasiTahunan: 6,
    });

    // Panjang data harus N + 1 (dari bulan 0 hingga N)
    expect(res.monthlyData).toHaveLength(N + 1);

    // Bulan 0: Titik permulaan
    const bulan0 = res.monthlyData[0];
    expect(bulan0.bulan).toBe(0);
    expect(bulan0.akumulasiModal).toBe(2000000);
    expect(bulan0.saldoNominal).toBe(2000000);
    expect(bulan0.dayaBeli).toBe(2000000);
    expect(bulan0.faktorInflasi).toBe(1);

    // Bulan N: Titik akhir
    const bulanN = res.monthlyData[N];
    expect(bulanN.bulan).toBe(N);
    expect(bulanN.saldoNominal).toBe(res.saldoNominalAkhir);
    expect(bulanN.akumulasiModal).toBe(res.akumulasiModalAkhir);
    expect(bulanN.dayaBeli).toBe(res.dayaBeliAkhir);
    expect(bulanN.faktorInflasi).toBeGreaterThan(1);
    expect(bulanN.dayaBeli).toBeLessThan(bulanN.saldoNominal);
  });

  it('6. Helper formatRupiah memformat mata uang Indonesia dengan benar', () => {
    expect(formatRupiah(1000000)).toBe('Rp1.000.000');
    expect(formatRupiah(0)).toBe('Rp0');
    expect(formatRupiah('invalid')).toBe('Rp0');
  });
});
