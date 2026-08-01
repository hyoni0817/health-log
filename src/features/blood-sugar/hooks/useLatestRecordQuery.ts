import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { useQuery } from '@tanstack/react-query';

/**
 * 가장 최근 혈당 기록 조회 hook
 * @returns 가장 최근 혈당 기록 데이터
 */
export const useLatestRecordQuery = () => {
  return useQuery(bloodSugarQueries.latestRecord());
};
