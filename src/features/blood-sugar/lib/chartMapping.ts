import { BloodSugarTrendRecord } from '@/entities/blood-sugar/model/types/bloodSugar';
import dayjs from 'dayjs';

type FloatingBarDataPoint = {
  x: string;
  y: number[];
  meta: {
    actualMin: number;
    actualMax: number;
    isSingleValue: boolean;
  };
};

/**
 * bloodSugarTrend 데이터를 차트용 데이터로 변환
 */
export const mapToBloodSugarFloatingBarData = (dailyStats: BloodSugarTrendRecord[]): FloatingBarDataPoint[] => {
  return dailyStats?.map((stat) => {
    const minValue = stat.min_value;
    const maxValue = stat.max_value;
    const isSingle = minValue === maxValue;

    return {
      x: dayjs(stat.date).format('MM.DD'),
      // 시각화용: 동일한 값일 때만 작은 범위 생성
      y: isSingle ? [minValue - 0.5, maxValue + 0.5] : [minValue, maxValue],
      // 실제 데이터 보존
      meta: {
        actualMin: minValue,
        actualMax: maxValue,
        isSingleValue: isSingle,
      },
    };
  });
};
