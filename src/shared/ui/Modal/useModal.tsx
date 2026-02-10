'use client';

import { useContext } from 'react';
import { ModalContext, ModalComponentProps } from './ModalContext';

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal은 ModalProvider 내부에서만 사용할 수 있습니다.');
  }
  return {
    openModal: context.openModal,
    closeModal: context.closeModal,
    closeTopModal: context.closeTopModal,
    updateModalProps: context.updateModalProps,
    modals: context.modals,
  };
}

export type { ModalComponentProps };
