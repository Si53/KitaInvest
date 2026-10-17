/**
 * Storage Utility - KitaInvest
 * Agent 2: Core App, Flow & Storage
 * Domain: /src/utils/storage.js
 *
 * Mengelola penyimpanan persisten (window.localStorage) HANYA untuk:
 * - Kategori pengguna (Pelajar, Pekerja, Pensiunan)
 * - Progres materi belajar, skor kuis, lencana, level belajar
 *
 * DILARANG KERAS menyimpan angka keuangan di sini.
 */

const STORAGE_KEYS = {
  CATEGORY: 'kitainvest_user_category',
  LEARNING_PROGRESS: 'kitainvest_learning_progress',
};

// In-memory fallback jika localStorage tidak didukung / diblokir
const memoryFallback = {
  [STORAGE_KEYS.CATEGORY]: null,
  [STORAGE_KEYS.LEARNING_PROGRESS]: null,
};

let storageAccessible = null;

export function isLocalStorageAvailable() {
  if (storageAccessible !== null) return storageAccessible;
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      storageAccessible = false;
      return false;
    }
    const testKey = '__kitainvest_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    storageAccessible = true;
    return true;
  } catch (e) {
    storageAccessible = false;
    return false;
  }
}

export function getStoredCategory() {
  if (isLocalStorageAvailable()) {
    try {
      return window.localStorage.getItem(STORAGE_KEYS.CATEGORY) || null;
    } catch {
      return memoryFallback[STORAGE_KEYS.CATEGORY];
    }
  }
  return memoryFallback[STORAGE_KEYS.CATEGORY];
}

export function setStoredCategory(category) {
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.CATEGORY, category);
      return true;
    } catch {
      memoryFallback[STORAGE_KEYS.CATEGORY] = category;
      return false;
    }
  }
  memoryFallback[STORAGE_KEYS.CATEGORY] = category;
  return false;
}

export function computeGamification(completedTopics = [], quizScores = {}) {
  const totalTopics = 5;
  const count = completedTopics.length;
  const progressPercent = Math.min(100, Math.round((count / totalTopics) * 100));

  let level = 'Awal';
  if (count === 5) {
    level = 'Seluruh Topik Selesai';
  } else if (count > 0) {
    level = 'Sebagian Selesai';
  }

  const badges = [];
  if (count >= 1) {
    badges.push('Topik Pertama Selesai');
  }
  if (count >= 5) {
    badges.push('Semua Topik Selesai');
  }

  return {
    completedTopics,
    quizScores,
    progressPercent,
    learningLevel: level,
    badges,
  };
}

export function getStoredLearningProgress() {
  const defaultProgress = computeGamification([], {});

  if (isLocalStorageAvailable()) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.LEARNING_PROGRESS);
      if (!raw) return defaultProgress;
      const parsed = JSON.parse(raw);
      return computeGamification(parsed.completedTopics || [], parsed.quizScores || {});
    } catch {
      return memoryFallback[STORAGE_KEYS.LEARNING_PROGRESS] || defaultProgress;
    }
  }
  return memoryFallback[STORAGE_KEYS.LEARNING_PROGRESS] || defaultProgress;
}

export function setStoredLearningProgress(progress) {
  const formatted = computeGamification(progress.completedTopics || [], progress.quizScores || {});
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.LEARNING_PROGRESS, JSON.stringify(formatted));
      return true;
    } catch {
      memoryFallback[STORAGE_KEYS.LEARNING_PROGRESS] = formatted;
      return false;
    }
  }
  memoryFallback[STORAGE_KEYS.LEARNING_PROGRESS] = formatted;
  return false;
}

export function clearStoredLearningData() {
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.CATEGORY);
      window.localStorage.removeItem(STORAGE_KEYS.LEARNING_PROGRESS);
    } catch {
      // ignore
    }
  }
  memoryFallback[STORAGE_KEYS.CATEGORY] = null;
  memoryFallback[STORAGE_KEYS.LEARNING_PROGRESS] = null;
}
