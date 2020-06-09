export const chordRegexes = {
  chordRegex: /^[A-G][b#]?(2|5|6|7|9|11|13|6\/9|7\-5|7\-9|7#5|7#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|M7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|Maj7|maj9|Maj9|Maj11|maj11|Maj13|maj13|mb5|m|sus|sus2|sus4)*(\/[A-G][b#]*)*$/,
  chordReplaceRegex: /([A-G][b\#]?[2|5|6|7|9|11|13|7\-5|7\-9|7#5|7#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|M7|maj7|m6|m7|m7b5|m9|m11|m13|maj7|Maj7|maj9|Maj9|Maj11|maj11|Maj13|maj13|mb5|m|sus|sus2|sus4]*)/g,
  ghostChordDetectionRegex: /\(.*\)/g
};
