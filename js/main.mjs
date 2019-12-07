import utils from "./modules/utils.mjs";
import { store, state, functions, elements } from "./modules/statemanager.mjs";

import {
  attachEventListeners,
  attachNavigationListeners,
  Navigator
} from "./modules/navigator.mjs";

import { gameLog, log } from "./modules/logger.mjs";
import setupHotkeys from "./modules/hotkeys.mjs";

// important constants
const LOCAL_STORE = store;
const GAME_STATE = state;
const STATE_UTILS = functions;
const GAME_ELEMENTS = elements;

// to display how long the game has been running
let loadtime = new utils.Stopwatch();
loadtime.start();

// instantiate new navigator with the screens object
state.navigator = new Navigator(state.screens);

window.onload = () => {
  console.log("✨ window loaded ✨");
  // attach all event listeners
  attachEventListeners();
  attachNavigationListeners();

  // set up all hotkeys
  setupHotkeys();

  // select a random song from the songs directory to play
  // loading screen flavor text

  utils.runLoadingFlavorText().then(() => {
    // remove loading screen:
    setTimeout(() => {
      document.getElementById("start-menu").classList.add("opaque");
      setTimeout(() => {
        document.getElementById("preloader-container").remove();
        GAME_ELEMENTS.main.focus();
      }, 10);
    }, 500);

    // main menu stuff
  });
};

setTimeout(() => {
  loadtime.stop();
  log(`loaded in ${loadtime.elapsed.milliseconds}ms`);
}, 500);
