// script.js
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const playlist = document.getElementById("playlist");
    const audioPlayer = document.getElementById("audioPlayer");
    const trackName = document.getElementById("trackName");
    
    function showTab(tabId) {
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });
        document.getElementById(tabId).style.display = "block";
    }
    
    fileInput.addEventListener("change", (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const listItem = document.createElement("li");
                listItem.textContent = file.name;
                listItem.addEventListener("click", () => {
                    const objectURL = URL.createObjectURL(file);
                    audioPlayer.src = objectURL;
                    trackName.textContent = file.name;
                    audioPlayer.play();
                });
                playlist.appendChild(listItem);
            });
        }
    });

    window.showTab = showTab;
});
