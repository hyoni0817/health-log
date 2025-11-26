import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈당 통계 요약 조회 hook
 * @param days 조회할 일 수
 * @returns 혈당 통계 요약 데이터
 */
export const useGetBloodSugarStatsSummary = (days?: number) => {
  return useQuery(bloodSugarQueries.statsSummary(days));
};
