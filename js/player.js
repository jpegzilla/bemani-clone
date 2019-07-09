// contains: a bunch of methods for crud-ing player information. uses localstorage.

class Player {
  constructor(name) {
    this.name = name;
  }

  addScore(score) {}

  addExp(score) {}
}

let currentPlayer = {
  name: "",
  level: null,
  scores: []
};

// store player data in localstorage
