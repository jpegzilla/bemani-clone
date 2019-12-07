import cheatcode from "./../libs/cheatcodes.mjs";
import { log } from "./logger.mjs";

export default () => {
  // konami code, just for testing
  const konami = new cheatcode(
    "up, up, down, down, left, right, left, right, b, a, start",
    () => {
      log("hotkeys active");
    }
  );

  // run the start function on each hotkey
  [konami].forEach(c => c.start());
};
