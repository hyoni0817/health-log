import { BloodPressureRecord } from '@/entities/blood-pressure/model';
import { bloodPressureQueries } from '@/entities/blood-pressure/model';
import { HistoryParams, PaginatedHistory } from '@/shared/types/history';
import { CustomQueryOptions } from '@/shared/types/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈압 내역 조회 hook
 * @param params HistoryParams (periodType, limit, offset, days, month, startDate, endDate)
 * @param options 리액트 쿼리 옵션 (enabled, staleTime, gcTime, refetchOnWindowFocus, refetchOnMount, refetchOnReconnect)
 * @example
 * const { data } = useBloodPressureHistory({
 *   periodType: PeriodFilterType.DAY,
 *   days: 7,
 * }, { enabled: true });
 * @returns 혈압 내역 데이터
 */
export const useBloodPressureHistory = (
  params: HistoryParams,
  options?: CustomQueryOptions<PaginatedHistory<BloodPressureRecord>>
) => {
  return useQuery(bloodPressureQueries.history(params, options));
};
