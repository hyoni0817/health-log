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
