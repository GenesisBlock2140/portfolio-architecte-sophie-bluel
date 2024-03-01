document.addEventListener("DOMContentLoaded", function () {
  let submitBtn = document.querySelector(".submit-btn");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  submitBtn.addEventListener("click", () => {
    console.log(emailInput.value, passwordInput.value);
  });
});

const tryLogin = () => {
  try {
    // tenter la connexion
  } catch (error) {
    console.log(error);
  }
};
