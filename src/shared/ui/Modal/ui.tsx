import React from 'react';

interface ModalProps {
  zIndex: number;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ zIndex, children }) => {
  return (
    <div
      className={`z-[${zIndex}] fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex items-center justify-center`}
    >
      {children}
    </div>
  );
};

ModalComponent.displayName = 'Modal';

export const Modal = React.memo(ModalComponent);
