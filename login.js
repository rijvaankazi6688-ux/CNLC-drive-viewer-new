// Auto fill if Remember Me used
window.onload = () => {
  if (localStorage.getItem("remember") === "yes") {
    document.getElementById("email").value =
      localStorage.getItem("savedEmail") || "";

    document.getElementById("password").value =
      localStorage.getItem("savedPassword") || "";
  }

  // Auto login
  if (localStorage.getItem("remember") === "yes" &&
      localStorage.getItem("loggedIn") === "yes") {
    window.location.href = "index.html";
  }
};

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  document.getElementById("error").innerText = "";
  document.getElementById("loader").classList.remove("hidden");

  fetch("https://script.google.com/macros/s/AKfycbwcP1X5P2sIPi2aqpYdtKZOFE7-tXxkxHKWQv2IMfZAzdMf5d0O1pEtbwBhVj7Y-jtZ/exec", {
    method: "POST",
    body: JSON.stringify({ email, password })
  })
  .then(res => res.text())
  .then(res => {
    document.getElementById("loader").classList.add("hidden");

    if (res === "success") {

      localStorage.setItem("loggedIn", "yes");
      localStorage.setItem("remember", remember ? "yes" : "no");

      if (remember) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      document.getElementById("success").classList.remove("hidden");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);

    } else {
      document.getElementById("error").innerText =
        "Invalid email or password";
    }
  })
  .catch(() => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("error").innerText =
      "Network error. Try again!";
  });
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}


window.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("remember") === "yes") {
    document.getElementById("email").value =
      localStorage.getItem("savedEmail") || "";

    document.getElementById("password").value =
      localStorage.getItem("savedPassword") || "";

    document.getElementById("remember").checked = true;
  }

});

