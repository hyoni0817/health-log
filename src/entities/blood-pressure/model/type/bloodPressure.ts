import {
  BaseMeasurementPayload,
  BaseMeasurementRecord,
  MeasurementTiming,
  PostMealTime,
} from '@/shared/types/measurement';

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
  record_count: number;
}

export interface BloodPressureStatsSummaryRecord {
  total_record_count: number;
  normal_record_count: number;
  /** 0 ~ 1 사이의 비율 */
  normal_record_ratio: number;

  /** 수축기가 가장 높았던 기록 한 건 */
  highest_record_systolic_bp: number;
  highest_record_diastolic_bp: number;
  highest_record_date: string;
  highest_record_timing: MeasurementTiming;
  highest_record_post_meal_time: PostMealTime | null;

  /** 수축기가 가장 낮았던 기록 한 건 */
  lowest_record_systolic_bp: number;
  lowest_record_diastolic_bp: number;
  lowest_record_date: string;
  lowest_record_timing: MeasurementTiming;
  lowest_record_post_meal_time: PostMealTime | null;
}
