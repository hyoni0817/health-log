'use client';

import { Card } from '@/shared/ui/Card';
import { Tabs } from '@/shared/ui/Tabs';
import { BloodSugarStatSummary } from './BloodSugarStatSummary';

export const BloodSugarAnalysisSection = () => {
  const tabItems = [
    {
      key: 7,
      label: '7일',
      children: <BloodSugarStatSummary days={7} />,
    },
    {
      key: 30,
      label: '30일',
      children: <BloodSugarStatSummary days={30} />,
    },
    {
      key: 90,
      label: '90일',
      children: <BloodSugarStatSummary days={90} />,
    },
    {
      key: 'manual',
      label: '직접 입력',
      children: <BloodSugarStatSummary isCustomDateRange />,
    },
  ];

  return (
    <section className="mb-8 w-full flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-1">혈당 추이</h2>
        <p className="text-(--text-subtitle) text-sm mb-4">혈당 수치에 대한 통계 및 추이 분석해보세요.</p>

        <Tabs items={tabItems} />
      </Card>
    </section>
  );
};
