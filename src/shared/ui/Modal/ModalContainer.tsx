import React from 'react';
import ReactDOM from 'react-dom';
import { ModalStackItem } from './ModalContext';
import { Modal } from './ui';

interface ModalContainerProps {
  modals: ModalStackItem[];
  closeModal: (id: string) => void;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({ modals, closeModal }) => {
  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <>
      {modals.map((modal, idx) => {
        const zIndex = 1000 + idx;
        const { id, Component, props } = modal;
        return (
          <Modal key={id} zIndex={zIndex}>
            <Component {...props} close={() => closeModal(id)} />
          </Modal>
        );
      })}
    </>,
    document.body
  );
};
