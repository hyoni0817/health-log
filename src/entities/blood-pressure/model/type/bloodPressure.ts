import { BaseMeasurementPayload, BaseMeasurementRecord } from '@/shared/types/measurement';

export interface BloodPressurePayload extends BaseMeasurementPayload {
  systolic_bp: number;
  diastolic_bp: number;
  heart_rate: number;
}

export interface BloodPressureRecord extends BloodPressurePayload, BaseMeasurementRecord {}

export interface BloodPressureTrendRecord {
  date: string;
  avg_value: number;
  min_value: number;
  max_value: number;
}
