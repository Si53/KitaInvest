import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export function CategorySelectPage() {
  const { category, selectCategory, navigateTo } = useApp();

  const handleSelect = (selected) => {
    selectCategory(selected);
    navigateTo('form');
  };

  const categories = [
    {
      id: 'Pelajar',
      title: 'Pelajar / Mahasiswa',
      icon: '🎓',
      desc: 'Cocok untuk Anda yang masih menempuh pendidikan dan mengelola uang saku atau penghasilan paruh waktu.',
      caseTitle: 'Contoh Studi Kasus:',
      caseDesc: 'Menyiapkan dana tabungan berkala untuk membeli laptop penunjang kuliah/belajar.',
      tag: 'Mode Pendidikan',
    },
    {
      id: 'Pekerja',
      title: 'Pekerja / Profesional',
      icon: '💼',
      desc: 'Cocok untuk Anda yang memiliki pendapatan bulanan tetap/lepas dan memiliki pos kebutuhan rutin.',
      caseTitle: 'Contoh Studi Kasus:',
      caseDesc: 'Mengatur alokasi gaji bulanan, menabung dana darurat, dan merencanakan investasi masa depan.',
      tag: 'Mode Produktif',
    },
    {
      id: 'Pensiunan',
      title: 'Pensiunan / Pra-Pensiun',
      icon: '🏖️',
      desc: 'Cocok untuk Anda yang memfokuskan stabilitas aset yang sudah terkumpul serta menjaga daya beli dari inflasi.',
      caseTitle: 'Contoh Studi Kasus:',
      caseDesc: 'Mempertahankan nilai modal yang sudah dimiliki agar tidak tergerus kenaikan harga barang.',
      tag: 'Mode Proteksi Nilai',
    },
  ];

  return (
    <div className="fintech-subpage-wrapper">
      {/* Page Header Banner (Dark Modern Fintech) */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="fintech-pill-badge">
            <span className="hero-pill-dot" aria-hidden="true">●</span>
            <span>Onboarding & Data Profil</span>
          </div>
          <h1 className="fintech-page-title">
            Pilih Kategori <span className="text-lime-highlight">Profil Anda</span>
          </h1>
          <p className="fintech-page-subtitle">
            Pilihan kategori membantu KitaInvest menyesuaikan contoh studi kasus, sudut pandang simulasi,
            dan urutan materi. Pilihan dapat diubah kapan saja tanpa menghapus materi yang sudah dipelajari.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="fintech-body-container">
        <div className="category-cards-grid">
          {categories.map((item) => {
            const isSelected = category === item.id;
            return (
              <div
                key={item.id}
                className={`category-card-modern ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(item.id)}
              >
                {isSelected && (
                  <span className="category-selected-badge">
                    ✓ Terpilih
                  </span>
                )}
                <div className="category-tag-pill">{item.tag}</div>
                <div className="category-icon-box">{item.icon}</div>
                <h3 className="category-card-title">{item.title}</h3>
                <p className="category-card-desc">{item.desc}</p>
                <div className="category-case-box">
                  <strong>{item.caseTitle}</strong>
                  <p>{item.caseDesc}</p>
                </div>
                <button
                  type="button"
                  className={`btn-category-action ${isSelected ? 'btn-primary-lime' : 'btn-secondary-light'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item.id);
                  }}
                >
                  {isSelected ? 'Lanjut Isi Profil →' : `Pilih ${item.id} →`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategorySelectPage;
