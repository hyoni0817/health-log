import { queryOptions } from '@tanstack/react-query';
import { bloodSugarApi } from './bloodSugarApi';
import { AllHistoryParams, HistoryParams, PaginatedHistory } from '@/shared/types/history';
import { BloodSugarRecord } from '../types/bloodSugar';
import { CustomQueryOptions } from '@/shared/types/query';
import { RangeDate } from '@/shared/types/measurement';

export const bloodSugarQueries = {
  // 키 전용 항목
  all: () => ['blood-sugar'] as const,
  trends: () => [...bloodSugarQueries.all(), 'trend'] as const,
  statsSummaries: () => [...bloodSugarQueries.all(), 'stats-summary'] as const,
  histories: () => [...bloodSugarQueries.all(), 'history'] as const,
  allHistories: () => [...bloodSugarQueries.all(), 'all-history'] as const,
  latestRecords: () => [...bloodSugarQueries.all(), 'latest'] as const,

  // 쿼리 팩토리
  trend: (days?: number, startDate?: RangeDate, endDate?: RangeDate) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.trends(), days, startDate, endDate],
      queryFn: () => bloodSugarApi.getBloodSugarTrend(days, startDate, endDate),
    }),
  statsSummary: (days?: number, startDate?: RangeDate, endDate?: RangeDate) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.statsSummaries(), days, startDate, endDate],
      queryFn: () => bloodSugarApi.getBloodSugarStatsSummary(days, startDate, endDate),
    }),
  history: (params: HistoryParams, options?: CustomQueryOptions<PaginatedHistory<BloodSugarRecord>>) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.histories(), ...Object.values(params)],
      queryFn: () => bloodSugarApi.getBloodSugarHistory(params),
      ...options,
    }),
  allHistory: (params: AllHistoryParams, options?: CustomQueryOptions<BloodSugarRecord[]>) =>
    queryOptions({
      queryKey: [...bloodSugarQueries.allHistories(), ...Object.values(params)],
      queryFn: () => bloodSugarApi.getAllBloodSugarHistory(params),
      ...options,
    }),
  latestRecord: () =>
    queryOptions({
      queryKey: [...bloodSugarQueries.latestRecords()],
      queryFn: () => bloodSugarApi.getLatestBloodSugar(),
    }),
};
