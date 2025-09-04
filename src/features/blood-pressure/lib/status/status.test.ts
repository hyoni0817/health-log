import { getBloodPressureStatus } from '.';

describe('혈압 상태 테스트', () => {
  test('수축기 89, 이완기 59 일 때 상태는 LOW (저혈압)', () => {
    expect(getBloodPressureStatus(89, 59)).toEqual('LOW');
  });

  test('수축기 90, 이완기 60 일 때 상태는 NORMAL (정상 혈압)', () => {
    expect(getBloodPressureStatus(90, 60)).toEqual('NORMAL');
  });

  test('수축기 120, 이완기 79 일 때 상태는 BORDERLINE (고혈압 전단계)', () => {
    expect(getBloodPressureStatus(120, 79)).toEqual('BORDERLINE');
  });

  test('수축기 130, 이완기 80 일 때 상태는 HIGH_STAGE_1 (고혈압 1기)', () => {
    expect(getBloodPressureStatus(130, 80)).toEqual('HIGH_STAGE_1');
  });

  test('수축기 140, 이완기 90 일 때 상태는 HIGH_STAGE_2 (고혈압 2기)', () => {
    expect(getBloodPressureStatus(140, 90)).toEqual('HIGH_STAGE_2');
  });

  test('수축기 180, 이완기 120 일 때 상태는 HIGH_RISK (고혈압 위기)', () => {
    expect(getBloodPressureStatus(180, 120)).toEqual('HIGH_RISK');
  });

  test('수축기 120, 이완기 80 일 때 상태는 HIGH_STAGE_1 (고혈압 1기) - 이완기 우선', () => {
    expect(getBloodPressureStatus(120, 80)).toEqual('HIGH_STAGE_1');
  });

  test('수축기 100, 이완기 59 일 때 상태는 RECHECK (재검사) - Isolated Diastolic Hypotension', () => {
    expect(getBloodPressureStatus(100, 59)).toEqual('RECHECK');
  });

  test('수축기 100, 이완기 20 일 때 상태는 RECHECK (재검사) - 비현실적 맥압', () => {
    expect(getBloodPressureStatus(100, 20)).toEqual('RECHECK');
  });

  test('수축기 95, 이완기 35 일 때 상태는 NORMAL (정상 혈압) - 수축기 우선', () => {
    expect(getBloodPressureStatus(95, 35)).toEqual('NORMAL');
  });

  test('수축기 100, 이완기 65 일 때 상태는 NORMAL (정상 혈압)', () => {
    expect(getBloodPressureStatus(100, 65)).toEqual('NORMAL');
  });

  test('수축기 100, 이완기 60 일 때 상태는 NORMAL (정상 혈압) - 경계값', () => {
    expect(getBloodPressureStatus(100, 60)).toEqual('NORMAL');
  });

  test('수축기 0, 이완기 0 일 때 상태는 RECHECK (재검사)', () => {
    expect(getBloodPressureStatus(0, 0)).toEqual('RECHECK');
  });

  // 맥압 관련 테스트
  test('수축기 110, 이완기 105 일 때 상태는 RECHECK (맥압 너무 작음)', () => {
    expect(getBloodPressureStatus(110, 105)).toEqual('RECHECK');
  });

  test('수축기 150, 이완기 70 일 때 상태는 HIGH_STAGE_2 (고혈압 2기) - 수축기 우선', () => {
    expect(getBloodPressureStatus(150, 70)).toEqual('HIGH_STAGE_2');
  });

  test('수축기 160, 이완기 70 일 때 상태는 RECHECK (맥압 너무 큼 - 90mmHg)', () => {
    expect(getBloodPressureStatus(160, 70)).toEqual('RECHECK');
  });

  // 정상적인 경계값 테스트
  test('수축기 119, 이완기 79 일 때 상태는 NORMAL (정상 혈압 상한)', () => {
    expect(getBloodPressureStatus(119, 79)).toEqual('NORMAL');
  });

  test('수축기 90, 이완기 60 일 때 상태는 NORMAL (정상 혈압 하한)', () => {
    expect(getBloodPressureStatus(90, 60)).toEqual('NORMAL');
  });
});
