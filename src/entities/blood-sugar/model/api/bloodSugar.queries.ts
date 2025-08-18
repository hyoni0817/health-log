import { queryOptions } from '@tanstack/react-query';
import { bloodSugarApi } from './bloodSugarApi';

export const bloodSugarQueries = {
  trend: (days?: number) =>
    queryOptions({
      queryKey: ['blood-sugar-trend', days],
      queryFn: () => bloodSugarApi.getBloodSugarTrend(days),
    }),
};
