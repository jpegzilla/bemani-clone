export const navigationEvent = location =>
  new CustomEvent("navigationEvent", {
    detail: {
      location: location
    }
  });
