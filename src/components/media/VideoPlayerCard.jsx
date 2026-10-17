/**
 * Komponen Pemutar Video YouTube Edukasi - KitaInvest
 * Agent 4: Multimedia & Visual Asset
 * Domain: /src/components/media/
 *
 * Mematuhi RULES.md & Proposal Bagian C.5:
 * 1. Video YouTube berbahasa Indonesia sesuai topik
 * 2. Rasio 16:9 responsif, border-radius 16px, bingkai gelap #0B0F19
 * 3. DILARANG autoplay (video baru berjalan saat pengguna menekan tombol putar)
 * 4. Panel Collapsible "Ringkasan & Transkrip Inti Video" untuk mode tanpa suara (muted) / hemat kuota
 */

import React, { useState } from 'react';

export function VideoPlayerCard({
  videoId,
  videoTitle,
  duration,
  summary,
  transcriptPoints = [],
}) {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  return (
    <div className="video-player-card-dark">
      {/* Header Video */}
      <div className="video-card-header">
        <div className="video-badge-group">
          <span className="video-status-badge">🎬 Video Pembelajaran Pendukung</span>
          {duration && <span className="video-duration-pill">⏱️ {duration}</span>}
        </div>
        <h4 className="video-card-title">{videoTitle}</h4>
        <p className="video-card-subtitle">
          Tonton video penjelasan berbahasa Indonesia di bawah ini untuk memperdalam pemahaman konsep finansial Anda secara visual.
        </p>
      </div>

      {/* Frame Video Responsif 16:9 */}
      <div className="video-responsive-frame">
        <iframe
          className="video-iframe"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={videoTitle}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Bagian Collapsible Ringkasan & Transkrip */}
      <div className="video-transcript-wrapper">
        <button
          type="button"
          className={`transcript-toggle-button ${isTranscriptOpen ? 'active' : ''}`}
          onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
          aria-expanded={isTranscriptOpen}
        >
          <span className="toggle-left-content">
            <span className="transcript-icon" aria-hidden="true">📄</span>
            <strong>Ringkasan &amp; Transkrip Inti Video</strong>
            <span className="transcript-hint-badge">(Mode Hemat Kuota / Tanpa Suara)</span>
          </span>
          <span className="toggle-arrow-icon" aria-hidden="true">
            {isTranscriptOpen ? '▲ Sembunyikan' : '▼ Buka Transkrip'}
          </span>
        </button>

        {isTranscriptOpen && (
          <div className="transcript-content-panel">
            {summary && (
              <div className="transcript-summary-box">
                <strong className="summary-heading">📌 Inti Pembahasan Video:</strong>
                <p className="summary-text">{summary}</p>
              </div>
            )}

            {transcriptPoints && transcriptPoints.length > 0 && (
              <div className="transcript-points-box">
                <strong className="points-heading">📝 Poin-Poin Transkrip Utama:</strong>
                <ul className="transcript-bullets-list">
                  {transcriptPoints.map((point, idx) => (
                    <li key={idx} className="transcript-bullet-item">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="transcript-footer-note">
              💡 <em>Catatan: Transkrip ini dirancang khusus agar Anda tetap dapat menyerap 100% inti materi edukasi sekalipun video dimatikan suaranya atau tidak dapat memutar video streaming.</em>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerCard;
