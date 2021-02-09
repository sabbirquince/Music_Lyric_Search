const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  document.querySelector(".search-result").innerHTML = "";
  document.querySelector(".single-lyrics").innerText = "";

  const inputValue = document.getElementById("input-value").value;

  const url = `https://api.lyrics.ovh/suggest/${inputValue}`;
  const response = await fetch(url);
  const data = await response.json();
  showingSong(data.data);
});

/////////// SHOWING SEARCH RESULT FUNCTION //////////////

const showingSong = (info) => {
  info.forEach((singleSong) => {
    const songDetailsDiv = document.querySelector(".search-result");
    const singleDiv = document.createElement("div");
    singleDiv.className = "single-result row align-items-center my-3 p-3";

    const songName = singleSong.title;
    const songAuthor = singleSong.artist.name;
    const songPreview = singleSong.preview;

    const singleSongDom = `
      <div class="col-md-9">
            <h3 class="lyrics-name">${songName}</h3>
            <p class="author lead">Album by <span class="artist-name">${songAuthor}</span></p>

            <audio controls>
              <source src="${songPreview}" type="audio/ogg">
            </audio>
      </div>
      <div class="col-md-3 text-md-right text-center">
           <button class="lyric-button btn btn-success">Get Lyrics</button>
      </div>
    `;

    singleDiv.innerHTML = singleSongDom;
    songDetailsDiv.appendChild(singleDiv);
  });

  showingLyric();
};

/////////////// EXECUTING SHOWING LYRICS PROCESS /////////

function showingLyric() {
  const lyricButtons = document.querySelectorAll(".lyric-button");

  for (let i = 0; i < lyricButtons.length; i++) {
    const button = lyricButtons[i];

    button.addEventListener("click", async () => {
      const artistName = document.querySelectorAll(".artist-name")[i].innerText;
      const songAuthorJoined = splittingAndJoining(artistName);

      const songName = document.querySelectorAll(".lyrics-name")[i].innerText;
      const songNameJoined = splittingAndJoining(songName);

      const url = `https://api.lyrics.ovh/v1/${songAuthorJoined}/${songNameJoined}`;
      const response = await fetch(url);
      const data = await response.json();
      lyricInDom(data);
    });
  }
}

////////// SHOWING LYRICS IN DOM FUNCTION /////////////

const lyricInDom = (info) => {
  const lyricDiv = document.querySelector(".single-lyrics");
  lyricDiv.innerText = info.lyrics;
};

/////////// SPLITTING AND JOINING STRING FUNCTION

const splittingAndJoining = (string) => {
  const initial = string;
  const splitted = initial.split(" ");
  const joined = splitted.join("_");
  return joined;
};
