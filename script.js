// script.js
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const playlist = document.getElementById("playlist");

    fileInput.addEventListener("change", (event) => {
        const files = event.target.files;
        for (let file of files) {
            const audioURL = URL.createObjectURL(file);
            const trackDiv = document.createElement("div");
            trackDiv.innerHTML = `
                <button onclick="playTrack('${audioURL}')">Play</button>
                ${file.name}
            `;
            playlist.appendChild(trackDiv);
        }
    });
});

function playTrack(url) {
    const audio = new Audio(url);
    audio.play();
}
