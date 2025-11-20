import { BloodPressureTrendRecord } from '@/entities/blood-pressure/model';
import dayjs from 'dayjs';

type LineChartDataPoint = {
  x: string;
  y: number;
  meta: {
    actualAvg: number;
    actualMin: number;
    actualMax: number;
    isSingleValue: boolean;
  };
};

/**
 * BloodPressureTrend 데이터를 차트용 데이터로 변환
 */
export const mapToBloodPressureLineChartData = (dailyStats: BloodPressureTrendRecord[]): LineChartDataPoint[] => {
  return dailyStats?.map((stat) => {
    const avgValue = stat.avg_value;
    const minValue = stat.min_value;
    const maxValue = stat.max_value;
    const isSingle = minValue === maxValue;

    return {
      x: dayjs(stat.date).format('MM.DD'),
      // 시각화용: 동일한 값일 때만 작은 범위 생성
      y: avgValue,
      // 실제 데이터 보존
      meta: {
        actualAvg: avgValue,
        actualMin: minValue,
        actualMax: maxValue,
        isSingleValue: isSingle,
      },
    };
  });
};
