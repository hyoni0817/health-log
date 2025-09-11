import { MeasurementTiming, PostMealTime } from '@/shared/types/measurement';
import { BLOOD_SUGAR_RANGES } from '../consts/ranges';
import type { CommonStatusKey } from '@/shared/types/status';

export type BloodSugarStatusKey = Exclude<CommonStatusKey, 'HIGH_STAGE_1' | 'HIGH_STAGE_2'>;

export const BLOOD_SUGAR_STATUS_LABELS: Record<BloodSugarStatusKey, string> = {
  LOW: '저혈당',
  NORMAL: '정상',
  BORDERLINE: '경계',
  HIGH_RISK: '고위험',
  RECHECK: '재확인',
};

/**
 * 혈당 상태 라벨 반환
 * @param status 혈당 상태 키
 * @returns 혈당 상태 라벨
 */
export const getBloodSugarStatusLabel = (status: BloodSugarStatusKey): string => BLOOD_SUGAR_STATUS_LABELS[status];

/**
 * 혈당 수치에 따른 상태 판정
 */
export const getBloodSugarStatus = (
  value: number,
  measurementTiming: MeasurementTiming,
  postMealTime: PostMealTime
): BloodSugarStatusKey => {
  const { BEFORE_MEAL_TIME, AFTER_MEAL_TIME } = BLOOD_SUGAR_RANGES;
  const isBeforeMeasurementTiming = measurementTiming.includes('BEFORE');
  const isFasting = measurementTiming === 'FASTING';

  if (isBeforeMeasurementTiming) {
    // 식전
    if (value <= BEFORE_MEAL_TIME.PRE_MEAL.LOW.MAX) return 'LOW';
    if (BEFORE_MEAL_TIME.PRE_MEAL.NORMAL.MIN <= value && value <= BEFORE_MEAL_TIME.PRE_MEAL.NORMAL.MAX) return 'NORMAL';
    if (BEFORE_MEAL_TIME.PRE_MEAL.BORDERLINE.MIN <= value && value <= BEFORE_MEAL_TIME.PRE_MEAL.BORDERLINE.MAX)
      return 'BORDERLINE';
    if (BEFORE_MEAL_TIME.PRE_MEAL.HIGH_RISK.MIN <= value && value <= BEFORE_MEAL_TIME.PRE_MEAL.HIGH_RISK.MAX)
      return 'HIGH_RISK';
  } else if (isFasting) {
    // 공복
    if (value <= BEFORE_MEAL_TIME.FASTING.LOW.MAX) return 'LOW';
    if (BEFORE_MEAL_TIME.FASTING.NORMAL.MIN <= value && value <= BEFORE_MEAL_TIME.FASTING.NORMAL.MAX) return 'NORMAL';
    if (BEFORE_MEAL_TIME.FASTING.BORDERLINE.MIN <= value && value <= BEFORE_MEAL_TIME.FASTING.BORDERLINE.MAX)
      return 'BORDERLINE';
    if (BEFORE_MEAL_TIME.FASTING.HIGH_RISK.MIN <= value && value <= BEFORE_MEAL_TIME.FASTING.HIGH_RISK.MAX)
      return 'HIGH_RISK';
  } else {
    // 식후
    if (value <= AFTER_MEAL_TIME[postMealTime].LOW.MAX) return 'LOW';
    if (AFTER_MEAL_TIME[postMealTime].NORMAL.MIN <= value && value <= AFTER_MEAL_TIME[postMealTime].NORMAL.MAX)
      return 'NORMAL';
    if (AFTER_MEAL_TIME[postMealTime].BORDERLINE.MIN <= value && value <= AFTER_MEAL_TIME[postMealTime].BORDERLINE.MAX)
      return 'BORDERLINE';
    if (AFTER_MEAL_TIME[postMealTime].HIGH_RISK.MIN <= value && value <= AFTER_MEAL_TIME[postMealTime].HIGH_RISK.MAX)
      return 'HIGH_RISK';
  }

  return 'RECHECK';
};

/**
 * 혈당 상태에 따른 권장 사항 반환
 */
export const getBloodSugarRecommendation = (status: BloodSugarStatusKey): string => {
  switch (status) {
    case 'NORMAL':
      return '현재 수치를 잘 유지하고 있습니다.';
    case 'BORDERLINE':
      return '식사 조절과 가벼운 운동을 고려해 보세요.';
    case 'HIGH_RISK':
      return '의사와 상담이 필요할 수 있습니다.';
    case 'LOW':
      return '저혈당 증상이 있으면 즉시 당분 섭취 후 필요 시 진료를 받으세요.';
    case 'RECHECK':
    default:
      return '측정을 재확인해 주세요.';
  }
};
