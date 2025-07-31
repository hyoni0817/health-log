import React from 'react';
import { FormFieldStyles } from './styles';

interface MemoFieldProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export const NoteField = ({
  id = 'note',
  label = '메모 (선택사항)',
  value,
  onChange,
  placeholder = '운동, 약물 복용, 컨디션 등 추가 정보를 입력하세요.',
  className,
}: MemoFieldProps) => {
  return (
    <div className={`${FormFieldStyles.formField} ${className}`}>
      <label htmlFor={id} className={FormFieldStyles.label}>
        {label}
      </label>

      <div className={FormFieldStyles.inputWrapper}>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`${FormFieldStyles.input} resize-none w-full h-[100px]`}
        />
      </div>
    </div>
  );
};
