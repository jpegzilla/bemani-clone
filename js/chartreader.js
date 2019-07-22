// script for reading the loaded chart.

let chartTemplate = {
  headers: {},
  pattern: {}
};

const rankingName = {
  sss: {
    letter: "sss",
    name: "astral"
  },
  ss: {
    letter: "ss",
    name: "poetry"
  },
  s: {
    letter: "s",
    name: "valiant"
  }
};

// jubeat ranking system:
/*
  N = total notes
  P = perfect notes count
  G = great count
  g = good count
  p = poor count

  final score = [0.9[1,000,000(P + 0.7G + 0.4g + 0.1p)/N]]
*/

// this ranking system
/*
  ranking names from best to worst:

  final score = [0.9[1,000,000(P + 0.7G + 0.4g + 0.1p)/N]]
*/

const noteScores = {};

let keyCount, bpm, level, rank;
let artistInfo = {};
let externalResources = {};
