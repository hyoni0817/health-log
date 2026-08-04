/**
 * 기간 필터 유형
 */
export enum PeriodFilterType {
  DAY = 'DAY',
  MONTH = 'MONTH',
  RANGE = 'RANGE',
}

/**
 * 일 단위 기간 필터 타입
 */
export type Days = number;

/**
 * 월 단위 기간 필터 타입
 * - yyyy-MM 형식
 * @example '202601' => 2026년 1월
 */
export type Month = string;

/**
 * 기간 설정 단위 타입
 */
export type RangeDate = Date | string | null;

export type PeriodFilterTabKey = Days | 'manual';

/**
 * 기간 필터
 */
export type PeriodFilter =
  | {
      type: PeriodFilterType.DAY;
      days: Days;
    }
  | {
      type: PeriodFilterType.MONTH;
      month: Month;
    }
  | {
      type: PeriodFilterType.RANGE;
      startDate: RangeDate;
      endDate: RangeDate;
    };

export type PeriodFilterTypeKey = keyof typeof PeriodFilterType;

export interface PeriodFilterValues {
  periodType: PeriodFilterType;
  days: Days | undefined;
  month: Month | undefined;
  startDate: RangeDate | undefined;
  endDate: RangeDate | undefined;
}

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
  id: number;
  created_at: string;
  updated_at: string;
}
