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

  P = pure count
  J = just count
  g = good count
  O = off count
  c = current combo
  C = maximum combo
  S = points added to score
  R = 100000 / N
  V = 50000 / (10 * N - 55)

  miss = 0 points

  "off" notes break combo

  OFF: S = 0.2 * R + 1 * V
  GOOD: S = 0.2 * R + c * V
  JUST: S = 1 * R + c * V
  PURE: S = 1.5 * R + c * V

  final score = [0.9[1,000,000(P + 0.7J + 0.4g + 0.1O)/N]] * (C / 10)

  difficulty names from easiest to hardest

  standard:
    easy
    normal
    hard
    extreme
    another
    beyond

  special/other:
    sacrifice
    legendary
    exalted
    blasphemy

*/

const calculateScore = (difficulty, noteCounts) => {};

let keyCount, bpm, level, rank;
let artistInfo = {};
let externalResources = {};