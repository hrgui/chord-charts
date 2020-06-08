## chord-charts.js
Need to render a chord chart? This is a collection of libraries that are able to
render chord charts for you, in HTML!

## Installation
```
npm install hrgui/chord-charts
OR 
yarn add hrgui/chord-charts
```

# Getting Started
```javascript
import {ChordChart} from 'chord-charts';
let chordChartStr = `
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
let chart = new ChordChart(chordChartStr, 'F');
chart.rawForm // returns an array which then can be used in React / Vue JSX
chart.asText(); // returns Text output
chart.asHtml(); // returns HTML output 
chart.tranpose('G');

console.log(chart);
/* Prints 
`
        Em
    Here I am
               G
    Down on my knees again
                 D
    Surrendering all
                C
    Surrendering all
    Em
    Find me here
                G
    Lord as You draw me near
                     D
    Desperate for You
                 C
    Desperate for You
           Em       G  D  C
    I surrender
`
*/
```

# API
Still work in progress! But reset assured (except for rawForm), the final API won't be too far off from that.