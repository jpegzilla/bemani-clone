let uptime;
import utils from "./utils/utils.mjs";
uptime = new Stopwatch();
uptime.start();

window.onload = () => {
  console.log("✨ loaded ✨");
  // to display how long the game has been running
  // select a random song from the songs directory to play
  // loading screen flavor text

  utils.runLoadingFlavorText().then(() => {
    const mainElement = document.getElementById("main");
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
