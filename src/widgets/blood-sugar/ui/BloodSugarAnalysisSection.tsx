'use client';

import { Card } from '@/shared/ui/Card';
import { Tabs } from '@/shared/ui/Tabs';
import { BloodSugarStatSummary } from './BloodSugarStatSummary';
import { BloodSugarHistoryTable } from './BloodSugarHistoryTable';
import { PeriodFilter, PeriodFilterTabKey, PeriodFilterType } from '@/shared/types/measurement';
import { DateRangePicker } from '@/shared/ui/DateRangePicker';
import dayjs from 'dayjs';
import { createContext, useState } from 'react';
import { BloodSugarExport } from '@/features/blood-sugar/ui/BloodSugarExport';

export const BloodSugarPeriodFilterContext = createContext<PeriodFilter | null>(null);

export const BloodSugarAnalysisSection = () => {
  const now = dayjs().toDate();
  const before1year = dayjs().subtract(1, 'year').toDate();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([before1year, now]);
  const [activeTabKey, setActiveTabKey] = useState<PeriodFilterTabKey>(7);

  const bloodSugarAnalysisContent = (periodFilterType: PeriodFilterType) => {
    const [startDate, endDate] = dateRange;

    return (
      <>
        {periodFilterType === PeriodFilterType.RANGE && (
          <div className="mb-4">
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={setDateRange} />
          </div>
        )}
        <BloodSugarStatSummary />
        <BloodSugarExport />
        <BloodSugarHistoryTable />
      </>
    );
  };

  const tabItems = [
    {
      key: 7,
      label: '7일',
      children: bloodSugarAnalysisContent(PeriodFilterType.DAY),
    },
    {
      key: 30,
      label: '30일',
      children: bloodSugarAnalysisContent(PeriodFilterType.DAY),
    },
    {
      key: 90,
      label: '90일',
      children: bloodSugarAnalysisContent(PeriodFilterType.DAY),
    },
    {
      key: 'manual',
      label: '직접 입력',
      children: bloodSugarAnalysisContent(PeriodFilterType.RANGE),
    },
  ];

  const periodFilter: PeriodFilter =
    activeTabKey === 'manual'
      ? { type: PeriodFilterType.RANGE, startDate: dateRange[0], endDate: dateRange[1] }
      : { type: PeriodFilterType.DAY, days: activeTabKey as number };

  const handleChangeActiveTab = (key: string | number) => {
    setActiveTabKey(key as PeriodFilterTabKey);
  };

  return (
    <BloodSugarPeriodFilterContext.Provider value={periodFilter}>
      <section className="mb-8 w-full flex-1">
        <Card className="h-full">
          <h2 className="text-white text-xl font-semibold mb-1">혈당 추이</h2>
          <p className="text-(--text-subtitle) text-sm mb-4">혈당 수치에 대한 통계 및 추이 분석해보세요.</p>

          <Tabs items={tabItems} onChange={handleChangeActiveTab} />
        </Card>
      </section>
    </BloodSugarPeriodFilterContext.Provider>
  );
};
