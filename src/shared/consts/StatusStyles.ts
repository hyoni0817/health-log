import { CommonStatusKey } from '@/shared/types/status';

/**
 * 건강 상태별 스타일 클래스
 * 혈당, 혈압 등 모든 건강 지표에서 공통으로 사용
 */
export const COMMON_STATUS_STYLES: Record<
  CommonStatusKey,
  {
    background: string;
    titleText: string;
  }
> = {
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
