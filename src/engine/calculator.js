/**
 * Financial Engine - KitaInvest
 * Agent 5: Financial Engine & Chart.js
 * Domain: /src/engine/
 *
 * Rumus Matematika Eksak:
 * 1. r_bulanan = Math.pow(1 + r_tahunan, 1 / 12) - 1
 * 2. Saldo_Nominal_t = (Saldo_Nominal_{t-1} * (1 + r_bulanan)) + Setoran_Bulanan
 * 3. Akumulasi_Modal_t = Dana_Awal + (Setoran_Bulanan * t)
 * 4. Faktor_Inflasi_t = Math.pow(1 + i_tahunan, t / 12)
 * 5. Daya_Beli_t = Saldo_Nominal_t / Faktor_Inflasi_t
 */

/**
 * Normalisasi floating point untuk menghindari artefak presisi IEEE 754
 * Contoh: 1120000.000000001 -> 1120000
 */
function cleanFloat(value) {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < 1e-9) {
    return rounded;
  }
  return Number(value.toFixed(6));
}

/**
 * Normalisasi persentase ke format desimal (misal: 12 atau 0.12 -> 0.12)
 */
function normalizeRate(rate) {
  if (typeof rate !== 'number' || isNaN(rate)) return 0;
  if (Math.abs(rate) > 1) {
    return rate / 100;
  }
  return rate;
}

/**
 * Validasi input simulasi rencana dana
 * @param {Object} input
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateSimulationInput(input = {}) {
  const errors = {};

  if (!input.namaTujuan || typeof input.namaTujuan !== 'string' || input.namaTujuan.trim() === '') {
    errors.namaTujuan = 'Nama tujuan rencana dana wajib diisi.';
  }

  const targetDana = Number(input.targetDana);
  if (isNaN(targetDana) || targetDana <= 0) {
    errors.targetDana = 'Target dana harus lebih besar dari 0.';
  }

  const danaAwal = Number(input.danaAwal);
  if (isNaN(danaAwal) || danaAwal < 0) {
    errors.danaAwal = 'Dana awal tidak boleh negatif.';
  }

  const setoranBulanan = Number(input.setoranBulanan);
  if (isNaN(setoranBulanan) || setoranBulanan < 0) {
    errors.setoranBulanan = 'Setoran bulanan tidak boleh negatif.';
  }

  const jangkaWaktuBulan = Number(input.jangkaWaktuBulan);
  if (isNaN(jangkaWaktuBulan) || !Number.isInteger(jangkaWaktuBulan) || jangkaWaktuBulan <= 0) {
    errors.jangkaWaktuBulan = 'Jangka waktu harus berupa bilangan bulat positif dalam bulan.';
  }

  const rTahunan = normalizeRate(Number(input.pertumbuhanTahunan ?? input.r_tahunan ?? 0));
  if (rTahunan <= -1) {
    errors.pertumbuhanTahunan = 'Asumsi pertumbuhan tahunan harus lebih besar dari -100%.';
  }

  const iTahunan = normalizeRate(Number(input.inflasiTahunan ?? input.i_tahunan ?? 0));
  if (iTahunan <= -1) {
    errors.inflasiTahunan = 'Asumsi inflasi tahunan harus lebih besar dari -100%.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Menghitung simulasi pertumbuhan dana dan daya beli
 * @param {Object} params
 * @returns {Object} Hasil simulasi dan data bulanan
 */
export function calculateSimulation(params = {}) {
  const danaAwal = Number(params.danaAwal) || 0;
  const setoranBulanan = Number(params.setoranBulanan) || 0;
  const jangkaWaktuBulan = Number(params.jangkaWaktuBulan) || 0;
  const targetDana = Number(params.targetDana) || 0;

  const rTahunan = normalizeRate(Number(params.pertumbuhanTahunan ?? params.r_tahunan ?? 0));
  const iTahunan = normalizeRate(Number(params.inflasiTahunan ?? params.i_tahunan ?? 0));

  // 1. Konversi Pertumbuhan Tahunan ke Tingkat Bulanan
  // r_bulanan = Math.pow(1 + r_tahunan, 1 / 12) - 1
  const rBulanan = Math.pow(1 + rTahunan, 1 / 12) - 1;

  // Array data bulanan untuk grafik dan tabel
  const monthlyData = [];

  // Saldo awal pada bulan t = 0
  let currentSaldoNominal = danaAwal;
  let currentAkumulasiModal = danaAwal;
  let currentDayaBeli = danaAwal;

  monthlyData.push({
    bulan: 0,
    akumulasiModal: cleanFloat(currentAkumulasiModal),
    saldoNominal: cleanFloat(currentSaldoNominal),
    dayaBeli: cleanFloat(currentDayaBeli),
    faktorInflasi: 1,
  });

  let bulanTercapai = null;
  if (targetDana > 0 && currentSaldoNominal >= targetDana) {
    bulanTercapai = 0;
  }

  // 2 & 3. Iterasi dari t = 1 sampai N bulan
  for (let t = 1; t <= jangkaWaktuBulan; t++) {
    // Setoran masuk di AKHIR BULAN, tidak langsung berbunga di bulan yang sama
    currentSaldoNominal = (currentSaldoNominal * (1 + rBulanan)) + setoranBulanan;
    currentAkumulasiModal = danaAwal + (setoranBulanan * t);

    // Faktor Inflasi pada bulan t
    const faktorInflasi = Math.pow(1 + iTahunan, t / 12);
    currentDayaBeli = currentSaldoNominal / faktorInflasi;

    // Catat pertama kali mencapai target
    if (bulanTercapai === null && targetDana > 0 && currentSaldoNominal >= targetDana) {
      bulanTercapai = t;
    }

    monthlyData.push({
      bulan: t,
      akumulasiModal: cleanFloat(currentAkumulasiModal),
      saldoNominal: cleanFloat(currentSaldoNominal),
      dayaBeli: cleanFloat(currentDayaBeli),
      faktorInflasi: cleanFloat(faktorInflasi),
    });
  }

  const saldoNominalAkhir = cleanFloat(currentSaldoNominal);
  const akumulasiModalAkhir = cleanFloat(currentAkumulasiModal);
  const dayaBeliAkhir = cleanFloat(currentDayaBeli);

  const tercapai = targetDana > 0 ? saldoNominalAkhir >= targetDana : false;
  const kekuranganDana = targetDana > 0 && saldoNominalAkhir < targetDana 
    ? cleanFloat(targetDana - saldoNominalAkhir) 
    : 0;

  return {
    namaTujuan: params.namaTujuan || '',
    targetDana,
    danaAwal,
    setoranBulanan,
    jangkaWaktuBulan,
    rTahunan,
    iTahunan,
    rBulanan,
    saldoNominalAkhir,
    akumulasiModalAkhir,
    dayaBeliAkhir,
    totalPertumbuhan: cleanFloat(saldoNominalAkhir - akumulasiModalAkhir),
    tercapai,
    bulanTercapai,
    kekuranganDana,
    monthlyData,
  };
}

/**
 * Helper untuk format mata uang Rupiah
 * @param {number} amount
 * @returns {string}
 */
export function formatRupiah(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp0';
  return 'Rp' + Math.round(amount).toLocaleString('id-ID');
}
