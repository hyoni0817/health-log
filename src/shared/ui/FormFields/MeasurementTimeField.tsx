import React from 'react';
import { MealTiming } from '@/entities/blood-sugar/model';
import { SelectField, SelectOption } from './SelectField';

const MEASUREMENT_TIME_OPTIONS: SelectOption<MealTiming>[] = [
  { value: MealTiming.FASTING, label: '공복' },
  { value: MealTiming.BEFORE_BREAKFAST, label: '아침 식사 전' },
  { value: MealTiming.AFTER_BREAKFAST, label: '아침 식사 후' },
  { value: MealTiming.BEFORE_LUNCH, label: '점심 식사 전' },
  { value: MealTiming.AFTER_LUNCH, label: '점심 식사 후' },
  { value: MealTiming.BEFORE_DINNER, label: '저녁 식사 전' },
  { value: MealTiming.AFTER_DINNER, label: '저녁 식사 후' },
];

interface MeasurementTimeFieldProps {
  id?: string;
  label?: string;
  value?: MealTiming;
  onChange?: (value: MealTiming) => void;
  error?: string;
  className?: string;
}

export const MeasurementTimeField = ({
  id = 'measurementTime',
  label = '측정 시간',
  value,
  onChange,
  error,
  className,
}: MeasurementTimeFieldProps) => {
  return (
    <SelectField<MealTiming>
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      className={className}
      options={MEASUREMENT_TIME_OPTIONS}
    />
  );
};
