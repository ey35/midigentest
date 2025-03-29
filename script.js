const fileInput = document.getElementById('fileInput');
const addButton = document.getElementById('addButton');
const newPlaylistButton = document.getElementById('newPlaylistButton');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const playlistSection = document.getElementById('playlistSection');
const librarySection = document.getElementById('librarySection');
const playlistTab = document.getElementById('playlistTab');
const libraryTab = document.getElementById('libraryTab');
let tracks = [];
let playlists = [];

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
    tracks.forEach((track) => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.textContent = track.name;
        trackElement.addEventListener('click', () => {
            audioPlayer.src = track.url;
            audioPlayer.play();
        });
        playlist.appendChild(trackElement);
    });
}

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
        playlists.push(playlistName);
    }
});

playlistTab.addEventListener('click', () => {
    playlistSection.style.display = 'block';
    librarySection.style.display = 'none';
});

libraryTab.addEventListener('click', () => {
    playlistSection.style.display = 'none';
    librarySection.style.display = 'block';
});

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});
