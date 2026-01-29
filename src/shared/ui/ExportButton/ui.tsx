import { DownloadIcon } from 'lucide-react';
import React, { ButtonHTMLAttributes, FC } from 'react';

interface ExportButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const ExportButton: FC<ExportButtonProps> = (props) => {
  const { text, ...rest } = props;
  return (
    <button
      {...rest}
      className="bg-(--color-white) text-(--color-gray-900) rounded-2xl p-2 flex items-center gap-2 px-3 py-3"
    >
      <DownloadIcon className="text-(--color-gray-900) font-black" />
      <span className="text-md font-black">{text}</span>
    </button>
  );
};
