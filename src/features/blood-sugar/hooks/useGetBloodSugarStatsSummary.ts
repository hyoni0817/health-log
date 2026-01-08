import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈당 통계 요약 조회 hook
 * @param days 조회할 일 수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 혈당 통계 요약 데이터
 */
export const useGetBloodSugarStatsSummary = (days?: number, startDate?: Date | null, endDate?: Date | null) => {
  return useQuery(bloodSugarQueries.statsSummary(days, startDate, endDate));
};
