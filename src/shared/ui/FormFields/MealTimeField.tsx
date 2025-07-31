import React from 'react';
import { FormFieldStyles } from './styles';
import { MealTiming } from '@/entities/blood-sugar/model';

const MEAL_TIME_OPTIONS: { value: MealTiming; label: string }[] = [
  { value: MealTiming.FASTING, label: '공복' },
  { value: MealTiming.BEFORE_BREAKFAST, label: '아침 식사 전' },
  { value: MealTiming.AFTER_BREAKFAST, label: '아침 식사 후' },
  { value: MealTiming.BEFORE_LUNCH, label: '점심 식사 전' },
  { value: MealTiming.AFTER_LUNCH, label: '점심 식사 후' },
  { value: MealTiming.BEFORE_DINNER, label: '저녁 식사 전' },
  { value: MealTiming.AFTER_DINNER, label: '저녁 식사 후' },
];

interface MealTimeFieldProps {
  id?: string;
  label?: string;
  value?: MealTiming;
  onChange?: (value: MealTiming) => void;
  error?: string;
  className?: string;
}

export const MealTimeField = ({
  id = 'mealTime',
  label = '식사 시간',
  value,
  onChange,
  error,
  className,
}: MealTimeFieldProps) => {
  return (
    <div className={`${FormFieldStyles.formField} ${className}`}>
      <label htmlFor={id} className={FormFieldStyles.label}>
        {label}
      </label>

      <div className={FormFieldStyles.inputWrapper}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value as MealTiming)}
          className={`${FormFieldStyles.input} w-full`}
        >
          {MEAL_TIME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-(--color-red-500) mt-1">{error}</p>}
    </div>
  );
};
