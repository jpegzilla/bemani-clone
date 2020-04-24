import { utils, runLoadingFlavorText } from "./modules/utils.mjs";

import { log } from "./modules/logger.mjs";
import setupHotkeys from "./modules/hotkeys.mjs";
import { checkSupports } from "./libs/checksupports.mjs";

// to display how long the game has been running
const uptime = new utils.Stopwatch();
state.timers.uptime = uptime;

// to get loading time of the game
let loadtime = new utils.Stopwatch();
loadtime.start();

window.onload = () => {
  // check supports
  const LOAD_ERRORS = [];
  try {
    checkSupports();
  } catch (err) {
    if (
      window.confirm(
        "this game is not supported in this browser.\nplease upgrade to a newer browser, such as the latest version of chrome or firefox."
      )
    ) {
      window.open("https://www.mozilla.org/en-US/firefox/new/", "_blank");
    }

    LOAD_ERRORS.push({ err });
  } finally {
    // if no errors, load game normally and start the timer
    if (LOAD_ERRORS.length === 0) {
      console.log("✨ window loaded ✨");
      uptime.start();

      // select a random song from the songs directory to play
      // loading screen flavor text

      runLoadingFlavorText().then(() => {
        // remove loading screen:
        setTimeout(() => {
          document.getElementById("start-menu").classList.add("opaque");
          setTimeout(() => {
            document.getElementById("preloader-container").remove();
            elements.main.focus();
          }, 10);
        }, 500);

        // main menu stuff
      });
    } else {
      // if there are errors, string them together and display that on the loading screen.
      const errorString = LOAD_ERRORS.join(", ");

      document.querySelector(".preloader-text-top").textContent = errorString;
      document.querySelector(".preloader-text-bottom").textContent =
        "please upgrade to the latest version of firefox or chrome.";
    }
  }
};
