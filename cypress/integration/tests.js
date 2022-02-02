/* eslint-disable no-undef */
beforeEach(() => {
  cy.task("resetDb");
});

// Wrap tests in a describe to run together

describe("homepage tests", () => {
  it("can find homepage", () => {
    cy.visit("/");
  });

  it("can find title on home page", () => {
    cy.visit("/");
    cy.get("h1").contains("Petarazzi");
  });

  // Check if CSS is applied

  it("can link to css", () => {
    cy.visit("/");
    cy.get("h1").should("have.css", "color", "rgb(219, 112, 147)");
  });
});

// Can sign up
describe("check homepage links", () => {
  it("sign up link redirects to sign up page", () => {
    cy.visit("/");
    cy.get("a").contains("Sign up").click();
    cy.url().should("include", "/sign-up");
  });

  // Can log in
  it("log in link redirects to log in page", () => {
    cy.visit("/");
    cy.get("a").contains("Log in").click();
    cy.url().should("include", "/log-in");
  });
});
