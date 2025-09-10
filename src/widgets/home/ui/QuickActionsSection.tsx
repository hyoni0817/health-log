'use client';

import React from 'react';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Droplet, HeartPulse, Plus } from 'lucide-react';
import { useModal } from '@/shared/ui/Modal/useModal';
import AddBloodSugarDataModal from '@/features/blood-sugar/ui/AddBloodSugarDataModal';
import AddBloodPressureDataModal from '@/features/blood-pressure/ui/AddBloodPressureDataModal';

export const QuickActionsSection = () => {
  const { openModal } = useModal();

  const handleAddBloodSugarData = () => {
    openModal(AddBloodSugarDataModal);
  };

  const handleAddBloodPressureData = () => {
    openModal(AddBloodPressureDataModal);
  };

  return (
    <section className="mb-8 w-[40%] flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-4">빠른 실행</h2>
        <div className="space-y-3">
          <Button
            onClick={handleAddBloodSugarData}
            variant="action"
            fullWidth
            leftIcon={<Droplet />}
            rightIcon={<Plus />}
          >
            혈당 데이터 추가
          </Button>
          <Button
            onClick={handleAddBloodPressureData}
            variant="action"
            fullWidth
            leftIcon={<HeartPulse />}
            rightIcon={<Plus />}
          >
            혈압 데이터 추가
          </Button>
        </div>
      </Card>
    </section>
  );
};
