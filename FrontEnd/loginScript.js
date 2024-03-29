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

function init() {
  let submitBtn = document.querySelector(".submit-btn");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  submitBtn.addEventListener("click", () => {
    tryLogin({ email: emailInput.value, password: passwordInput.value });
  });
}

init();

// enlever domlistener et mettre script defer dans login.html & index.html OK
// mettre a href dans les <li> avec # OK
// figure dataset de la categori pour filtrer avec css en fonction du dataset et hidden les figures quand on switch de category OK
// passer directement "data" dans renderWorkItem et c'est lui qui vient chercher quelle data il prend OK
// live server pour localstorage OK
// enlever "Tous" en category du html et le push de base dans let allCategory = []; en position 0 OK
