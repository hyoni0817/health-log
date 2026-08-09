import { bloodPressureQueries } from '@/entities/blood-pressure/model';
import { BloodPressureStatsSummaryRecord } from '@/entities/blood-pressure/model/type/bloodPressure';
import { CustomQueryOptions } from '@/shared/types/query';
import { StatsSummaryParams } from '@/shared/types/stats';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈압 통계 요약 조회 hook
 * @param days 조회할 일 수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 혈압 통계 요약 데이터
 */
export const useBloodPressureStatsSummary = (
  params: StatsSummaryParams,
  options?: CustomQueryOptions<BloodPressureStatsSummaryRecord | null>
) => {
  return useQuery(bloodPressureQueries.statsSummary(params, options));
};
