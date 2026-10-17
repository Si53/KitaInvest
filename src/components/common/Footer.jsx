import React from 'react';

export function Footer() {
  return (
    <footer className="footer fintech-footer">
      {/* Baris Penafian Sesuai Standar Akademik & RULES.md */}
      <div className="footer-disclaimer-wrapper">
        <div className="footer-container">
          <p className="footer-disclaimer-text">
            <strong>⚠️ Penafian Penting:</strong> KitaInvest adalah media edukasi interaktif untuk simulasi
            dan pembelajaran literasi finansial mandiri. Aplikasi ini 100% berbasis <em>client-side</em>,
            tidak terhubung dengan pasar uang riil, tidak melayani pembelian atau transaksi produk investasi,
            serta tidak memberikan nasihat keuangan berlisensi.
          </p>
        </div>
      </div>

      {/* Baris Bawah Utama Footer (#080B12) */}
      <div className="footer-bottom-bar">
        <div className="footer-container footer-bottom-flex">
          <div className="footer-brand-meta">
            <strong className="footer-brand-title">
              <span className="footer-brand-kita">Kita</span>
              <span className="footer-brand-invest">Invest</span>
            </strong>
            <span className="footer-brand-separator">|</span>
            <span className="footer-brand-tagline">Belajar. Rencanakan. Tumbuhkan.</span>
          </div>
          <div className="footer-copyright">
            <p>© 2026 KitaInvest. Hak cipta dilindungi undang-undang.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
