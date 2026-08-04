'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { mapToBloodPressureLineChartData } from '../lib/chartMapping';
import { type BloodPressureTrendRecord } from '@/entities/blood-pressure/model';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BloodPressureLineChartProps {
  systolicChartData: BloodPressureTrendRecord[];
  diastolicChartData: BloodPressureTrendRecord[];
  isMaintainAspectRatio?: boolean;
}

export const BloodPressureLineChart = ({
  systolicChartData,
  diastolicChartData,
  isMaintainAspectRatio = false,
}: BloodPressureLineChartProps) => {
  const options = {
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const meta = context.raw.meta;
            if (meta.isSingleValue) {
              return `혈압: ${meta.actualMin}mg/dL`;
            }
            return `평균: ${meta.actualAvg}mg/dL, 최저: ${meta.actualMin}mg/dL, 최고: ${meta.actualMax}mg/dL`;
          },
        },
      },
      legend: {
        // 라벨 숨김 여부 결정
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: isMaintainAspectRatio, // 종횡비 유지 여부 결정 (디폴트 값이 true임. true일 때는 높이에 비례하여 너비가 조정됨)
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          maxTicksLimit: 7, // 최대 7개 라벨만 표시
        },
      },
      y: {
        stacked: true,
        ticks: {
          maxTicksLimit: 7, // 최대 7개 라벨만 표시
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: '수축기 혈압',
        data: mapToBloodPressureLineChartData(systolicChartData),
        borderColor: '#3155CD',
        tension: 0.4,
      },
      {
        label: '이완기 혈압',
        data: mapToBloodPressureLineChartData(diastolicChartData),
        borderColor: '#D58639',
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} options={options} />;
};
