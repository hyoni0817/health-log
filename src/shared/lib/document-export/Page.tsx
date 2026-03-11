import React, { FC } from 'react';
import { A4_WIDTH_PX, CONTENT_HEIGHT } from '@/shared/lib/document-export/documentSize';

interface PageProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Page: FC<PageProps> = ({ children, header, footer }) => (
  <div className={`w-[${A4_WIDTH_PX}px] p-4 print:[page-break-after:always] print:last:[page-break-after:auto]`}>
    {header}
    <div className={`overflow-hidden h-[${CONTENT_HEIGHT}px] shrink-0`}>{children}</div>
    {footer}
  </div>
);
