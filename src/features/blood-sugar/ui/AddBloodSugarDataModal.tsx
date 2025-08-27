'use client';

import React from 'react';
import { Button, ModalComponentProps } from '@/shared/ui';
import { DateField, MeasurementTimeField, NoteField, PostMealTimeField } from '@/shared/ui/FormFields';
import { X } from 'lucide-react';
import { filterNonNumericInput } from '@/shared/utils';
import { useBloodSugarForm } from '@/features/blood-sugar';
import { HealthMessage } from '@/shared/ui/HealthMessage';
import { getBloodSugarRecommendation, getBloodSugarStatus, getBloodSugarStatusLabel } from '../lib/status';
import { toast } from 'react-toastify';

const AddBloodSugarDataModal = ({ close }: ModalComponentProps) => {
  const { values, errors, handleChange, handleSubmit } = useBloodSugarForm(() => {
    toast.success('혈당 기록이 저장되었습니다.');
    close();
  });

  return (
    <div className="w-[516px] h-fit bg-(--background) p-5 rounded-lg border border-(--divider)">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-(--text)">혈당 기록하기</h3>
          <p className="text-(--text-subtitle)">혈당 측정값과 관련 정보를 입력하세요.</p>
        </div>

        <button type="button" onClick={close} className="text-(--text-subtitle)">
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={Styles.formField}>
          <label htmlFor="bloodSugar" className={Styles.label}>
            혈당 수치 (mg/dL)
          </label>

          <div className={Styles.inputWrapper}>
            <input
              type="text"
              id="bloodSugar"
              value={values.value}
              onChange={(e) => handleChange.value(e.target.value)}
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="측정값을 입력하세요."
              onInput={filterNonNumericInput}
              className={Styles.input}
            />
          </div>
          {errors.value && <p className="text-sm text-(--color-red-500) mt-1">{errors.value}</p>}
        </div>

        <DateField value={values.date} onChange={handleChange.date} error={errors.date} />

        <MeasurementTimeField
          value={values.measurement_timing}
          onChange={handleChange.measurement_timing}
          error={errors.measurement_timing}
        />

        {values.measurement_timing.includes('AFTER') && (
          <PostMealTimeField
            value={values.post_meal_time}
            onChange={handleChange.post_meal_time}
            error={errors.post_meal_time}
          />
        )}

        {values.value && (
          <HealthMessage
            value={values.value}
            status={getBloodSugarStatus(Number(values.value), values.measurement_timing, values.post_meal_time)}
            label={getBloodSugarStatusLabel(
              getBloodSugarStatus(Number(values.value), values.measurement_timing, values.post_meal_time)
            )}
            unit="mg/dL"
            recommendation={getBloodSugarRecommendation(
              getBloodSugarStatus(Number(values.value), values.measurement_timing, values.post_meal_time)
            )}
          />
        )}

        <NoteField value={values.note} onChange={handleChange.note} />

        <div className="w-full flex gap-2 justify-end mt-10">
          <Button type="button" onClick={close} variant="modal-cancel">
            취소
          </Button>
          <Button type="submit" variant="modal-ok">
            저장
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBloodSugarDataModal;

const Styles = {
  label: 'text-sm text-(--text) mb-1',
  formField: 'flex flex-col gap-1 mb-5',
  inputWrapper: 'border border-(--divider) rounded-md p-2',
  input: 'outline-none text-(--text)',
};
