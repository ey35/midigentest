let currentSongIndex = 0;
let songs = [];
const audio = new Audio();
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImage = document.getElementById('current-song-image');
const progressBar = document.getElementById('progress');

const addSongForm = document.getElementById('add-song-form');
const songFileInput = document.getElementById('song-file');
const songTitleInput = document.getElementById('song-title');
const songArtistInput = document.getElementById('song-artist');

function renderSongs() {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    songs.forEach((song, index) => {
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

function playSong(index) {
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    audio.src = song.file;
    audio.play();
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    currentSongImage.src = song.albumArt;
    playPauseBtn.textContent = 'Pause';
}

function addSong(file, title, artist) {
    const song = {
        title,
        artist,
        file: URL.createObjectURL(file),
        albumArt: 'https://via.placeholder.com/60',
    };
    songs.push(song);
    renderSongs();
}

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
});

addSongForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = songFileInput.files[0];
    const title = songTitleInput.value;
    const artist = songArtistInput.value;
    addSong(file, title, artist);
    addSongForm.reset();
});

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSongIndex < songs.length - 1) {
        playSong(currentSongIndex + 1);
    }
});
