import { bloodSugarApi, type BloodSugarPayload } from '@/entities/blood-sugar/model';
import { useMutation } from '@tanstack/react-query';

/**
 * 혈당 기록 추가 hook
 * @returns 혈당 기록 추가 react-query 뮤테이션
 */
export const useCreateBloodSugar = () => {
  return useMutation({
    mutationFn: (data: BloodSugarPayload) => bloodSugarApi.createGlucose(data),
  });
};
