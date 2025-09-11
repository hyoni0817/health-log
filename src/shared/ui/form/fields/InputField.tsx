import React, { InputHTMLAttributes } from 'react';
import { filterNonNumericInput } from '@/shared/utils';

type FieldType = 'number' | 'text';

// 조건부 타입: fieldType이 'number'면 fieldTypeAttributes에서 지정한 pattern, inputMode, onInput 값이 있기 때문에 pattern, inputMode, onInput 사용을 금지함.
type ConditionalInputProps<T extends FieldType> = T extends 'number'
  ? {
      fieldType: T;
      pattern?: never; // 사용 금지
      inputMode?: never; // 사용 금지
      onInput?: never;
    }
  : {
      fieldType: T;
      pattern?: string;
      inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
      onInput?: InputHTMLAttributes<HTMLInputElement>['onInput'];
    };

type InputFieldProps<T extends FieldType = FieldType> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'pattern' | 'inputMode'
> &
  ConditionalInputProps<T> & {
    error?: string;
  };

const InputField = <T extends FieldType = 'text'>(props: InputFieldProps<T>) => {
  const { id, value, onChange, fieldType = 'text', placeholder, error, ...rest } = props;

  const fieldTypeAttributes: Record<FieldType, InputHTMLAttributes<HTMLInputElement>> = {
    number: {
      pattern: '[0-9]*',
      inputMode: 'numeric',
      onInput: filterNonNumericInput,
    },
    text: {},
  };

  return (
    <>
      <div className={Styles.inputWrapper}>
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={Styles.input}
          {...rest}
          {...(fieldTypeAttributes && fieldTypeAttributes[fieldType])}
        />
      </div>

      {error && <p className="text-sm text-(--color-red-500) mt-1">{error}</p>}
    </>
  );
};

export default InputField;

const Styles = {
  inputWrapper: 'border border-(--divider) rounded-md p-2',
  input: 'outline-none text-(--text)',
};
