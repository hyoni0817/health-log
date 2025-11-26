'use client';

import { useGetBloodSugarStatsSummary } from '@/features/blood-sugar/hooks/useGetBloodSugarStatsSummary';
import { Card } from '@/shared/ui/Card';

export const BloodSugarAnalysisSection = () => {
  const { data: statsSummary } = useGetBloodSugarStatsSummary(30);
  console.log(statsSummary);
  const summaryList = [
    { label: '평균(mg/dL)', value: statsSummary?.avg_value },
    { label: '최고(mg/dL)', value: statsSummary?.max_value },
    { label: '최저(mg/dL)', value: statsSummary?.min_value },
    { label: '총 기록 수', value: statsSummary?.total_record_count },
  ];

  return (
    <section className="mb-8 w-full flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-1">혈당 추이</h2>
        <p className="text-(--text-subtitle) text-sm mb-4">혈당 수치에 대한 통계 및 추이 분석해보세요.</p>

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
      </Card>
    </section>
  );
};
