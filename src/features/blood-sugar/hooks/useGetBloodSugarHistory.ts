import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { PaginatedBloodSugarHistory } from '@/entities/blood-sugar/model/types/bloodSugar';
import { HistoryParams } from '@/shared/types/history';
import { CustomQueryOptions } from '@/shared/types/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈당 내역 조회 hook
 * @param params HistoryParams (periodType, limit, offset, days, month, startDate, endDate)
 * @param options 리액트 쿼리 옵션 (enabled, staleTime, gcTime, refetchOnWindowFocus, refetchOnMount, refetchOnReconnect)
 * @example
 * const { data } = useGetBloodSugarHistory({
 *   periodType: PeriodFilterType.DAY,
 *   days: 7,
 * }, { enabled: true });
 * @returns 혈당 내역 데이터
 */
export const useGetBloodSugarHistory = (
  params: HistoryParams,
  options?: CustomQueryOptions<PaginatedBloodSugarHistory>
) => {
  return useQuery(bloodSugarQueries.history(params, options));
};
