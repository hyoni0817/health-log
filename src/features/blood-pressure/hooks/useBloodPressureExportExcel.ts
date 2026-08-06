import { useCallback, useRef, useState } from 'react';
import { utils, writeFile } from 'xlsx';
import { PeriodFilterType } from '@/shared/types/measurement';
import { getBloodPressureStatusLabel } from '../lib/status';
import { getMeasurementTimingLabel } from '@/shared/utils';
import dayjs from 'dayjs';
import { useModal } from '@/shared/ui/Modal';
import { ExportProgressModal, ExportProgressModalProps } from '@/shared/ui/ExportProgressModal';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';
import { bloodPressureApi, BloodPressureRecord } from '@/entities/blood-pressure/model';

interface UseBloodPressureExportExcelReturn {
  handleDownloadExcel: () => Promise<void>;
}

/**
 * 혈압 기록을 Excel로 내려받는 훅
 * @param periodFilter - 기간 필터를 위해 사용되는 파라미터 값
 * @returns 혈압 데이터를 Excel로 내려받을 수 있는 함수를 포함한 객체
 */
export const useBloodPressureExportExcel = (): UseBloodPressureExportExcelReturn => {
  const { openModal, closeModal, updateModalProps } = useModal();
  const { periodType, days, month, startDate, endDate } = usePeriodFilter();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const allDataRef = useRef<BloodPressureRecord[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  const handleClickProgressCancel = () => {
    controllerRef.current?.abort();
  };

  const fetchAllData = useCallback(
    async (modalId: string) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const CHUNK_SIZE = 1000; // 한 번에 가져올 데이터 개수
      let hasMore = true;
      let offset = 0;

      while (hasMore) {
        const { items } = await bloodPressureApi.getBloodPressureHistory(
          {
            periodType: periodType as PeriodFilterType,
            limit: CHUNK_SIZE,
            offset,
            days,
            month,
            startDate,
            endDate,
          },
          { signal }
        );

        controllerRef.current = controller;

        if (items.length === 0) {
          hasMore = false;
        } else {
          allDataRef.current = [...allDataRef.current, ...items];
          offset += CHUNK_SIZE;

          // 진행률 업데이트 - 청크 단위로만 업데이트 (1000개당 1번)
          // 모달을 교체하는 게 아니라 props만 업데이트하므로 성능 영향 최소화
          updateModalProps<ExportProgressModalProps>(modalId, {
            progress: allDataRef.current.length,
          });

          // 다음 청크를 가져오기 전 짧은 딜레이 (서버 부하 완화)
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // 데이터가 CHUNK_SIZE보다 적으면 마지막 청크
        if (items.length < CHUNK_SIZE) {
          hasMore = false;
        }
      }

      return allDataRef.current;
    },
    [periodType, days, month, startDate, endDate, updateModalProps]
  );

  const handleDownloadExcel = useCallback(async () => {
    if (isExporting) return;

    let modalId = '';

    try {
      setIsExporting(true);

      allDataRef.current = await fetchAllData(modalId);

      if (allDataRef.current?.length === 0) {
        closeModal(modalId);
        alert('내려받을 데이터가 없습니다.');
        return;
      }

      modalId = openModal(ExportProgressModal, { progress: 0, onCancel: handleClickProgressCancel });

      // [ ] blood-sugar와 중복되는 코드를 어떻게 관리할지 고민하기
      const headers = ['날짜', '혈압(mmHg)', '맥박', '상태', '측정 시간', '식사 후 시간', '메모'];
      const rows = allDataRef.current?.map((item) => [
        dayjs(item.date).format('YYYY-MM-DD'),
        `${item.systolic_bp}/${item.diastolic_bp}`,
        item.heart_rate,
        getBloodPressureStatusLabel(item.status),
        getMeasurementTimingLabel(item?.measurement_timing),
        item?.post_meal_time ? `${item?.post_meal_time}분 후` : '-',
        item?.note || '-',
      ]);

      const ws = utils.aoa_to_sheet([headers, ...(rows || [])]);

      /* 컬럼 너비 설정  */
      ws['!cols'] = [
        { wch: 12 }, // 날짜
        { wch: 15 }, // 혈압(mmHg)
        { wch: 12 }, // 맥박
        { wch: 12 }, // 상태
        { wch: 15 }, // 측정 시간
        { wch: 18 }, // 식사 후 시간
        { wch: 35 }, // 메모 (넓게)
      ];

      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, `최근 ${days}일`);

      writeFile(
        wb,
        `혈압기록_${dayjs(allDataRef.current?.[0]?.date).format('YYYY-MM-DD')}~${dayjs(allDataRef.current?.[allDataRef.current?.length - 1]?.date).format('YYYY-MM-DD')}.xlsx`
      );

      // 다운로드 완료 후 모달 닫기
      closeModal(modalId);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        closeModal(modalId);
        return;
      }

      if (modalId) {
        updateModalProps(modalId, { isError: true });
      }

      alert('다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
      controllerRef.current = null;
      allDataRef.current = [];
    }
  }, [days, isExporting, openModal, closeModal, fetchAllData]);

  return { handleDownloadExcel };
};
