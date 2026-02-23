'use client';

import React from 'react';
import { PostMealTime } from '@/shared/types/measurement';
import { MeasurementTiming } from '@/shared/types/measurement';
import { useGetBloodSugarHistory } from '@/features/blood-sugar/hooks/useGetBloodSugarHistory';
import { ColumnProps, Table } from '@/shared/ui/Table/ui';
import dayjs from 'dayjs';
import { getCommonStatusTextColor } from '@/shared/utils/status';
import { getBloodSugarStatus, getBloodSugarStatusLabel } from '@/features/blood-sugar/lib/status';
import { BloodSugarRecord } from '@/entities/blood-sugar/model';
import { getMeasurementTimingLabel } from '@/shared/utils';
import { PencilIcon, Trash2 } from 'lucide-react';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';
import { BloodSugarPeriodFilterContext } from './BloodSugarAnalysisSection';

export const BloodSugarHistoryTable = () => {
  const { periodType, days, month, startDate, endDate } = usePeriodFilter(BloodSugarPeriodFilterContext);

  const { data } = useGetBloodSugarHistory({
    periodType,
    limit: 20,
    offset: 0,
    days,
    month,
    startDate,
    endDate,
  });

  const onClickEdit = (id: BloodSugarRecord['id']) => {
    alert(id);
  };
  const onClickDelete = (id: BloodSugarRecord['id']) => {
    alert(id);
  };

  const columns: ColumnProps<BloodSugarRecord>[] = [
    {
      title: '날짜',
      key: 'date',
      dataIndex: 'date',
      render: (value) => <span>{dayjs(value as string).format('YYYY-MM-DD')}</span>,
    },
    { title: '혈당(mg/dL)', key: 'value', dataIndex: 'value', render: (value) => <span>{value}</span> },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'post_meal_time',
      render: (_, record) => (
        // 혈당 상태에 따라 텍스트 색상을 다르게 표시함.
        <span
          className={`${getCommonStatusTextColor(getBloodSugarStatus(Number(record?.value), record?.measurement_timing as MeasurementTiming, record?.post_meal_time as PostMealTime))}`}
        >
          {getBloodSugarStatusLabel(
            getBloodSugarStatus(
              Number(record?.value),
              record?.measurement_timing,
              record?.post_meal_time as PostMealTime
            )
          )}
        </span>
      ),
    },
    {
      title: '측정 시간',
      key: 'measurement_timing',
      dataIndex: 'measurement_timing',
      render: (value) => <span>{getMeasurementTimingLabel(value)}</span>,
    },
    {
      title: '식사 후 시간',
      key: 'post_meal_time',
      dataIndex: 'post_meal_time',
      render: (value) => <span>{value ? `${value}분 후` : '-'}</span>,
    },
    { title: '메모', key: 'note', dataIndex: 'note', width: 300, render: (value) => <span>{value || '-'}</span> },
    {
      title: '수정 / 삭제',
      key: 'id',
      dataIndex: 'id',
      render: (value) => (
        <div className="flex gap-2 w-fit">
          <button className={ActionButtonClasses} onClick={() => onClickEdit(value)}>
            <PencilIcon />
          </button>
          <button className={ActionButtonClasses} onClick={() => onClickDelete(value)}>
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={data || []} />;
};

const ActionButtonClasses = 'rounded-md bg-(--color-gray-850) p-2';
