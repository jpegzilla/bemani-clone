class Sound {
  constructor(path) {
    this.path = path;
  }
}

export class SoundEffect extends Sound {
  constructor(path) {
    super(path);
    this.path = path;
  }
}

export class Music extends Sound {
  constructor(path) {
    super(path);
    this.path = path;
  }
}
