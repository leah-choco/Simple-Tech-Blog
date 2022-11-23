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
