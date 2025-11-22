'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { BloodPressureLineChart } from '@/features/blood-pressure/ui/BloodPressureLineChart';
import { useGetSystolicPressureTrend } from '@/features/blood-pressure/hooks/useGetSystolicPressureTrend';
import { useGetDiastolicPressureTrend } from '@/features/blood-pressure/hooks/useGetDiastolicPressureTrend';

export const BloodPressureTrendSection = () => {
  const { data: systolicPressureTrend } = useGetSystolicPressureTrend(30);
  const { data: diastolicPressureTrend } = useGetDiastolicPressureTrend(30);

  console.log(systolicPressureTrend);

  return (
    <section className="mb-8 w-[45%] flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-4">혈압 추이</h2>
        <p className="text-(--text-subtitle) text-sm mb-4">지난 30일 동안의 혈압 추이를 보여줍니다.</p>

        <div>
          <BloodPressureLineChart
            systolicChartData={systolicPressureTrend || []}
            diastolicChartData={diastolicPressureTrend || []}
          />
        </div>
      </Card>
    </section>
  );
};
