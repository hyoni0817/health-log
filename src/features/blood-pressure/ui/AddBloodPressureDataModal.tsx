'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { ModalComponentProps } from '@/shared/ui/Modal';
import { X } from 'lucide-react';
import { DateField, MeasurementTimeField, NoteField } from '@/shared/ui/form';
import { useBloodPressureForm } from '@/features/blood-pressure/hooks/useBloodPressureForm';
import { toast } from 'react-toastify';
import { HealthMessage } from '@/shared/ui/HealthMessage';
import {
  getBloodPressureRecommendation,
  getBloodPressureStatus,
  getBloodPressureStatusLabel,
} from '@/features/blood-pressure/lib';
import InputField from '@/shared/ui/form/fields/InputField';

const AddBloodPressureDataModal = ({ close }: ModalComponentProps) => {
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit } = useBloodPressureForm(() => {
    router.refresh();
    toast.success('혈압 기록이 저장되었습니다.');
    close();
  });

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

      <form onSubmit={handleSubmit} noValidate>
        <div className="w-full flex gap-2">
          <div className={Styles.formField}>
            <label htmlFor="systolicBloodPressure" className={Styles.label}>
              수축기 혈압 (mmHg)
            </label>

            <InputField
              id="systolicBloodPressure"
              value={values.systolic_bp}
              onChange={(e) => handleChange.systolic_bp(e.target.value)}
              fieldType="number"
              placeholder="상위 수치를 입력하세요."
              error={errors.systolic_bp}
            />
          </div>

          <div className={Styles.formField}>
            <label htmlFor="diastolicBloodPressure" className={Styles.label}>
              이완기 혈압 (mmHg)
            </label>

            <InputField
              id="diastolicBloodPressure"
              value={values.diastolic_bp}
              onChange={(e) => handleChange.diastolic_bp(e.target.value)}
              fieldType="number"
              placeholder="하위 수치를 입력하세요."
              error={errors.diastolic_bp}
            />
          </div>
        </div>

        <div className={Styles.formField}>
          <label htmlFor="bloodPressure" className={Styles.label}>
            맥박 (bpm)
          </label>

          <InputField
            id="pulse"
            value={values.heart_rate}
            onChange={(e) => handleChange.heart_rate(e.target.value)}
            fieldType="text"
            pattern="[0-9]*"
            placeholder="맥박수를 입력하세요."
            error={errors.heart_rate}
          />
        </div>

        <DateField value={values.date} onChange={handleChange.date} error={errors.date} />

        <MeasurementTimeField
          value={values.measurement_timing}
          onChange={handleChange.measurement_timing}
          error={errors.measurement_timing}
        />

        {values.systolic_bp && values.diastolic_bp && (
          <HealthMessage
            value={`${values.systolic_bp}/${values.diastolic_bp}`}
            status={getBloodPressureStatus(Number(values.systolic_bp), Number(values.diastolic_bp))}
            label={getBloodPressureStatusLabel(
              getBloodPressureStatus(Number(values.systolic_bp), Number(values.diastolic_bp))
            )}
            unit="mg/dL"
            recommendation={getBloodPressureRecommendation(
              getBloodPressureStatus(Number(values.systolic_bp), Number(values.diastolic_bp))
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

export default AddBloodPressureDataModal;

const Styles = {
  label: 'text-sm text-(--text) mb-1',
  required: 'text-(--color-red-500)',
  formField: 'flex flex-1 flex-col gap-1 mb-5 ',
};
