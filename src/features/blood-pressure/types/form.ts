import { MeasurementTiming, PostMealTime } from '@/shared/types/measurement';
import { BloodPressurePayload } from '@/entities/blood-pressure/model/type/bloodPressure';

/**
 * 폼에서 사용하는 데이터 타입 (문자열 기반)
 */
export interface BloodPressureFormData {
  systolic_bp: string; // 문자열로 받아서 나중에 number로 변환
  diastolic_bp: string; // 문자열로 받아서 나중에 number로 변환
  heart_rate: string; // 문자열로 받아서 나중에 number로 변환
  date: string; // HTML input[type="date"]의 값
  measurement_timing: MeasurementTiming;
  post_meal_time: PostMealTime;
  note: string;
}

/**
 * 폼 유효성 검사 에러 메시지
 */
export interface BloodPressureFormErrors {
  systolic_bp?: string;
  diastolic_bp?: string;
  heart_rate?: string;
  date?: string;
  measurement_timing?: string;
  post_meal_time?: string;
  note?: string;
}

/**
 * 폼 커스텀 훅 반환 타입
 */
export interface UseBloodPressureFormReturn {
  values: BloodPressureFormData;
  errors: BloodPressureFormErrors;
  touched: Record<keyof BloodPressureFormData, boolean>;
  handleChange: {
    systolic_bp: (value: string) => void;
    diastolic_bp: (value: string) => void;
    heart_rate: (value: string) => void;
    date: (value: string) => void;
    measurement_timing: (value: MeasurementTiming) => void;
    post_meal_time: (value: PostMealTime) => void;
    note: (value: string) => void;
  };
  handleSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  isDirty: boolean;

  // 폼 데이터를 API 페이로드로 변환
  toPayload: () => Omit<BloodPressurePayload, 'user_id'>;
}
