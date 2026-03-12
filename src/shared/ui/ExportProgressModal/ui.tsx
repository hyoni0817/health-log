import React, { FC } from 'react';
import { DotLoader } from '../DotLoader';
import { ModalComponentProps } from '../Modal';
import { Button } from '../Button';

export interface ExportProgressModalProps extends ModalComponentProps {
  text?: string;
  progress?: number;
  isError?: boolean;
  onCancel?: () => void;
}

export const ExportProgressModal: FC<ExportProgressModalProps> = (props) => {
  const { text = '데이터를 가져오는 중', progress, isError = false, onCancel, close } = props;

  return (
    <div className="w-[400px] h-[300px] max-w-md rounded-lg p-4 bg-(--background) p-5 rounded-lg border border-(--divider)">
      {!isError ? (
        <div className="h-full flex flex-col justify-between">
          <div className="h-full flex items-center flex-col justify-center gap-5">
            <DotLoader />
            <div className="flex items-center flex-col justify-center gap-1">
              <p className="text-xl text-(--text) font-bold">{text}</p>
              <p className="text-lg text-(--text-subtitle)">{progress !== undefined ? `${progress}개` : ''}</p>
            </div>
          </div>
          <Button variant="modal-cancel-fill" onClick={onCancel}>
            취소
          </Button>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between">
          <div className="h-full mb-4h-full flex items-center flex-col justify-center gap-1">
            <p className="text-xl text-(--text) font-bold">다운로드 중 오류가 발생했습니다.</p>
            <p className="text-lg text-(--text-subtitle)">다시 시도해주세요.</p>
          </div>
          <Button variant="modal-cancel-fill" onClick={close}>
            닫기
          </Button>
        </div>
      )}
    </div>
  );
};
