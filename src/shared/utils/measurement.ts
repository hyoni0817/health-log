import { MeasurementTiming } from '../types/measurement';

export const MEASUREMENT_TIME_LABELS: Record<MeasurementTiming, string> = {
  [MeasurementTiming.FASTING]: '공복',
  [MeasurementTiming.BEFORE_BREAKFAST]: '아침 식사 전',
  [MeasurementTiming.AFTER_BREAKFAST]: '아침 식사 후',
  [MeasurementTiming.BEFORE_LUNCH]: '점심 식사 전',
  [MeasurementTiming.AFTER_LUNCH]: '점심 식사 후',
  [MeasurementTiming.BEFORE_DINNER]: '저녁 식사 전',
  [MeasurementTiming.AFTER_DINNER]: '저녁 식사 후',
};

/**
 * 측정 시간 라벨 반환
 * @param timing 측정 시간 키
 * @returns 측정 시간 라벨
 */
export const getMeasurementTimingLabel = (timing: MeasurementTiming): string => MEASUREMENT_TIME_LABELS[timing];
