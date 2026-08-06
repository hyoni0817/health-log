'use client';

import React, { useContext, useState } from 'react';
import { ColumnProps, Table } from '@/shared/ui/Table/ui';
import dayjs from 'dayjs';
import { getCommonStatusTextColor } from '@/shared/utils/status';
import { getMeasurementTimingLabel } from '@/shared/utils';
import { PencilIcon, Trash2 } from 'lucide-react';
import { FileExportContext } from '@/shared/model/fileExport';
import { usePeriodFilter } from '@/shared/hooks/usePeriodFilter';
import { Pagination } from '@/shared/ui/pagination';
import { keepPreviousData } from '@tanstack/react-query';
import { BloodPressureRecord } from '@/entities/blood-pressure/model';
import { getBloodPressureStatusLabel } from '@/features/blood-pressure/lib/status';
import { useBloodPressureAllData } from '@/features/blood-pressure/hooks/useBloodPressureAllData';
import { useBloodPressureHistory } from '@/features/blood-pressure/hooks/useBloodPressureHistory';

export const BloodPressureHistoryTable = () => {
  const { periodType, days, month, startDate, endDate } = usePeriodFilter();
  const { isExport } = useContext(FileExportContext);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const allDataQuery = useBloodPressureAllData({ periodType, days, month, startDate, endDate }, { enabled: isExport });

  const historyQuery = useBloodPressureHistory(
    {
      periodType,
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      days,
      month,
      startDate,
      endDate,
    },
    { enabled: !isExport, placeholderData: keepPreviousData }
  );

  const data = isExport ? allDataQuery.data : historyQuery.data?.items;

  const handlePageChange = (page: number) => {
    const marginTop = 10;
    const BloodPressureHistoryTableLocation =
      (document.querySelector('.blood-pressure-history-table') as HTMLElement).offsetTop - marginTop;
    setCurrentPage(page);

    window.scrollTo({ top: BloodPressureHistoryTableLocation, behavior: 'auto' });
  };

  // PDF export 시 사용할 컬럼 정의 (수정/삭제 컬럼 제외)
  const bloodPressureDocumentColumns: ColumnProps<BloodPressureRecord>[] = [
    {
      title: '날짜',
      key: 'date',
      dataIndex: 'date',
      render: (value) => <span>{dayjs(value as string).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '혈압(mmHg)',
      key: 'systolic_bp',
      dataIndex: 'systolic_bp',
      render: (_, record) => (
        <span>
          {record?.systolic_bp}/{record?.diastolic_bp}
        </span>
      ),
    },
    {
      title: '맥박',
      key: 'heart_rate',
      dataIndex: 'heart_rate',
      render: (_, record) => (
        <span>
          {record?.systolic_bp}/{record?.diastolic_bp}
        </span>
      ),
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'status',
      render: (value) =>
        value ? (
          <span className={`${getCommonStatusTextColor(value)}`}>{getBloodPressureStatusLabel(value)}</span>
        ) : (
          '-'
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
  ];

  const onClickEdit = (id: BloodPressureRecord['id']) => {
    alert('준비중입니다.');
  };
  const onClickDelete = (id: BloodPressureRecord['id']) => {
    alert('준비중입니다.');
  };

  const allColumns: ColumnProps<BloodPressureRecord>[] = [
    ...bloodPressureDocumentColumns,
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

  return (
    <div className="blood-pressure-history-table">
      <Table columns={isExport ? bloodPressureDocumentColumns : allColumns} data={data || []} />
      {!isExport && (
        <div className="mt-4 flex justify-center">
          <Pagination total={historyQuery.data?.totalCount || 0} pageSize={pageSize} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

const ActionButtonClasses = 'rounded-md bg-(--color-gray-850) p-2';
