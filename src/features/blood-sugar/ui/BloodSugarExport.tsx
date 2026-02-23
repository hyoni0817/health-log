import { ExportButton } from '@/shared/ui/ExportButton';
import { PeriodFilter } from '@/shared/types/measurement';
import { FC } from 'react';
import { useBloodSugarExportExcel } from '@/features/blood-sugar/hooks/useBloodSugarExportExcel';

interface BloodSugarExportExcelProps {
  periodFilter: PeriodFilter;
}

export const BloodSugarExport: FC<BloodSugarExportExcelProps> = (props) => {
  const { periodFilter } = props;
  const { handleDownloadExcel } = useBloodSugarExportExcel(periodFilter);

  return (
    <div className="flex justify-end mb-4">
      <ExportButton text="Excel로 내려받기" onClick={handleDownloadExcel} />
    </div>
  );
};
