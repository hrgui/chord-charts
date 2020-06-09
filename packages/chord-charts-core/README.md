## chord-charts.js
Need to render a chord chart? This is a collection of libraries that are able to
render chord charts for you, in HTML!

## Installation
```
npm install @hrgui/chord-charts
OR 
yarn add @hrgui/chord-charts
```

# Getting Started
```javascript
import { ChordChart } from 'chord-charts';
let chordChartStr = `
       D            G          D
Amazing Grace, how sweet the sound,
			 A7
That saved a wretch like me.
     D                G       D
I once was lost, but now im found,
               A7     D
Was blind, but now I see.
`;
let chart = new ChordChart(chordChartStr, 'D');
chart.rawForm // returns an array which then can be used in React / Vue JSX
chart.asText(); // returns Text output
chart.asHtml(); // returns HTML output 
chart.tranpose('C');

console.log(chart);
/* Prints 
`
       C            F          C
Amazing Grace, how sweet the sound,
			 G7
That saved a wretch like me.
     C                F       C
I once was lost, but now im found,
               G7     C
Was blind, but now I see.
`
*/
```

# API
Still work in progress! But reset assured (except for rawForm), the final API won't be too far off from that.