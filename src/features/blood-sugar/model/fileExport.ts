import { createContext } from 'react';
import { FileExport } from '@/shared/types/fileExport';

export const BloodSugarAnalysisExportContext = createContext<FileExport>({ isExport: false });
