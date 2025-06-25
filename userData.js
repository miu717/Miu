// Playlist Modal Control
function openPlaylist() {
  const modal = document.getElementById("playlistModal");
  const list = document.getElementById("playlistItems");
  list.innerHTML = "";

  if (currentUser && currentUser.playlist.length > 0) {
    currentUser.playlist.forEach(title => {
      const li = document.createElement("li");
      li.innerText = title;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = "<li>No audios in playlist.</li>";
  }
  modal.classList.remove("hidden");
}

function closePlaylist() {
  document.getElementById("playlistModal").classList.add("hidden");
}

// Profile Modal Control
function openProfile() {
  const modal = document.getElementById("profileModal");
  const profile = document.getElementById("profileInfo");

  if (currentUser) {
    const likes = currentUser.likes.length;
    const playlistCount = currentUser.playlist.length;
    const followers = currentUser.followers;
    const hours = currentUser.listeningHours;

    profile.innerHTML = `
      <p>👤 <strong>${currentUser.name}</strong></p>
      <p>❤️ Likes: ${likes}</p>
      <p>🎵 Playlist: ${playlistCount} audios</p>
      <p>👥 Followers: ${followers}</p>
      <p>⏱ Listening: ${hours} hours</p>
    `;
  } else {
    profile.innerHTML = "<p>Please login to view your profile.</p>";
  }
  modal.classList.remove("hidden");
}

function closeProfile() {
  document.getElementById("profileModal").classList.add("hidden");
}

// Update Like and Playlist Functions
function likeAudio(title) {
  if (currentUser) {
    if (!currentUser.likes.includes(title)) {
      currentUser.likes.push(title);
      localStorage.setItem("miuUser", JSON.stringify(currentUser));
      alert(`You liked: ${title}`);
    } else {
      alert("Already liked.");
    }
  } else {
    alert("Login to like audios.");
  }
}

function addToPlaylist(title) {
  if (currentUser) {
    if (!currentUser.playlist.includes(title)) {
      currentUser.playlist.push(title);
      localStorage.setItem("miuUser", JSON.stringify(currentUser));
      alert(`Added to playlist: ${title}`);
    } else {
      alert("Already in playlist.");
    }
  } else {
    alert("Login to save to playlist.");
  }
}
