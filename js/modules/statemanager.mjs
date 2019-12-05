// utility script for managing navigation and state within the game

let screens = {
  start: { name: "start", element: document.getElementById("start-menu") },
  songSelect: {
    name: "song select",
    element: document.getElementById("song-select")
  },
  // song options selection
  options: {
    name: "options",
    element: document.getElementById("options-select")
  },
  // application settings
  settings: {
    name: "settings",
    element: document.getElementById("settings-menu")
  },
  songResults: {
    name: "song results",
    element: document.getElementById("song-results")
  },
  modals: { name: "modals", element: document.getElementById("modals") }
};

// flags - default application state
export const GLOBAL_FLAGS = {
  hoveringScrollable: false,
  inGame: false,
  screen: screens.start,
  volumeControlHover: "masterVolume",
  focusedElement: null
};

// default global settings
export const GLOBAL_SETTINGS = {
  masterVolume: 100,
  musicVolume: 100,
  fxVolume: 100
};

// storage cache - for anything

class ItemStore {
  constructor(object) {
    if (typeof object !== "object")
      throw new Error("invalid object passed to ItemStore");

    this.storage = window.localStorage;
    this.items = object || {};
  }

  loadFromStorage(object) {
    this.items = object;
  }

  addItem(item) {
    this.items[item] = item;
    // this.storage.setItem(`${item}`, JSON.stringify(item));
  }

  getItem(item) {
    return JSON.parse(this.storage.getItem(item));
  }
}

export const store = new ItemStore({});

let cache = {};

// caching function for storing values of slow functions
const memoize = fn => {
  let memcache = [];
  return function(n) {
    let i = n.toString();
    if (memcache[i] == undefined) memcache[i] = fn(n);

    return memcache[i];
  };
};

// function to get execution time of a function
const functionAnalysis = fn => {
  let s = performance.now();

  fn();

  let e = performance.now();

  return `call to function ${fn.name} took ${e -
    s} milliseconds.\nfunction returned this value: ${fn()}`;
};

const saveGameData = () => {
  let o = {
    settings: GLOBAL_SETTINGS,
    flags: GLOBAL_FLAGS,
    cache: cache,
    itemstore: store
  };

  localStorage.setItem("bc_game_data", JSON.stringify(o));
};

const clearGameData = () => {
  localStorage.removeItem("bc_game_data");
};

const readGameSave = () => {
  const o = localStorage.getItem("bc_game_data");
  store.loadFromStorage(JSON.parse(o));
};

export const state = {
  screens: screens,
  cache: cache,
  navigator: null
};

export const functions = {
  memoize,
  functionAnalysis,
  saveGameData,
  clearGameData,
  readGameSave
};

export const elements = {
  main: document.getElementById("main")
};
