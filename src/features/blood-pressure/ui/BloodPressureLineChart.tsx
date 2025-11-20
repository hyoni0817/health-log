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

export const BloodPressureLineChart = ({ chartData }: { chartData: BloodPressureTrendRecord[] }) => {
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
        data: mapToBloodPressureLineChartData(chartData),
        borderColor: '#3155CD',
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} options={options} />;
};
