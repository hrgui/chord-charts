# @hrgui/chord-charts

A package that helps manage and transpose Guitar chord charts.

# Usage

```ts
import { transpose } from "@hrgui/chord-charts";

console.log(
  transpose(
    `
       D            G          D
Amazing Grace, how sweet the sound,
			 A7
That saved a wretch like me.
     D                G       D
I once was lost, but now im found,
               A7     D
Was blind, but now I see.
`,
    "D",
    "C"
  )
);
```
