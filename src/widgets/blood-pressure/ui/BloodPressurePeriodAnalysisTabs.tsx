import React, { useState } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { PeriodFilter, PeriodFilterTabKey, PeriodFilterType } from '@/shared/types/measurement';
import { DateRangePicker } from '@/shared/ui/DateRangePicker';

import dayjs from 'dayjs';
import { PeriodFilterContext } from '@/shared/model/periodFilter';
import { AddDataButton } from '@/shared/ui/AddDataButton';
import AddBloodPressureDataModal from '@/features/blood-pressure/ui/AddBloodPressureDataModal';
import { BloodPressureStatSummary } from './BloodPressureStatSummary';
import { BloodPressureHistoryTable } from './BloodPressureHistoryTable';
import { BloodPressureExport } from '@/features/blood-pressure/ui/BloodPressureExport';

export const BloodPressurePeriodAnalysisTabs = () => {
  const now = dayjs().toDate();
  const before1year = dayjs().subtract(1, 'year').toDate();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([before1year, now]);
  const [activeTabKey, setActiveTabKey] = useState<PeriodFilterTabKey>(7);

  const periodFilter: PeriodFilter =
    activeTabKey === 'manual'
      ? { type: PeriodFilterType.RANGE, startDate: dateRange[0], endDate: dateRange[1] }
      : { type: PeriodFilterType.DAY, days: activeTabKey as number };

  const bloodPressureAnalysisContent = (periodFilterType: PeriodFilterType) => {
    const [startDate, endDate] = dateRange;

    return (
      <>
        {periodFilterType === PeriodFilterType.RANGE && (
          <div className="mb-4">
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={setDateRange} />
          </div>
        )}
        <div className="blood-pressure-analysis-content">
          <BloodPressureStatSummary />
          <div className="flex justify-end mb-4">
            <AddDataButton title="혈압 데이터 추가" modalComponent={AddBloodPressureDataModal} />
          </div>
          <BloodPressureHistoryTable />
        </div>
      </>
    );
  };

  const tabItems = [
    {
      key: 7,
      label: '7일',
      children: bloodPressureAnalysisContent(PeriodFilterType.DAY),
    },
    {
      key: 30,
      label: '30일',
      children: bloodPressureAnalysisContent(PeriodFilterType.DAY),
    },
    {
      key: 90,
      label: '90일',
      children: bloodPressureAnalysisContent(PeriodFilterType.DAY),
    },
    {
      key: 'manual',
      label: '직접 입력',
      children: bloodPressureAnalysisContent(PeriodFilterType.RANGE),
    },
  ];

  const handleChangeActiveTab = (key: string | number) => {
    setActiveTabKey(key as PeriodFilterTabKey);
  };

  return (
    <PeriodFilterContext.Provider value={periodFilter}>
      <Tabs items={tabItems} onChange={handleChangeActiveTab} tabLeftContent={<BloodPressureExport />} />
    </PeriodFilterContext.Provider>
  );
};
