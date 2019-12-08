import cheatcode from "./../libs/cheatcodes.mjs";
import { log } from "./logger.mjs";
import { GLOBAL_FLAGS, GLOBAL_SETTINGS, state } from "./statemanager.mjs";

export default () => {
  // konami code, just for testing
  const konami = new cheatcode(
    "up, up, down, down, left, right, left, right, b, a, start",
    () => {
      log("hotkeys active");
    }
  );

  const openSettings = new cheatcode("ctrl, shift, s", () => {
    log("opening settings");
  });

  // for development only - clear storage and reload
  const clearAndReload = new cheatcode("ctrl, alt, r", () => {
    window.localStorage.clear();
    location.reload(true);
  });

  // for development: show global flags when s is pressed
  const showGlobalObject = new cheatcode("ctrl, alt, s", () => {
    console.log({ GLOBAL_FLAGS, GLOBAL_SETTINGS, state });
  });
  // run the start function on each hotkey
  state.cheatcodes = [konami, openSettings, clearAndReload, showGlobalObject];

  state.cheatcodes.forEach(c => c.start());
};
