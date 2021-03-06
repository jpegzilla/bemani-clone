// contains: a bunch of methods for crud-ing player information. uses localstorage.

class Player {
  constructor(options) {
    const { id, name, level, rank, title, scores, playCount } = options;

    this.id = id;
    this.name = name;
    this.level = level || 1;
    this.rank = rank || 1;
    this.title = title || "beginner";
    this.scores = scores || [];
    this.playCount = playCount || 0;
  }

  addScore(score) {}

  addExp(score) {}

  addRank(rank) {}

  addPlay(play) {}

  changeTitle(title) {}

  exportAll() {
    const toExport = {
      name: this.name,
      level: this.level,
      rank: this.rank,
      title: this.title,
      scores: this.scores,
      playCount: this.playCount
    };
  }

  save() {}

  login(id) {}

  logOut() {}
}

let currentPlayers = {};

// store players data in localstorage so that when a user returns they can log into the profile they want

const storage = window.localStorage ? window.localStorage : null;
let localPlayers = storage.getItem("players") || "no player found";
if (typeof localPlayers == "object") {
  let currentPlayer = storage.getItem("players").current
    ? storage.getItem("players").current
    : "no player found";
}

if (localPlayers != null) {
  console.log(localPlayers);
  // set the local players to be the current players
}
