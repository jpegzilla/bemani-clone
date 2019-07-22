// song file and pattern-related utilities

const getSongData = id => {
  // store the song data in global storage
  const getPattern = pattern => {
    return pattern;
  };

  const getMusic = pattern => {
    return music;
  };

  const getBackground = pattern => {
    return bg;
  };
  const getVideo = pattern => {
    return video;
  };

  // store.currentSong = songData;
};

// const readpattern = pattern => {};

// // timing utilities

// simple stopwatch class
class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.stopTime = 0;
    this.elapsed = 0;
  }

  start() {
    this.startTime = new Date().getTime();
    let elapsed = this.stopTime - this.startTime;
    let hour = 1000 * 60 * 60;
    let min = 1000 * 60;
    let sec = 1000;

    let h = parseInt(elapsed / hour);
    elapsed %= hour;

    let m = parseInt(elapsed / min);
    elapsed %= min;

    let s = parseInt(elapsed / sec);
    let ms = elapsed % sec;

    this.elapsed = {
      hours: h,
      minutes: m,
      seconds: s,
      milliseconds: ms
    };
  }

  stop() {
    this.stopTime = new Date().getTime();
    let elapsed = this.stopTime - this.startTime;
    let hour = 1000 * 60 * 60;
    let min = 1000 * 60;
    let sec = 1000;

    let h = parseInt(elapsed / hour);
    elapsed %= hour;

    let m = parseInt(elapsed / min);
    elapsed %= min;

    let s = parseInt(elapsed / sec);
    let ms = elapsed % sec;

    this.elapsed = {
      hours: h,
      minutes: m,
      seconds: s,
      milliseconds: ms
    };
  }

  reset() {
    this.elapsed = this.stopTime = this.startTime = 0;
  }

  getTime() {
    return this.elapsed;
  }
}

// input-related utilities

let defaultKeyBinds = {
  "4k": {
    1: "a",
    2: "s",
    3: "k",
    4: "l"
  },
  "5k": {
    1: "a",
    2: "s",
    3: "space",
    4: "j",
    5: "k"
  },
  "6k": {
    1: "a",
    2: "s",
    3: "d",
    4: "j",
    5: "k",
    6: "l"
  },
  "7k": {
    1: "a",
    2: "s",
    3: "d",
    4: "space",
    5: "j",
    6: "k",
    7: "l"
  },
  "8k": {
    1: "a",
    2: "s",
    3: "d",
    4: "f",
    5: "h",
    6: "j",
    7: "k",
    8: "l"
  },
  "9k": {
    1: "a",
    2: "s",
    3: "d",
    4: "f",
    5: "space",
    6: "h",
    7: "j",
    8: "k",
    9: "l"
  }
};

let isKeyPressed = false;

const getKeyCodeFromLetter = letter => letter.toUpperCase().charCodeAt(0);

const keyUp = e => {
  console.log(e);
};
const keyDown = e => {
  console.log(e);

  switch (state.screen) {
    case "loading":
      break;
    case "start-menu":
      break;
    case "song-select":
      break;
    default:
  }
};

document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);

// audio utils

let audioContext = new AudioContext();

// // utilities for managing in-game modifiers

// constants for in game modifiers

const BASE_SCORE = 0;
const BASE_SCORE_MULT = 1;
const BASE_SCROLL_SPEED = 1;

// // math utils
const randomInt = (min, max) =>
  Math.round(Math.random() * (max - min + 1)) + min;

// // loading screen utils

// set up loading screen

let randTextLine, randNum, lines;
let time = 0;
let file = "./../assets/text/loadingScreenText.txt";
let linecount = 58;

// choose random line numbers. linecount is the number of lines in the text file
const runLoadingFlavorText = () => {
  return new Promise((resolve, reject) => {
    const randLine1 = () => {
      let rt = Math.round(Math.random() * 1000);
      let interval = setInterval(() => {
        if (time <= linecount) {
          (function loop() {
            let rand = Math.round(Math.random() * 1000);
            setTimeout(() => {
              return addLoadingState();
            }, rand);
          })();
          time++;
        } else {
          clearInterval(interval);
          resolve("done");
        }
      }, rt);
    };

    const randLine2 = () => {
      let randTime = Math.round(Math.random() * 1000);
      let interval = setInterval(() => {
        if (time <= 26) {
          (function loop() {
            let rand = Math.round(Math.random() * 1000);
            setTimeout(() => {
              return addLoadingState();
            }, rand);
          })();
          time++;
        } else {
          clearInterval(interval);
        }
      }, randTime);
    };

    // if (time < linecount) {
    //   randLine1();
    //   randLine2();
    // }
    // just instantly resolve, for development purposes
    resolve();
  });
};

let prevLine1, prevLine2;
const loadingTextTop = document.querySelector(".preloader-text-top");
const loadingTextBottom = document.querySelector(".preloader-text-bottom");
// add a line of text to the loading text area.
const addLoadingState = () => {
  fetch(file)
    .then(t => t.text())
    .then(x => {
      let r1 = randomInt(0, 58);
      let r2 = randomInt(60, 71);
      let line1 = x.split("\n")[r1];
      let line2 = x.split("\n")[r2];

      if (prevLine1 != line1) {
        loadingTextTop.textContent = line1;
      }

      if (prevLine2 != line2) {
        loadingTextBottom.textContent = line2;
      }

      prevLine1 = line1;
      prevLine2 = line2;
    });
};

// convert text into an array of inline-block <span> elements (for more convenience in letter-
// by-letter text animation)
const toSpans = (text, element) => {
  let a = [];
  let letters = text.split("");
  for (let i = 0; i < letters.length; i++) {
    let span = document.createElement("span");
    // they need to display as 'inline-block' so they can be animated.
    span.style.display = "inline-block";
    if (/\s/.test(letters[i])) {
      span.innerHTML = "&nbsp;";
      element.appendChild(span);
      a.push(span);
    } else {
      span.style.cssText = `transition: translate 0.3s, opacity 0.3s;transition-delay: ${i *
        80}ms`;
      let cont = document.createTextNode(letters[i]);
      span.appendChild(cont);
      element.appendChild(span);
      a.push(span);
    }
  }
  return a;
};
