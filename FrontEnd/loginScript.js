document.addEventListener("DOMContentLoaded", function () {
  let submitBtn = document.querySelector(".submit-btn");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  submitBtn.addEventListener("click", () => {
    tryLogin({ email: emailInput.value, password: passwordInput.value });
  });
});

async function tryLogin({ email, password }) {
  const baseUrl = "http://localhost:5678";
  const data = {
    email,
    password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(baseUrl + "/api/users/login", options);
    if (!response.ok) {
      let errorMessage = document.querySelector(".login-error");
      errorMessage.classList.add("login-error-visible");
      console.log("Erreur Status", response.status);
      throw new Error("Erreur serveur");
    }
    const responseData = await response.json();
    localStorage.setItem("token", responseData.token);
    window.location.href = "./index.html";
  } catch (error) {
    console.log("Erreur", error);
  }
}
