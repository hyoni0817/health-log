import { bloodPressureQueries } from '@/entities/blood-pressure/model/api/bloodPressure.queries';
import { RangeDate } from '@/shared/types/measurement';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈압 통계 요약 조회 hook
 * @param days 조회할 일 수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 혈압 통계 요약 데이터
 */
export const useBloodPressureStatsSummary = (days?: number, startDate?: RangeDate, endDate?: RangeDate) => {
  return useQuery(bloodPressureQueries.statsSummary(days, startDate as Date | null, endDate as Date | null));
};
