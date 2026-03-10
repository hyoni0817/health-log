import { PeriodFilterType, RangeDate } from './measurement';

export interface HistoryParams {
  periodType: PeriodFilterType;
  limit?: number;
  offset?: number;
  days?: number;
  month?: string;
  startDate?: RangeDate;
  endDate?: RangeDate;
}

export type AllHistoryParams = Omit<HistoryParams, 'limit' | 'offset'>;
