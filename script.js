// Dummy audio data
const audios = [
  {
    title: "Inspiration Wakeup",
    url: "audio/motivation.mp3",
    thumb: "https://via.placeholder.com/300",
    category: "Motivation",
    isPaid: false,
    playedOnce: false
  },
  {
    title: "Sad Vibes",
    url: "audio/sad.mp3",
    thumb: "https://via.placeholder.com/300",
    category: "Sad",
    isPaid: true,
    playedOnce: false
  }
];

const audioList = document.getElementById("audioList");
const searchBar = document.getElementById("searchBar");
const themeToggle = document.getElementById("themeToggle");
const uploadForm = document.getElementById("uploadForm");

function loadAudios(filter = "") {
  audioList.innerHTML = "";
  audios.filter(a => a.title.toLowerCase().includes(filter.toLowerCase()) || a.category.includes(filter)).forEach(audio => {
    const card = document.createElement("div");
    card.className = "audio-card";
    card.innerHTML = `
      <img src="${audio.thumb}" alt="Thumb">
      <div class="audio-title">${audio.title}</div>
      <audio controls ${audio.isPaid && audio.playedOnce ? "disabled" : ""}>
        <source src="${audio.url}" type="audio/mpeg">
      </audio>
      <div class="audio-actions">
        <button onclick="likeAudio('${audio.title}')">❤️</button>
        <button onclick="addToPlaylist('${audio.title}')">➕</button>
        <button onclick="shareAudio('${audio.title}')">🔗</button>
        ${audio.isPaid && audio.playedOnce ? '<span>🔒 Pro</span>' : ""}
      </div>
    `;
    card.querySelector("audio").addEventListener("ended", () => {
      if (audio.isPaid) audio.playedOnce = true;
      loadAudios(searchBar.value);
    });
    audioList.appendChild(card);
  });
}

function likeAudio(title) {
  alert(`You liked: ${title}`);
}

function addToPlaylist(title) {
  alert(`Added to playlist: ${title}`);
}

function shareAudio(title) {
  alert(`Share link copied for: ${title}`);
}

function submitAudio() {
  const title = document.getElementById("title").value;
  const url = document.getElementById("audioURL").value;
  const thumb = document.getElementById("thumbURL").value;
  const category = document.getElementById("categorySelect").value;
  const isPaid = document.getElementById("isPaid").checked;
  audios.push({ title, url, thumb, category, isPaid, playedOnce: false });
  closeUploadForm();
  loadAudios();
}

function openUploadForm() {
  uploadForm.classList.remove("hidden");
}
function closeUploadForm() {
  uploadForm.classList.add("hidden");
}

searchBar.addEventListener("input", e => loadAudios(e.target.value));

document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", () => loadAudios(btn.innerText));
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

// Initial load
loadAudios();
