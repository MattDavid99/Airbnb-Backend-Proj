import React from 'react';
import './SignupModal.css';

function SignupModal({ open, children, onClose }) {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="signup-modal-overlay" onClick={handleOverlayClick}>
      <div className="signup-modal-div">
        {children}
      </div>
    </div>
  );
}

export default SignupModal;
