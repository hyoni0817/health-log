import { ExportButton } from '@/shared/ui/ExportButton';
import { useBloodSugarExportExcel } from '@/features/blood-sugar/hooks/useBloodSugarExportExcel';

export const BloodSugarExport = () => {
  const { handleDownloadExcel } = useBloodSugarExportExcel();

  return (
    <div className="flex justify-end mb-4">
      <ExportButton text="Excel로 내려받기" onClick={handleDownloadExcel} />
    </div>
  );
};
