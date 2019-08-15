var uptime;
uptime = new Stopwatch();
uptime.start();

window.onload = () => {
  console.log("✨ loaded ✨");
  // to display how long the game has been running
  // select a random song from the songs directory to play
  // loading screen flavor text

  runLoadingFlavorText().then(() => {
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

    mainElement.addEventListener("mousemove", e => {
      // cursor.classList.remove("hidden");
      let left = e.clientX;
      let top = e.clientY;

      const starfield = document.querySelector(".stars-container");

      // const moveStarfield = () =>
      //   (starfield.style.cssText = `transform: translate(-${left /
      //     140}px, -${top / 100}px);`);
      //
      // window.requestAnimationFrame(moveStarfield);
    });
  });
};
