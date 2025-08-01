export enum MealTiming {
  BEFORE_BREAKFAST = 'BEFORE_BREAKFAST',
  AFTER_BREAKFAST = 'AFTER_BREAKFAST',
  BEFORE_LUNCH = 'BEFORE_LUNCH',
  AFTER_LUNCH = 'AFTER_LUNCH',
  BEFORE_DINNER = 'BEFORE_DINNER',
  AFTER_DINNER = 'AFTER_DINNER',
  FASTING = 'FASTING',
}

export interface BloodSugarPayload {
  value: number;
  meal_timing: (typeof MealTiming)[keyof typeof MealTiming];
  note?: string;
  user_id: number;
  date: string;
}

export interface BloodSugarRecord extends BloodSugarPayload {
  id: string;
  created_at: string;
  updated_at: string;
}
