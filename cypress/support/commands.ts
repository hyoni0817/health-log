/**
 * @description data-cy로 설정된 엘리먼트를 쉽게 찾을 수 있는 커스텀 API
 */
Cypress.Commands.add('getByCy', (text: string) => {
  return cy.get(`[data-cy="${text}"]`);
});
