let audio = new Audio();
let isPlaying = false;

document.getElementById("file-input").addEventListener("change", function() {
    let file = this.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        audio.src = event.target.result;
        document.getElementById("track-name").innerHTML = file.name;
    };

    reader.readAsDataURL(file);
});

function playPauseMusic() {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        document.getElementById("play-pause-button").innerHTML = "Pause";
    } else {
        audio.pause();
        isPlaying = false;
        document.getElementById("play-pause-button").innerHTML = "Play";
    }
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    document.getElementById("play-pause-button").innerHTML = "Play";
}

function adjustVolume(volume) {
    audio.volume = volume;
    document.querySelector("label[for='volume-slider']").innerHTML = `Volume: ${Math.round(volume * 100)}%`;
}

function updateProgress(progress) {
    audio.currentTime = (progress / 100) * audio.duration;
    document.querySelector("label[for='progress-slider']").innerHTML = `Progress: ${progress}%`;
}

audio.addEventListener("timeupdate", function() {
    let progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById("progress-slider").value = progress;
    document.querySelector("label[for='progress-slider']").innerHTML = `Progress: ${Math.round(progress)}%`;
    document.getElementById("track-duration").innerHTML = formatTime(audio.currentTime);
});

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return (number < 10 ? "0" : "") + number;
}
