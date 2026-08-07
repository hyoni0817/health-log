import React from 'react';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';
import { BloodPressureLineChart } from '@/features/blood-pressure/ui/BloodPressureLineChart';
import { useSystolicPressureTrend } from '@/features/blood-pressure/hooks/useSystolicPressureTrend';
import { useDiastolicPressureTrend } from '@/features/blood-pressure/hooks/useDiastolicPressureTrend';
import { useBloodPressureStatsSummary } from '@/page-components/blood-pressure/hooks/useBloodPressureStatsSummary';

export const BloodPressureStatSummary = () => {
  const { days, startDate, endDate } = usePeriodFilter();

  const { data: statsSummary } = useBloodPressureStatsSummary(days, startDate, endDate);
  const { data: systolicPressureTrend } = useSystolicPressureTrend(days, startDate, endDate);
  const { data: diastolicPressureTrend } = useDiastolicPressureTrend(days, startDate, endDate);

  const getDisplayValue = (value: number | string | undefined) => {
    if (statsSummary?.total_record_count && statsSummary?.total_record_count > 0) {
      return value;
    }
    return '-';
  };

  const summaryList = [
    {
      label: '정상 비율',
      value: `${getDisplayValue(statsSummary?.normal_record_ratio ? (statsSummary.normal_record_ratio * 100).toFixed(1) : 0)}%`,
    },
    {
      label: '최고(mmHg)',
      value: `${getDisplayValue(statsSummary?.highest_record_systolic_bp)}/${getDisplayValue(statsSummary?.highest_record_diastolic_bp)}`,
    },
    {
      label: '최저(mmHg)',
      value: `${getDisplayValue(statsSummary?.lowest_record_systolic_bp)}/${getDisplayValue(statsSummary?.lowest_record_diastolic_bp)}`,
    },
    {
      label: '총 기록 수',
      value: getDisplayValue(statsSummary?.total_record_count),
    },
  ];

  return (
    <div>
      <div className="flex gap-6 mb-5">
        {summaryList.map((summary) => (
          <div
            key={summary.label}
            className="flex flex-1 bg-(--color-gray-850) gap-2 flex-col items-center justify-center p-4 rounded-xl"
          >
            <span className="text-2xl font-bold text-(--color-white)">{summary.value}</span>
            <span className="text-base text-(--color-gray-500)">{summary.label}</span>
          </div>
        ))}
      </div>

      <div className="h-64 mb-4">
        <BloodPressureLineChart
          systolicChartData={systolicPressureTrend || []}
          diastolicChartData={diastolicPressureTrend || []}
        />
      </div>
    </div>
  );
};
