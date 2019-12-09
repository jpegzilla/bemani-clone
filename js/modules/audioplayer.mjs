import { GLOBAL_SETTINGS } from "./statemanager.mjs";
import { normalize } from "./../libs/exstat_partial.mjs";

class Sound {
  constructor(path) {
    this.path = path;
    this.paused = false;

    // what timestamp to start at
    this.startTime = 0;

    // the timestamp when the sound was stopped
    this.stopTime = 0;

    // the timestamp when the sound is paused.
    // if the audio is paused, then the startTime is set
    // equal to the pauseTime.
    this.pauseTime = 0;

    this.ctx = new AudioContext();
    this.dest = this.ctx.destination;
    this.gain = this.ctx.createGain();

    // when setting the volume of a sound,
    // the minimum and maximum volume should be normalized to the set
    // [0, GLOBAL_SETTINGS.masterVolume]

    console.log("sound:", { path });
  }

  play() {
    if (this.paused) this.ctx.resume();
    else this.ctx.play();
  }

  pause() {
    this.paused = true;
    this.ctx.pause();
    this.pauseTime = this.ctx.currentTime;
  }

  stop() {
    this.startTime = 0;
    this.stopTime = 0;
  }

  pan(direction) {}

  setVolume(volume) {}

  fadeVolume() {}

  destroy() {
    this.ctx.close();
    this.startTime = 0;
    this.stopTime = 0;
    this.pauseTime = 0;
  }
}

export class SoundEffect extends Sound {
  constructor(path) {
    super(path);
  }
}

export class Music extends Sound {
  constructor(path) {
    super(path);

    this.ctx = document.createElement("audio");
    this.listener = this.ctx.listener;
    this.compressor = this.ctx.createDynamicsCompressor();
  }

  tapeStop() {}
}
