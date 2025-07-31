import React from 'react';
import { FormFieldStyles } from './styles';

interface DateFieldProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export const DateField = ({ id = 'date', label = '날짜', value, onChange, error, className }: DateFieldProps) => {
  return (
    <div className={`${FormFieldStyles.formField} ${className}`}>
      <label htmlFor={id} className={FormFieldStyles.label}>
        {label}
      </label>

      <div className={FormFieldStyles.inputWrapper}>
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={FormFieldStyles.input}
        />
      </div>

      {error && <p className="text-sm text-(--color-red-500) mt-1">{error}</p>}
    </div>
  );
};
