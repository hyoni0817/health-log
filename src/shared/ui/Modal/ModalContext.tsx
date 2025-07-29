'use client';

import React from 'react';

export type ModalComponentProps = {
  close: () => void;
  [key: string]: unknown;
};

export type ModalStackItem = {
  id: string;
  Component: React.ComponentType<ModalComponentProps>;
  props?: Record<string, unknown>;
};

export type ModalContextType = {
  modals: ModalStackItem[];
  openModal: (Component: React.ComponentType<ModalComponentProps>, props?: Record<string, unknown>) => string; // returns modal id
  closeModal: (id: string) => void;
  closeTopModal: () => void;
};

export const ModalContext = React.createContext<ModalContextType | undefined>(undefined);
