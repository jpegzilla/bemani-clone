// lib for checking browser support for various things

const composedPath = () => {
  if (Object.keys(Event.prototype).includes("composedPath")) {
    return true;
  } else throw "composedPath is not supported in this browser.";
};

const webAudioAPI = () => {
  let context;

  try {
    context = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    context.close();
    return true;
  } catch (err) {
    throw "web audio api is not supported in this browser.";
  }
};

export const checkSupports = () => {
  const toCheck = [composedPath, webAudioAPI];

  let errors = [];

  toCheck.forEach(item => {
    try {
      return item();
    } catch (err) {
      errors.push(err);
    }
  });

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
