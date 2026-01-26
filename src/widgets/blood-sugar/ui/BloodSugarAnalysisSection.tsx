'use client';

import { Card } from '@/shared/ui/Card';
import { Tabs } from '@/shared/ui/Tabs';
import { BloodSugarStatSummary } from './BloodSugarStatSummary';
import { BloodSugarHistoryTable } from './BloodSugarHistoryTable';
import { PeriodFilterType } from '@/shared/types/measurement';
import { DateRangePicker } from '@/shared/ui/DateRangePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

export const BloodSugarAnalysisSection = () => {
  const now = dayjs().toDate();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([now, now]);

  const bloodSugarAnalysisContent = (periodFilterType: PeriodFilterType, days?: number) => {
    if (periodFilterType === PeriodFilterType.RANGE) {
      const [startDate, endDate] = dateRange;

      return (
        <>
          <div className="mb-4">
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={setDateRange} />
          </div>
          <BloodSugarStatSummary periodFilter={{ type: PeriodFilterType.RANGE, startDate, endDate }} />
          <BloodSugarHistoryTable periodFilter={{ type: PeriodFilterType.RANGE, startDate, endDate }} />
        </>
      );
    }

    return (
      <>
        <BloodSugarStatSummary periodFilter={{ type: PeriodFilterType.DAY, days: days as number }} />
        <BloodSugarHistoryTable periodFilter={{ type: PeriodFilterType.DAY, days: days as number }} />
      </>
    );
  };

  const tabItems = [
    {
      key: 7,
      label: '7일',
      children: bloodSugarAnalysisContent(PeriodFilterType.DAY, 7),
    },
    {
      key: 30,
      label: '30일',
      children: bloodSugarAnalysisContent(PeriodFilterType.DAY, 30),
    },
    {
      key: 90,
      label: '90일',
      children: bloodSugarAnalysisContent(PeriodFilterType.DAY, 90),
    },
    {
      key: 'manual',
      label: '직접 입력',
      children: bloodSugarAnalysisContent(PeriodFilterType.RANGE),
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
