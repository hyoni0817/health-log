'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ModalContext, ModalStackItem, ModalComponentProps } from './ModalContext';
import { ModalContainer } from './ModalContainer';

let idCounter = 0;
function generateId() {
  idCounter += 1;
  return `modal_${idCounter}`;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalStackItem[]>([]);

  const openModal = useCallback(
    (Component: React.ComponentType<ModalComponentProps>, props?: Record<string, unknown>) => {
      const id = generateId();

      setModals((prev) => [...prev, { id, Component, props }]);

      return id;
    },
    []
  );

  const closeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeTopModal = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, []);

  const contextValue = useMemo(
    () => ({ modals, openModal, closeModal, closeTopModal }),
    [modals, openModal, closeModal, closeTopModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalContainer modals={modals} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};
