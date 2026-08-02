import { bloodSugarApi, bloodSugarQueries, BloodSugarRecord } from '@/entities/blood-sugar/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 혈당 기록 삭제 hook
 * @returns 혈당 기록 삭제 react-query 뮤테이션
 */
export const useDeleteBloodSugar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: BloodSugarRecord['id']) => bloodSugarApi.deleteBloodSugarHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bloodSugarQueries.all(),
      });
    },
  });
};
