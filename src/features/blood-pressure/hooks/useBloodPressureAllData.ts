import { bloodPressureQueries, BloodPressureRecord } from '@/entities/blood-pressure/model';
import { useQuery } from '@tanstack/react-query';
import { AllHistoryParams } from '@/shared/types/history';
import { CustomQueryOptions } from '@/shared/types/query';

/**
 * 모든 혈압 내역 조회 hook
 * @param params AllHistoryParams (periodType, days, month, startDate, endDate)
 * @param options 리액트 쿼리 옵션 (enabled, staleTime, gcTime, refetchOnWindowFocus, refetchOnMount, refetchOnReconnect)
 * @example
 * const { data } = useBloodPressureAllData({
 *   periodType: PeriodFilterType.DAY,
 *   days: 7,
 * }, { enabled: true });
 * @returns 모든 혈압 내역 데이터
 */
export const useBloodPressureAllData = (
  params: AllHistoryParams,
  options?: CustomQueryOptions<BloodPressureRecord[]>
) => {
  return useQuery(bloodPressureQueries.allHistory(params, options));
};
