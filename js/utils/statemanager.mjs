// utility script for managing navigation and state within the game

let screens = {
  start: "start-menu",
  songSelect: "song-select",
  options: "options-select",
  settings: "settings-menu",
  songResults: "song-results",
  modals: "modals"
};

// storage cache - for anything

class ItemStore {
  constructor() {
    this.storage = window.localStorage;
    this.items = {};
  }

  addItem(item) {
    this.items[item] = item;
    this.storage.setItem(`${item}`, JSON.stringify(item));
  }

  getItem(item) {
    return JSON.parse(this.storage.getItem(item));
  }
}

const STORE = new ItemStore();

let cache = {};

let gameState = {
  screen: screens.start
};

// caching function for storing values of slow functions
const memoize = fn => {
  let cache = [];
  return function(n) {
    let i = n.toString();
    if (cache[i] == undefined) {
      cache[i] = fn(n);
    }

    return cache[i];
  };
};

const functionAnalysis = fn => {
  let s = performance.now();

  fn();

  let e = performance.now();

  return `call to function ${fn.name} took ${e -
    s} milliseconds.\nfunction returned this value: ${fn()}`;
};

const state = {
  screens: screens,
  cache: cache,
  gameState: gameState
};

const functions = {
  memoize: memoize,
  functionAnalysis: functionAnalysis
};

const elements = {
  main: document.getElementById("main")
};

const stateManager = {
  state: state,
  functions: functions,
  elements: elements,
  store: STORE
};

export default stateManager;
