const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const playPauseBtn = document.getElementById("playPause");
const repeatBtn = document.getElementById("repeat");
const volumeSlider = document.getElementById("volume");

let isPlaying = false;
let isRepeat = false;
let currentTrackIndex = 0;

const tracks = [
    { title: "Shape of You", artist: "Ed Sheeran", src: "assets/1.mp3", cover: "assets/i.jpeg" },
    { title: "Blinding Lights", artist: "The Weeknd", src: "assets/2.mp3", cover: "assets/p1.jpeg" },
    { title: "Stressed Out", artist: "Twenty One Pilots", src: "assets/3.m4a", cover: "assets/p2.jpeg" }
];

function loadTrack(index) {
    const track = tracks[index];
    title.textContent = track.title;
    artist.textContent = track.artist;
    cover.src = track.cover;
    audio.src = track.src;
    audio.load();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "▶";
    } else {
        audio.play();
        playPauseBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100;
}

function setProgress() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? "green" : "white";
}

function handleTrackEnd() {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        nextTrack();
    }
}

function setVolume() {
    audio.volume = volumeSlider.value;
    localStorage.setItem("playerVolume", volumeSlider.value);
}

// Загружаем первый трек и устанавливаем сохраненную громкость
document.addEventListener("DOMContentLoaded", () => {
    loadTrack(currentTrackIndex);
    const savedVolume = localStorage.getItem("playerVolume");
    if (savedVolume) {
        volumeSlider.value = savedVolume;
        audio.volume = savedVolume;
    }
});

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", handleTrackEnd);
progress.addEventListener("input", setProgress);
volumeSlider.addEventListener("input", setVolume);