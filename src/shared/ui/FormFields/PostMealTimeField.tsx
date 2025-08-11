import React from 'react';
import { PostMealTime } from '@/entities/blood-sugar/model';
import { SelectField, SelectOption } from './SelectField';

const POST_MEAL_TIME_OPTIONS: SelectOption<PostMealTime>[] = [
  { value: PostMealTime.THIRTY_MINUTES, label: '30분 후' },
  { value: PostMealTime.ONE_HOUR, label: '1시간 후' },
  { value: PostMealTime.TWO_HOURS, label: '2시간 후' },
];

interface PostMealTimeFieldProps {
  id?: string;
  label?: string;
  value?: PostMealTime;
  onChange?: (value: PostMealTime) => void;
  error?: string;
  className?: string;
}

export const PostMealTimeField = ({
  id = 'postMealTime',
  label = '식사 후 시간',
  value,
  onChange,
  error,
  className,
}: PostMealTimeFieldProps) => {
  return (
    <SelectField<PostMealTime>
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      className={className}
      options={POST_MEAL_TIME_OPTIONS}
    />
  );
};
