// pattern-related utilities

const getPattern = id => {};
const getMusic = pattern => {};
const getBackground = pattern => {};
const getVideo = pattern => {};
const readpattern = pattern => {};

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
};

document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);

// audio utils

let audioContext = new AudioContext();

// utils for managing score

const BASE_SCORE = 0;
const BASE_SCORE_MULT = 1;
const BASE_SCROLL_SPEED = 1;
