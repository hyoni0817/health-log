'use client';

import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { type BloodSugarTrendRecord } from '@/entities/blood-sugar/model';
import { mapToBloodSugarFloatingBarData } from '../lib/chartMapping';
import { BloodSugarAnalysisExportContext } from '@/features/blood-sugar/model';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BloodSugarFloatingBarProps {
  chartData: BloodSugarTrendRecord[];
  isMaintainAspectRatio?: boolean;
}

export const BloodSugarFloatingBar = ({ chartData, isMaintainAspectRatio = false }: BloodSugarFloatingBarProps) => {
  const { isExport } = useContext(BloodSugarAnalysisExportContext);

  const options = {
    animation: isExport ? (false as const) : undefined, // animation이 undefined이면 기본 애니메이션 적용
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const meta = context.raw.meta;
            if (meta.isSingleValue) {
              return `혈당: ${meta.actualMin}mg/dL`;
            }
            return `최저: ${meta.actualMin}mg/dL / 최고: ${meta.actualMax}mg/dL`;
          },
        },
      },
      legend: {
        // 라벨 숨김 여부 결정
        display: false,
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
        data: mapToBloodSugarFloatingBarData(chartData),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#10b981'; // fallback
          // 혈당 추이에 어울리는 색상 - 건강한 초록 그라데이션 (현재 적용)
          // 의미: 건강함, 안정감, 생명력을 나타내는 색상
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, '#34d399'); // 밝은 에메랄드 (emerald-400) - 희망적
          gradient.addColorStop(0.5, '#10b981'); // 에메랄드 (emerald-500) - 안정적
          gradient.addColorStop(1, '#047857'); // 진한 에메랄드 (emerald-700) - 신뢰감
          return gradient;
        },
        stack: 'Stack 0',
      },
    ],
  };

  return <Bar data={data} options={options} />;
};
