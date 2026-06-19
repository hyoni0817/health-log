'use client';

import { useExportDoc } from 'react-export-doc';
import { ExportButton } from '@/shared/ui/ExportButton';
import { useBloodSugarExportExcel } from '@/features/blood-sugar/hooks/useBloodSugarExportExcel';
import { BloodSugarAnalysisDocument } from './BloodSugarAnalysisDocument';
import { BloodSugarPeriodFilterContext } from '../model';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';

export const BloodSugarExport = () => {
  const { periodType, days, month, startDate, endDate } = usePeriodFilter(BloodSugarPeriodFilterContext);
  const { handleDownloadExcel } = useBloodSugarExportExcel();
  const { exportPDF } = useExportDoc();

  return (
    <div className="flex justify-end mb-4 gap-2">
      <ExportButton text="Excel로 내려받기" onClick={handleDownloadExcel} />
      <ExportButton
        text="PDF로 내려받기"
        onClick={() =>
          exportPDF(
            <BloodSugarAnalysisDocument periodFilterFields={{ periodType, days, month, startDate, endDate }} />,
            {
              filename: '혈당 리포트.pdf',
            }
          )
        }
      />{' '}
    </div>
  );
};
