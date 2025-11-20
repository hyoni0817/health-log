import { supabase } from '@/shared/api/supabaseClient';
import { BloodPressurePayload, BloodPressureRecord, BloodPressureTrendRecord } from '../type/bloodPressure';

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
};
