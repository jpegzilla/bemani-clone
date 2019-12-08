import { functions, state } from "./statemanager.mjs";
import { typedChildrenArray, did } from "./utils.mjs";
// import { log } from "./logger.mjs";
import { handleVolumeModification, hideControl } from "./navigator.mjs";

const { readGameSave, saveGameData } = functions;
let { volumeTimeout } = state.timeouts;

// the user should be able to modify every setting and have it affect global state.
// the user should be able to click on a button that will write the settings to localstorage.

// const volBarMap = {
//   master: 0,
//   music: 1,
//   fx: 2
// };

// set all volume indicators. this will be used to set indicators
// based on what's saved in localstorage
const setAllVolumeIndicators = (masterVol, musicVol, fxVol) => {
  const args = [masterVol, musicVol, fxVol];

  const volumeValues = [
    {
      bar: did("bar-masterVolume"),
      slider: did("settings-menu-masterVolume"),
      value: did("volumeControl-master").children[1]
    },
    {
      bar: did("bar-musicVolume"),
      slider: did("settings-menu-musicVolume"),
      value: did("volumeControl-music").children[1]
    },
    {
      bar: did("bar-fxVolume"),
      slider: did("settings-menu-fxVolume"),
      value: did("volumeControl-fx").children[1]
    }
  ];

  volumeValues.forEach((vol, i) => {
    vol.bar.style.cssText = `transform: scaleY(${args[i] / 100})`;
    vol.slider.value = args[i];
    vol.value.textContent = args[i].toString();
  });
};

const modifySetting = (val, data) => {
  // special case for modifying volume,
  // only if the element's dataset has something to do with volume.
  if (data.includes("Volume")) {
    handleVolumeModification(val, true, data);
    volumeTimeout = setTimeout(hideControl, 3000);
  }

  switch (data) {
    case "brightness":
      const opacity = Math.abs(parseInt(val) - 100) * 0.01;
      document.getElementById("overlaysBrightness").style.opacity = opacity;
      break;
  }
};

export const initializeSettingsListeners = () => {
  const inputsToListen = typedChildrenArray("settingsMenu", "input");

  inputsToListen.forEach(i => {
    i.addEventListener("input", e => {
      const val = e.currentTarget.value;
      const data = e.currentTarget.dataset.modify;
      clearTimeout(volumeTimeout);

      modifySetting(val, data);
    });
  });
};

export const readSettingsFromStorage = () => {};
