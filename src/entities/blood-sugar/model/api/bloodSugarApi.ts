import { supabase } from '@/shared/api/supabaseClient';
import { BloodSugarPayload, BloodSugarTrendRecord } from '../types/bloodSugar';

export const bloodSugarApi = {
  // 새로운 혈당 기록 추가
  async createGlucose(payload: BloodSugarPayload) {
    const { data, error } = await supabase.from('glucose').insert(payload);
    if (error) throw error;
    return data;
  },

  // 혈당 추이 조회
  async getBloodSugarTrend(days?: number): Promise<BloodSugarTrendRecord[]> {
    const query = await supabase.rpc('get_blood_sugar_trend', { days });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  },
};
