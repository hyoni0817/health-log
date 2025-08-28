import { BloodPressureFormData, BloodPressureFormErrors } from '../types/form';
import { validateField } from '@/shared/utils/form';
import { BLOOD_SUGAR_RANGES } from '@/features/blood-sugar/consts/ranges';

// 필수 입력 필드 정의
export const REQUIRED_FIELDS = ['value', 'date', 'measurement_timing'] as const;
export type RequiredField = (typeof REQUIRED_FIELDS)[number];

/**
 * 특정 필드가 필수 입력 필드인지 확인
 * @param field 필드 이름
 * @returns 필수 입력 필드인지 여부
 */
export const isRequiredField = (field: keyof BloodPressureFormData): boolean => {
  return REQUIRED_FIELDS.includes(field as RequiredField);
};

/**
 * 혈압 데이터를 추가하는 폼의 필드 검증
 * @param values 혈압 폼 데이터 객체
 * @returns 에러 메시지 객체 반환
 */
export const validateBloodPressureForm = (values: BloodPressureFormData): BloodPressureFormErrors => {
  const errors: BloodPressureFormErrors = {};

  // 수축기 혈압 검증 (필수)
  if (isRequiredField('systolic_bp')) {
    const bloodSugarError = validateField.numeric(values.systolic_bp, {
      fieldName: '수축기 혈압',
      min: BLOOD_SUGAR_RANGES.VALIDATION.MIN_VALUE,
      max: BLOOD_SUGAR_RANGES.VALIDATION.MAX_VALUE,
      required: true,
    });
    if (bloodSugarError) errors.systolic_bp = bloodSugarError;
  }

  // 이완기 혈압 검증 (필수)

  if (isRequiredField('diastolic_bp')) {
    const bloodSugarError = validateField.numeric(values.diastolic_bp, {
      fieldName: '이완기 혈압',
      min: BLOOD_SUGAR_RANGES.VALIDATION.MIN_VALUE,
      max: BLOOD_SUGAR_RANGES.VALIDATION.MAX_VALUE,
      required: true,
    });
    if (bloodSugarError) errors.diastolic_bp = bloodSugarError;
  }

  // 맥박 검증 (필수)

  if (isRequiredField('heart_rate')) {
    const bloodSugarError = validateField.numeric(values.heart_rate, {
      fieldName: '맥박',
      min: BLOOD_SUGAR_RANGES.VALIDATION.MIN_VALUE,
      max: BLOOD_SUGAR_RANGES.VALIDATION.MAX_VALUE,
      required: true,
    });
    if (bloodSugarError) errors.heart_rate = bloodSugarError;
  }

  // 날짜 검증 (필수)
  if (isRequiredField('date')) {
    const dateError = validateField.date(values.date);
    if (dateError) errors.date = dateError;
  }

  // 측정 시간 검증 (필수)
  if (isRequiredField('measurement_timing') && !values.measurement_timing) {
    errors.measurement_timing = '측정 시간을 선택해주세요.';
  }

  // 메모 검증 (선택)
  // note는 필수 필드가 아니므로 검증하지 않음

  return errors;
};
