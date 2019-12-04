export const gameLog = msg => {
  return console.log("[BEMANI ★ INGAME]", JSON.stringify(msg, null, 2));
};

export const log = (msg, prefix = "[BEMANI ★ CLONE]") => {
  return console.log(prefix, JSON.stringify(msg, null, 2));
};

export const navLog = msg => {
  return console.log("[BEMANI ★ NAVIGATOR]", JSON.stringify(msg, null, 2));
};
