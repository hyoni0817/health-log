/**
 * 혈당 관련 범위, 단위, 임계값 정의
 */
export const BLOOD_SUGAR_RANGES = {
  VALIDATION: {
    MIN_VALUE: 0,
    MAX_VALUE: 1000,
  },
  BEFORE_MEAL_TIME: {
    FASTING: {
      // 공복
      LOW: {
        MIN: 0,
        MAX: 69,
      },
      NORMAL: {
        MIN: 70,
        MAX: 99,
      },
      BORDERLINE: {
        MIN: 100,
        MAX: 125,
      },
      HIGH_RISK: {
        MIN: 126,
        MAX: 1000,
      },
    },
    PRE_MEAL: {
      // 식전
      LOW: {
        MIN: 0,
        MAX: 69,
      },
      NORMAL: {
        MIN: 70,
        MAX: 110,
      },
      BORDERLINE: {
        MIN: 111,
        MAX: 125,
      },
      HIGH_RISK: {
        MIN: 126,
        MAX: 1000,
      },
    },
  },
  AFTER_MEAL_TIME: {
    // 식후 30분
    '30': {
      LOW: {
        MIN: 0,
        MAX: 69,
      },
      NORMAL: {
        MIN: 70,
        MAX: 160,
      },
      BORDERLINE: {
        MIN: 161,
        MAX: 199,
      },
      HIGH_RISK: {
        MIN: 200,
        MAX: 1000,
      },
    },
    // 식후 60분
    '60': {
      LOW: {
        MIN: 0,
        MAX: 69,
      },
      NORMAL: {
        MIN: 70,
        MAX: 140,
      },
      BORDERLINE: {
        MIN: 141,
        MAX: 179,
      },
      HIGH_RISK: {
        MIN: 180,
        MAX: 1000,
      },
    },
    // 식후 120분
    '120': {
      LOW: {
        MIN: 0,
        MAX: 69,
      },
      NORMAL: {
        MIN: 70,
        MAX: 140,
      },
      BORDERLINE: {
        MIN: 141,
        MAX: 179,
      },
      HIGH_RISK: {
        MIN: 180,
        MAX: 1000,
      },
    },
  },
} as const;
