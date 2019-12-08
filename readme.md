# about bemani-clone (working title)

## contents:

  1. [overview](#overview)
  1. [how xson files work](#how-xson-files-work)
     - [headers](#headers)
     - [pattern data](#pattern-data)
  1. [filesystem](#filesystem)
  1. [usage](#usage)

***

### overview

this is a beatmania/sdvx/pop'n music-inspired browser game written in javascript, html, and css! the filetype used by the game is based on the .bms spec written by urao yane and the .bmson spec written by thai pangsakulyanont.

*wip!*

***

### how xson files work

#### structure

the xson file (working title) itself is a regular json-type file, and is read by the javascript as such. the object within the file is simply an object with two main parts, the headers and the pattern data.

the **headers** contain vital information, such as the bpm, song title, pattern id, and links to resources such as backgrounds as an object.

the **pattern data** contains the actual layout of the notes in the song as a multi-dimensional array. each top-level array is one measure of music.

the way pattern data is written makes it easier to map songs without use of a visual editor, which is great ~because I haven't made one yet~.

##### headers

contains general information about the song. title, artist, bpm, level, keys, mapCreator, window, and levelName must not be null.

**window** is the size of the timing window in milliseconds. **mapCreator** contains the name of the file's author. **keys** is the number of key required to play the song. **level** is the level of difficulty from 0 - 3 (0: very hard, 1: hard, 2: normal, 3: easy). **levelName** is the name of the difficulty. **bpm** is the initial tempo of the song, and everything else is self-explanatory.

example headers:

```javascript
"headers": {
    "genre": "SWING WALTZ",
    "title": "CHOCOLATE PHILOSOPHY",
    "artist": "yu tokiwa",
    "bpm": 110,
    "keys": 5,
    "level": 0,
    "rank": 0,
    "hitsounds": {
      "1": "hitsound01.wav",
      "2": "hitsound02.wav",
      "3": "hitsound03.wav"
    },
    "bga": "bg1.webm"
},
```

#### pattern data

pattern data is a multidimensional array of note lengths arranged in a similar fashion to measures in sheet music.
example pattern data for a 5-key map:

```javascript
"pattern": [
  // this top-level array would represent one measure of song.
  [
    [0, 1, 0, 1, 0, {"wav": [0, 1, 0, 1, 0]}],
    [0, 0, 1, 0, 2],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    ...
  ],...
]
```

the numbers in the lowest level of the array represent the lengths of notes. a 1 is the minimum length of a note, equivalent to 1/16th note. a 2 would therefore represent twice that (a 1/8th note), a 4 would be a quarter note, etc.

after the numbers, there is the option to place a final index in the array containing an object that has hitsound data. the parser will check for this object, and then will look for the sounds that you have assigned in the headers' hitsounds object. ex:

```javascript
  [1, 0, 1, 0, 1, {"wav": [1, 0, 2, 0, 1]}]
```
this will assign hitsound 1 to the note in columns 1 and 5, and hitsound 2 will be applied to the note in the third column.

the way the notes are laid out in the array makes it much easier to visualize the completed chart.

#### example xson file (working title)

```javascript
{
  "headers": {
      "genre": "GARAGE",
      "title": "Cranberry City",
      "artist": "lapix",
      "bpm": 138,
      "keys": 5,
      "level": 0,
      "rank": 0,
      "hitsounds": {
        1: "hitsound01.wav",
        2: "hitsound02.wav",
        3: "hitsound03.wav"
      },
      "bga": "bga.webm"
  },
  "pattern": [
    [
      [0, 1, 0, 1, 0, {"wav": [0, 1, 0, 1, 0]}],
      [0, 0, 1, 0, 2],
      [1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 1, 0, {"wav": [0, 1, 0, 1, 0]}]
    ],
    [
      [0, 4, 0, 1, 0, {"wav": [0, 2, 0, 1, 0]}],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, {"wav": [1, 0, 0, 0, 0]}],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, {"wav": [1, 0, 0, 0, 0]}]
    ],
    [
      [0, 0, 0, 0, 5]
      [1, 1, 0, 0, 0]
      [0, 0, 1, 1, 0]
      [1, 1, 0, 0, 0]
      [0, 0, 1, 1, 0]
      [1, 1, 0, 0, 0]
      [0, 0, 1, 1, 0]
    ],
    [
      ...
    ]
  ]
}
```

here's how the parser would read it:

**reading and placing the notes**

*wip!*

**assigning hitsounds**

when the parser encounters an array of notes with an object as the final index, with key "wav", it will try to associate numbers of hitsounds in the headers "hitsounds" object with the numbers in the object in the "wav" array.

example:

```javascript
  // pattern = the object read from the xson file

  pattern.headers = {
    ...
    "hitsounds": {
      1: "kick.wav",
      2: "snare.wav",
      3: "clap01.wav",
      ...
    }
  }

  pattern.pattern = [
    [
      [0, 1, 0, 1, 0, {"wav": [0, 1, 0, 1, 0]}],
      ...
    ],
    ...
  ]

```

in this example, the first 2 notes in measure 1 will both be assigned a hitsound of "kick.wav" by the parser's hitsound assignment function.

***

### filesystem

#### directory structure

```
(root directory)
+-- assets
    +-- audio
    +-- image
    +-- fonts
    +-- text
+-- css
    +-- component
        +-- _anim.scss
        +-- _fontImports.scss
        +-- _layering.scss
        +-- _mixins.scss
        +-- _sliders.scss
        +-- _vars.scss
        +-- modals.scss
        +-- options.scss
        +-- overlays.scss
        +-- play-area.scss
        +-- settings.scss
        +-- song-select.scss
        +-- stars.scss
        +-- start-menu.scss
    +-- main.css
    +-- main.min.css
    +-- main.scss
+-- js
    +-- libs
        +-- cheatcodes.min.mjs
        +-- cheatcodes.mjs
        +-- saltlines.ruler.mjs
    +-- modules
        +-- audioplayer.mjs
+-- server
    +-- api
        +-- api.php
        +-- index.php
    +-- js
        +-- server.js
        +-- utils.js
+-- skins
    +-- default.json
+-- songs
    +-- meikai zodiac - alrescha
        +-- song.mp3
        +-- hitsound01.wav
        +-- hitsound02.wav
        +-- hitsound03.wav
        +-- bga.webm
        +-- pattern_normal.json
        +-- pattern_hard.json
        +-- pattern_ex.json
+-- index.html
+-- serviceWorker.js
```

*wip!*

***

### usage

*wip!*

***

**current todo list:**
-   [ ] finalize pattern file spec
-   [ ] finish pattern file parser
-   [ ] finalize directory structure
-   [ ] choose ~fonts~ / colors
-   [ ] implement sound player (song / sfx) utility classes
-   [x] create loading screen
-   [x] create initial ui
-   [ ] implement saving game to local storage
-   [ ] finish application settings menu (add more settings for colors, performance settings, etc)

**future:**

-   [ ] create player database in order to allow worldwide player competition
-   [ ] create some sort of visual pattern editor
-   [ ] create song selection screen
-   [ ] create "in betweeen" transition screens to show during certain navigation events(??) kind of like in sdvx
