import keymap from "./keymap.mjs";

export const getPosInElement = (e) => {
  let rect = e.target.getBoundingClientRect();
  let height = e.target.offsetHeight;
  let x = e.clientX - rect.left; // x position in element
  let xPercent = Math.floor((x / e.clientX) * 100);
  let y = e.clientY - rect.top; // y position in element
  let yPercent = 100 - Math.floor((y / height) * 100);

  return { x, xPercent, y, yPercent };
};

// things for storage

// song file and pattern-related utilities

export const getSongData = (id) => {
  // store the song data in global storage
  const getPattern = (pattern) => {
    return pattern;
  };

  const getMusic = (pattern) => {
    return music;
  };

  const getBackground = (pattern) => {
    return bg;
  };
  const getVideo = (pattern) => {
    return video;
  };
};

// simple stopwatch class
class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.stopTime = 0;
    this.elapsed = 0;
  }

  start() {
    this.startTime = new Date().getTime();
    setInterval(
      () => (this.elapsed = new Date().getTime() - this.startTime),
      100
    );
  }

  stop() {
    this.stopTime = new Date().getTime(); // use performance.now
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
      milliseconds: ms,
    };
  }

  reset() {
    this.elapsed.h = this.elapsed.minutes = this.elapsed.seconds = this.elapsed.milliseconds = this.stopTime = this.startTime = 0;
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
    4: "l",
  },
  "5k": {
    1: "a",
    2: "s",
    3: "space",
    4: "j",
    5: "k",
  },
  "6k": {
    1: "a",
    2: "s",
    3: "d",
    4: "j",
    5: "k",
    6: "l",
  },
  "7k": {
    1: "a",
    2: "s",
    3: "d",
    4: "space",
    5: "j",
    6: "k",
    7: "l",
  },
  "8k": {
    1: "a",
    2: "s",
    3: "d",
    4: "f",
    5: "h",
    6: "j",
    7: "k",
    8: "l",
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
    9: "l",
  },
};

// set up loading screen

let time = 0;
let file = "./../assets/text/loadingScreenText.txt";
let linecount = 58;

// choose random line numbers. linecount is the number of lines in the text file
export const runLoadingFlavorText = () => {
  return new Promise((resolve) => {
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

    // if (time < linecount) {
    //   randLine1();
    //   randLine2();
    // }
    // just instantly resolve, for development purposes
    resolve();
    // REMEMBER TO REMOVE THIS!!
  });
};

let prevLine1, prevLine2;
const loadingTextTop = document.querySelector(".preloader-text-top");
const loadingTextBottom = document.querySelector(".preloader-text-bottom");
// add a line of text to the loading text area.
const addLoadingState = () => {
  fetch(file)
    .then((t) => t.text())
    .then((x) => {
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
      span.style.cssText = `transition: translate 0.3s, opacity 0.3s;transition-delay: ${
        i * 80
      }ms`;
      let cont = document.createTextNode(letters[i]);
      span.appendChild(cont);
      element.appendChild(span);
      a.push(span);
    }
  }
  return a;
};

// buffer class for loading assets

// find all children of an element with a specific id
export const childrenArray = (id) =>
  Array.from(document.getElementById(id).children);

// find all children of an element with a specific id that match an html tag
export const typedChildrenArray = (id, type) =>
  Array.from(document.getElementById(id).getElementsByTagName(type));

// find all elements of a specific html tag
export const typedElementArray = (type) =>
  Array.from(document.getElementsByTagName(type));

// wrapper for getelementbyid
export const did = (id) => document.getElementById(id);

export const utils = {
  defaultKeyBinds,
  getKeyCodeFromLetter: (letter) => letter.toUpperCase().charCodeAt(0),
  randomInt: (min, max) => Math.round(Math.random() * (max - min + 1)) + min,
  Stopwatch,
  keymap,
  toSpans,
};
