import { CircleCheckBigIcon, OctagonAlertIcon, TriangleAlertIcon, CircleX } from 'lucide-react';
import React from 'react';
import { CommonStatusKey } from '@/shared/types/status';

interface HealthMessageProps {
  value: string;
  status: CommonStatusKey;
  label: string;
  unit: string;
  recommendation: string;
}

export const HealthMessage = ({ value, status, unit, label, recommendation }: HealthMessageProps) => {
  const iconSize = 'h-5 w-5';
  const icon = {
    LOW: <TriangleAlertIcon className={iconSize} />,
    NORMAL: <CircleCheckBigIcon className={iconSize} />,
    BORDERLINE: <OctagonAlertIcon className={iconSize} />,
    HIGH_STAGE_1: <OctagonAlertIcon className={iconSize} />,
    HIGH_STAGE_2: <OctagonAlertIcon className={iconSize} />,
    HIGH_RISK: <OctagonAlertIcon className={iconSize} />,
    RECHECK: <CircleX className={iconSize} />,
  };

  const statusClasses = {
    LOW: {
      background: 'bg-(--color-yellow-50)',
      titleText: 'text-(--color-orange-400)',
    },
    NORMAL: {
      background: 'bg-(--color-green-50)',
      titleText: 'text-(--color-green-400)',
    },
    BORDERLINE: {
      background: 'bg-(--color-orange-50)',
      titleText: 'text-(--color-orange-600)',
    },
    HIGH_STAGE_1: {
      background: 'bg-(--color-orange-100)',
      titleText: 'text-(--color-orange-700)',
    },
    HIGH_STAGE_2: {
      background: 'bg-(--color-red-50)',
      titleText: 'text-(--color-red-500)',
    },
    HIGH_RISK: {
      background: 'bg-(--color-red-50)',
      titleText: 'text-(--color-red-500)',
    },
    RECHECK: {
      background: 'bg-(--color-gray-50)',
      titleText: 'text-(--color-blue-400)',
    },
  };

  return (
    <div className={`${statusClasses[status].background} p-5 rounded-md mb-4`}>
      <div className="flex items-center gap-3">
        <div className={`${statusClasses[status].titleText}`}>{icon[status]}</div>
        <div>
          <p className={`text-base font-bold mb-1 ${statusClasses[status].titleText}`}>현재 상태: {label}</p>
          <p className="text-sm text-(--color-gray-500) mb-1">
            {value} {unit}
          </p>
          <p className="text-sm text-(--color-gray-500)">* {recommendation}</p>
        </div>
      </div>
    </div>
  );
};
