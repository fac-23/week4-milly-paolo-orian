/* eslint-disable no-undef */
beforeEach(() => {
  cy.task("resetDb");
});

// Wrap tests in a describe to run together

// HOME PAGE //

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

// SIGN UP PAGE //

describe("Sign Up pages tests", () => {
  it("Should be able to sign up a user and set a cookie", () => {
    cy.visit("/sign-up");

    cy.clearCookie("sid");

    cy.getCookie("sid").should("not.exist");

    cy.get("form").find("input[type='text']").type("Mario");
    cy.get("form").find("input[type='email']").type("mario@nintendo");
    cy.get("form").find("input[type='password']").type("iammario");

    cy.get("button").click();

    cy.getCookie("sid").should("exist");
  });
});

// LOG IN PAGE //

describe("Log in page tests", () => {
  it("Can Log in a user", () => {
    cy.visit("/sign-up");

    cy.clearCookie("sid");

    cy.getCookie("sid").should("not.exist");

    cy.get("form").find("input[type='text']").type("Mario");
    cy.get("form").find("input[type='email']").type("mario@nintendo");
    cy.get("form").find("input[type='password']").type("iammario");

    cy.get("button").click();

    cy.visit("/profile");
    cy.get('button:contains("Log Out")').click();
    // cy.get("button").contains("Log Out").click();

    // cy.visit("/login");

    // cy.get("a");

    // cy.getCookie("sid").should("exist");
  });
});

// PROFILE PAGE //

// Should redirect to home if not logged in

describe("Profile page tests", () => {
  it("Should not display content if not logged in", () => {
    // checks if we get 401: Unauthorized in the body of the response
    cy.intercept("GET", "/profile", (req, res) => {
      expect(res.body).to.include("401: Unauthorized");
    });

    cy.get("h1").contains("You must log in to view this content!");
  });
});
