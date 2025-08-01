import { useState, useCallback } from 'react';
import { BloodSugarFormData, BloodSugarFormErrors, UseBloodSugarFormReturn } from '../types/form';
import { validateBloodSugarForm, isRequiredField } from '../lib/validation';
import { isDirtyField, isEmptyObject } from '@/shared/utils/form';
import { MealTiming } from '@/entities/blood-sugar/model/types/bloodSugar';
import { useCreateBloodSugar } from '@/features/blood-pressure/hooks/useCreateBloodSugar';

const initialFormData: BloodSugarFormData = {
  value: '',
  date: '',
  meal_timing: MealTiming.FASTING,
  note: '',
};

/**
 * 혈당 데이터 추가 폼 훅
 * @param onSubmit 폼 제출 시 호출될 함수
 * @returns 폼 상태와 핸들러 반환
 */
export const useBloodSugarForm = (
  onSubmit?: (data: BloodSugarFormData) => void | Promise<void>
): UseBloodSugarFormReturn => {
  const { mutate } = useCreateBloodSugar();
  const [values, setValues] = useState<BloodSugarFormData>(initialFormData);
  const [errors, setErrors] = useState<BloodSugarFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof BloodSugarFormData, boolean>>({
    value: false,
    date: false,
    meal_timing: false,
    note: false,
  });

  // 특정 필드의 유효성 검사
  const validateField = useCallback(
    (fieldName: keyof BloodSugarFormData, newValue: string | MealTiming) => {
      // 필수 필드가 아니면 validation 하지 않음
      if (!isRequiredField(fieldName)) return;

      // 새로운 값으로 validation 체크
      const validationErrors = validateBloodSugarForm({
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
    value: useCallback(
      (value: string) => {
        validateField('value', value);
        setValues((prev) => ({ ...prev, value }));
        setTouched((prev) => ({ ...prev, value: true }));
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

    meal_timing: useCallback(
      (value: MealTiming) => {
        validateField('meal_timing', value);
        setValues((prev) => ({ ...prev, meal_timing: value }));
        setTouched((prev) => ({ ...prev, meal_timing: true }));
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
      const validationErrors = validateBloodSugarForm(values);
      setErrors(validationErrors);

      // 모든 필드를 touched로 표시
      setTouched({
        value: true,
        date: true,
        meal_timing: true,
        note: true,
      });

      if (isEmptyObject(validationErrors) && onSubmit) {
        mutate({
          value: Number(values.value),
          date: values.date,
          meal_timing: values.meal_timing,
          note: values.note,
          user_id: 1,
        });

        await onSubmit(values);
      }
    },
    [values, onSubmit]
  );

  const isDirty = Object.keys(initialFormData).some((key) =>
    isDirtyField(initialFormData[key as keyof BloodSugarFormData], values[key as keyof BloodSugarFormData])
  );

  // 에러 메시지를 보여줄지 결정하는 함수
  const getVisibleErrors = (): BloodSugarFormErrors => {
    const visibleErrors: BloodSugarFormErrors = {};
    Object.keys(errors).forEach((key) => {
      const fieldKey = key as keyof BloodSugarFormData;
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
      value: Number(values.value),
      date: values.date,
      meal_timing: values.meal_timing,
      note: values.note,
    }),
  };
};
