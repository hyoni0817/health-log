import { bloodPressureQueries } from '@/entities/blood-pressure/model/api/bloodPressure.queries';
import { useQuery } from '@tanstack/react-query';

/**
 * 수축기 혈압 추이 조회 hook
 * @param days 조회할 일 수
 * @returns 수축기 혈압 추이 데이터
 */
export const useGetSystolicPressureTrend = (days?: number) => {
  return useQuery(bloodPressureQueries.systolicPressureTrend(days));
};
