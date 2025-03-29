const fileInput = document.getElementById('fileInput');
const addButton = document.getElementById('addButton');
const newPlaylistButton = document.getElementById('newPlaylistButton');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const nextTrackButton = document.getElementById('nextTrackButton');
const prevTrackButton = document.getElementById('prevTrackButton');

let tracks = [];
let currentTrackIndex = 0;
let isPlaying = false;

addButton.addEventListener('click', () => {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'audio/mp3') {
            const trackURL = URL.createObjectURL(file);
            tracks.push({ name: file.name, url: trackURL });
            updatePlaylist();
        }
    }
    fileInput.value = ''; // Clear the input
});

function updatePlaylist() {
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.textContent = track.name;
        trackElement.addEventListener('click', () => {
            currentTrackIndex = index;
            playTrack();
        });
        playlist.appendChild(trackElement);
    });
}

function playTrack() {
    if (tracks.length > 0) {
        audioPlayer.src = tracks[currentTrackIndex].url;
        audioPlayer.play();
        isPlaying = true;
        playPauseButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        updateTrackDetails();
    }
}

function updateTrackDetails() {
    const currentTrack = tracks[currentTrackIndex];
    const trackElement = document.querySelector('.track');
    const artistElement = document.querySelector('.artist');
    trackElement.textContent = currentTrack.name;
    artistElement.textContent = "Artist Name"; // Placeholder for artist name
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }
    isPlaying = !isPlaying;
});

nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack();
});

prevTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack();
});

newPlaylistButton.addEventListener('click', () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
        const newPlaylist = document.createElement('div');
        newPlaylist.className = 'track';
        newPlaylist.textContent = playlistName;
        newPlaylist.addEventListener('click', () => {
            alert("Feature to view/edit this playlist will be implemented.");
        });
        playlist.appendChild(newPlaylist);
    }
});

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});
