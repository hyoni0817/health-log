'use client';

import React from 'react';
import { ModalComponentProps } from '@/shared/ui';
import { X } from 'lucide-react';

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
    </div>
  );
};

export default AddBloodPressureDataModal;
