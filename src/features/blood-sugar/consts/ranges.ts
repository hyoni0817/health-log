/**
 * 혈당 관련 범위, 단위, 임계값 정의
 */
export const BLOOD_SUGAR_RANGES = {
  VALIDATION: {
    MIN_VALUE: 0,
    MAX_VALUE: 1000,
  },
  RANGES: {
    NORMAL: {
      MIN: 70,
      MAX: 140,
    },
    WARNING: {
      MIN: 141,
      MAX: 200,
    },
  },
  UNITS: {
    MGDL: 'mg/dL',
    MMOLL: 'mmol/L',
    CONVERSION_FACTOR: 0.0555,
  },
} as const;
