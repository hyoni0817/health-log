import { useState, useCallback } from 'react';
import { BloodPressureFormData, BloodPressureFormErrors, UseBloodPressureFormReturn } from '../types/form';
import { validateBloodPressureForm, isRequiredField } from '../lib/validation';
import { isDirtyField, isEmptyObject } from '@/shared/utils/form';
import { MeasurementTiming, PostMealTime } from '@/shared/types/measurement';
import { useCreateBloodPressure } from '@/features/blood-pressure/hooks/useCreateBloodPressure';
import { getBloodPressureStatus } from '../lib';

const initialFormData: BloodPressureFormData = {
  systolic_bp: '',
  diastolic_bp: '',
  heart_rate: '',
  date: '',
  measurement_timing: MeasurementTiming.FASTING,
  post_meal_time: PostMealTime.THIRTY_MINUTES,
  note: '',
};

/**
 * 혈압 데이터 추가 폼 훅
 * @param onSubmit 폼 제출 시 호출될 함수
 * @returns 폼 상태와 핸들러 반환
 */
export const useBloodPressureForm = (
  onSubmit?: (data: BloodPressureFormData) => void | Promise<void>
): UseBloodPressureFormReturn => {
  const { mutate } = useCreateBloodPressure();
  const [values, setValues] = useState<BloodPressureFormData>(initialFormData);
  const [errors, setErrors] = useState<BloodPressureFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof BloodPressureFormData, boolean>>({
    systolic_bp: false,
    diastolic_bp: false,
    heart_rate: false,
    date: false,
    measurement_timing: false,
    post_meal_time: false,
    note: false,
  });

  // 특정 필드의 유효성 검사
  const validateField = useCallback(
    (fieldName: keyof BloodPressureFormData, newValue: string | MeasurementTiming) => {
      // 필수 필드가 아니면 validation 하지 않음
      if (!isRequiredField(fieldName)) return;

      // 새로운 값으로 validation 체크
      const validationErrors = validateBloodPressureForm({
        ...values,
        [fieldName]: newValue,
      });

      setErrors((prev) => ({
        ...prev,
        [fieldName]: validationErrors[fieldName],
      }));
    },
    [values]
  );

  const handleChange = {
    systolic_bp: useCallback(
      (value: string) => {
        validateField('systolic_bp', value);
        setValues((prev) => ({ ...prev, systolic_bp: value }));
        setTouched((prev) => ({ ...prev, systolic_bp: true }));
      },
      [validateField]
    ),

    diastolic_bp: useCallback(
      (value: string) => {
        validateField('diastolic_bp', value);
        setValues((prev) => ({ ...prev, diastolic_bp: value }));
        setTouched((prev) => ({ ...prev, diastolic_bp: true }));
      },
      [validateField]
    ),

    heart_rate: useCallback(
      (value: string) => {
        validateField('heart_rate', value);
        setValues((prev) => ({ ...prev, heart_rate: value }));
        setTouched((prev) => ({ ...prev, heart_rate: true }));
      },
      [validateField]
    ),

    date: useCallback(
      (value: string) => {
        validateField('date', value);
        setValues((prev) => ({ ...prev, date: value }));
        setTouched((prev) => ({ ...prev, date: true }));
      },
      [validateField]
    ),

    measurement_timing: useCallback(
      (value: MeasurementTiming) => {
        validateField('measurement_timing', value);
        setValues((prev) => ({ ...prev, measurement_timing: value }));
        setTouched((prev) => ({ ...prev, measurement_timing: true }));
      },
      [validateField]
    ),

    post_meal_time: useCallback(
      (value: PostMealTime) => {
        validateField('post_meal_time', value);
        setValues((prev) => ({ ...prev, post_meal_time: value }));
        setTouched((prev) => ({ ...prev, post_meal_time: true }));
      },
      [validateField]
    ),

    note: useCallback((value: string) => {
      setValues((prev) => ({ ...prev, note: value }));
      setTouched((prev) => ({ ...prev, note: true }));
    }, []),
  };

  /**
   * 혈당 데이터 추가 폼 제출 핸들러
   * @param e 폼 제출 이벤트
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // 제출 시에는 모든 필수 필드만 검사
      const validationErrors = validateBloodPressureForm(values);
      setErrors(validationErrors);

      // 모든 필드를 touched로 표시
      setTouched({
        systolic_bp: true,
        diastolic_bp: true,
        heart_rate: true,
        date: true,
        measurement_timing: true,
        post_meal_time: true,
        note: true,
      });

      if (isEmptyObject(validationErrors) && onSubmit) {
        const postMealTime = values.measurement_timing.includes('AFTER')
          ? (values.post_meal_time as PostMealTime)
          : null;

        mutate({
          systolic_bp: Number(values.systolic_bp),
          diastolic_bp: Number(values.diastolic_bp),
          heart_rate: Number(values.heart_rate),
          date: values.date,
          measurement_timing: values.measurement_timing as MeasurementTiming,
          post_meal_time: postMealTime,
          note: values.note,
          user_id: 1,
          status: getBloodPressureStatus(Number(values.systolic_bp), Number(values.diastolic_bp)),
        });

        await onSubmit(values);
      }
    },
    [values, onSubmit]
  );

  // 데이터가 변경되었는지 확인
  const isDirty = Object.keys(initialFormData).some((key) =>
    isDirtyField(initialFormData[key as keyof BloodPressureFormData], values[key as keyof BloodPressureFormData])
  );

  // 에러 메시지를 보여줄지 결정하는 함수
  const getVisibleErrors = (): BloodPressureFormErrors => {
    const visibleErrors: BloodPressureFormErrors = {};
    Object.keys(errors).forEach((key) => {
      const fieldKey = key as keyof BloodPressureFormData;
      if (touched[fieldKey] && errors[fieldKey]) {
        visibleErrors[fieldKey] = errors[fieldKey];
      }
    });
    return visibleErrors;
  };

  return {
    values,
    errors: getVisibleErrors(), // touched된 필드의 에러만 반환
    touched,
    handleChange,
    handleSubmit,
    isValid: isEmptyObject(errors),
    isDirty,
    toPayload: () => ({
      systolic_bp: Number(values.systolic_bp),
      diastolic_bp: Number(values.diastolic_bp),
      heart_rate: Number(values.heart_rate),
      date: values.date,
      measurement_timing: values.measurement_timing,
      note: values.note,
      status: getBloodPressureStatus(Number(values.systolic_bp), Number(values.diastolic_bp)),
    }),
  };
};
