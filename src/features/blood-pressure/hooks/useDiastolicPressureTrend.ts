import { bloodPressureQueries, BloodPressureTrendRecord } from '@/entities/blood-pressure/model';
import { StatsSummaryParams } from '@/shared/types/stats';
import { useQuery } from '@tanstack/react-query';
import { CustomQueryOptions } from '@/shared/types/query';

/**
 * 이완기 혈압 추이 조회 hook
 * @param days 조회할 일 수
 * @returns 이완기 혈압 추이 데이터
 */
export const useDiastolicPressureTrend = (
  params: StatsSummaryParams,
  options?: CustomQueryOptions<BloodPressureTrendRecord[]>
) => {
  return useQuery(bloodPressureQueries.diastolicPressureTrend(params, options));
};
