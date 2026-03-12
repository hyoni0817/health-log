import { useCallback } from 'react';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';
import { BloodSugarPeriodFilterContext } from '@/features/blood-sugar/model';

/**
 * 혈당 기록을 PDF로 내려받는 훅
 * @returns 혈당 데이터를 PDF로 내려받을 수 있는 함수를 포함한 객체
 */
export const useBloodSugarExportPdf = () => {
  const { periodType, days, month, startDate, endDate } = usePeriodFilter(BloodSugarPeriodFilterContext);

  const handleDownloadPdf = useCallback(async () => {
    const res = await fetch('http://localhost:4000/pdf/blood-sugar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days, startDate, endDate }),
    });

    if (!res.ok) throw new Error('PDF 생성 실패');

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blood-sugar.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }, [days, startDate, endDate]);
  return { handleDownloadPdf };
};
