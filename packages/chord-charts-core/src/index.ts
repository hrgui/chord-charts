import { keys } from './keys';
import { chordRegexes as regexes } from './regexes';

export { keys }

export interface ChordLineToken {
  value: string,
  skip: boolean,
  pipes?: number[]
}

export interface ChordLine {
  chordLine: boolean
  values: ChordLineToken[] 
}

function findAllPipes(str) {
  const regex = /(\|)/g;
  let results;
  let output = [];

  while ((results = regex.exec(str)) !== null) {
    output.push(results.index);
  }
  
  return output;
}

function pipeIt(str, pipeIndexes) {
  if (!pipeIndexes) {
    return str;
  }

  pipeIndexes.map(pI => {
    str = str.substr(0, pI) + '|' + str.substr(pI + 1);
  });

  return str;
}


export class ChordChart {
  rawForm: Array<any>;
  currentKey: any; // todo

  static getAllKeys() {
    return keys;
  }

  static _toChordLine(line) : ChordLine {
    var obj = {
      'chordLine': true,
      'values': line.split(regexes.chordReplaceRegex)
    };
    

    obj.values = obj.values.map(v => {
      let hasPipes = false;
      let pipes;

      if (v.indexOf('|') !== -1) {
        hasPipes = true;
        pipes = findAllPipes(v);
        v = v.replace('|', ' ');
      }
      
      let rtn : ChordLineToken = {
        value: v,
        pipes,
        skip: false
      };

      switch(v.trim()) {
        case '(':
        case ')':
        case '|':
        case '':
          rtn.skip = true;
        break;
      }
      return rtn;
    });

    return obj;
  }

  static getDelta(oldIndex, newIndex) {
    if (oldIndex > newIndex) {
      return 0 - (oldIndex - newIndex);
    }
    else if (oldIndex < newIndex) {
      return newIndex - oldIndex;
    }
    else {
      return 0;
    }
  }

  static getChordRoot(input) {
    if (input.length > 1 && (input.charAt(1) == "b" || input.charAt(1) == "#")) {
      return input.substr(0, 2);
    }
    return input.substr(0, 1);
  }

  static transposeChord(oldChord, delta, targetKey) {
    var oldChordRoot = ChordChart.getChordRoot(oldChord),
        newChordRoot = ChordChart.getNewKey(oldChordRoot, delta, targetKey);
    return newChordRoot.name + oldChord.substr(oldChordRoot.length);
  }

  /**
   * @static
   * @param {any} name
   * @returns
   * @deprecated
   */
  static getKeyByValue(name): any {
    var i;
    for (i = 0; i < keys.length; i++) {
      if (name == keys[i].value) {
        return keys[i];
      }
    }
  }

  static isTokenGhostChord(token) {
    return token.match(regexes.ghostChordDetectionRegex);
  }

  static isPipe(token) {
    return token === '|';
  }

  static isChordLine(input) {
    if (input.chordLine) {
      return true;
    }
    var tokens = input.replace(/\s+/, " ").split(' '),
      evalToken;

    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i] === "") {
        continue;
      }

      evalToken = tokens[i].trim();
      if (ChordChart.isTokenGhostChord(evalToken)) {
        continue;
      }

      if (ChordChart.isPipe(evalToken)) {
        continue;
      }

      if (!ChordChart._isChordLineTokenAChord({value: evalToken, skip: false})) {
        return false;
      }
    }

    return true;
  }

// todo: can we remove the delta somehow? 
  static getNewKey(oldKey, delta, targetKey): any {
    var keyValue = ChordChart.getKeyByName(oldKey).value + delta;

    if (keyValue > 11) {
      keyValue -= 12;
    } else if (keyValue < 0) {
      keyValue += 12;
    }

    var i = 0;
    if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) {
      // Return the Flat or Sharp Key
      switch (targetKey.name) {
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
          for (; i < keys.length; i++) {
            if (keys[i].value == keyValue && keys[i].type == "S") {
              return keys[i];
            }
          }
        default:
          for (; i < keys.length; i++) {
            if (keys[i].value == keyValue && keys[i].type == "F") {
              return keys[i];
            }
          }
      }
    } else {
      // Return the Natural Key
      for (; i < keys.length; i++) {
        if (keys[i].value == keyValue) {
          return keys[i];
        }
      }
    }
  }

  static getDeltaByKeyNames(oldKey, newKey) {
    var oldKeyObj = ChordChart.getKeyByName(oldKey),
      newKeyObj = ChordChart.getKeyByName(newKey);

    var delta = ChordChart.getDelta(oldKeyObj.value, newKeyObj.value);

    if (delta > 0) {
      return '+' + delta;
    }

    return delta + '';
  }

  static getKeyByName(name): any {
    var i;
    if (name.charAt(name.length - 1) == "m") {
      name = name.substring(0, name.length - 1);
    }
    for (i = 0; i < keys.length; i++) {
      if (name == keys[i].name) {
        return keys[i];
      }
    }
  }

  constructor(data, key: String) {
    this.setText(data);
    this.currentKey = ChordChart.getKeyByName(key);
  }

  setText(data) {
    this.rawForm = data.split(/\r?\n/).map((line) => {
      return ChordChart.isChordLine(line) ? ChordChart._toChordLine(line) : line;
    });
  }

  static _isChordLineTokenAChord({value, skip}: ChordLineToken) : boolean {
    value = value.trim();

    if (value.length === 0) {
      return false;
    }

    if (skip) {
      return false;
    }

    // pipe stuck together
    if (value.indexOf('|') !== -1) {
      return value.split('|')
      .filter(s => s) // case |Em|Em
      .map(sv => !!sv.match(regexes.chordRegex))
      .every(x => x);
    }
    
    return !!value.match(regexes.chordRegex);
  }

  private transposeLine(values, delta, targetKey) {
    return values.map(function (c) {  
      return !ChordChart._isChordLineTokenAChord(c) ? c : {
        value: ChordChart.transposeChord(c.value, delta, targetKey), 
        pipes: c.pipes,
        skip: false};
    });
  }

  transpose(key: String) {
    var newKey = ChordChart.getKeyByName(key);
    var delta = ChordChart.getDelta(this.currentKey.value, newKey.value);
    this.rawForm = this.rawForm.map((l) => {
      return ChordChart.isChordLine(l) ? { chordLine: true, values: this.transposeLine(l.values, delta, newKey) } : l;
    });

    this.currentKey = newKey;
  }

  asText() {
    return this.rawForm.map(function (l) {
      if (ChordChart.isChordLine(l)) {
        l = l.values.map(lToken => pipeIt(lToken.value, lToken.pipes)).join('');
      }
      return l;
    }).join('\n');
  }

  asHtml(opts: any = {}) {
    return this.rawForm.map(function (l, i) {
      if (ChordChart.isChordLine(l)) {
        var chords = l.values.map((chordLineToken : ChordLineToken, index, array) => {
          let value = chordLineToken.value;
          
          if (chordLineToken.skip) {
            return `${value}`;
          }

          if (index === array.length - 1) {
             value = value.trim();
          }

          return `<span class="chord">${pipeIt(value, chordLineToken.pipes)}</span>`;
        }).join('');

        if (opts.chordsDisabled) {
          return null;
        }

        return `<span class="chord-line">${chords}</span>`;
      }

      function hasEndingReturn() {
        return l.substr(-2) === '\r\n' || l.substr(-1) === '\r' || l.substr(-1) === '\n';
      }

      if (opts.lyricsDisabled) {
        return null;
      }

      return `<span className="lyric-line">${l}</span>`;
    }).join('\n');
  }
}