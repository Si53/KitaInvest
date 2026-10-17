import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function Navbar() {
  const { currentPage, navigateTo, category } = useApp();

  const handleDashboard = () => {
    navigateTo(category ? 'dashboard' : 'category');
  };

  const handleProfile = () => {
    navigateTo(category ? 'form' : 'category');
  };

  const handleTryNow = () => {
    navigateTo(category ? 'dashboard' : 'category');
  };

  const isProfileActive =
    currentPage === 'form' || currentPage === 'summary' || currentPage === 'category';

  return (
    <header className="navbar fintech-navbar">
      <div className="navbar-container fintech-navbar-container">
        {/* Sisi Kiri: Logo Brand */}
        <div
          className="navbar-brand fintech-brand"
          onClick={() => navigateTo('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigateTo('home');
            }
          }}
        >
          <div className="brand-text-group">
            <div className="brand-title">
              <span className="brand-title-kita">Kita</span>
              <span className="brand-title-invest">Invest</span>
            </div>
            <p className="brand-subtext">Edukasi Finansial Mandiri</p>
          </div>
        </div>

        {/* Tengah: Menu Navigasi */}
        <nav className="navbar-links fintech-nav-links" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Beranda
          </button>
          <button
            type="button"
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={handleDashboard}
          >
            Dasbor
          </button>
          <button
            type="button"
            className={`nav-link ${currentPage === 'learning' ? 'active' : ''}`}
            onClick={() => navigateTo('learning')}
          >
            Belajar
          </button>
          <button
            type="button"
            className={`nav-link ${currentPage === 'simulation' ? 'active' : ''}`}
            onClick={() => navigateTo('simulation')}
          >
            Simulasi
          </button>
          <button
            type="button"
            className={`nav-link ${currentPage === 'journey' ? 'active' : ''}`}
            onClick={() => navigateTo('journey')}
          >
            Perjalanan Belajar
          </button>
          <button
            type="button"
            className={`nav-link ${isProfileActive ? 'active' : ''}`}
            onClick={handleProfile}
          >
            Data Profil
          </button>
        </nav>

        {/* Sisi Kanan: Tombol Coba Sekarang */}
        <div className="navbar-actions">
          <button
            type="button"
            className="btn-coba-sekarang"
            onClick={handleTryNow}
          >
            Coba Sekarang
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
