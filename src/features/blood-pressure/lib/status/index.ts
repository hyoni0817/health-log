import { BLOOD_PRESSURE_RANGES } from '../../consts/ranges';
import type { CommonStatusKey as BloodPressureStatusKey } from '@/shared/types/status';

export const BLOOD_PRESSURE_STATUS_LABELS: Record<BloodPressureStatusKey, string> = {
  LOW: '저혈압',
  NORMAL: '정상',
  BORDERLINE: '고혈압 전단계',
  HIGH_STAGE_1: '고혈압 1기',
  HIGH_STAGE_2: '고혈압 2기',
  HIGH_RISK: '고혈압 위기',
  RECHECK: '재확인',
};

/**
 * 혈압 상태 라벨 반환
 * @param status 혈압 상태 키
 * @returns 혈압 상태 라벨
 */
export const getBloodPressureStatusLabel = (status: BloodPressureStatusKey): string =>
  BLOOD_PRESSURE_STATUS_LABELS[status];

/**
 * 개별 혈압 수치(수축기 또는 이완기)에 따른 상태 판정
 */
const getSystolicStatus = (systolic: number): BloodPressureStatusKey => {
  const { DEFAULT } = BLOOD_PRESSURE_RANGES;

  if (systolic <= DEFAULT.LOW.SYSTOLIC.MAX) return 'LOW';
  if (systolic <= DEFAULT.NORMAL.SYSTOLIC.MAX) return 'NORMAL';
  if (systolic <= DEFAULT.BORDERLINE.SYSTOLIC.MAX) return 'BORDERLINE';
  if (systolic <= DEFAULT.HIGH_STAGE_1.SYSTOLIC.MAX) return 'HIGH_STAGE_1';
  if (systolic <= DEFAULT.HIGH_STAGE_2.SYSTOLIC.MAX) return 'HIGH_STAGE_2';
  return 'HIGH_RISK';
};

const getDiastolicStatus = (diastolic: number): BloodPressureStatusKey => {
  const { DEFAULT } = BLOOD_PRESSURE_RANGES;

  if (diastolic <= DEFAULT.LOW.DIASTOLIC.MAX) return 'LOW';
  if (diastolic <= DEFAULT.NORMAL.DIASTOLIC.MAX) return 'NORMAL';
  if (diastolic <= DEFAULT.BORDERLINE.DIASTOLIC.MAX) return 'BORDERLINE';
  if (diastolic <= DEFAULT.HIGH_STAGE_1.DIASTOLIC.MAX) return 'HIGH_STAGE_1';
  if (diastolic <= DEFAULT.HIGH_STAGE_2.DIASTOLIC.MAX) return 'HIGH_STAGE_2';
  return 'HIGH_RISK';
};

/**
 * 상태 우선순위 (의학적 위험도 기준)
 */
const STATUS_PRIORITY: Record<BloodPressureStatusKey, number> = {
  LOW: 1,
  NORMAL: 2,
  BORDERLINE: 3,
  HIGH_STAGE_1: 4,
  HIGH_STAGE_2: 5,
  HIGH_RISK: 6,
  RECHECK: 0, // 사용되지 않음
};

/**
 * 의학적 근거 기반 혈압값 검증
 */
const isPhysiologicallyValid = (systolic: number, diastolic: number): boolean => {
  // 기본 범위 검증
  if (systolic <= 0 || diastolic <= 0 || systolic > 1000 || diastolic > 1000) {
    return false;
  }

  // 맥압(pulse pressure) 검증
  const pulsePresssure = systolic - diastolic;

  // 수축기는 이완기보다 최소 20mmHg 이상 높아야 함 (의학적 최소 기준)
  if (pulsePresssure < 20) {
    return false;
  }

  // 맥압이 너무 큰 경우도 비현실적 (정상 맥압: 30-60mmHg, 70mmHg 초과시 비정상)
  if (pulsePresssure > 80) {
    return false;
  }

  // 극단적인 조합 검증 (의학적으로 비현실적)
  const systolicStatus = getSystolicStatus(systolic);
  const diastolicStatus = getDiastolicStatus(diastolic);

  // 저혈압 수축기 + 고혈압 이완기 조합은 비현실적
  if (
    systolicStatus === 'LOW' &&
    (diastolicStatus === 'HIGH_STAGE_1' || diastolicStatus === 'HIGH_STAGE_2' || diastolicStatus === 'HIGH_RISK')
  ) {
    return false;
  }

  // 정상 수축기 + 극도로 낮은 이완기 조합 검증 (Isolated Diastolic Hypotension)
  // 의학 문헌: 수축기 ≥100, 이완기 <60 조합이 심장질환 위험 증가
  if (systolic >= 100 && diastolic < 60) {
    return false;
  }

  return true;
};

/**
 * 혈압 수치에 따른 상태 판정
 * 의학적 기준에 따라 수축기와 이완기 중 더 높은 위험도의 상태를 반환
 */
export const getBloodPressureStatus = (systolic_bp: number, diastolic_bp: number): BloodPressureStatusKey => {
  // 생리학적 타당성 검증
  if (!isPhysiologicallyValid(systolic_bp, diastolic_bp)) {
    return 'RECHECK';
  }

  const systolicStatus = getSystolicStatus(systolic_bp);
  const diastolicStatus = getDiastolicStatus(diastolic_bp);

  // 더 높은 위험도의 상태를 반환 (의학적 기준)
  return STATUS_PRIORITY[systolicStatus] >= STATUS_PRIORITY[diastolicStatus] ? systolicStatus : diastolicStatus;
};

/**
 * 혈압 상태에 따른 권장 사항 반환
 */
export const getBloodPressureRecommendation = (status: BloodPressureStatusKey): string => {
  switch (status) {
    case 'NORMAL':
      return '혈압이 정상 범위입니다. 현재 수치를 유지하도록 규칙적인 생활습관을 이어가세요.';
    case 'BORDERLINE':
      return '혈압이 다소 높은 편입니다. 식습관 조절과 규칙적인 운동을 통해 관리하세요.';
    case 'HIGH_STAGE_1':
      return '혈압이 높은 상태입니다. 정기적인 측정과 생활습관 관리가 필요하며, 필요 시 의료 전문가와 상담하세요.';
    case 'HIGH_STAGE_2':
      return '혈압이 높은 상태입니다. 지속적인 관리와 의료 전문가 상담을 권장합니다.';
    case 'HIGH_RISK':
      return '혈압이 매우 높은 상태입니다. 즉시 의료기관을 방문하여 확인과 조치를 받으세요.';
    case 'LOW':
      return '혈압이 낮은 편입니다. 어지럼증이나 두통, 피로감이 느껴지면 휴식을 취하고, 필요 시 의료기관에 문의하세요.';
    case 'RECHECK':
    default:
      return '측정을 다시 확인해 주세요.';
  }
};
