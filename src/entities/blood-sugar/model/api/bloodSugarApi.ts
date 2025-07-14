import { supabase } from '@/shared/api/supabaseClient';
import { BloodSugarPayload } from '../types/bloodSugar';

export const bloodSugarApi = {
  // 새로운 혈당 기록 추가
  async createGlucose(payload: BloodSugarPayload) {
    const { data, error } = await supabase.from('glucose').insert(payload);
    if (error) throw error;
    return data;
  },
};
