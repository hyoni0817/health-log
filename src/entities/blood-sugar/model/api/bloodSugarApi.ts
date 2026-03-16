import { supabase } from '@/shared/api/supabaseClient';
import {
  BloodSugarPayload,
  BloodSugarRecord,
  BloodSugarStatsSummaryRecord,
  BloodSugarTrendRecord,
  PaginatedBloodSugarHistory,
} from '../types/bloodSugar';
import { AllHistoryParams, HistoryParams } from '@/shared/types/history';
import { RangeDate } from '@/shared/types/measurement';

export const bloodSugarApi = {
  // 새로운 혈당 기록 추가
  async createGlucose(payload: BloodSugarPayload) {
    const { data, error } = await supabase.from('glucose').insert(payload);
    if (error) throw error;
    return data;
  },

  // 혈당 추이 조회
  async getBloodSugarTrend(
    days?: number,
    startDate?: RangeDate,
    endDate?: RangeDate
  ): Promise<BloodSugarTrendRecord[]> {
    // days가 존재하지 않거나 start_date와 end_date가 모두 존재하지 않으면 api를 호출하지 않음
    if (!days && (!startDate || !endDate)) {
      return [];
    }

    const query = await supabase.rpc('get_blood_sugar_trend', { days, start_date: startDate, end_date: endDate });

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
    startDate?: RangeDate,
    endDate?: RangeDate
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

  // 혈당 내역 조회
  async getBloodSugarHistory(
    params: HistoryParams,
    options?: { headers?: HeadersInit; signal?: AbortSignal }
  ): Promise<PaginatedBloodSugarHistory> {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const { periodType, days, month, startDate, endDate, limit, offset } = params;

    const reponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_blood_sugar_history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        ...options?.headers,
      } as HeadersInit,
      body: JSON.stringify({
        p_period_type: periodType,
        p_days: days,
        p_month: month,
        p_start_date: startDate,
        p_end_date: endDate,
        p_limit: limit,
        p_offset: offset,
      }),
      ...options,
    });

    const data = (await reponse.json()) as PaginatedBloodSugarHistory;

    return data;
  },

  // 모든 혈당 내역 조회
  async getAllBloodSugarHistory(params: AllHistoryParams): Promise<BloodSugarRecord[]> {
    const CHUNK_SIZE = 1000;
    let offset = 0;
    const allData: BloodSugarRecord[] = [];

    while (true) {
      const data = await this.getBloodSugarHistory({
        ...params,
        limit: CHUNK_SIZE,
        offset,
      });

      allData.push(...data.items);
      offset += CHUNK_SIZE;

      if (data.items.length < CHUNK_SIZE) break;
    }

    return allData;
  },
};
