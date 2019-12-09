export const navigationEvent = location =>
  new CustomEvent("navigationEvent", {
    detail: {
      location: location
    },
    bubbles: false,
    cancelable: false
  });

export const fireEvent = ev => document.dispatchEvent(ev);

// ex: fireEvent(navigationEvent("start screen"))
