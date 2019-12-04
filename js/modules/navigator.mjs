import { navLog, log } from "./logger.mjs";
import { GLOBAL_FLAGS, GLOBAL_SETTINGS, state } from "./statemanager.mjs";

const showSettingsScreen = document.getElementById("showSettingsScreen");
const main = document.getElementById("main");

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
  // options navigation handler
  showSettingsScreen.addEventListener("click", e => {
    e.preventDefault();
    navLog("showing settings screen");
  });

  // listener for non-scrolling mousewheel events
  let timeout;

  main.addEventListener(
    "mousewheel",
    e => {
      // determine whether the user is scrolling up or down
      const d = e.deltaY > 0 ? -1 : 1;

      if (!GLOBAL_FLAGS.hoveringScrollable) {
        const { masterVolume, musicVolume, fxVolume } = GLOBAL_SETTINGS;

        // log(
        //   "you are scrolling on a non-scrollable element. display volume controls."
        // );

        // show the volume slider here
        document.getElementById("volumeControl").classList.add("visible");

        // clear the timeout so that it can reset every time there's a scroll event
        clearTimeout(timeout);

        // clear the timeout
        const hideControl = () => {
          // hide the volume slider here
          document.getElementById("volumeControl").classList.remove("visible");
          clearTimeout(timeout);
        };

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

        timeout = setTimeout(hideControl, 3000);
      }
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
