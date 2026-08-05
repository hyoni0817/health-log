'use client';

import { Card } from '@/shared/ui/Card';

import { BloodPressurePeriodAnalysisTabs } from './BloodPressurePeriodAnalysisTabs';

export const BloodPressureAnalysisSection = () => {
  return (
    <section className="mb-8 w-full flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-1">혈압 추이</h2>
        <p className="text-(--text-subtitle) text-sm mb-4">혈압 수치에 대한 통계 및 추이 분석해보세요.</p>

        <BloodPressurePeriodAnalysisTabs />
      </Card>
    </section>
  );
};
