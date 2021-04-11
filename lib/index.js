"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tranposeChord = exports.transpose = exports.uniqueChords = exports.allChords = exports.wrap = exports.keys = void 0;
exports.keys = [
  {
    name: "Ab",
    value: 0,
    type: "F",
  },
  {
    name: "A",
    value: 1,
    type: "N",
  },
  {
    name: "A#",
    value: 2,
    type: "S",
  },
  {
    name: "Bb",
    value: 2,
    type: "F",
  },
  {
    name: "B",
    value: 3,
    type: "N",
  },
  {
    name: "C",
    value: 4,
    type: "N",
  },
  {
    name: "C#",
    value: 5,
    type: "S",
  },
  {
    name: "Db",
    value: 5,
    type: "F",
  },
  {
    name: "D",
    value: 6,
    type: "N",
  },
  {
    name: "D#",
    value: 7,
    type: "S",
  },
  {
    name: "Eb",
    value: 7,
    type: "F",
  },
  {
    name: "E",
    value: 8,
    type: "N",
  },
  {
    name: "F",
    value: 9,
    type: "N",
  },
  {
    name: "F#",
    value: 10,
    type: "S",
  },
  {
    name: "Gb",
    value: 10,
    type: "F",
  },
  {
    name: "G",
    value: 11,
    type: "N",
  },
  {
    name: "G#",
    value: 0,
    type: "S",
  },
];
const chordRegex =
  // Word boundry followed by a root chord
  "\\b[A-G]" +
  "(?:" +
  // Attempt to match variations after the root chord, like a minor,
  // add7, sus4, 7, etc.
  "(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\\d)?" +
  // Handle split chords like D#m/7, A/C, etc.
  "(?:\\/[A-G0-9])?" +
  ")*" +
  // Match the above variations as along as they're not followed by a pipe or
  // hyphen, etc.. This prevents string names from being matched as a chord at the
  // beginning of a bar, or matching the author's name who abbreviates his/her
  // last name.
  "(?!\\||—|-|\\.|:)" +
  // Keep matching until a hash or word boundry
  "(?:\\b|#)+";
function wrap(input, fn, opts = {}) {
  return input.replace(
    new RegExp(chordRegex, opts.ignorecase ? "gi" : "g"),
    fn
  );
}
exports.wrap = wrap;
function allChords(input, opts = {}) {
  const matches = input.match(
    new RegExp(chordRegex, opts.ignorecase ? "gi" : "g")
  );
  return !matches
    ? []
    : matches.sort(function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return a > b ? 1 : a < b ? -1 : 0;
      });
}
exports.allChords = allChords;
function uniqueChords(input, opts = {}) {
  return Array.from(new Set(allChords(input, opts)));
}
exports.uniqueChords = uniqueChords;
function transpose(input, originalKey, targetKey) {
  return wrap(input, (chord) => tranposeChord(chord, originalKey, targetKey));
}
exports.transpose = transpose;
function tranposeChord(chord, originalKey, targetKey) {
  return chord
    .split("/")
    .map((c) => _transposeChord(c, originalKey, targetKey))
    .join("/");
}
exports.tranposeChord = tranposeChord;
function _transposeChord(chord, originalKey, targetKey) {
  const howMuchToTranpose = getDeltaBetweenKeys(originalKey, targetKey);
  const originalChordRoot = getChordRoot(chord);
  const newChordRoot = toTransposedChordRoot(
    originalChordRoot,
    howMuchToTranpose,
    targetKey
  );
  return newChordRoot.name + chord.substr(originalChordRoot.length);
}
function getKeyByName(name) {
  if (name.charAt(name.length - 1) == "m") {
    name = name.substring(0, name.length - 1);
  }
  return exports.keys.find((key) => name === key.name);
}
function getDeltaBetweenKeys(oldKey, newKey) {
  const oldIndex = getKeyByName(oldKey).value;
  const newIndex = getKeyByName(newKey).value;
  if (oldIndex > newIndex) {
    return 0 - (oldIndex - newIndex);
  } else if (oldIndex < newIndex) {
    return newIndex - oldIndex;
  } else {
    return 0;
  }
}
function getChordRoot(input) {
  if (input.length > 1 && (input.charAt(1) == "b" || input.charAt(1) == "#")) {
    return input.substr(0, 2);
  }
  return input.substr(0, 1);
}
function toTransposedChordRoot(oldKey, delta, targetKey) {
  let transposedChordRootValue = getKeyByName(oldKey).value + delta;
  if (transposedChordRootValue > 11) {
    transposedChordRootValue -= 12;
  } else if (transposedChordRootValue < 0) {
    transposedChordRootValue += 12;
  }
  console.log(transposedChordRootValue);
  let i = 0;
  if (
    transposedChordRootValue === 0 ||
    transposedChordRootValue === 2 ||
    transposedChordRootValue === 5 ||
    transposedChordRootValue === 7 ||
    transposedChordRootValue === 10
  ) {
    // Return the Flat or Sharp Key based on the targetKey
    switch (targetKey) {
      case "A":
      case "A#":
      case "B":
      case "C":
      case "C#":
      case "D":
      case "D#":
      case "E":
      case "F#":
      case "G":
      case "G#":
        for (; i < exports.keys.length; i++) {
          if (
            exports.keys[i].value == transposedChordRootValue &&
            exports.keys[i].type == "S"
          ) {
            return exports.keys[i];
          }
        }
      default:
        for (; i < exports.keys.length; i++) {
          if (
            exports.keys[i].value == transposedChordRootValue &&
            exports.keys[i].type == "F"
          ) {
            return exports.keys[i];
          }
        }
    }
  } else {
    // Return the Natural Key
    for (; i < exports.keys.length; i++) {
      if (exports.keys[i].value == transposedChordRootValue) {
        return exports.keys[i];
      }
    }
  }
}
