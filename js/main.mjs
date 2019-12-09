import { utils } from "./modules/utils.mjs";
import { store, state, functions, elements } from "./modules/statemanager.mjs";
import { initializeSettingsListeners } from "./modules/settingsmanager.mjs";

import {
  attachEventListeners,
  attachNavigationListeners,
  Navigator
} from "./modules/navigator.mjs";

import { log } from "./modules/logger.mjs";
import setupHotkeys from "./modules/hotkeys.mjs";
import { checkSupports } from "./libs/checksupports.mjs";

// to display how long the game has been running
const uptime = new utils.Stopwatch();
state.timers.uptime = uptime;
// to get loading time of the game
let loadtime = new utils.Stopwatch();
loadtime.start();
state.timers.loadtime = loadtime;

// instantiate new navigator with the screens object
state.navigator = new Navigator(state.screens);

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
    if (LOAD_ERRORS.length === 0) {
      console.log("✨ window loaded ✨");
      uptime.start();
      // attach all event listeners
      attachEventListeners();
      attachNavigationListeners();

      // set up all hotkeys
      initializeSettingsListeners();
      setupHotkeys();

      // send the current uptime to the timer element in the corner of the screen
      const uptimeTracker = () => {
        let elapsed = uptime.elapsed;
        let hour = 1000 * 60 * 60;
        let min = 1000 * 60;
        let sec = 1000;

        let h = parseInt(elapsed / hour)
          .toString()
          .padStart(2, "0")
          .padEnd(2, "0");
        elapsed %= hour;

        let m = parseInt(elapsed / min)
          .toString()
          .padStart(2, "0")
          .padEnd(2, "0");
        elapsed %= min;

        let s = parseInt(elapsed / sec)
          .toString()
          .padStart(2, "0")
          .padEnd(2, "0");

        let ms = (elapsed % sec)
          .toString()
          .padStart(4, "0")
          .padEnd(4, "0");

        const time = {
          hours: h,
          minutes: m,
          seconds: s,
          milliseconds: ms
        };

        document.getElementById("uptime-tracker").textContent = `${
          time.hours
        }h ${time.minutes}m ${time.seconds}s ${time.milliseconds}ms`;
      };
      setInterval(uptimeTracker, 1);

      // select a random song from the songs directory to play
      // loading screen flavor text

      utils.runLoadingFlavorText().then(() => {
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
      const errorString = LOAD_ERRORS.reduce((acc, cur) => cur.err + acc, "");

      document.querySelector(".preloader-text-top").textContent = errorString;
      document.querySelector(".preloader-text-bottom").textContent =
        "please upgrade to the latest version of firefox or chrome.";
    }
  }
};

setTimeout(() => {
  loadtime.stop();
  log(`loaded in ${loadtime.elapsed.milliseconds}ms`);
}, 500);
