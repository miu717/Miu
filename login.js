let currentUser = null;

function openLogin() {
  document.getElementById("loginModal").classList.remove("hidden");
}

function closeLogin() {
  document.getElementById("loginModal").classList.add("hidden");
}

function loginUser() {
  const username = document.getElementById("username").value;
  if (username.length < 3) return alert("Username must be at least 3 characters long.");

  currentUser = {
    name: username,
    likes: [],
    playlist: [],
    followers: Math.floor(Math.random() * 500),
    listeningHours: 0
  };

  localStorage.setItem("miuUser", JSON.stringify(currentUser));
  updateLoginUI();
  closeLogin();
}

function updateLoginUI() {
  const loginArea = document.getElementById("loginArea");
  if (currentUser) {
    loginArea.innerHTML = `<span>Welcome, ${currentUser.name}</span>`;
  } else {
    loginArea.innerHTML = `<button onclick="openLogin()">Login / Register</button>`;
  }
}

function checkLogin() {
  const saved = localStorage.getItem("miuUser");
  if (saved) {
    currentUser = JSON.parse(saved);
    updateLoginUI();
  }
}

checkLogin();
