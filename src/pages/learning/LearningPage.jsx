import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { useSmoothScrollToTop } from '../../utils/useSmoothScrollToTop.js';
import { TOPICS, getSortedTopicsForCategory } from '../../data/topics/topicsData.js';
import { QuizComponent } from '../../components/quiz/QuizComponent.jsx';
import { InfographicCard } from '../../components/media/InfographicCard.jsx';
import { GrowthAnimationPlayer } from '../../components/media/GrowthAnimationPlayer.jsx';
import { VideoPlayerCard } from '../../components/media/VideoPlayerCard.jsx';

export function LearningPage() {
  const { category, learningProgress, completeTopic, navigateTo } = useApp();
  const [activeTopicId, setActiveTopicId] = useState(1);

  // Auto smooth scroll ke paling atas saat berganti topik materi belajar
  useSmoothScrollToTop([activeTopicId]);

  const sortedTopics = getSortedTopicsForCategory(category);
  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];

  const completedList = learningProgress.completedTopics || [];
  const quizScores = learningProgress.quizScores || {};

  const isCompleted = completedList.includes(activeTopic.id);
  const previousScore = quizScores[activeTopic.id] ?? null;

  const currentRole = category || 'Pelajar';
  const roleKey = currentRole.toLowerCase();

  const roleLabels = {
    pelajar: 'Pelajar / Mahasiswa',
    pekerja: 'Pekerja / Profesional',
    pensiunan: 'Pensiunan / Masa Tenang',
    Pelajar: 'Pelajar / Mahasiswa',
    Pekerja: 'Pekerja / Profesional',
    Pensiunan: 'Pensiunan / Masa Tenang',
  };

  const handleTopicComplete = (topicId, score) => {
    completeTopic(topicId, score);
  };

  const currentIndex = sortedTopics.findIndex((t) => t.id === activeTopic.id);
  const prevTopic = currentIndex > 0 ? sortedTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < sortedTopics.length - 1 ? sortedTopics[currentIndex + 1] : null;

  const currentPerspectiveText =
    activeTopic.perspectives?.[roleKey] ||
    activeTopic.perspectives?.[currentRole] ||
    activeTopic.perspectives?.pelajar ||
    '';

  return (
    <div className="fintech-subpage-wrapper">
      {/* Page Header Banner */}
      <section className="fintech-header-banner">
        <div className="fintech-header-container">
          <div className="fintech-pill-badge">
            <span className="hero-pill-dot" aria-hidden="true">●</span>
            <span>Modul Pembelajaran Interaktif (5 Topik Komprehensif)</span>
          </div>
          <h1 className="fintech-page-title">
            Modul Literasi <span className="text-lime-highlight">Finansial Mandiri</span>
          </h1>
          <p className="fintech-page-subtitle">
            Kuasai 5 fondasi penting dalam perencanaan keuangan: Pengelolaan Arus Kas, Target Dana,
            Manajemen Risiko, Pertumbuhan Majemuk, hingga Perlindungan Daya Beli dari Inflasi.
          </p>
        </div>
      </section>

      {/* Main Body Content with Sidebar + Content Area */}
      <div className="fintech-body-container">
        <div className="learning-layout-split">
          {/* Sidebar / Tabs 5 Topik (Sisi Kiri) */}
          <aside className="learning-sidebar">
            <div className="sidebar-header-box">
              <span className="sidebar-label">Daftar Materi</span>
              <h3 className="sidebar-title">5 Topik Wajib</h3>
            </div>
            <nav className="learning-topics-menu" aria-label="Navigasi Topik Belajar">
              {sortedTopics.map((topic, idx) => {
                const isDone = completedList.includes(topic.id);
                const isActive = topic.id === activeTopic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={`topic-sidebar-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    onClick={() => {
                      setActiveTopicId(topic.id);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                  >
                    <div className="topic-item-icon">{topic.icon}</div>
                    <div className="topic-item-text">
                      <span className="topic-order-tag">Topik {idx + 1}</span>
                      <strong className="topic-item-title">{topic.title}</strong>
                      <span className="topic-duration-tag">⏱️ {topic.duration}</span>
                    </div>
                    {isDone ? (
                      <span className="topic-check-circle" title="Topik Selesai">✓</span>
                    ) : (
                      <span className="topic-pending-dot" title="Belum Selesai">●</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Area Baca Materi (Sisi Kanan) */}
          <main className="learning-content-card">
            {/* Header Artikel */}
            <div className="article-top-meta">
              <div className="article-meta-left">
                <span className="topic-badge-pill">
                  {activeTopic.icon} Topik #{activeTopic.id}
                </span>
                <span className="topic-duration-badge">⏱️ {activeTopic.duration}</span>
              </div>
              <div className="article-meta-right">
                {isCompleted ? (
                  <span className="topic-completed-tag">
                    ✅ Selesai ({previousScore !== null ? `Skor: ${previousScore}%` : 'Tuntas'})
                  </span>
                ) : (
                  <span className="topic-progress-tag">
                    ⏳ Sedang Dipelajari
                  </span>
                )}
              </div>
            </div>

            <h2 className="article-main-title">{activeTopic.title}</h2>
            <p className="article-summary-lead">{activeTopic.summary}</p>

            {/* Kotak Konteks Kategori Tanpa Switcher / Intip Peran */}
            <div className="category-context-box-dark">
              <div className="context-box-clean-header">
                <span className="context-icon-glow" aria-hidden="true">💡</span>
                <div className="context-header-text">
                  <h4 className="context-heading">
                    Sudut Pandang Contoh Kasus: {roleLabels[currentRole] || currentRole}
                  </h4>
                  <p className="context-role-notice">
                    Studi kasus pembuka ini disesuaikan khusus untuk profil {currentRole}.
                  </p>
                </div>
              </div>

              <div className="context-body-text">
                <p>{currentPerspectiveText}</p>
              </div>
            </div>

            {/* A. PENGANTAR & KONSEP DASAR (Minimal 3-4 Paragraf Terstruktur) */}
            <section className="learning-module-section" aria-labelledby="section-pengantar">
              <div className="module-section-header">
                <span className="module-step-badge">A. Konsep Dasar</span>
                <h3 id="section-pengantar" className="module-section-heading">
                  Pengantar &amp; Landasan Teori Finansial
                </h3>
              </div>
              <div className="intro-paragraphs-container">
                {activeTopic.introduction && activeTopic.introduction.map((paragraph, pIdx) => (
                  <p key={pIdx} className="section-paragraph-modern intro-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Sub-sections Pembahasan Tambahan */}
              {activeTopic.sections && activeTopic.sections.length > 0 && (
                <div className="article-subsections-container">
                  {activeTopic.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="content-subsection-item">
                      <h4 className="subsection-title-modern">{sec.heading}</h4>
                      <p className="section-paragraph-modern">{sec.content}</p>
                      {sec.keyPoints && sec.keyPoints.length > 0 && (
                        <div className="keypoints-box-modern">
                          <strong className="keypoints-title">📌 Poin Kunci yang Wajib Diingat:</strong>
                          <ul className="keypoints-list">
                            {sec.keyPoints.map((point, kIdx) => (
                              <li key={kIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* B. KAMUS ISTILAH PENTING (GLOSSARY CARDS) */}
            {activeTopic.glossary && activeTopic.glossary.length > 0 && (
              <section className="learning-module-section" aria-labelledby="section-glossary">
                <div className="module-section-header">
                  <span className="module-step-badge">B. Glosarium</span>
                  <h3 id="section-glossary" className="module-section-heading">
                    📖 Kamus Istilah Finansial Penting
                  </h3>
                </div>
                <div className="glossary-cards-grid">
                  {activeTopic.glossary.map((item, gIdx) => (
                    <div key={gIdx} className="glossary-card-item">
                      <div className="glossary-card-top">
                        <span className="glossary-item-icon">{item.icon}</span>
                        <h5 className="glossary-item-term">{item.term}</h5>
                      </div>
                      <p className="glossary-item-def">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* C. SIMULASI TABEL / BEDAH ANGKA NYATA (Format Rp & Titik Ribuan) */}
            {activeTopic.simulationCase && (
              <section className="learning-module-section" aria-labelledby="section-simulasi">
                <div className="module-section-header">
                  <span className="module-step-badge">C. Studi Kasus</span>
                  <h3 id="section-simulasi" className="module-section-heading">
                    📊 {activeTopic.simulationCase.title}
                  </h3>
                </div>
                <p className="simulation-case-sub">{activeTopic.simulationCase.subtitle}</p>

                {/* Arus Kas Badges (Khusus Topik 1) */}
                {activeTopic.simulationCase.cashflowSummary && (
                  <div className="cashflow-cards-grid">
                    {activeTopic.simulationCase.cashflowSummary.map((cf, cIdx) => (
                      <div key={cIdx} className="cashflow-card-item">
                        <div className="cashflow-card-header">
                          <span className="cashflow-card-label">{cf.label}</span>
                          <span className="cashflow-percent-pill">{cf.percent}</span>
                        </div>
                        <div className="cashflow-amount-text">{cf.amount}</div>
                        <p className="cashflow-note-text">{cf.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tabel Perbandingan Edukatif */}
                {activeTopic.simulationCase.table && (
                  <div className="simulation-table-wrapper">
                    <table className="fintech-edu-table">
                      {activeTopic.simulationCase.table.caption && (
                        <caption className="fintech-table-caption">
                          {activeTopic.simulationCase.table.caption}
                        </caption>
                      )}
                      <thead>
                        <tr>
                          {activeTopic.simulationCase.table.headers.map((h, hIdx) => (
                            <th key={hIdx}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeTopic.simulationCase.table.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className={cellIdx === 0 ? 'table-cell-bold' : ''}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Takeaway Box */}
                {activeTopic.simulationCase.takeaway && (
                  <div className="simulation-takeaway-banner">
                    <span className="takeaway-icon">💡</span>
                    <p className="takeaway-text">{activeTopic.simulationCase.takeaway}</p>
                  </div>
                )}
              </section>
            )}

            {/* SEKSI KHUSUS VIDEO YOUTUBE EDUKASI BAHASA INDONESIA */}
            {activeTopic.video && (
              <section className="learning-module-section video-section-wrapper" aria-labelledby="section-video">
                <VideoPlayerCard
                  videoId={activeTopic.video.videoId}
                  videoTitle={activeTopic.video.videoTitle}
                  duration={activeTopic.video.duration}
                  summary={activeTopic.video.summary}
                  transcriptPoints={activeTopic.video.transcriptPoints}
                />
              </section>
            )}

            {/* KOMPONEN MEDIA VISUAL INTERAKTIF KHUSUS */}
            {/* Topik 4: Animasi Pertumbuhan Saldo + Infografik */}
            {activeTopic.id === 4 && (
              <div className="media-wrapper-dark">
                <div className="media-section-header">
                  <span className="media-section-badge">🎬 Multimedia Interaktif</span>
                  <h3 className="media-section-title">Visualisasi Interaktif Bunga Majemuk</h3>
                  <p className="media-section-sub">
                    Saksikan bagaimana efek bunga majemuk mempercepat akumulasi aset dari waktu ke waktu mengikuti rumus eksak engine KitaInvest.
                  </p>
                </div>
                <GrowthAnimationPlayer
                  danaAwal={1000000}
                  setoranBulanan={250000}
                  jangkaWaktuBulan={24}
                  pertumbuhanTahunan={12}
                  inflasiTahunan={5}
                  targetDana={7500000}
                  namaTujuan="Target Masa Depan"
                />
                <div style={{ marginTop: '2.5rem' }}>
                  <InfographicCard
                    danaAwal={1000000}
                    setoranBulanan={250000}
                    pertumbuhanTahunan={12}
                  />
                </div>
              </div>
            )}

            {/* Topik 5: Infografik Penurunan Daya Beli */}
            {activeTopic.id === 5 && (
              <div className="media-wrapper-dark">
                <div className="media-section-header">
                  <span className="media-section-badge">📊 Infografik Pemisahan Nilai</span>
                  <h3 className="media-section-title">Nilai Nominal vs Daya Beli Riil</h3>
                  <p className="media-section-sub">
                    Pahami pengaruh laju inflasi terhadap penurunan kemampuan membeli barang di masa depan.
                  </p>
                </div>
                <InfographicCard
                  danaAwal={2000000}
                  setoranBulanan={300000}
                  pertumbuhanTahunan={10}
                />
              </div>
            )}

            {/* D. INTISARI PEMBELAJARAN (KEY TAKEAWAYS) */}
            {activeTopic.keyTakeaways && activeTopic.keyTakeaways.length > 0 && (
              <section className="learning-module-section" aria-labelledby="section-takeaways">
                <div className="key-takeaways-highlight-card">
                  <div className="takeaways-card-header">
                    <span className="takeaways-header-badge">D. Ringkasan Praktis</span>
                    <h3 id="section-takeaways" className="takeaways-card-title">
                      📌 Intisari Pembelajaran ({activeTopic.title})
                    </h3>
                    <p className="takeaways-card-sub">
                      Pastikan Anda mengingat 4 prinsip inti berikut sebelum menguji pemahaman pada kuis interaktif di bawah:
                    </p>
                  </div>
                  <div className="takeaways-items-list">
                    {activeTopic.keyTakeaways.map((item, tIdx) => (
                      <div key={tIdx} className="takeaway-item-row">
                        <span className="takeaway-check-icon" aria-hidden="true">✓</span>
                        <p className="takeaway-point-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Kuis Interaktif di Akhir Materi */}
            <div className="quiz-wrapper-section">
              <QuizComponent
                topicId={activeTopic.id}
                topicTitle={activeTopic.title}
                questions={activeTopic.quiz}
                onCompleteTopic={handleTopicComplete}
                isAlreadyCompleted={isCompleted}
                previousScore={previousScore}
              />
            </div>

            {/* Navigasi Footer Artikel */}
            <footer className="article-nav-footer-modern">
              {prevTopic ? (
                <button
                  type="button"
                  className="btn-secondary-light"
                  onClick={() => {
                    setActiveTopicId(prevTopic.id);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                >
                  ← Topik Sebelumnya: {prevTopic.title}
                </button>
              ) : (
                <div />
              )}

              {nextTopic ? (
                <button
                  type="button"
                  className="btn-primary-lime"
                  onClick={() => {
                    setActiveTopicId(nextTopic.id);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                >
                  Lanjut ke Topik Berikutnya: {nextTopic.title} →
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary-lime"
                  onClick={() => navigateTo('journey')}
                >
                  🏆 Buka Perjalanan Belajar Anda →
                </button>
              )}
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
