import { supabase } from '@/shared/api/supabaseClient';
import {
  BloodPressurePayload,
  BloodPressureRecord,
  BloodPressureStatsSummaryRecord,
  BloodPressureTrendRecord,
} from '../type/bloodPressure';
import { RangeDate } from '@/shared/types/measurement';

export const bloodPressureApi = {
  // 새로운 혈압 기록 추가
  async createBloodPressure(payload: BloodPressurePayload) {
    const { data, error } = await supabase.from('blood_pressure').insert(payload);
    if (error) throw error;
    return data;
  },

  // 가장 최근 혈압 기록 불러오기
  async getLatestBloodPressure(): Promise<BloodPressureRecord | null> {
    const { data, error } = await supabase
      .from('blood_pressure')
      .select('*')
      .order('date', { ascending: false })
      .limit(1);
    if (error) throw error;

    return data[0] || null;
  },

  // 수축기 혈압 추이 조회
  async getSystolicPressureTrend(days?: number): Promise<BloodPressureTrendRecord[]> {
    const query = await supabase.rpc('get_systolic_pressure_trend', { days });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  },

  // 이완기 혈압 추이 조회
  async getDiastolicPressureTrend(days?: number): Promise<BloodPressureTrendRecord[]> {
    const query = await supabase.rpc('get_diastolic_pressure_trend', { days });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  },

  // 혈압 통계 요약 조회
  async getBloodPressureStatsSummary(
    days?: number,
    startDate?: RangeDate,
    endDate?: RangeDate
  ): Promise<BloodPressureStatsSummaryRecord | null> {
    // days가 존재하지 않거나 start_date와 end_date가 모두 존재하지 않으면 api를 호출하지 않음
    if (!days && (!startDate || !endDate)) {
      return null;
    }

    const query = await supabase.rpc('get_blood_pressure_stats_summary', {
      days,
      start_date: startDate,
      end_date: endDate,
    });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  },
};
