import React from 'react';
import { MeasurementTiming } from '@/shared/types/measurement';
import { SelectField, SelectOption } from '../fields/SelectField';

const MEASUREMENT_TIME_OPTIONS: SelectOption<MeasurementTiming>[] = [
  { value: MeasurementTiming.FASTING, label: '공복' },
  { value: MeasurementTiming.BEFORE_BREAKFAST, label: '아침 식사 전' },
  { value: MeasurementTiming.AFTER_BREAKFAST, label: '아침 식사 후' },
  { value: MeasurementTiming.BEFORE_LUNCH, label: '점심 식사 전' },
  { value: MeasurementTiming.AFTER_LUNCH, label: '점심 식사 후' },
  { value: MeasurementTiming.BEFORE_DINNER, label: '저녁 식사 전' },
  { value: MeasurementTiming.AFTER_DINNER, label: '저녁 식사 후' },
];

interface MeasurementTimeFieldProps {
  id?: string;
  label?: string;
  value?: MeasurementTiming;
  onChange?: (value: MeasurementTiming) => void;
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
    <SelectField<MeasurementTiming>
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
