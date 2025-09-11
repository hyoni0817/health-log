import { queryOptions } from '@tanstack/react-query';
import { bloodSugarApi } from './bloodSugarApi';

export const bloodSugarQueries = {
  // 키 전용 항목
  all: () => ['blood-sugar'] as const,
  trends: () => [...bloodSugarQueries.all(), 'trend'] as const,

  // 쿼리 팩토리
  trend: (days?: number) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.trends(), days],
      queryFn: () => bloodSugarApi.getBloodSugarTrend(days),
    }),
};
