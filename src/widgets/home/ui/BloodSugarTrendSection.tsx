'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { BloodSugarFloatingBar } from '@/features/blood-sugar/ui/BloodSugarFloatingBar';
import { useGetBloodSugarTrend } from '@/features/blood-sugar';

export const BloodSugarTrendSection = () => {
  const { data: bloodSugarTrend } = useGetBloodSugarTrend(30);

  return (
    <section className="mb-8 w-[45%] flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-4">혈당 추이</h2>
        <p className="text-(--text-subtitle) text-sm mb-4">지난 30일 동안의 혈당 추이를 보여줍니다.</p>

        <div>
          <BloodSugarFloatingBar chartData={bloodSugarTrend || []} />
        </div>
      </Card>
    </section>
  );
};
