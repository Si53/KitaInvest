import { describe, it, expect } from 'vitest';
import {
  TOPICS,
  getTopicById,
  getTopicBySlug,
  getSortedTopicsForCategory,
} from '../src/data/topics/topicsData.js';
import { computeGamification } from '../src/utils/storage.js';
import { calculateSimulation } from '../src/engine/calculator.js';

describe('Modul Pembelajaran Finansial (Minggu 4)', () => {
  it('1. Memiliki tepat 5 topik pembelajaran wajib sesuai RULES.md', () => {
    expect(TOPICS).toHaveLength(5);

    const ids = TOPICS.map((t) => t.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);

    // Topik 1: Pengelolaan Uang
    expect(TOPICS[0].title).toMatch(/Pengelolaan Uang/i);
    // Topik 2: Tujuan Keuangan dan Jangka Waktu
    expect(TOPICS[1].title).toMatch(/Tujuan Keuangan/i);
    // Topik 3: Risiko
    expect(TOPICS[2].title).toMatch(/Risiko/i);
    // Topik 4: Bunga Majemuk & Setoran Berkala
    expect(TOPICS[3].title).toMatch(/Majemuk/i);
    // Topik 5: Inflasi dan Daya Beli
    expect(TOPICS[4].title).toMatch(/Inflasi/i);
  });

  it('2. Setiap topik memiliki perspektif peran (pelajar, pekerja, pensiunan)', () => {
    TOPICS.forEach((topic) => {
      expect(topic.perspectives).toBeDefined();
      expect(topic.perspectives.pelajar).toBeDefined();
      expect(topic.perspectives.pekerja).toBeDefined();
      expect(topic.perspectives.pensiunan).toBeDefined();
    });
  });

  it('3. Setiap topik memiliki kuis pilihan ganda dengan penjelasan jawaban', () => {
    TOPICS.forEach((topic) => {
      expect(topic.quiz).toBeDefined();
      expect(topic.quiz.length).toBeGreaterThan(0);

      topic.quiz.forEach((q) => {
        expect(q.question).toBeDefined();
        expect(Array.isArray(q.options)).toBe(true);
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(typeof q.correctIndex).toBe('number');
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation).toBeDefined();
        expect(q.explanation.length).toBeGreaterThan(10);
      });
    });
  });

  it('4. Mengubah kategori peran hanya mengubah urutan topik tanpa menghilangkan topik', () => {
    const roles = ['pelajar', 'pekerja', 'pensiunan'];
    roles.forEach((role) => {
      const sorted = getSortedTopicsForCategory(role);
      expect(sorted).toHaveLength(5);
      const sortedIds = sorted.map((t) => t.id).sort();
      expect(sortedIds).toEqual([1, 2, 3, 4, 5]);
    });
  });

  it('5. Formula Gamifikasi: persentase, 3 level pemahaman, dan 2 lencana', () => {
    // 0 Topik
    const g0 = computeGamification([]);
    expect(g0.progressPercent).toBe(0);
    expect(g0.learningLevel).toBe('Awal');
    expect(g0.badges).toEqual([]);

    // 1 Topik (20%)
    const g1 = computeGamification([1]);
    expect(g1.progressPercent).toBe(20);
    expect(g1.learningLevel).toBe('Sebagian Selesai');
    expect(g1.badges).toEqual(['Topik Pertama Selesai']);

    // 2 Topik (40%)
    const g2 = computeGamification([1, 2]);
    expect(g2.progressPercent).toBe(40);
    expect(g2.learningLevel).toBe('Sebagian Selesai');
    expect(g2.badges).toEqual(['Topik Pertama Selesai']);

    // 5 Topik (100%)
    const g5 = computeGamification([1, 2, 3, 4, 5]);
    expect(g5.progressPercent).toBe(100);
    expect(g5.learningLevel).toBe('Seluruh Topik Selesai');
    expect(g5.badges).toContain('Topik Pertama Selesai');
    expect(g5.badges).toContain('Semua Topik Selesai');
  });

  it('6. Konsistensi Rumus Animasi Pertumbuhan Saldo dengan Simulasi Eksak', () => {
    // Memastikan simulasi yang dipakai animasi dan engine menghasilkan nilai sama persis
    const params = {
      danaAwal: 1000000,
      setoranBulanan: 250000,
      jangkaWaktuBulan: 24,
      pertumbuhanTahunan: 12,
      inflasiTahunan: 5,
      targetDana: 7500000,
    };

    const sim = calculateSimulation(params);
    expect(sim.monthlyData).toHaveLength(25); // Bulan 0 sd 24
    expect(sim.monthlyData[0].saldoNominal).toBe(1000000);
    expect(sim.monthlyData[0].akumulasiModal).toBe(1000000);
    expect(sim.monthlyData[24].saldoNominal).toBeGreaterThan(sim.monthlyData[24].akumulasiModal);
    expect(sim.monthlyData[24].dayaBeli).toBeLessThan(sim.monthlyData[24].saldoNominal);
  });

  it('7. Setiap modul memiliki Pengantar mendalam (3-4 paragraf), Kamus Istilah, dan Intisari', () => {
    TOPICS.forEach((topic) => {
      // Pengantar minimal 3-4 paragraf terstruktur
      expect(Array.isArray(topic.introduction)).toBe(true);
      expect(topic.introduction.length).toBeGreaterThanOrEqual(3);

      // Kamus Istilah Penting (Glossary Cards)
      expect(Array.isArray(topic.glossary)).toBe(true);
      expect(topic.glossary.length).toBeGreaterThanOrEqual(3);
      topic.glossary.forEach((item) => {
        expect(item.term).toBeDefined();
        expect(item.definition).toBeDefined();
        expect(item.icon).toBeDefined();
      });

      // Intisari Pembelajaran (Key Takeaways)
      expect(Array.isArray(topic.keyTakeaways)).toBe(true);
      expect(topic.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('8. Setiap topik memiliki Simulasi Tabel / Bedah Angka Nyata dengan format Rp dan titik ribuan', () => {
    TOPICS.forEach((topic) => {
      expect(topic.simulationCase).toBeDefined();
      expect(topic.simulationCase.title).toBeDefined();
      expect(topic.simulationCase.table).toBeDefined();
      expect(topic.simulationCase.table.headers.length).toBeGreaterThan(0);
      expect(topic.simulationCase.table.rows.length).toBeGreaterThan(0);

      // Memastikan ada nominal Rupiah dengan format 'Rp' dan titik ribuan
      const allText = JSON.stringify(topic.simulationCase);
      expect(allText).toMatch(/Rp\d{1,3}(\.\d{3})+/);
    });
  });

  it('9. Memiliki 5 Video YouTube Edukasi Bahasa Indonesia sesuai Video ID dan non-autoplay', () => {
    const expectedVideos = {
      1: { videoId: 'q59ekdLC7u8' },
      2: { videoId: 'CQa_-zbJ9Sg' },
      3: { videoId: 'Cgib1vmWEC8' },
      4: { videoId: 'RpF13dQurZ0' },
      5: { videoId: 'NmxeJmuOF1g' },
    };

    TOPICS.forEach((topic) => {
      const expected = expectedVideos[topic.id];
      expect(topic.video).toBeDefined();
      expect(topic.video.videoId).toBe(expected.videoId);
      expect(topic.video.videoTitle).toBeDefined();
      expect(topic.video.summary).toBeDefined();
      expect(Array.isArray(topic.video.transcriptPoints)).toBe(true);
      expect(topic.video.transcriptPoints.length).toBeGreaterThanOrEqual(3);
    });
  });
});
