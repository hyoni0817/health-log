import React, { useState } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { PeriodFilter, PeriodFilterTabKey, PeriodFilterType } from '@/shared/types/measurement';
import { DateRangePicker } from '@/shared/ui/DateRangePicker';
import { BloodSugarStatSummary } from './BloodSugarStatSummary';
import { BloodSugarHistoryTable } from './BloodSugarHistoryTable';
import { BloodSugarExport } from '@/features/blood-sugar/ui/BloodSugarExport';
import dayjs from 'dayjs';
import { PeriodFilterContext } from '@/shared/model/periodFilter';
import { AddDataButton } from '@/shared/ui/AddButton';
import AddBloodSugarDataModal from '@/features/blood-sugar/ui/AddBloodSugarDataModal';

export const BloodSugarPeriodAnalysisTabs = () => {
  const now = dayjs().toDate();
  const before1year = dayjs().subtract(1, 'year').toDate();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([before1year, now]);
  const [activeTabKey, setActiveTabKey] = useState<PeriodFilterTabKey>(7);

  const periodFilter: PeriodFilter =
    activeTabKey === 'manual'
      ? { type: PeriodFilterType.RANGE, startDate: dateRange[0], endDate: dateRange[1] }
      : { type: PeriodFilterType.DAY, days: activeTabKey as number };

  const bloodSugarAnalysisContent = (periodFilterType: PeriodFilterType) => {
    const [startDate, endDate] = dateRange;

    return (
      <>
        {periodFilterType === PeriodFilterType.RANGE && (
          <div className="mb-4">
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={setDateRange} />
          </div>
        )}
        <div className="blood-sugar-analysis-content">
          <BloodSugarStatSummary />
          <div className="flex justify-end mb-4">
            <AddDataButton title="혈당 데이터 추가" modalComponent={AddBloodSugarDataModal} />
          </div>
          <BloodSugarHistoryTable />
        </div>
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

  const handleChangeActiveTab = (key: string | number) => {
    setActiveTabKey(key as PeriodFilterTabKey);
  };

  return (
    <PeriodFilterContext.Provider value={periodFilter}>
      <Tabs items={tabItems} onChange={handleChangeActiveTab} tabLeftContent={<BloodSugarExport />} />
    </PeriodFilterContext.Provider>
  );
};
