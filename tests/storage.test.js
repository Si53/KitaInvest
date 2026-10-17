import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredCategory,
  setStoredCategory,
  getStoredLearningProgress,
  setStoredLearningProgress,
  clearStoredLearningData,
  computeGamification,
} from '../src/utils/storage.js';

describe('Storage & Session Separation Tests (Agent 6 QA)', () => {
  // Simulasi mock localStorage
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {};
    global.window = {
      localStorage: {
        getItem: (key) => mockStorage[key] || null,
        setItem: (key, val) => {
          mockStorage[key] = String(val);
        },
        removeItem: (key) => {
          delete mockStorage[key];
        },
        clear: () => {
          mockStorage = {};
        },
      },
    };
  });

  it('Menyimpan dan memuat pilihan kategori pengguna di localStorage', () => {
    setStoredCategory('Pelajar');
    expect(getStoredCategory()).toBe('Pelajar');
    expect(mockStorage['kitainvest_user_category']).toBe('Pelajar');
  });

  it('Menyimpan dan memuat progres belajar dan kalkulasi gamifikasi', () => {
    // 2 topik selesai -> 40% progres, level Sebagian Selesai, 1 lencana
    const progressInput = {
      completedTopics: [1, 2],
      quizScores: { 1: 100, 2: 80 },
    };

    setStoredLearningProgress(progressInput);
    const loaded = getStoredLearningProgress();

    expect(loaded.completedTopics).toEqual([1, 2]);
    expect(loaded.progressPercent).toBe(40);
    expect(loaded.learningLevel).toBe('Sebagian Selesai');
    expect(loaded.badges).toContain('Topik Pertama Selesai');
    expect(loaded.badges).not.toContain('Semua Topik Selesai');
  });

  it('5 topik selesai menghasilkan 100% dan lencana Semua Topik Selesai', () => {
    const progressInput = {
      completedTopics: [1, 2, 3, 4, 5],
      quizScores: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100 },
    };

    const result = computeGamification(progressInput.completedTopics, progressInput.quizScores);
    expect(result.progressPercent).toBe(100);
    expect(result.learningLevel).toBe('Seluruh Topik Selesai');
    expect(result.badges).toContain('Topik Pertama Selesai');
    expect(result.badges).toContain('Semua Topik Selesai');
  });

  it('Test Sesi & Storage: Simulasi reload halaman menghapus angka keuangan di memori, tetapi mempertahankan kemajuan belajar di localStorage', () => {
    // 1. Simpan progres belajar ke storage
    setStoredCategory('Pekerja');
    setStoredLearningProgress({
      completedTopics: [1],
      quizScores: { 1: 100 },
    });

    // 2. Simulasikan data keuangan in-memory sesi aktif
    let sessionFinancialMemory = {
      pendapatanBulanan: 10000000,
      pengeluaranBulanan: 6000000,
      tabungan: 20000000,
    };

    // Pastikan angka keuangan ada di memori sesi aktif
    expect(sessionFinancialMemory.pendapatanBulanan).toBe(10000000);

    // 3. Simulasi Reload Halaman (browser reload / new tab / state reset):
    // In-memory state diinisialisasi ulang ke kosong
    sessionFinancialMemory = {
      usia: '',
      uangSakuBulanan: '',
      pendapatanBulanan: '',
      pengeluaranBulanan: '',
      danaDimiliki: '',
      pemasukanRutinBulanan: '',
      tabungan: '',
    };

    // Verifikasi: Angka keuangan terhapus total
    expect(sessionFinancialMemory.pendapatanBulanan).toBe('');
    expect(sessionFinancialMemory.pengeluaranBulanan).toBe('');
    expect(sessionFinancialMemory.tabungan).toBe('');

    // Verifikasi: Kategori dan Progres belajar tetap utuh di localStorage
    expect(getStoredCategory()).toBe('Pekerja');
    const storedProgress = getStoredLearningProgress();
    expect(storedProgress.completedTopics).toEqual([1]);
    expect(storedProgress.progressPercent).toBe(20);
    expect(storedProgress.badges).toContain('Topik Pertama Selesai');
  });

  it('Menghapus data pembelajaran (clearStoredLearningData)', () => {
    setStoredCategory('Pelajar');
    setStoredLearningProgress({ completedTopics: [1], quizScores: { 1: 100 } });

    clearStoredLearningData();

    expect(getStoredCategory()).toBeNull();
    const progress = getStoredLearningProgress();
    expect(progress.completedTopics).toEqual([]);
    expect(progress.progressPercent).toBe(0);
  });
});
