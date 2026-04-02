import AddBloodSugarDataModal from '@/features/blood-sugar/ui/AddBloodSugarDataModal';
import { Button } from '@/shared/ui/Button';
import { useModal } from '@/shared/ui/Modal';
import { Plus } from 'lucide-react';
import React from 'react';

export const AddBloodSugarButton = () => {
  const { openModal } = useModal();

  const handleAddBloodSugarData = () => {
    openModal(AddBloodSugarDataModal);
  };

  return (
    <Button
      onClick={handleAddBloodSugarData}
      variant="action"
      size="compact"
      className="font-bold"
      leftIcon={<Plus size={16} />}
    >
      혈당 데이터 추가
    </Button>
  );
};
