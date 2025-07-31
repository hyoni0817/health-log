//input.ts는 순수하게 input 요소의 이벤트 처리만 담당

/**
 * 숫자 이외의 키 입력을 방지하는 이벤트 핸들러
 * @param e 키 이벤트
 */
export const blockNonNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // 숫자 키 또는 Backspace, Delete, Tab, 화살표 키 등 허용
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

  // 숫자 키가 아니고, 허용된 키도 아니면 입력 차단
  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};
