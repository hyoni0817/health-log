// form.ts는 수정 여부 확인, 유효성 검증 등 폼 관련 유틸리티 함수들을 모아둔 파일

import { MeasurementTiming } from '@/shared/types/measurement';

/**
 * 객체의 모든 값이 비어있는지 확인
 */
export const isEmptyObject = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0;
};

/**
 * 폼 필드가 수정되었는지 확인
 */
export const isDirtyField = <T>(initialValue: T, currentValue: T): boolean => {
  if (typeof initialValue !== typeof currentValue) return true;
  if (initialValue === null || currentValue === null) return initialValue !== currentValue;
  if (typeof initialValue === 'object') {
    return JSON.stringify(initialValue) !== JSON.stringify(currentValue);
  }
  return initialValue !== currentValue;
};

/**
 * 문자열이 비어있는지 확인
 */
export const isEmptyString = (value: string): boolean => {
  return value.trim().length === 0;
};

/**
 * 날짜 문자열 유효성 검사
 */
export const isValidDateString = (value: string): boolean => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * 숫자 문자열 유효성 검사
 */
export const isValidNumber = (value: string, options?: { min?: number; max?: number }): boolean => {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (options?.min !== undefined && num < options.min) return false;
  if (options?.max !== undefined && num > options.max) return false;
  return true;
};

// 공통 필드 검증 함수들
export const validateField = {
  /**
   * 날짜 필드 검증
   */
  date: (value: string): string | undefined => {
    if (isEmptyString(value)) {
      return '날짜를 선택해주세요.';
    }
    if (!isValidDateString(value)) {
      return '올바른 날짜를 선택해주세요.';
    }
    return undefined;
  },

  /**
   * 측정 시간 필드 검증
   */
  mealTime: (value: MeasurementTiming | undefined): string | undefined => {
    if (!value) {
      return '측정 시간을 선택해주세요.';
    }
    return undefined;
  },

  /**
   * 숫자 필드 검증
   */
  numeric: (
    value: string,
    options: {
      fieldName: string;
      min?: number;
      max?: number;
      required?: boolean;
    }
  ): string | undefined => {
    const { fieldName, min, max, required = true } = options;

    if (required && isEmptyString(value)) {
      return `${fieldName}을(를) 입력해주세요.`;
    }

    if (!isEmptyString(value) && !isValidNumber(value, { min, max })) {
      if (min !== undefined && max !== undefined) {
        return `${fieldName}은(는) ${min}에서 ${max} 사이의 숫자여야 합니다.`;
      }
      if (min !== undefined) {
        return `${fieldName}은(는) ${min} 이상이어야 합니다.`;
      }
      if (max !== undefined) {
        return `${fieldName}은(는) ${max} 이하여야 합니다.`;
      }
      return `${fieldName}은(는) 올바른 숫자여야 합니다.`;
    }

    return undefined;
  },
};
