const songsList = document.getElementById('songs-list');
const addSongForm = document.getElementById('add-song-form');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImage = document.getElementById('current-song-image');
const songFileInput = document.getElementById('song-file');
const audioElement = new Audio();

let songs = [];

function renderSongs()
