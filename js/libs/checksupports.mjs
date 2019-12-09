// lib for checking browser support for various things

const composedPath = () => {
  if (Object.keys(Event.prototype).includes("composedPath")) {
    return true;
  } else throw "composedPath is not supported in this browser.";
};

const webAudioAPI = () => {
  let context;

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    context.close();
    return true;
  } catch (err) {
    throw "web audio api is not supported in this browser.";
  }
};

export const checkSupports = () => {
  const toCheck = [composedPath, webAudioAPI];
  // return toCheck.every(Boolean);
  let errors = [];

  toCheck.forEach(item => (item() === true ? true : errors.push(item())));

  if (errors.length === 0) {
    return true;
  } else
    throw new Error(
      JSON.stringify({
        errors,
        message: `errors: ${"\n" + errors.join("\n")}`
      })
    );
};
