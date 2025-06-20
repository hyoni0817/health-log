'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <div className="rounded-lg p-4 border-1 border-(--divider)">{children}</div>;
};
