import { navLog, log } from "./logger.mjs";
import { GLOBAL_FLAGS, GLOBAL_SETTINGS, state } from "./statemanager.mjs";

const showSettingsScreen = document.getElementById("showSettingsScreen");
const main = document.getElementById("main");

const navKeyMap = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  pgUp: 33,
  pgDn: 34,
  home: 36,
  end: 35
};

// make sure the last focused element is focused when tabbing back in
window.onfocus = () => {
  const { focusedElement } = GLOBAL_FLAGS;
  console.log("focusedElement", focusedElement);
  return focusedElement
    ? document.getElementById(focusedElement).focus()
    : main.focus();
};

window.onblur = () => {};

export class Navigator {
  constructor(locations) {
    this.history = [];
    this.locations = locations;
  }

  _navigate(loc, back = false) {
    if (!back) {
      // hide all sections,
      // unhide the correct section
      this.history.push({ location: loc });
    }
    console.log(loc);
  }

  back() {
    this.history.pop();
    const loc = this.history[this.history.length - 1];
    this._navigate(loc, true);
  }

  goto(loc) {
    this._navigate(loc);
  }
}

export const attachEventListeners = () => {
  // add focus listener to all focusable elements
  // only use navFocusable on elements with an id
  document
    .querySelectorAll(".navFocusable")
    .forEach(e =>
      e.addEventListener("focus", () => (GLOBAL_FLAGS.focusedElement = e.id))
    );

  // options navigation handler
  showSettingsScreen.addEventListener("click", e => {
    // showSettingsScreen.focus();
    navLog("showing settings screen");
  });

  let isVolumeControlActive = document
    .getElementById("volumeControl")
    .classList.contains("visible");

  let timeout;

  const hideControl = () => {
    // hide the volume slider here, remove all hover states, clear timeout
    [
      document.getElementById("volumeControl-master"),
      document.getElementById("volumeControl-music"),
      document.getElementById("volumeControl-fx")
    ].forEach(e => e.classList.remove("hover"));

    document.getElementById("volumeControl").classList.remove("visible");
    clearTimeout(timeout);
  };
  // handler for arrow keys

  document.addEventListener("keydown", e => {
    // clear the timeout so that it can reset every time there's a key event
    clearTimeout(timeout);

    // for development: show global flags when s is pressed
    if (e.which == 83) {
      log(GLOBAL_FLAGS);
    }

    const validFlags = ["masterVolume", "musicVolume", "fxVolume"];

    // i is the current index of the active volume control. these are in order
    // from left to right.
    let i = validFlags.indexOf(GLOBAL_FLAGS.volumeControlHover);
    const volumeScrollbars = [
      document.getElementById("volumeControl-master"),
      document.getElementById("volumeControl-music"),
      document.getElementById("volumeControl-fx")
    ];

    volumeScrollbars.forEach(e => e.classList.remove("hover"));

    // switch for going between volume controls
    switch (e.which) {
      case navKeyMap.left:
        --i;
        if (i < 0) i = validFlags.length - 1;
        setVolumeControlFlag(validFlags[i]);
        break;

      case navKeyMap.right:
        ++i;
        if (i > validFlags.length - 1) i = 0;
        setVolumeControlFlag(validFlags[i]);
        break;
    }

    // change background color of current volume bar
    if (!volumeScrollbars[i].classList.contains("hover"))
      volumeScrollbars[i].classList.add("hover");

    // show volume controls unless user is scrolling through song select
    if (GLOBAL_FLAGS.screen.name != "song select") {
      let volumeToAffectMarker = GLOBAL_FLAGS.volumeControlHover;
      setVolumeControlFlag(volumeToAffectMarker);

      switch (e.which) {
        // volume up and down
        case navKeyMap.up:
          handleVolumeModification(1);

          break;

        case navKeyMap.down:
          handleVolumeModification(-1);
          break;
      }
      console.log("i", i);
    }

    timeout = setTimeout(hideControl, 5000);
  });

  // listener for non-scrolling mousewheel events
  const handleVolumeModification = d => {
    if (!GLOBAL_FLAGS.hoveringScrollable) {
      const { masterVolume, musicVolume, fxVolume } = GLOBAL_SETTINGS;

      // log(
      //   "you are scrolling on a non-scrollable element. display volume controls."
      // );

      // show the volume slider here
      document.getElementById("volumeControl").classList.add("visible");

      // clear the timeout so that it can reset every time there's a scroll event
      clearTimeout(timeout);

      // masterVolume: 100,
      // musicVolume: 100,
      // fxVolume: 100
      let volumeToAffectMarker = GLOBAL_FLAGS.volumeControlHover;
      let volumeToAffect = masterVolume;
      let elementToAffect, volumeIndicatorElement;

      switch (volumeToAffectMarker) {
        case "masterVolume":
          elementToAffect = document.getElementById("volumeControl-master")
            .children[0];
          volumeIndicatorElement = document.getElementById(
            "volumeControl-master"
          ).children[1];
          volumeToAffect = masterVolume;
          break;

        case "musicVolume":
          elementToAffect = document.getElementById("volumeControl-music")
            .children[0];
          volumeIndicatorElement = document.getElementById(
            "volumeControl-music"
          ).children[1];
          volumeToAffect = musicVolume;
          break;

        case "fxVolume":
          elementToAffect = document.getElementById("volumeControl-fx")
            .children[0];
          volumeIndicatorElement = document.getElementById("volumeControl-fx")
            .children[1];
          volumeToAffect = fxVolume;
          break;
      }

      if (d > 0) {
        volumeToAffect++;
        if (volumeToAffect > 100) volumeToAffect = 100;

        if (volumeToAffect <= 100)
          GLOBAL_SETTINGS[volumeToAffectMarker] = volumeToAffect;
      } else if (d < 0) {
        volumeToAffect--;
        if (volumeToAffect < 0) volumeToAffect = 0;

        if (volumeToAffect >= 0)
          GLOBAL_SETTINGS[volumeToAffectMarker] = volumeToAffect;
      }

      elementToAffect.style.cssText = `transform: scaleY(${volumeToAffect /
        100})`;

      if (volumeToAffect < 96) volumeIndicatorElement.classList.add("color");
      else volumeIndicatorElement.classList.remove("color");
      volumeIndicatorElement.textContent = volumeToAffect;
    }
  };

  document.addEventListener(
    "mousewheel",
    e => {
      // determine whether the user is scrolling up or down
      const d = e.deltaY > 0 ? -1 : 1;
      handleVolumeModification(d);
      timeout = setTimeout(hideControl, 3000);
    },
    { passive: true }
  );

  // handlers for setting what volume control is being modified
  const setVolumeControlFlag = type => (GLOBAL_FLAGS.volumeControlHover = type);

  document
    .getElementById("volumeControl-master")
    .addEventListener("mouseover", () => setVolumeControlFlag("masterVolume"));

  document
    .getElementById("volumeControl-music")
    .addEventListener("mouseover", () => setVolumeControlFlag("musicVolume"));

  document
    .getElementById("volumeControl-fx")
    .addEventListener("mouseover", () => setVolumeControlFlag("fxVolume"));

  document
    .getElementById("volumeControl-music")
    .addEventListener("mouseout", () => setVolumeControlFlag("masterVolume"));

  document
    .getElementById("volumeControl-fx")
    .addEventListener("mouseout", () => setVolumeControlFlag("masterVolume"));
};
