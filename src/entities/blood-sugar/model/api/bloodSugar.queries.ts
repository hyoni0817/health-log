import { queryOptions } from '@tanstack/react-query';
import { bloodSugarApi } from './bloodSugarApi';

export const bloodSugarQueries = {
  // 키 전용 항목
  all: () => ['blood-sugar'] as const,
  trends: () => [...bloodSugarQueries.all(), 'trend'] as const,
  statsSummaries: () => [...bloodSugarQueries.all(), 'stats-summary'] as const,

  // 쿼리 팩토리
  trend: (days?: number, startDate?: Date | null, endDate?: Date | null) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.trends(), days, startDate, endDate],
      queryFn: () => bloodSugarApi.getBloodSugarTrend(days, startDate, endDate),
    }),
  statsSummary: (days?: number, startDate?: Date | null, endDate?: Date | null) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.statsSummaries(), days, startDate, endDate],
      queryFn: () => bloodSugarApi.getBloodSugarStatsSummary(days, startDate, endDate),
    }),
};
