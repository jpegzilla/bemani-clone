// // // contains: interfaces for creating visual effects and audio effects.
import { typedElementArray } from "./utils.mjs";
import { SoundEffect } from "./audioplayer.mjs";

// // visual effects

// // audio effects
// link hover effects
typedElementArray("a").forEach(a => {
  const linkToSound = "";
  const sound = new SoundEffect(linkToSound);

  a.addEventListener("mouseover", () => {
    sound.play();
  });
});

// // main menu/ui audio effects

document.addEventListener("click", e => {});
document.addEventListener("keydown", e => {
  // manage sounds for up/down/left/right arrow keys and typing
});

// main menu audio visualization effect
