'use client';

import React from 'react';

export type ModalComponentProps = {
  close: () => void;
};

export type ModalStackItem = {
  id: string;
  Component: React.ComponentType<{ [key: string]: unknown }>;
  props?: Omit<{ [key: string]: unknown }, keyof ModalComponentProps>;
};

export type ModalContextType = {
  modals: ModalStackItem[];
  openModal: <P extends ModalComponentProps>(
    Component: React.ComponentType<P>,
    props?: Omit<P, keyof ModalComponentProps>
  ) => string; // returns modal id
  closeModal: (id: string) => void;
  closeTopModal: () => void;
  updateModalProps: <P extends ModalComponentProps>(
    id: string,
    newProps: Partial<Omit<P, keyof ModalComponentProps>>
  ) => void;
};

export const ModalContext = React.createContext<ModalContextType | undefined>(undefined);
