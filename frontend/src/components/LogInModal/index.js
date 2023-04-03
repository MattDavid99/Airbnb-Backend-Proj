import React from 'react';
import './LogInModal.css';

function LogInModal({ open, children, onClose }) {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal-div">
        {children}
      </div>
    </div>
  );
}

export default LogInModal;
