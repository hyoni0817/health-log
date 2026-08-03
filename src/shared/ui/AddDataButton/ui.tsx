'use client';

import { Plus } from 'lucide-react';
import { Button } from '../Button';
import { ModalComponentProps, useModal } from '../Modal';

interface AddDataButtonProps {
  title: string;
  modalComponent: React.ComponentType<ModalComponentProps>;
}

export const AddDataButton = (props: AddDataButtonProps) => {
  const { title, modalComponent } = props;
  const { openModal } = useModal();

  const handleAddData = () => {
    openModal(modalComponent);
  };

  return (
    <Button onClick={handleAddData} variant="action" size="compact" className="font-bold" leftIcon={<Plus size={16} />}>
      {title}
    </Button>
  );
};
