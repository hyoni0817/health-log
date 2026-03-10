import { PeriodFilterType } from './measurement';

export interface HistoryParams {
  periodType: PeriodFilterType;
  limit?: number;
  offset?: number;
  days?: number;
  month?: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}

export type AllHistoryParams = Omit<HistoryParams, 'limit' | 'offset'>;
