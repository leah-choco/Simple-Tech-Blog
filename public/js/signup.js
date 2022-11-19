const signupFormHandler = async function (event) {
  event.preventDefault();

  const name = document.querySelector("#name-input-signup");
  const email = document.querySelector("#email-input-signup");
  const password = document.querySelector("#password-input-signup");

  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up");
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
