import { BloodSugarFormData, BloodSugarFormErrors } from '../types/form';
import { validateField } from '@/shared/utils/form';
import { BLOOD_SUGAR_RANGES } from '../consts/ranges';

// 필수 입력 필드 정의
export const REQUIRED_FIELDS = ['value', 'date', 'measurement_timing'] as const;
export type RequiredField = (typeof REQUIRED_FIELDS)[number];

/**
 * 특정 필드가 필수 입력 필드인지 확인
 * @param field 필드 이름
 * @returns 필수 입력 필드인지 여부
 */
export const isRequiredField = (field: keyof BloodSugarFormData): boolean => {
  return REQUIRED_FIELDS.includes(field as RequiredField);
};

/**
 * 혈당 데이터를 추가하는 폼의 필드 검증
 * @param values 혈당 폼 데이터 객체
 * @returns 에러 메시지 객체 반환
 */
export const validateBloodSugarForm = (values: BloodSugarFormData): BloodSugarFormErrors => {
  const errors: BloodSugarFormErrors = {};

  // 혈당 수치 검증 (필수)
  if (isRequiredField('value')) {
    const bloodSugarError = validateField.numeric(values.value, {
      fieldName: '혈당 수치',
      min: BLOOD_SUGAR_RANGES.VALIDATION.MIN_VALUE,
      max: BLOOD_SUGAR_RANGES.VALIDATION.MAX_VALUE,
      required: true,
    });
    if (bloodSugarError) errors.value = bloodSugarError;
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
