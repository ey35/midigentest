const fileInput = document.getElementById('fileInput');
const addButton = document.getElementById('addButton');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
let tracks = [];

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

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});
