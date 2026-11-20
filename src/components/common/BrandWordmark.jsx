import React from 'react';

/**
 * BrandWordmark - Penulisan brand "KitaInvest" dengan dua warna.
 * "Kita" mengikuti warna teks induk sesuai latar, "Invest" selalu hijau brand.
 *
 * tone:
 *  - 'dark'  -> dipakai di atas latar gelap: "Kita" putih
 *  - 'light' -> dipakai di atas latar putih/terang: "Kita" hitam
 */
export function BrandWordmark({ tone = 'dark', className = '' }) {
  return (
    <span className={`brand-wordmark brand-wordmark--${tone}${className ? ` ${className}` : ''}`}>
      <span className="brand-wordmark-kita">Kita</span>
      <span className="brand-wordmark-invest">Invest</span>
    </span>
  );
}

export default BrandWordmark;
