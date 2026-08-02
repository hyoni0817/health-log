'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import dayjs from 'dayjs';
import { getBloodSugarStatus, getBloodSugarStatusLabel } from '../lib/status';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { getCommonStatusTextColor } from '@/shared/utils/status';
import { useLatestRecordQuery } from '../hooks/useLatestRecordQuery';
import { BloodSugarRecord } from '@/entities/blood-sugar/model';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const BloodSugarCard = () => {
  const { data: bloodSugarLatest } = useLatestRecordQuery();

  return (
    <Card className="w-1/2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium text-(--text) mb-2">최근 혈당 수치</h3>
        {bloodSugarLatest?.date && (
          <p className="text-sm text-(--text-subtitle)">측정일: {dayjs(bloodSugarLatest?.date).format('YYYY.MM.DD')}</p>
        )}
      </div>

      {bloodSugarLatest ? (
        <BloodSugarLatestSummary record={bloodSugarLatest} />
      ) : (
        <div className="text-sm text-(--text-subtitle)">혈당 기록이 없습니다.</div>
      )}
    </Card>
  );
};

const BloodSugarLatestSummary = ({ record }: { record: BloodSugarRecord }) => {
  const status = getBloodSugarStatus(Number(record.value), record.measurement_timing, record.post_meal_time);

  return (
    <div className="flex items-center gap-3 pb-3">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-bold text-(--text)">{record.value}</span>
        <span className="text-base text-(--text-subtitle)">mg/dL</span>
      </div>
      <div className={`text-sm ${getCommonStatusTextColor(status)}`}>{getBloodSugarStatusLabel(status)}</div>
    </div>
  );
};
