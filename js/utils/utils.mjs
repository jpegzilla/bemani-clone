// things for storage

class ItemStore {
  constructor() {
    this.storage = window.localStorage;
    this.items = {};
  }
}

const STORE = new ItemStore();

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

const utils = {
  keymap: {
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    a: 65,
    alt: 18,
    b: 66,
    c: 67,
    caps: 20,
    ctrl: 17,
    d: 68,
    down: 40,
    e: 69,
    enter: 13,
    equal: 187,
    start: 13,
    f: 70,
    f1: 112,
    f10: 121,
    f11: 122,
    f12: 123,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    left: 37,
    m: 77,
    minus: 189,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    right: 39,
    s: 83,
    shift: 16,
    space: 32,
    t: 84,
    u: 85,
    up: 38,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90
  },
  BASE_SCORE: 0,
  BASE_SCORE_MULT: 1,
  BASE_SCROLL_SPEED: 1,
  defaultKeyBinds: defaultKeyBinds,
  getKeyCodeFromLetter: letter => letter.toUpperCase().charCodeAt(0),
  randomInt: (min, max) => Math.round(Math.random() * (max - min + 1)) + min
};

// // utilities for managing in-game modifiers

// constants for in game modifiers

utils.BASE_SCORE = BASE_SCORE;

// set up loading screen

let randTextLine, randNum, lines;
let time = 0;
let file = "./../assets/text/loadingScreenText.txt";
let linecount = 58;

// choose random line numbers. linecount is the number of lines in the text file
utils.runLoadingFlavorText = () => {
  return new Promise(resolve => {
    const randLine1 = () => {
      let rt = Math.round(Math.random() * 500);
      let interval = setInterval(() => {
        if (time <= linecount) {
          (() => {
            let rand = Math.round(Math.random() * 500);
            setTimeout(() => addLoadingState(), rand);
          })();
          time++;
        } else {
          clearInterval(interval);
          resolve("done");
        }
      }, rt);
    };

    const randLine2 = () => {
      let randTime = Math.round(Math.random() * 500);
      let interval = setInterval(() => {
        if (time <= 26) {
          (() => {
            let rand = Math.round(Math.random() * 500);
            setTimeout(() => utils.addLoadingState(), rand);
          })();
          time++;
        } else {
          clearInterval(interval);
        }
      }, randTime);
    };

    if (time < linecount) {
      randLine1();
      randLine2();
    }
    // just instantly resolve, for development purposes
    // resolve();
  });
};

let prevLine1, prevLine2;
const loadingTextTop = document.querySelector(".preloader-text-top");
const loadingTextBottom = document.querySelector(".preloader-text-bottom");
// add a line of text to the loading text area.
utils.addLoadingState = () => {
  fetch(file)
    .then(t => t.text())
    .then(x => {
      let r1 = utils.randomInt(0, 58);
      let r2 = utils.randomInt(60, 71);
      let line1 = x.split("\n")[r1];
      let line2 = x.split("\n")[r2];

      if (prevLine1 != line1) loadingTextTop.textContent = line1;

      if (prevLine2 != line2) loadingTextBottom.textContent = line2;

      prevLine1 = line1;
      prevLine2 = line2;
    });
};

// convert text into an array of inline-block <span> elements (for more convenience in letter-
// by-letter text animation)
utils.toSpans = (text, element) => {
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
