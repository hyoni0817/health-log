//input.ts는 순수하게 input 요소의 이벤트 처리만 담당

/**
 * 입력된 값에서 숫자가 아닌 문자를 제거하는 이벤트 핸들러
 * @param e 입력 이벤트
 */
export const filterNonNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const numericValue = target.value.replace(/[^0-9]/g, '');

  if (target.value !== numericValue) {
    target.value = numericValue;
  }
};
