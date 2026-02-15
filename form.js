// Get both forms
const loginForm = document.getElementById("LoginForm");
const signupForm = document.getElementById("signupform");
const message = document.getElementById("message");

// Handle signup
signupForm.addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  const name = document.getElementById("signupname").value.trim();
  const email = document.getElementById("signupemail").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  // Retrieve existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.some(user => user.email === email)) {
    message.textContent = "This email is already registered. Please log in.";
    return;
  }

  // Add new user
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = `Signup successful! Welcome, ${name}.`;
  signupForm.reset();
});

// Handle login
loginForm.addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  const email = document.getElementById("LoginEmail").value.trim();
  const password = document.getElementById("loginpassword").value.trim();

  if (!email || !password) {
    message.textContent = "Please enter both email and password.";
    return;
  }

  // Retrieve users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find matching user
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    message.textContent = `Welcome back, ${user.name}!`;
  } else {
    message.textContent = "Invalid credentials. Please try again or sign up.";
  }

  loginForm.reset();
});


