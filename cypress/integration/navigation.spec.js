describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
  const testName = "test name";
  const editName = "test name2";
  it("should book an interview", () => {
    cy.visit("/");
    cy.get("main.appointment__add") // Select all parent containers
      .should("be.visible") // Ensure it's only selecting the visible ones
      .find("img.appointment__add-button:visible:first") // Find the first visible image button within the chosen parent container
      .click({ multiple: true });
    cy.get("[data-testid=student-name-input]").type(testName);
    cy.get(".interviewers__item:first").click();
    cy.contains("Save").click();
    cy.get(".schedule").contains(testName);
  });

  it("should edit an interview", () => {
    cy.visit("/");
    cy.contains(testName) // Replace with the text that identifies the specific appointment
      .parents(".appointment__card--show") // Find the parent container with the class `.appointment__card--show`
      .trigger("mouseover"); // Simulate a mouseover event on the parent container

    cy.contains(testName) // Locate the appointment title again
      .parents(".appointment__card--show") // Find the parent container again
      .find("[data-testid=editbutton]") // Locate the edit button
      .invoke("click");
    cy.get("[data-testid=student-name-input]").type(editName);
    cy.get(".interviewers__item:first").click();
    cy.contains("Save").click();
    cy.get(".schedule").contains(editName);
  });

  it("should cancel an interview", () => {
    cy.visit("/");
    cy.contains(editName) // Replace with the text that identifies the specific appointment
      .parents(".appointment__card--show") // Find the parent container with the class `.appointment__card--show`
      .trigger("mouseover"); // Simulate a mouseover event on the parent container

    cy.contains(editName) // Locate the appointment title again
      .parents(".appointment__card--show") // Find the parent container again
      .find("[data-testid=deletebutton]") // Locate the edit button
      .invoke("click");

    cy.contains("Confirm").click();
    cy.get(".schedule").should("not.contain", editName);
  });
});
