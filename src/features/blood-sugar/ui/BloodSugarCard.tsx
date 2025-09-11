import React from 'react';
import { Card } from '@/shared/ui/Card';
import dayjs from 'dayjs';
import { getBloodSugarStatus, getBloodSugarStatusLabel } from '../lib/status';
import { MeasurementTiming, PostMealTime } from '@/shared/types/measurement';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { getCommonStatusTextColor } from '@/shared/utils/status';
import { bloodSugarApi } from '@/entities/blood-sugar/model/api/bloodSugarApi';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const BloodSugarCard = async () => {
  const bloodSugarLatest = await bloodSugarApi.getLatestBloodSugar();

  const bloodSugarStatus = getBloodSugarStatus(
    Number(bloodSugarLatest?.value),
    bloodSugarLatest?.measurement_timing as MeasurementTiming,
    bloodSugarLatest?.post_meal_time as PostMealTime
  );

  return (
    <Card className="w-1/2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium text-(--text) mb-2">최근 혈당 수치</h3>
        {bloodSugarLatest?.date && (
          <p className="text-sm text-(--text-subtitle)">마지막 업데이트: {dayjs(bloodSugarLatest?.date).fromNow()}</p>
        )}
      </div>

      {bloodSugarLatest ? (
        <div className="flex items-center gap-3 pb-3">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-(--text)">{bloodSugarLatest?.value}</span>
            <span className="text-base text-(--text-subtitle)">mg/dL</span>
          </div>

          <div className={`text-sm ${getCommonStatusTextColor(bloodSugarStatus)}`}>
            {getBloodSugarStatusLabel(bloodSugarStatus)}
          </div>
        </div>
      ) : (
        <div className="text-sm text-(--text-subtitle)">혈당 기록이 없습니다.</div>
      )}
    </Card>
  );
};
