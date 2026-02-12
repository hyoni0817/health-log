import { PeriodFilterType } from './measurement';

export interface HistoryParams {
  periodType: PeriodFilterType;
  limit?: number;
  offset?: number;
  days?: number;
  month?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}
