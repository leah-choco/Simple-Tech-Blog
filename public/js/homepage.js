//Button clicked, take to sign-up page
const getStarted = async () => {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/signup");
    }  
};
  
//Button clicked, take to login page
const login = async () => {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/login");
    }
};
  
//document.querySelector(".start-button").addEventListener("click", getStarted);
//document.querySelector(".home-login-btn").addEventListener("click", login);
  