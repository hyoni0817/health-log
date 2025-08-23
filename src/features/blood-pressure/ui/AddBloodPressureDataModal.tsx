'use client';

import React from 'react';
import { ModalComponentProps } from '@/shared/ui';
import { X } from 'lucide-react';
import { blockNonNumericKeyDown } from '@/shared/utils';
import { DateField } from '@/shared/ui/FormFields';

const AddBloodPressureDataModal = ({ close }: ModalComponentProps) => {
  return (
    <div className="w-[516px] h-fit bg-(--background) p-5 rounded-lg border border-(--divider)">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-(--text)">혈압 기록하기</h3>
          <p className="text-(--text-subtitle)">혈압 측정값과 관련 정보를 입력하세요.</p>
        </div>

        <button type="button" onClick={close} className="text-(--text-subtitle)">
          <X />
        </button>
      </div>

      <form>
        <div className="w-full flex gap-2">
          <div className={Styles.formField}>
            <label htmlFor="systolicBloodPressure" className={Styles.label}>
              수축기 혈압 (mmHg)
            </label>

            <div className={Styles.inputWrapper}>
              <input
                type="text"
                id="systolicBloodPressure"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="상위 수치를 입력하세요."
                onKeyDown={blockNonNumericKeyDown}
                className={Styles.input}
              />
            </div>
          </div>

          <div className={Styles.formField}>
            <label htmlFor="diastolicBloodPressure" className={Styles.label}>
              이완기 혈압 (mmHg)
            </label>

            <div className={Styles.inputWrapper}>
              <input
                type="text"
                id="diastolicBloodPressure"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="하위 수치를 입력하세요."
                onKeyDown={blockNonNumericKeyDown}
                className={Styles.input}
              />
            </div>
          </div>
        </div>

        <div className={Styles.formField}>
          <label htmlFor="bloodPressure" className={Styles.label}>
            맥박 (bpm) - 선택사항
          </label>

          <div className={Styles.inputWrapper}>
            <input
              type="text"
              id="pulse"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="맥박수를 입력하세요."
              onKeyDown={blockNonNumericKeyDown}
              className={Styles.input}
            />
          </div>
        </div>

        <DateField />
      </form>
    </div>
  );
};

export default AddBloodPressureDataModal;

const Styles = {
  label: 'text-sm text-(--text) mb-1',
  formField: 'flex flex-1 flex-col gap-1 mb-5 ',
  inputWrapper: 'border border-(--divider) rounded-md p-2',
  input: 'outline-none text-(--text)',
};
