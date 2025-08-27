/**
 * 측정 시간 (식사 전후 시간)
 */
export enum MeasurementTiming {
  BEFORE_BREAKFAST = 'BEFORE_BREAKFAST',
  AFTER_BREAKFAST = 'AFTER_BREAKFAST',
  BEFORE_LUNCH = 'BEFORE_LUNCH',
  AFTER_LUNCH = 'AFTER_LUNCH',
  BEFORE_DINNER = 'BEFORE_DINNER',
  AFTER_DINNER = 'AFTER_DINNER',
  FASTING = 'FASTING',
}

/**
 * 식후 측정 시간 (분 단위)
 */
export enum PostMealTime {
  THIRTY_MINUTES = '30',
  ONE_HOUR = '60',
  TWO_HOURS = '120',
}

/**
 * 공통 측정 기본 정보
 */
export interface BaseMeasurementPayload {
  measurement_timing: (typeof MeasurementTiming)[keyof typeof MeasurementTiming];
  post_meal_time?: (typeof PostMealTime)[keyof typeof PostMealTime] | null;
  note?: string;
  user_id: number;
  date: string;
}

/**
 * 공통 측정 레코드 기본 정보
 */
export interface BaseMeasurementRecord {
  id: string;
  created_at: string;
  updated_at: string;
}
