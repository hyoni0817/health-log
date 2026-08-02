import { bloodPressureApi, BloodPressurePayload } from '@/entities/blood-pressure/model';
import { bloodPressureQueries } from '@/entities/blood-pressure/model/api/bloodPressure.queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 혈압 기록 추가 hook
 * @returns 혈압 기록 추가 react-query 뮤테이션
 */
export const useCreateBloodPressure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BloodPressurePayload) => bloodPressureApi.createBloodPressure(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bloodPressureQueries.all() });
    },
  });
};
