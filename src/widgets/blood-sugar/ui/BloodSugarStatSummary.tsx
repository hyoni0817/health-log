import React, { FC } from 'react';
import { useGetBloodSugarStatsSummary } from '@/features/blood-sugar/hooks/useGetBloodSugarStatsSummary';

interface BloodSugarStatSummaryProps {
  days?: number;
  isCustomDateRange?: boolean;
}

export const BloodSugarStatSummary: FC<BloodSugarStatSummaryProps> = (props) => {
  const { days, isCustomDateRange } = props;
  const { data: statsSummary } = useGetBloodSugarStatsSummary(days);

  const getDisplayValue = (value: number | undefined) => {
    if (statsSummary?.total_record_count && statsSummary?.total_record_count > 0) {
      return value;
    }
    return '-';
  };

  const summaryList = [
    {
      label: '평균(mg/dL)',
      value: getDisplayValue(statsSummary?.avg_value),
    },
    {
      label: '최고(mg/dL)',
      value: getDisplayValue(statsSummary?.max_value),
    },
    {
      label: '최저(mg/dL)',
      value: getDisplayValue(statsSummary?.min_value),
    },
    {
      label: '총 기록 수',
      value: getDisplayValue(statsSummary?.total_record_count),
    },
  ];

  return (
    <div>
      <div className="flex gap-6">
        {summaryList.map((summary) => (
          <div
            key={summary.label}
            className="flex flex-1 bg-(--color-gray-850) gap-2 flex-col items-center justify-center p-4 rounded-xl"
          >
            <span className="text-2xl font-bold text-(--color-white)">{summary.value}</span>
            <span className="text-base text-(--color-gray-500)">{summary.label}</span>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
};
