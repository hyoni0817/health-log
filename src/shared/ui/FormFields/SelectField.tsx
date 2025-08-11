import React from 'react';
import { FormFieldStyles } from './styles';

export interface SelectOption<T> {
  value: T;
  label: string;
}

interface SelectFieldProps<T> {
  id?: string;
  label?: string;
  value?: T;
  onChange?: (value: T) => void;
  error?: string;
  className?: string;
  options: SelectOption<T>[];
}

export const SelectField = <T extends string>({
  id,
  label,
  value,
  onChange,
  error,
  className,
  options,
}: SelectFieldProps<T>) => {
  return (
    <div className={`${FormFieldStyles.formField} ${className}`}>
      <label htmlFor={id} className={FormFieldStyles.label}>
        {label}
      </label>

      <div className={FormFieldStyles.inputWrapper}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value as T)}
          className={`${FormFieldStyles.input} w-full`}
        >
          {options.map((option) => (
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
