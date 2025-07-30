window.addEventListener("load", () => {

    const song = document.getElementById("startSong");

    song.volume = 0.3;

    song.play();

    song.loop = true;
});