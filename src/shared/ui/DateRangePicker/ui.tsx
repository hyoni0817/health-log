'use client';

import { Calendar } from 'lucide-react';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (date: [Date | null, Date | null]) => void;
}

const CustomDateRangeInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; className?: string }
>(({ value, onClick }, ref) => (
  <button
    className="shadow-[inset_0_0_0_1px_var(--divider)] bg-(--color-gray-850) text-(--color-white) rounded-lg p-2 pl-9 pr-4"
    type="button"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));

CustomDateRangeInput.displayName = 'CustomDateRangeInput';

export const DateRangePicker = ({ startDate, endDate, onChange }: DateRangePickerProps) => {
  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      selectsRange
      dateFormat="yyyy.MM.dd"
      showIcon
      icon={<Calendar className="text-(--color-gray-500)" />}
      customInput={<CustomDateRangeInput />}
    />
  );
};
