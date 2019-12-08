class Sound {
  constructor(path) {
    this.path = path;

    // what timestamp to start at
    this.startTime = 0;

    // the timestamp when the sound was stopped
    this.stopTime = 0;

    // the timestamp when the sound is paused.
    // if the audio is paused, then the startTime is set
    // equal to the pauseTime.
    this.pauseTime = 0;

    console.log("sound:", { path });
  }

  play() {}

  pause() {}

  stop() {}
}

export class SoundEffect extends Sound {
  constructor(path) {
    super(path);
  }
}

export class Music extends Sound {
  constructor(path) {
    super(path);
  }
}
