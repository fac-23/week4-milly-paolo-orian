const form = document.querySelector("form");
const inputElements = document.querySelectorAll("input");

// add event listener to form
form.addEventListener("submit", (event) => {
  const allInputsValid = form.checkValidity();
  if (!allInputsValid) {
    event.preventDefault();
  }
});

// loop through all inputs
inputElements.forEach((input) => {
  // sets aria-invalid = false for every input element
  input.setAttribute("aria-invalid", false);

  // attaches an event listener on every input element and if an invalid event is triggered it sets the aria-invalid attribute to true
  input.addEventListener("invalid", () => {
    input.setAttribute("aria-invalid", true);
    // console.log(input.validationMessage);
    const errorId = input.id + "Error";
    const errorDiv = form.querySelector("#" + errorId);
    errorDiv.textContent = input.validationMessage;
  });

  input.addEventListener("input", () => {
    input.setAttribute("aria-invalid", false);
    const errorId = input.id + "Error";
    const errorDiv = form.querySelector("#" + errorId);
    errorDiv.textContent = "";
  });
});