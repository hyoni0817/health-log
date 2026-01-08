import { supabase } from '@/shared/api/supabaseClient';
import {
  BloodSugarPayload,
  BloodSugarRecord,
  BloodSugarStatsSummaryRecord,
  BloodSugarTrendRecord,
} from '../types/bloodSugar';

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

  // 가장 최근 혈당 기록 불러오기
  async getLatestBloodSugar(): Promise<BloodSugarRecord | null> {
    const { data, error } = await supabase.from('glucose').select('*').order('date', { ascending: false }).limit(1);
    if (error) throw error;
    return data[0] || null;
  },

  // 혈당 통계 요약 조회
  async getBloodSugarStatsSummary(
    days?: number,
    startDate?: Date | null,
    endDate?: Date | null
  ): Promise<BloodSugarStatsSummaryRecord | null> {
    // days가 존재하지 않거나 start_date와 end_date가 모두 존재하지 않으면 api를 호출하지 않음
    if (!days && (!startDate || !endDate)) {
      return null;
    }

    const query = await supabase.rpc('get_blood_sugar_stats_summary', {
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
