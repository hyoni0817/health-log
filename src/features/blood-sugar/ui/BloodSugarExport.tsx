'use client';

import { ExportButton } from '@/shared/ui/ExportButton';
import { useBloodSugarExportExcel } from '@/features/blood-sugar/hooks/useBloodSugarExportExcel';
import { useBloodSugarExportPdf } from '../hooks/useBloodSugarExportPdf';

export const BloodSugarExport = () => {
  const { handleDownloadExcel } = useBloodSugarExportExcel();
  const { handleDownloadPdf } = useBloodSugarExportPdf();

  return (
    <div className="flex justify-end mb-4 gap-2">
      <ExportButton text="Excel로 내려받기" onClick={handleDownloadExcel} />
      <ExportButton text="PDF로 내려받기" onClick={() => alert('재정비 후 재개 예정입니다.')} />
    </div>
  );
};
