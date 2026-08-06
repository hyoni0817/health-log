import { createContext } from 'react';
import { FileExport } from '@/shared/types/fileExport';

export const FileExportContext = createContext<FileExport>({ isExport: false });
