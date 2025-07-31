'use client';

import React from 'react';
import { Button, ModalComponentProps } from '@/shared/ui';
import { X } from 'lucide-react';
import { blockNonNumericKeyDown } from '@/shared/utils';

const AddBloodSugarDataModal = ({ close }: ModalComponentProps) => {
  const handleClose = () => {
    close();
  };

  return (
    <div className="w-[516px] h-fit bg-(--background) p-5 rounded-lg border border-(--divider)">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-(--text)">혈당 기록하기</h3>
          <p className="text-(--text-subtitle)">혈당 측정값과 관련 정보를 입력하세요.</p>
        </div>

        <button type="button" onClick={handleClose} className="text-(--text-subtitle)">
          <X />
        </button>
      </div>

      <form>
        <div className={Styles.formField}>
          <label htmlFor="bloodSugar" className={Styles.label}>
            혈당 수치 (mg/dL)
          </label>

          <div className={Styles.inputWrapper}>
            <input
              type="text"
              id="bloodSugar"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="측정값을 입력하세요."
              onKeyDown={blockNonNumericKeyDown}
              className={Styles.input}
            />
          </div>
        </div>

        <div className={`w-fit ${Styles.formField}`}>
          <label htmlFor="mealTime" className={Styles.label}>
            날짜
          </label>

          <div className={Styles.inputWrapper}>
            {/* date picker 아이콘 스타일은 global.css에서 다크모드 대응 */}
            <input type="date" id="mealTime" className={Styles.input} />
          </div>
        </div>

        <div className={Styles.formField}>
          <label htmlFor="mealTime" className={Styles.label}>
            식사 시간
          </label>

          <div className={Styles.inputWrapper}>
            <select className={`${Styles.input} w-full`}>
              <option value="breakfast">공복</option>
              <option value="lunch">아침 식사 전</option>
              <option value="dinner">아침 식사 후</option>
              <option value="snack">점심 식사 전</option>
              <option value="other">점심 식사 후</option>
              <option value="other">저녁 식사 전</option>
              <option value="other">저녁 식사 후</option>
            </select>
          </div>
        </div>

        <div className={Styles.formField}>
          <label htmlFor="mealTime" className={Styles.label}>
            메모 (선택사항)
          </label>

          <div className={Styles.inputWrapper}>
            <textarea
              id="mealTime"
              placeholder="운동, 약물 복용, 컨디션 등 추가 정보를 입력하세요."
              className={`${Styles.input} resize-none w-full h-[100px]`}
            />
          </div>
        </div>

        <div className="w-full flex gap-2 justify-end mt-10">
          <Button type="button" onClick={handleClose} variant="modal-cancel">
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
  inputWrapper: 'border border-(--divider) rounded-md p-2 ',
  input: 'outline-none text-(--text)',
};
