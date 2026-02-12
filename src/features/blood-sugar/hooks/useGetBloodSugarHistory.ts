import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { HistoryParams } from '@/shared/types/history';
import { useQuery } from '@tanstack/react-query';

/**
 * 혈당 추이 조회 hook
 * @param days 조회할 일 수
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 혈당 추이 데이터
 */
export const useGetBloodSugarHistory = (params: HistoryParams) => {
  return useQuery(bloodSugarQueries.history(params));
};
