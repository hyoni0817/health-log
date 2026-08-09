import { supabase } from '@/shared/api/supabaseClient';
import {
  BloodPressurePayload,
  BloodPressureRecord,
  BloodPressureStatsSummaryRecord,
  BloodPressureTrendRecord,
} from '../type/bloodPressure';
import { RangeDate } from '@/shared/types/measurement';
import { AllHistoryParams, HistoryParams, PaginatedHistory } from '@/shared/types/history';
import { StatsSummaryParams } from '@/shared/types/stats';

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
  async getSystolicPressureTrend(
    days?: number,
    startDate?: RangeDate,
    endDate?: RangeDate
  ): Promise<BloodPressureTrendRecord[]> {
    const query = await supabase.rpc('get_systolic_pressure_trend', {
      days: days ?? null,
      start_date: startDate ?? null,
      end_date: endDate ?? null,
    });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  },

  // 이완기 혈압 추이 조회
  async getDiastolicPressureTrend(
    days?: number,
    startDate?: RangeDate,
    endDate?: RangeDate
  ): Promise<BloodPressureTrendRecord[]> {
    const query = await supabase.rpc('get_diastolic_pressure_trend', {
      days: days ?? null,
      start_date: startDate ?? null,
      end_date: endDate ?? null,
    });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  },

  // 혈압 통계 요약 조회
  async getBloodPressureStatsSummary(params: StatsSummaryParams): Promise<BloodPressureStatsSummaryRecord | null> {
    const { days, startDate, endDate } = params;
    const query = await supabase.rpc('get_blood_pressure_stats_summary', {
      days: days ?? null,
      start_date: startDate ?? null,
      end_date: endDate ?? null,
    });

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  },

  // 혈압 내역 조회
  async getBloodPressureHistory(
    params: HistoryParams,
    options?: { headers?: HeadersInit; signal?: AbortSignal }
  ): Promise<PaginatedHistory<BloodPressureRecord>> {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const { periodType, days, month, startDate, endDate, limit, offset } = params;

    const reponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_blood_pressure_history`, {
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

    const data = (await reponse.json()) as PaginatedHistory<BloodPressureRecord>;

    return data;
  },

  // 모든 혈압 내역 조회
  async getAllBloodPressureHistory(params: AllHistoryParams): Promise<BloodPressureRecord[]> {
    const CHUNK_SIZE = 1000;
    let offset = 0;
    const allData: BloodPressureRecord[] = [];

    while (true) {
      const data = await this.getBloodPressureHistory({
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
