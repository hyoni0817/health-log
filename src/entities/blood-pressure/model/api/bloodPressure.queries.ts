import { queryOptions } from '@tanstack/react-query';
import { bloodPressureApi } from './bloodPressureApi';
import { RangeDate } from '@/shared/types/measurement';

export const bloodPressureQueries = {
  // 키 전용 항목
  all: () => ['blood-pressure'] as const,
  systolicPressureTrends: () => [...bloodPressureQueries.all(), 'systolic-pressure-trend'] as const,
  diastolicPressureTrends: () => [...bloodPressureQueries.all(), 'diastolic-pressure-trend'] as const,
  statsSummaries: () => [...bloodPressureQueries.all(), 'stats-summary'] as const,

  // 쿼리 팩토리
  systolicPressureTrend: (days?: number, startDate?: RangeDate, endDate?: RangeDate) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.systolicPressureTrends(), days, startDate, endDate],
      queryFn: () => bloodPressureApi.getSystolicPressureTrend(days, startDate, endDate),
    }),
  diastolicPressureTrend: (days?: number, startDate?: RangeDate, endDate?: RangeDate) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.diastolicPressureTrends(), days, startDate, endDate],
      queryFn: () => bloodPressureApi.getDiastolicPressureTrend(days, startDate, endDate),
    }),
  statsSummary: (days?: number, startDate?: RangeDate, endDate?: RangeDate) =>
    queryOptions({
      queryKey: [...bloodPressureQueries.statsSummaries(), days, startDate, endDate],
      queryFn: () => bloodPressureApi.getBloodPressureStatsSummary(days, startDate, endDate),
    }),
};
