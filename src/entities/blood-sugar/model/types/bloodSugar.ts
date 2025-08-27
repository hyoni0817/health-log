export enum MeasurementTiming {
  BEFORE_BREAKFAST = 'BEFORE_BREAKFAST',
  AFTER_BREAKFAST = 'AFTER_BREAKFAST',
  BEFORE_LUNCH = 'BEFORE_LUNCH',
  AFTER_LUNCH = 'AFTER_LUNCH',
  BEFORE_DINNER = 'BEFORE_DINNER',
  AFTER_DINNER = 'AFTER_DINNER',
  FASTING = 'FASTING',
}

export enum PostMealTime {
  THIRTY_MINUTES = '30',
  ONE_HOUR = '60',
  TWO_HOURS = '120',
}

export interface BloodSugarPayload {
  value: number;
  measurement_timing: (typeof MeasurementTiming)[keyof typeof MeasurementTiming];
  post_meal_time?: (typeof PostMealTime)[keyof typeof PostMealTime] | null;
  note?: string;
  user_id: number;
  date: string;
}

export interface BloodSugarRecord extends BloodSugarPayload {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface BloodSugarTrendRecord {
  date: string;
  min_value: number;
  max_value: number;
}
