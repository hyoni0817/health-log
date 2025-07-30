//input.ts는 순수하게 input 요소의 이벤트 처리만 담당

/**
 * 숫자 이외의 키 입력을 방지하는 이벤트 핸들러
 * @param e 키 이벤트
 */
export const blockNonNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};
