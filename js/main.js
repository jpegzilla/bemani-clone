window.onload = () => {
  console.log("✨ loaded ✨");
  // to display how long the game has been running
  let uptime = new Stopwatch().start();

  // select a random song from the songs directory to play
  // loading screen flavor text
  runLoadingFlavorText();
};
