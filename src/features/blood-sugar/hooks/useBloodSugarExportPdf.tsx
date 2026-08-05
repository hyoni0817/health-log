import { useCallback, useState } from 'react';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';
import dayjs from 'dayjs';
import { useModal } from '@/shared/ui/Modal';
import { ExportProgressModal } from '@/shared/ui/ExportProgressModal';

/**
 * 혈당 기록을 PDF로 내려받는 훅
 * @returns 혈당 데이터를 PDF로 내려받을 수 있는 함수를 포함한 객체
 */
export const useBloodSugarExportPdf = () => {
  const { periodType, days, month, startDate, endDate } = usePeriodFilter();
  const { openModal, closeModal, updateModalProps } = useModal();
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleDownloadPdf = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (isExporting) return;

    let modalId = '';

    try {
      setIsExporting(true);
      modalId = openModal(ExportProgressModal, { text: 'PDF 생성 중', onCancel: () => controller.abort() });

      const res = await fetch('http://localhost:4000/pdf/blood-sugar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ periodType, days, month, startDate, endDate }),
        signal,
      });

      if (!res.ok) throw new Error('PDF 생성 실패');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `혈당 리포트_${dayjs(startDate).format('YYYY-MM-DD')} ~ ${dayjs(endDate).format('YYYY-MM-DD')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      closeModal(modalId);
    } catch (error) {
      // 사용자가 직접 '취소'버튼을 누른 경우에는 error 상태를 표시하지 않음.
      if (error instanceof Error && error.name === 'AbortError') {
        closeModal(modalId);
        return;
      }

      if (modalId) {
        updateModalProps(modalId, { isError: true });
      }

      console.error(error);
    } finally {
      setIsExporting(false);
    }
  }, [periodType, days, month, startDate, endDate, isExporting, openModal, closeModal, updateModalProps]);
  return { handleDownloadPdf };
};
