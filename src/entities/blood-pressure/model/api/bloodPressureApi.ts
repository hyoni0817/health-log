import { supabase } from '@/shared/api/supabaseClient';
import { BloodPressurePayload } from '../type/bloodPressure';

export const bloodPressureApi = {
  // 새로운 혈압 기록 추가
  async createBloodPressure(payload: BloodPressurePayload) {
    const { data, error } = await supabase.from('blood_press').insert(payload);
    if (error) throw error;
    return data;
  },
};
