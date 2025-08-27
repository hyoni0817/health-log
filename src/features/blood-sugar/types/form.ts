import { MeasurementTiming, PostMealTime } from '@/shared/types/measurement';
import { BloodSugarPayload } from '@/entities/blood-sugar/model/types/bloodSugar';

/**
 * 폼에서 사용하는 데이터 타입 (문자열 기반)
 */
export interface BloodSugarFormData {
  value: string; // 문자열로 받아서 나중에 number로 변환
  date: string; // HTML input[type="date"]의 값
  measurement_timing: MeasurementTiming;
  post_meal_time: PostMealTime;
  note: string;
}

/**
 * 폼 유효성 검사 에러 메시지
 */
export interface BloodSugarFormErrors {
  value?: string;
  date?: string;
  measurement_timing?: string;
  post_meal_time?: string;
  note?: string;
}

/**
 * 폼 커스텀 훅 반환 타입
 */
export interface UseBloodSugarFormReturn {
  values: BloodSugarFormData;
  errors: BloodSugarFormErrors;
  touched: Record<keyof BloodSugarFormData, boolean>;
  handleChange: {
    value: (value: string) => void;
    date: (value: string) => void;
    measurement_timing: (value: MeasurementTiming) => void;
    post_meal_time: (value: PostMealTime) => void;
    note: (value: string) => void;
  };
  handleSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  isDirty: boolean;

  // 폼 데이터를 API 페이로드로 변환
  toPayload: () => Omit<BloodSugarPayload, 'user_id'>;
}
