import { COMMON_STATUS_STYLES } from '../consts/StatusStyles';
import { CommonStatusKey } from '../types/status';

/**
 * 건강 상태 텍스트 색상 반환
 * @param status 건강 상태 키
 * @returns 건강 상태 색상
 */
export const getCommonStatusTextColor = (status: CommonStatusKey): string => COMMON_STATUS_STYLES[status]['titleText'];

/**
 * 건강 상태 배경 색상 반환
 * @param status 건강 상태 키
 * @returns 건강 상태 배경 색상
 */
export const getCommonStatusBackground = (status: CommonStatusKey): string =>
  COMMON_STATUS_STYLES[status]['background'];
