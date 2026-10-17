import React from 'react';

export function Alert({ type = 'warning', message, onClose }) {
  if (!message) return null;

  return (
    <div className={`alert-box alert-${type}`} role="alert">
      <span className="alert-icon">
        {type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <div className="alert-content">{message}</div>
      {onClose && (
        <button type="button" className="alert-close-btn" onClick={onClose} aria-label="Tutup">
          ×
        </button>
      )}
    </div>
  );
}
