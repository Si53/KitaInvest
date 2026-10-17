import { useEffect } from 'react';

/**
 * Custom Hook useSmoothScrollToTop - KitaInvest
 * Agent 2: Core App & Flow & Agent 7: UI/UX Audit & Polish
 *
 * Menjalankan window.scrollTo({ top: 0, behavior: 'smooth' })
 * secara otomatis saat dependencies (seperti currentPage atau activeTopicId) berubah.
 *
 * @param {Array} dependencies
 */
export function useSmoothScrollToTop(dependencies = []) {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, dependencies);
}

export default useSmoothScrollToTop;
