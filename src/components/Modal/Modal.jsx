import s from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose(e);
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handlBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
