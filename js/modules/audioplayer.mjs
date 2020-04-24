import { GLOBAL_SETTINGS as g } from "./statemanager.mjs";
import { normalize } from "./../libs/exstat_partial.mjs";

class Sound {
  constructor(path) {
    this.path = path;
    this.paused = false;

    // what timestamp to start at
    this.startTime = 0;

    // the timestamp when the sound is paused.
    // if the audio is paused, then the startTime is set
    // equal to the pauseTime.
    this.pauseTime = 0;

    this.ctx = new AudioContext();
    this.elem = document.createElement("audio");
    this.elem.src = this.path;
    this.track = this.ctx.createMediaElementSource(this.elem);

    // when setting the volume of a sound,
    // the minimum and maximum volume should be normalized to the set
    // [0, GLOBAL_SETTINGS.masterVolume]

    // console.log("sound:", { path });
  }

  play() {}

  pause() {}

  stop() {}

  pan(direction) {}

  setVolume(volume) {}

  fadeVolume(time) {}

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
