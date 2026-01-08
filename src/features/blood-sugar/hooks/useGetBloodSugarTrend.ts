import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈당 추이 조회 hook
 * @param days 조회할 일 수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 혈당 추이 데이터
 */
export const useGetBloodSugarTrend = (days?: number, startDate?: Date | null, endDate?: Date | null) => {
  return useQuery(bloodSugarQueries.trend(days, startDate, endDate));
};
