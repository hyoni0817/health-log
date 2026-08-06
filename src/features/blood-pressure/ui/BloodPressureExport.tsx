'use client';

import { ExportButton } from '@/shared/ui/ExportButton';
import { useBloodPressureExportExcel } from '@/features/blood-pressure/hooks/useBloodPressureExportExcel';

import { useExportDoc } from 'react-export-doc';
import { BloodPressureAnalysisDocument } from './BloodPressureAnalysisDocument';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';

export const BloodPressureExport = () => {
  const { periodType, days, month, startDate, endDate } = usePeriodFilter();
  const { handleDownloadExcel } = useBloodPressureExportExcel();
  const { exportPDF } = useExportDoc();

  return (
    <div className="flex justify-end mb-4 gap-2">
      {/* [ ] type props을 추가하여 excel, pdf로 변경하기  */}
      <ExportButton text="Excel로 내려받기" onClick={handleDownloadExcel} />
      <ExportButton
        text="PDF로 내려받기"
        onClick={() =>
          exportPDF(
            <BloodPressureAnalysisDocument periodFilterFields={{ periodType, days, month, startDate, endDate }} />,
            { filename: '혈압 리포트.pdf' }
          )
        }
      />
    </div>
  );
};
