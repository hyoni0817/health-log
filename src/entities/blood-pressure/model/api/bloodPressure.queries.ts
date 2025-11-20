import { queryOptions } from '@tanstack/react-query';
import { bloodPressureApi } from './bloodPressureApi';

export const bloodPressureQueries = {
  // 키 전용 항목
  all: () => ['blood-pressure'] as const,
  systolicPressureTrends: () => [...bloodPressureQueries.all(), 'systolic-pressure-trend'] as const,

  // 쿼리 팩토리
  systolicPressureTrend: (days?: number) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.systolicPressureTrends(), days],
      queryFn: () => bloodPressureApi.getSystolicPressureTrend(days),
    }),
};
