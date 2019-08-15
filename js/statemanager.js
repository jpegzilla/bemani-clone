// utility script for managing navigation and state within the game

let screens = {
  one: "start-menu",
  two: "song-select",
  three: "options-select",
  four: "settings-menu",
  five: "song-results",
  six: "modals"
};

// storage cache - for anything
let store = {};

let state = {
  screen: screens.zero
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
