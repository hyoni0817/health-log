import { CircleCheckBigIcon, OctagonAlertIcon, TriangleAlertIcon, CircleX } from 'lucide-react';
import React from 'react';
import { CommonStatusKey } from '@/shared/types/status';
import { getCommonStatusBackground, getCommonStatusTextColor } from '@/shared/utils/status';

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

  return (
    <div className={`${getCommonStatusBackground(status)} p-5 rounded-md mb-4`}>
      <div className="flex items-center gap-3">
        <div className={`${getCommonStatusTextColor(status)}`}>{icon[status]}</div>
        <div>
          <p className={`text-base font-bold mb-1 ${getCommonStatusTextColor(status)}`}>현재 상태: {label}</p>
          <p className="text-sm text-(--color-gray-500) mb-1">
            {value} {unit}
          </p>
          <p className="text-sm text-(--color-gray-500)">* {recommendation}</p>
        </div>
      </div>
    </div>
  );
};
