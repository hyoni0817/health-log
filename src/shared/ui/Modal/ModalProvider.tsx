'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ModalContext, ModalContextType, ModalStackItem } from './ModalContext';
import { ModalContainer } from './ModalContainer';

let idCounter = 0;
function generateId() {
  idCounter += 1;
  return `modal_${idCounter}`;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalStackItem[]>([]);

  const openModal = useCallback<ModalContextType['openModal']>((Component, props) => {
    const id = generateId();

    setModals((prev) => [
      ...prev,
      {
        id,
        // 컴포넌트가 어떤 props 타입을 가지고 있는지 모르기 때문에, 모든 타입을 표현할 수 있는 객체로 타입 캐스팅
        Component: Component as React.ComponentType<{ [key: string]: unknown }>,
        props,
      },
    ]);

    return id;
  }, []);

  const closeModal = useCallback<ModalContextType['closeModal']>((id) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeTopModal = useCallback<ModalContextType['closeTopModal']>(() => {
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
