import { queryOptions } from '@tanstack/react-query';
import { bloodPressureApi } from './bloodPressureApi';
import { CustomQueryOptions } from '@/shared/types/query';
import { AllHistoryParams, HistoryParams, PaginatedHistory } from '@/shared/types/history';
import { BloodPressureRecord, BloodPressureStatsSummaryRecord, BloodPressureTrendRecord } from '../type/bloodPressure';
import { StatsSummaryParams } from '@/shared/types/stats';

export const bloodPressureQueries = {
  // 키 전용 항목
  all: () => ['blood-pressure'] as const,
  systolicPressureTrends: () => [...bloodPressureQueries.all(), 'systolic-pressure-trend'] as const,
  diastolicPressureTrends: () => [...bloodPressureQueries.all(), 'diastolic-pressure-trend'] as const,
  statsSummaries: () => [...bloodPressureQueries.all(), 'stats-summary'] as const,
  histories: () => [...bloodPressureQueries.all(), 'history'] as const,
  allHistories: () => [...bloodPressureQueries.all(), 'all-history'] as const,

  // 쿼리 팩토리
  systolicPressureTrend: (params: StatsSummaryParams, options?: CustomQueryOptions<BloodPressureTrendRecord[]>) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.systolicPressureTrends(), ...Object.values(params)],
      queryFn: () => bloodPressureApi.getSystolicPressureTrend(params),
      ...options,
    }),
  diastolicPressureTrend: (params: StatsSummaryParams, options?: CustomQueryOptions<BloodPressureTrendRecord[]>) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.diastolicPressureTrends(), ...Object.values(params)],
      queryFn: () => bloodPressureApi.getDiastolicPressureTrend(params),
      ...options,
    }),
  statsSummary: (params: StatsSummaryParams, options?: CustomQueryOptions<BloodPressureStatsSummaryRecord | null>) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.statsSummaries(), ...Object.values(params)],
      queryFn: () => bloodPressureApi.getBloodPressureStatsSummary(params),
      ...options,
    }),
  history: (params: HistoryParams, options?: CustomQueryOptions<PaginatedHistory<BloodPressureRecord>>) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.histories(), ...Object.values(params)],
      queryFn: () => bloodPressureApi.getBloodPressureHistory(params),
      ...options,
    }),
  allHistory: (params: AllHistoryParams, options?: CustomQueryOptions<BloodPressureRecord[]>) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.allHistories(), ...Object.values(params)],
      queryFn: () => bloodPressureApi.getAllBloodPressureHistory(params),
      ...options,
    }),
};
