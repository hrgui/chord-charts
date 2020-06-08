import {ChordChart} from './index';

describe('new line check', function() {
  it('should preserve empty new lines', function() {
    let chordChart = 
`
line 1
    
line 2

line 3

line 4
    `;
    let chart = new ChordChart(chordChart, 'F');
    chart.transpose('G');
    let chartText = chart.asText();

    expect(chordChart).toBe(chartText);

  });
});

describe('transposition', function() {
  it('should be able to tranpose slash chords correctly', function() {
    let chordChart = `D/F#`;
    let chart = new ChordChart(chordChart, 'D');
    chart.transpose('E');
    let chartText = chart.asText();
    expect(chartText).toBe('E/G#');
  });

  it('should handle pipes correctly', function() {
    let chordChart = 'Dm | Dm';
    let chart = new ChordChart(chordChart, 'F');
    chart.transpose('G');
    let chartText = chart.asText();

    // should not be the same
    expect(chartText).not.toBe(chordChart);
    expect(chartText).toBe('Em | Em');
  });

  it('should handle pipes correctly (v2)', function() {
    let chordChart = '|Dm|Dm';
    let chart = new ChordChart(chordChart, 'F');
    chart.transpose('G');
    let chartText = chart.asText();
    let chartHtml = chart.asHtml();

    // should not be the same
    expect(chartText).not.toBe(chordChart);
    expect(chartText).toBe('|Em|Em');
  });



  it('should be able to transpose up', function() {

    let chordChart = `
    (Dm) | Dm
Here I am
           F
Down on my knees again
             C
Surrendering all
            A#
Surrendering all
Dm
Find me here
            F
Lord as You draw me near
                 C
Desperate for You
             A#
Desperate for You
       Dm       F  C  A#
I surrender
    `;

    let chart = new ChordChart(chordChart, 'F');
    chart.transpose('G');
    let chartText = chart.asText();
    let chartHtml = chart.asHtml();

    // should not be the same
    expect(chartText).not.toBe(chordChart);
    // should have Em at least
    expect(chartText).toContain(' Em ');
    expect(chartHtml).toContain('Em');

  });

    it('should be able to transpose down', function() {

    let chordChart = `
    Dm
Here I am
           F
Down on my knees again
             C
Surrendering all
            A#
Surrendering all
Dm
Find me here
            F
Lord as You draw me near
                 C
Desperate for You
             A#
Desperate for You
       Dm       F  C  A#
I surrender
    `;

    let chart = new ChordChart(chordChart, 'F');
    chart.transpose('C');
    let chartText = chart.asText();
    let chartHtml = chart.asHtml();

    // should not be the same
    expect(chartText).not.toBe(chordChart);
    // should have Am at least
    expect(chartText).toContain(' Am ');
    expect(chartHtml).toContain('Am');
  });
});


describe('getChordRoot', function() {

  it('should be able to detect the chord C# as root C#', function() {
    let chordRoot = ChordChart.getChordRoot('C#');
    expect(chordRoot).toBe('C#');
  });

  it('should be able to detect the chord D/F# as root D/F#', function() {
    let chordRoot = ChordChart.getChordRoot('D/F#');
    expect(chordRoot).toBe('D');
  });

  it('should be able to detect the chord C#m as root C#', function() {
    let chordRoot = ChordChart.getChordRoot('C#m');
    expect(chordRoot).toBe('C#');
  });

  it('should be able to detect the chord Bbm as root Bb', function() {
    let chordRoot = ChordChart.getChordRoot('Bbm');
    expect(chordRoot).toBe('Bb');
  });

  it('should be able to detect the chord Am as root A', function() {
    let chordRoot = ChordChart.getChordRoot('Am');
    expect(chordRoot).toBe('A');
  });

  it('should be able to detect the chord B as root B', function() {
    let chordRoot = ChordChart.getChordRoot('B');
    expect(chordRoot).toBe('B');
  });

  it('should be able to detect the chord Amaj11 as root A', function() {
    let chordRoot = ChordChart.getChordRoot('Amaj11');
    expect(chordRoot).toBe('A');
  });
});

describe('transposeChord', function() {
  //TODO
});

describe('chordLine detection', function () {
  it('should detect a non-chord line correctly', function() {
    expect(ChordChart.isChordLine('I cast my mind to Calvary')).toBe(false);
  });

  it('should detect a standard chord line correctly', function() {
    expect(ChordChart.isChordLine('C G Am F')).toBe(true);
  });

  it('should be able to detect ghost chords', function() {
    expect(ChordChart.isChordLine('C G Am (F)')).toBe(true);
  });

  it('should be able to handle pipes', function() {
    expect(ChordChart.isChordLine('C G Am F | G Am F')).toBe(true);
  });
});