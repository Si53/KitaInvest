/**
 * Helper Pemformatan Angka & Rupiah Indonesia (id-ID) - KitaInvest
 * Agent 7: UI/UX Audit & Polish
 * Domain: /src/utils/
 */

/**
 * Membersihkan string input sehingga hanya menyisakan digit angka murni.
 * Menghapus titik, koma, spasi, atau karakter non-angka lainnya.
 * @param {string|number} value
 * @returns {string} String angka murni tanpa pemisah
 */
export function parseAngka(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  return str.replace(/\D/g, '');
}

/**
 * Memformat angka menjadi format pemisah ribuan Indonesia dengan tanda titik (.)
 * Contoh: 12100001 -> '12.100.001', 1000000 -> '1.000.000'
 * @param {string|number} value
 * @returns {string}
 */
export function formatRibuan(value) {
  if (value === null || value === undefined || value === '') return '';
  const clean = parseAngka(value);
  if (!clean) return '';
  const num = parseInt(clean, 10);
  if (isNaN(num)) return '';
  return num.toLocaleString('id-ID');
}
