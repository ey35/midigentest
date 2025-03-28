class MusicPlayer {
  private audio: HTMLAudioElement;
  private playlist: { file: File; name: string; url: string }[];
  private currentIndex: number;
  private isPlaying: boolean;

  private playlistElement: HTMLElement;
  private fileInput: HTMLInputElement;
  private seekBar: HTMLElement;
  private seekBarFill: HTMLElement;
  private currentTimeElement: HTMLElement;
  private durationElement: HTMLElement;
  private playPauseBtn: HTMLElement;
  private prevBtn: HTMLElement;
  private nextBtn: HTMLElement;
  private trackName: HTMLElement;

  constructor() {
    this.audio = new Audio();
    this.playlist = [];
    this.currentIndex = 0;
    this.isPlaying = false;

    this.initializeElements();
    this.setupEventListeners();
  }

  private initializeElements(): void {
    this.playlistElement = document.getElementById("playlist")!;
    this.fileInput = document.getElementById("file-input") as HTMLInputElement;
    this.seekBar = document.getElementById("seek-bar")!;
    this.seekBarFill = document.querySelector(".seek-bar-fill")!;
    this.currentTimeElement = document.querySelector(".current-time")!;
    this.durationElement = document.querySelector(".duration")!;
    this.playPauseBtn = document.querySelector(".play-pause")!;
    this.prevBtn = document.querySelector(".prev")!;
    this.nextBtn = document.querySelector(".next")!;
    this.trackName = document.querySelector(".track-name")!;
  }

  private setupEventListeners(): void {
    this.fileInput.addEventListener("change", (e) => this.handleFileSelect(e));
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());
    this.prevBtn.addEventListener("click", () => this.playPrevious());
    this.nextBtn.addEventListener("click", () => this.playNext());
    this.seekBar.addEventListener("click", (e) => this.handleSeek(e));

    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("ended", () => this.playNext());
  }

  private handleFileSelect(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files!);
    files.forEach((file) => {
      const song = {
        file: file,
        name: file.name,
        url: URL.createObjectURL(file)
      };
      this.playlist.push(song);
    });
    this.updatePlaylist();
    if (this.playlist.length === files.length) {
      this.loadSong(0);
    }
  }

  private updatePlaylist(): void {
    this.playlistElement.innerHTML = "";
    this.playlist.forEach((song, index) => {
      const songElement = document.createElement("div");
      songElement.className = `song-item ${index === this.currentIndex ? "active" : ""}`;
      songElement.innerHTML = `
                <span class="song-title">${song.name}</span>
            `;
      songElement.addEventListener("click", () => this.loadSong(index));
      this.playlistElement.appendChild(songElement);
    });
  }

  private loadSong(index: number): void {
    if (index < 0 || index >= this.playlist.length) return;

    this.currentIndex = index;
    this.audio.src = this.playlist[index].url;
    this.updatePlaylist();
    this.trackName.textContent = this.playlist[index].name;

    if (this.isPlaying) {
      this.audio.play();
      this.playPauseBtn.textContent = "⏸";
    }
  }

  private togglePlayPause(): void {
    if (!this.playlist.length) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.playPauseBtn.textContent = "▶";
    } else {
      this.audio.play();
      this.playPauseBtn.textContent = "⏸";
    }
    this.isPlaying = !this.isPlaying;
  }

  private playPrevious(): void {
    const newIndex = this.currentIndex - 1;
    if (newIndex >= 0) {
      this.loadSong(newIndex);
      if (this
