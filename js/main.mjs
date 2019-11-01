import utils from "./utils/utils.mjs";
import stateManager from "./utils/statemanager.mjs";

// important constants
const LOCAL_STORE = stateManager.store;
const GAME_STATE = stateManager.state;
const STATE_UTILS = stateManager.functions;
const GAME_ELEMENTS = stateManager.elements;

// to display how long the game has been running
let uptime = new utils.Stopwatch();
uptime.start();

window.onload = () => {
  console.log("✨ loaded ✨");
  // select a random song from the songs directory to play
  // loading screen flavor text

  utils.runLoadingFlavorText().then(() => {
    // remove loading screen:
    setTimeout(() => {
      document.getElementById("start-menu").classList.add("opaque");
      setTimeout(() => {
        document.getElementById("preloader-container").remove();
        mainElement.focus();
      }, 10);
    }, 500);

    // main menu stuff
  });
};
setTimeout(function() {
  uptime.stop();
  console.log(uptime.elapsed);
}, 500);
