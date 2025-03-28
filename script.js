let currentSongIndex = 0;
let currentPlaylist = "Default";
let songs = {
    "Default": []
};

const audio = new Audio();
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImage = document.getElementById('current-song-image');
const progressBar = document.getElementById('progress-bar-range');
const playlistList = document.getElementById('playlist-list');

const addSongForm = document.getElementById('add-song-form');
const songFileInput = document.getElementById('song-file');
const songTitleInput = document.getElementById('song-title');
const songArtistInput = document.getElementById('song-artist');

const homeBtn = document.getElementById('home-btn');
const searchBtn = document.getElementById('search-btn');
const libraryBtn = document.getElementById('library-btn');
const createPlaylistBtn = document.getElementById('create-playlist-btn');
const mainContent = document.getElementById('main-content');

// Render Songs for a playlist
function renderSongs() {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    songs[currentPlaylist].forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerHTML = `
            <img src="${song.albumArt}" alt="Album Art">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
        `;
        songItem.addEventListener('click', () => playSong(index));
        songsContainer.appendChild(songItem);
    });
}

// Add Song to the current playlist
function addSong(file, title, artist) {
    const song = {
        title,
        artist,
        file: URL.createObjectURL(file),
        albumArt: 'https://via.placeholder.com/60',
    };
    songs[currentPlaylist].push(song);
    renderSongs();
}

// Handle Audio Playback
function playSong(index) {
    currentSongIndex = index;
    const song = songs[currentPlaylist][currentSongIndex];
    audio.src = song.file;
    audio.play();
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    currentSongImage.src = song.albumArt;
    playPauseBtn.textContent = 'Pause';
}

// Add Event Listeners
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

addSongForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = songFileInput.files[0];
    const title = songTitleInput.value;
    const artist = songArtistInput.value;
    addSong(file, title, artist);
    addSongForm.reset();
});

// Play/Pause Button
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Previous and Next Buttons
prevBtn.addEventListener('click', () => {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSongIndex < songs[currentPlaylist].length - 1) {
        playSong(currentSongIndex + 1);
    }
});

// Create Playlist Button
createPlaylistBtn.addEventListener('click', () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && !songs[playlistName]) {
        songs[playlistName] = [];
        const playlistItem = document.createElement('li');
        playlistItem.textContent = playlistName;
        playlistItem.addEventListener('click', () => {
            currentPlaylist = playlistName;
            renderSongs();
        });
        playlistList.appendChild(playlistItem);
    }
});

// Tab Navigation
homeBtn.addEventListener('click', () => {
    mainContent.innerHTML = `
        <h1>Your Playlist</h1>
        <div class="songs-container" id="songs-container"></div>
        <form id="add-song-form">
            <input type="file" id="song-file" accept="audio/*" required>
            <input type="text" id="song-title" placeholder="Song Title" required>
            <input type="text" id="song-artist" placeholder="Artist" required>
            <button type="submit">Add Song</button>
        </form>
    `;
    renderSongs();
});

searchBtn.addEventListener('click', () => {
    mainContent.innerHTML = `<h1>Search Songs</h1>`;
});

libraryBtn.addEventListener('click', () => {
    mainContent.innerHTML = `<h1>Your Library</h1>`;
});
