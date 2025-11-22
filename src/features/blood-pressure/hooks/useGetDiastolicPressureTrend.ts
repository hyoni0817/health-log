import { bloodPressureQueries } from '@/entities/blood-pressure/model/api/bloodPressure.queries';
import { useQuery } from '@tanstack/react-query';

/**
 * 이완기 혈압 추이 조회 hook
 * @param days 조회할 일 수
 * @returns 이완기 혈압 추이 데이터
 */
export const useGetDiastolicPressureTrend = (days?: number) => {
  return useQuery(bloodPressureQueries.diastolicPressureTrend(days));
};
