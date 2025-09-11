/**
 * 공통 건강 지표 상태 키
 */
export type CommonStatusKey =
  | 'LOW'
  | 'NORMAL'
  | 'BORDERLINE'
  | 'HIGH_STAGE_1'
  | 'HIGH_STAGE_2'
  | 'HIGH_RISK'
  | 'RECHECK';

export type CommonStatusStyles = Record<
  CommonStatusKey,
  {
    background: string;
    titleText: string;
  }
>;
