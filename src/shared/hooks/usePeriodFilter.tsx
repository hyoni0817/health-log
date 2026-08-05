import { Context, useContext } from 'react';
import { Days, Month, PeriodFilter, PeriodFilterType, PeriodFilterValues, RangeDate } from '../types/measurement';
import { PeriodFilterContext } from '../model/periodFilter';

/**
 * 기간 필터 타입에 따라 저장된 기간 필터 정보를 반환하는 훅
 * @param context - 기간 필터 Context. 한 화면에서 서로 다른 기간 필터를 중첩해 사용할 때만 별도 Context를 전달한다.
 * @returns 기간 필터 관련 정보를 반환
 */
export const usePeriodFilter = (context: Context<PeriodFilter | null> = PeriodFilterContext): PeriodFilterValues => {
  const periodFilter = useContext(context);

  const periodType = periodFilter?.type as PeriodFilterType;
  let days: Days | undefined;
  let month: Month | undefined;
  let startDate: RangeDate | undefined;
  let endDate: RangeDate | undefined;

  if (periodFilter?.type === PeriodFilterType.DAY) {
    days = periodFilter.days;
  } else if (periodFilter?.type === PeriodFilterType.MONTH) {
    month = periodFilter.month;
  } else if (periodFilter?.type === PeriodFilterType.RANGE) {
    startDate = periodFilter?.startDate;
    endDate = periodFilter.endDate;
  }

  return { periodType, days, month, startDate, endDate };
};
