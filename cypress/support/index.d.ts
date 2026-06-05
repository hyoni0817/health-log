declare namespace Cypress {
  interface Chainable {
    getByCy(text: string): Chainable<JQuery<HTMLElement>>;
  }
}
