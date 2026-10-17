/**
 * Application Context - KitaInvest
 * Agent 2: Core App, Flow & Storage
 * Domain: /src/context/
 *
 * Menerapkan pemisahan mutlak:
 * 1. Data Keuangan: HANYA di memori React (In-Memory State). Hilang saat refresh.
 * 2. Kategori & Progres Belajar: Disimpan di localStorage via storage.js dengan fallback.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  isLocalStorageAvailable,
  getStoredCategory,
  setStoredCategory,
  getStoredLearningProgress,
  setStoredLearningProgress,
  clearStoredLearningData,
  computeGamification,
} from '../utils/storage.js';

const AppContext = createContext(null);

const INITIAL_FINANCIAL_DATA = {
  usia: '',
  uangSakuBulanan: '',
  pendapatanBulanan: '',
  pengeluaranBulanan: '',
  danaDimiliki: '',
  pemasukanRutinBulanan: '',
  tabungan: '',
};

const INITIAL_SIMULATION_DATA = {
  namaTujuan: '',
  targetDana: '',
  danaAwal: '',
  setoranBulanan: '',
  jangkaWaktuBulan: '',
  pertumbuhanTahunan: '12',
  inflasiTahunan: '5',
};

export function AppProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');

  // Storage availability warning
  const [isStorageWarningVisible, setIsStorageWarningVisible] = useState(false);

  // 1. Persistent State (localStorage)
  const [category, setCategoryState] = useState(() => getStoredCategory());
  const [learningProgress, setLearningProgressState] = useState(() => getStoredLearningProgress());

  // 2. Pure In-Memory Financial State (Hilang saat reload)
  const [financialData, setFinancialData] = useState(INITIAL_FINANCIAL_DATA);
  const [simulationData, setSimulationData] = useState(INITIAL_SIMULATION_DATA);

  useEffect(() => {
    const available = isLocalStorageAvailable();
    if (!available) {
      setIsStorageWarningVisible(true);
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectCategory = (newCategory) => {
    setCategoryState(newCategory);
    setStoredCategory(newCategory);
  };

  const updateFinancialData = (fields) => {
    setFinancialData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const resetFinancialData = () => {
    setFinancialData(INITIAL_FINANCIAL_DATA);
  };

  const updateSimulationData = (fields) => {
    setSimulationData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const completeTopic = (topicId, score = 100) => {
    setLearningProgressState((prev) => {
      const completedSet = new Set(prev.completedTopics || []);
      completedSet.add(topicId);
      const updatedTopics = Array.from(completedSet);
      const updatedScores = {
        ...(prev.quizScores || {}),
        [topicId]: score,
      };
      const updated = computeGamification(updatedTopics, updatedScores);
      setStoredLearningProgress(updated);
      return updated;
    });
  };

  const resetLearningData = () => {
    clearStoredLearningData();
    setCategoryState(null);
    const emptyProgress = computeGamification([], {});
    setLearningProgressState(emptyProgress);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        category,
        selectCategory,
        financialData,
        updateFinancialData,
        resetFinancialData,
        simulationData,
        updateSimulationData,
        learningProgress,
        completeTopic,
        resetLearningData,
        isStorageWarningVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
