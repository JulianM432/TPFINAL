import React from "react";


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // No renderiza nada si el modal está cerrado

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
