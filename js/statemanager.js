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
