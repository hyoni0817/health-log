'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`rounded-lg p-4 border-1 border-(--divider) ${className}`}>{children}</div>;
};
