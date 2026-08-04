import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { getBloodPressureStatus } from '@/features/blood-pressure/lib/status';

const BATCH_SIZE = 1000;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

/**
 * 혈압 상태 백필
 */
const backfillBloodPressureStatus = async () => {
  let cursor = 0;
  let processed = 0;

  while (true) {
    const { data: records, error } = await supabase
      .from('blood_pressure')
      .select('id, systolic_bp, diastolic_bp')
      .gt('id', cursor)
      .order('id', { ascending: true })
      .limit(BATCH_SIZE);

    if (error) throw error;
    if (!records || records.length === 0) break;

    const idsByStatus = new Map<string, number[]>();

    for (const record of records) {
      const status = getBloodPressureStatus(record.systolic_bp, record.diastolic_bp);
      const ids = idsByStatus.get(status) ?? [];
      ids.push(record.id);
      idsByStatus.set(status, ids);
    }

    for (const [status, ids] of idsByStatus) {
      const { error: updateError } = await supabase.from('blood_pressure').update({ status }).in('id', ids);

      if (updateError) throw updateError;
    }

    cursor = records[records.length - 1].id;
    processed += records.length;
    console.log(`${processed}건 완료 (마지막 id: ${cursor})`);

    if (records.length < BATCH_SIZE) break;
  }

  console.log(`백필 완료: 총 ${processed}건`);
};

backfillBloodPressureStatus().catch((error) => {
  console.error('백필 실패:', error);
  process.exit(1);
});
