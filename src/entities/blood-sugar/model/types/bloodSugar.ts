import { BaseMeasurementPayload, BaseMeasurementRecord } from '@/shared/types/measurement';

export interface BloodSugarPayload extends BaseMeasurementPayload {
  value: number;
}

export interface BloodSugarRecord extends BloodSugarPayload, BaseMeasurementRecord {}

export interface BloodSugarTrendRecord {
  date: string;
  min_value: number;
  max_value: number;
}

export interface BloodSugarStatsSummaryRecord {
  avg_value: number;
  min_value: number;
  max_value: number;
  total_record_count: number;
}
