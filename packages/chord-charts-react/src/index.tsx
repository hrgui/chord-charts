import { ChordChart } from "@hrgui/chord-charts";
//@ts-ignore
import * as React from "react";
import jss from "jss";
import classnames from 'classnames';

const chordLinesMixin = () => ({
  display: "block"
});

const styles = {
  chord: {
    'font-weight': 'bold'
  },
  lyricLine: {
    ...chordLinesMixin()
  },
  chordLine: {
    ...chordLinesMixin()
  }
} as any;

const { classes } = jss.createStyleSheet(styles).attach();

export class ReactChordChart extends ChordChart {
  /**
   * compile down to react elements
   * @param {Object} opts
   */
  asReactElements(opts: any = {}) {
    return this.rawForm.map(function(l, i) {
      const isChordLine = ChordChart.isChordLine(l);
      if (isChordLine) {
        var chords = l.values.map((chordLineToken, index, array) => {
          let value = chordLineToken.value;

          if (chordLineToken.skip) {
            if (value === "" && array.length === 1) {
              // user just pressed enter only
              value = "\r\n";
              return value;
            }

            if (opts.lyricsDisabled && value.trim) {
              value = value.trim() + " ";
            }

            return <span key={index + "c"}>{value}</span>;
          }

          if (index === array.length - 1) {
            value = value.trim();
          }

          if (opts.lyricsDisabled && value.trim) {
            value = value.trim() + " ";
          }

          return (
            <span className={classnames(classes.chord, opts.chordClassName)} key={index + "c"}>
              {value}
            </span>
          );
        });

        if (chords.every(x => x === "\r\n")) {
          return (
            <span className={classes.chordLine} key={i + "ll"}>
              {chords}
            </span>
          );
        }

        if (opts.chordsDisabled) {
          return null;
        }

        chords = chords.map((c, i) =>
          c === "\r\n" ? <span key={i + "c"}>{c}</span> : c
        );

        return (
          <span className={classes.chordLine} key={i + "cl"}>
            {chords}
          </span>
        );
      }

      if (l.indexOf("#") === 0 && opts.chordsDisabled) {
        return null;
      }

      if (opts.lyricsDisabled) {
        return null;
      }

      return (
        <span className={classes.lyricLine} key={i + "ll"}>
          {l}
        </span>
      );
    });
  }
}
