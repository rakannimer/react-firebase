/// <reference types="Cypress" />

context("Database", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should exists", () => {
    const list = cy.get("[data-testid=list]");
    const item = cy.get("[data-testid=item]");
    item.should("have.length", 2);
    console.warn(list, item);
  });
});
