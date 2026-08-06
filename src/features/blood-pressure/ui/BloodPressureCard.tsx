import React from 'react';
import { Card } from '@/shared/ui/Card';
import { bloodPressureApi } from '@/entities/blood-pressure/model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getCommonStatusTextColor } from '@/shared/utils/status';
import { getBloodPressureStatusLabel } from '../lib/status';
import { getBloodPressureStatus } from '../lib/status';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const BloodPressureCard = async () => {
  const bloodPressureLatest = await bloodPressureApi.getLatestBloodPressure();

  const bloodPressureStatus = getBloodPressureStatus(
    Number(bloodPressureLatest?.systolic_bp),
    Number(bloodPressureLatest?.diastolic_bp)
  );

  return (
    <Card className="w-1/2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium text-(--text) mb-2">최근 혈압 수치</h3>
        {bloodPressureLatest?.date && (
          <p className="text-sm text-(--text-subtitle)">
            측정일: {dayjs(bloodPressureLatest?.date).format('YYYY.MM.DD')}
          </p>
        )}
      </div>

      {bloodPressureLatest ? (
        <div className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-(--text)">
                {bloodPressureLatest?.systolic_bp}/{bloodPressureLatest?.diastolic_bp}
              </span>
              <span className="text-base text-(--text-subtitle)">mmHg</span>
            </div>

            <div className={`text-sm ${getCommonStatusTextColor(bloodPressureStatus)}`}>
              {getBloodPressureStatusLabel(bloodPressureStatus)}
            </div>
          </div>

          <div>
            <p className="text-sm text-(--text-subtitle)">맥박: {bloodPressureLatest?.heart_rate} bpm</p>
          </div>
        </div>
      ) : (
        <div className="text-sm text-(--text-subtitle)">혈압 기록이 없습니다.</div>
      )}
    </Card>
  );
};
