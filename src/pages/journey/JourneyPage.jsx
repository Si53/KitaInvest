import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { TOPICS } from '../../data/topics/topicsData.js';

export function JourneyPage() {
  const { learningProgress, resetLearningData, navigateTo } = useApp();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const completedTopics = learningProgress.completedTopics || [];
  const quizScores = learningProgress.quizScores || {};
  const progressPercent = learningProgress.progressPercent || 0;
  const learningLevel = learningProgress.learningLevel || 'Awal';
  const badges = learningProgress.badges || [];

  const handleResetConfirm = () => {
    resetLearningData();
    setShowConfirmReset(false);
  };

  return (
    <div className="fintech-subpage-wrapper">
      {/* Page Header Banner */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="fintech-pill-badge">
            <span className="hero-pill-dot" aria-hidden="true">●</span>
            <span>Gamifikasi & Pemantauan Literasi</span>
          </div>
          <h1 className="fintech-page-title">
            Perjalanan Belajar <span className="text-lime-highlight">Finansial Anda</span>
          </h1>
          <p className="fintech-page-subtitle">
            Pantau pencapaian belajar mandiri Anda secara transparan. KitaInvest dirancang untuk
            mendukung pembelajaran yang fleksibel tanpa tekanan papan peringkat (*leaderboard*) atau
            tuntutan absen harian.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="fintech-body-container">
        {/* Grid Status Gamifikasi Utama (3 Highlight Cards) */}
        <div className="journey-cards-grid">
          {/* Card 1: Persentase Progres */}
          <div className="fintech-card journey-highlight-card text-center">
            <span className="journey-card-tag">Kemajuan Pembelajaran</span>
            <div className="journey-progress-big-number">{progressPercent}%</div>
            <div className="progress-track-modern" style={{ margin: '1rem 0' }}>
              <div
                className="progress-fill-lime"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="journey-card-subtext">
              {completedTopics.length} dari 5 Topik Materi Terselesaikan
            </span>
          </div>

          {/* Card 2: Tingkat Belajar */}
          <div className="fintech-card journey-highlight-card text-center">
            <span className="journey-card-tag">Tingkat Pemahaman</span>
            <div className="journey-level-icon-box">
              <span className="journey-level-emoji">
                {learningLevel === 'Seluruh Topik Selesai'
                  ? '🌟'
                  : learningLevel === 'Sebagian Selesai'
                  ? '📘'
                  : '🌱'}
              </span>
            </div>
            <h3 className="journey-level-title">{learningLevel}</h3>
            <p className="journey-level-desc">
              {learningLevel === 'Seluruh Topik Selesai'
                ? 'Selamat! Anda telah menguasai seluruh konsep inti perencanaan finansial.'
                : learningLevel === 'Sebagian Selesai'
                ? 'Langkah bagus! Terus lanjutkan topik tersisa untuk melengkapi pemahaman Anda.'
                : 'Baru memulai perjalanan. Pelajari topik pertama untuk meningkatkan level.'}
            </p>
          </div>

          {/* Card 3: Lencana Penghargaan */}
          <div className="fintech-card journey-highlight-card text-center">
            <span className="journey-card-tag">Lencana Pencapaian</span>
            <div className="journey-badges-list">
              {/* Lencana 1 */}
              <div
                className={`journey-badge-pill-item ${
                  badges.includes('Topik Pertama Selesai') ? 'unlocked' : 'locked'
                }`}
              >
                <span className="badge-item-emoji">🎖️</span>
                <div className="badge-item-texts">
                  <strong>Topik Pertama Selesai</strong>
                  <small>
                    {badges.includes('Topik Pertama Selesai')
                      ? '✓ Telah Diraih'
                      : 'Selesaikan 1 kuis materi'}
                  </small>
                </div>
              </div>

              {/* Lencana 2 */}
              <div
                className={`journey-badge-pill-item ${
                  badges.includes('Semua Topik Selesai') ? 'unlocked' : 'locked'
                }`}
              >
                <span className="badge-item-emoji">👑</span>
                <div className="badge-item-texts">
                  <strong>Semua Topik Selesai</strong>
                  <small>
                    {badges.includes('Semua Topik Selesai')
                      ? '✓ Telah Diraih'
                      : 'Selesaikan seluruh 5 topik'}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rincian 5 Topik Belajar */}
        <div className="fintech-card" style={{ marginTop: '2.5rem' }}>
          <div className="section-header-row-modern">
            <div>
              <span className="journey-card-tag">Riwayat Kurikulum</span>
              <h3 className="section-title-modern">Status Penyelesaian Materi</h3>
              <p className="section-subtitle-modern">
                Setiap topik dapat diakses dan diulang sewaktu-waktu untuk memperdalam pemahaman.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary-lime"
              onClick={() => navigateTo('learning')}
            >
              Buka Modul Belajar →
            </button>
          </div>

          <div className="table-responsive-modern">
            <table className="journey-topics-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Topik Materi</th>
                  <th>Status</th>
                  <th>Skor Kuis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {TOPICS.map((topic) => {
                  const isDone = completedTopics.includes(topic.id);
                  const score = quizScores[topic.id];

                  return (
                    <tr key={topic.id} className={isDone ? 'tr-done' : ''}>
                      <td className="td-order">
                        <span className="table-emoji">{topic.icon}</span>
                        <strong>#{topic.id}</strong>
                      </td>
                      <td className="td-title-col">
                        <strong className="td-title-text">{topic.title}</strong>
                        <p className="td-summary-text">{topic.summary}</p>
                      </td>
                      <td className="td-status-col">
                        {isDone ? (
                          <span className="badge-status-done">✓ Selesai</span>
                        ) : (
                          <span className="badge-status-pending">Belum Selesai</span>
                        )}
                      </td>
                      <td className="td-score-col">
                        {isDone && score !== undefined ? (
                          <span className="score-chip-green">{score}%</span>
                        ) : (
                          <span className="score-chip-empty">—</span>
                        )}
                      </td>
                      <td className="td-action-col">
                        <button
                          type="button"
                          className="btn-secondary-light btn-sm"
                          onClick={() => navigateTo('learning')}
                        >
                          {isDone ? 'Ulas Materi' : 'Mulai Belajar'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Area Reset Catatan Belajar */}
        <div className="fintech-card reset-card-modern" style={{ marginTop: '2.5rem' }}>
          <div className="reset-content-flex">
            <div>
              <h4 className="reset-title-modern">Kelola Catatan Pembelajaran</h4>
              <p className="reset-desc-modern">
                Data progres dan lencana disimpan di peramban (localStorage) Anda. Jika Anda ingin
                mengulang perjalanan dari awal atau membersihkan riwayat kuis, Anda dapat menghapus
                catatan belajar ini kapan saja.
              </p>
            </div>
            {!showConfirmReset ? (
              <button
                type="button"
                className="btn-danger-outline"
                onClick={() => setShowConfirmReset(true)}
              >
                🗑️ Hapus Catatan Belajar
              </button>
            ) : (
              <div className="confirm-reset-box-modern">
                <span className="confirm-text-modern">
                  ⚠️ Yakin ingin mereset seluruh progres dan lencana belajar?
                </span>
                <div className="confirm-actions-row">
                  <button
                    type="button"
                    className="btn-danger-solid btn-sm"
                    onClick={handleResetConfirm}
                  >
                    Ya, Hapus Semua
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-light btn-sm"
                    onClick={() => setShowConfirmReset(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;
