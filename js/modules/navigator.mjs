import { navLog, log } from "./logger.mjs";
import { GLOBAL_FLAGS, GLOBAL_SETTINGS, state } from "./statemanager.mjs";
import { getPosInElement, childrenArray, did } from "./utils.mjs";
import keymap from "./keymap.mjs";

let { volumeTimeout } = state.timeouts;

// screens for the navigation
const showSettingsScreen = document.getElementById("showSettingsScreen");
const main = document.getElementById("main");

// make sure the last focused element is focused when tabbing back in
window.onfocus = () => {
  const { focusedElement } = GLOBAL_FLAGS;
  return focusedElement
    ? document.getElementById(focusedElement).focus()
    : main.focus();
};

// do something on blur? save the game state maybe?
window.onblur = () => {};

export class Navigator {
  constructor(locations) {
    this.history = [];
    // locations is from state.screens in statemanager.mjs
    this.locations = locations;
    this.all;
  }

  _navigate(loc, back = false) {
    console.log(loc, this.locations);
    if (!back) {
      // hide all sections,
      // unhide the correct section
      this.history.push({ location: loc });
    } else {
      // go back, delete current location and navigate to the last location
      log(
        "navigating back. last location was",
        this.history[this.history.length - 2] + ". deleting current location."
      );
    }
  }

  back() {
    this.history.pop();
    const loc = this.history[this.history.length - 1];
    this._navigate(loc, true);
  }

  goto(loc) {
    this._navigate(loc);
  }

  open(loc) {}
}

// all internal links, buttons that cause screen changes
// any user-triggered navigation
export const attachNavigationListeners = () => {
  // options navigation handler
  showSettingsScreen.addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();

    // show settings modal
    document.getElementById("settingsMenu").classList.add("active");
    document.getElementById("modalsBackground").classList.add("active");
    // using a named arrow function here so I can remove the listener in the callback

    const closeSettings = e => {
      e.stopPropagation();
      const path = e.path || e.composedPath() || null;
      // if you click outside the settings menu or hit escape
      // the menu closes.

      if (
        (e.which && e.which == keymap.escape) ||
        (e instanceof MouseEvent &&
          !path.includes(document.getElementById("settingsMenu")))
      ) {
        // hide settings modal
        document.getElementById("settingsMenu").classList.remove("active");
        document.getElementById("modalsBackground").classList.remove("active");
        document.removeEventListener("click", closeSettings);
        document.removeEventListener("keydown", closeSettings);
      }
    };

    document.addEventListener("keydown", closeSettings);
    document.addEventListener("click", closeSettings);
  });
};

// everything that has to do with updating the volume
// setting outright to true will set the volume in the global
// state without checking to see if the volume is too high or low.
export const handleVolumeModification = (
  d,
  outright = false,
  element = null
) => {
  const { masterVolume, musicVolume, fxVolume } = GLOBAL_SETTINGS;

  // show the volume slider here
  document.getElementById("volumeControl").classList.add("visible");

  // clear the timeout so that it can reset every time there's a scroll event
  clearTimeout(volumeTimeout);

  // masterVolume: 100,
  // musicVolume: 100,
  // fxVolume: 100
  let volumeToAffectMarker = element || GLOBAL_FLAGS.volumeControlHover;
  let volumeToAffect = masterVolume;
  let elementToAffect, volumeIndicatorElement;

  switch (volumeToAffectMarker) {
    case "masterVolume":
      elementToAffect = document.getElementById("volumeControl-master")
        .children[0];
      volumeIndicatorElement = document.getElementById("volumeControl-master")
        .children[1];
      volumeToAffect = masterVolume;
      break;

    case "musicVolume":
      elementToAffect = document.getElementById("volumeControl-music")
        .children[0];
      volumeIndicatorElement = document.getElementById("volumeControl-music")
        .children[1];
      volumeToAffect = musicVolume;
      break;

    case "fxVolume":
      elementToAffect = document.getElementById("volumeControl-fx").children[0];
      volumeIndicatorElement = document.getElementById("volumeControl-fx")
        .children[1];
      volumeToAffect = fxVolume;
      break;
  }

  if (!outright) {
    if (d > 0) {
      volumeToAffect++;
      if (volumeToAffect > 100) volumeToAffect = 100;

      if (volumeToAffect <= 100)
        GLOBAL_SETTINGS[volumeToAffectMarker] = parseInt(volumeToAffect);
    } else if (d < 0) {
      volumeToAffect--;
      if (volumeToAffect < 0) volumeToAffect = 0;

      if (volumeToAffect >= 0)
        GLOBAL_SETTINGS[volumeToAffectMarker] = parseInt(volumeToAffect);
    }
  } else GLOBAL_SETTINGS[volumeToAffectMarker] = parseInt(d);

  // set the corresponding slider in the settings to the correct value
  did(`settings-menu-${volumeToAffectMarker}`).value = volumeToAffect;

  if (element) {
    // switch through elements to add the color class to the correct volume indicator
    // classes: bar-masterVolume, bar-musicVolume, bar-fxVolume
    document.getElementById(
      `bar-${element}`
    ).style.cssText = `transform: scaleY(${volumeToAffect / 100})`;
  } else {
    elementToAffect.style.cssText = `transform: scaleY(${volumeToAffect /
      100})`;
  }

  if (volumeToAffect < 96) volumeIndicatorElement.classList.add("color");
  else volumeIndicatorElement.classList.remove("color");
  volumeIndicatorElement.textContent = volumeToAffect;
};

export const hideControl = () => {
  // hide the volume slider here, remove all hover states, clear timeout
  [
    document.getElementById("volumeControl-master"),
    document.getElementById("volumeControl-music"),
    document.getElementById("volumeControl-fx")
  ].forEach(e => e.classList.remove("hover"));

  document.getElementById("volumeControl").classList.remove("visible");
  clearTimeout(volumeTimeout);
};

// all other event listeners, such as ones that
// trigger effects, controls, etc
export const attachEventListeners = () => {
  // add focus listener to all focusable elements
  // only use navFocusable on elements with an id
  document
    .querySelectorAll(".navFocusable")
    .forEach(e =>
      e.addEventListener("focus", () => (GLOBAL_FLAGS.focusedElement = e.id))
    );

  // handler for all key events
  document.addEventListener("keydown", e => {
    // clear the timeout so that it can reset every time there's a key event
    clearTimeout(volumeTimeout);

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
      case keymap.left:
        --i;
        if (i < 0) i = validFlags.length - 1;
        setVolumeControlFlag(validFlags[i]);
        break;

      case keymap.right:
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
        case keymap.up:
          handleVolumeModification(1);

          break;

        case keymap.down:
          handleVolumeModification(-1);
          break;
      }
    }

    volumeTimeout = setTimeout(hideControl, 3000);
  });

  // ===  section: change volume by clicking ===
  let isMouseDown = false,
    isMouseHoldingVolControl = false;

  const volBars = [
    document.getElementById("volumeControl-master"),
    document.getElementById("volumeControl-music"),
    document.getElementById("volumeControl-fx")
  ];

  const handleVolumeMouseEvent = e => {
    let { yPercent } = getPosInElement(e);
    if (yPercent == -Infinity) yPercent = 0;
    if (yPercent == Infinity) yPercent = 100;
    handleVolumeModification(yPercent, true);
    volumeTimeout = setTimeout(hideControl, 3000);
  };

  // click handler
  volBars.forEach(e => {
    e.addEventListener("mousedown", e => {
      isMouseHoldingVolControl = true;
      handleVolumeMouseEvent(e);
    });
  });

  // drag handler
  volBars.forEach(e =>
    e.addEventListener("mousemove", e => {
      if (isMouseDown && isMouseHoldingVolControl) handleVolumeMouseEvent(e);
    })
  );

  // mouseup handler for volume bars
  volBars.forEach(e => {
    e.addEventListener("mouseup", e => {
      isMouseHoldingVolControl = false;
      handleVolumeMouseEvent(e);
    });
  });

  // set the isMouseDown flag to be true or false
  document.addEventListener("mousedown", () => {
    isMouseDown = true;
  });
  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
  // === end section ===

  // listener for non-scrolling wheel events
  document.addEventListener(
    "wheel",
    e => {
      if (!GLOBAL_FLAGS.hoveringScrollable) {
        // determine whether the user is scrolling up or down
        // positive d is up, negative is down
        const d = e.deltaY > 0 ? -1 : 1;
        handleVolumeModification(d);
        volumeTimeout = setTimeout(hideControl, 3000);
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
