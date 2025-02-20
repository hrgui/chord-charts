---
outline: deep
sidebar: false
---

::: code-group

```sh [npm]
$ npm add -D @hrgui/chord-charts
```

```sh [pnpm]
$ pnpm add -D @hrgui/chord-charts
```

```sh [yarn]
$ yarn add -D @hrgui/chord-charts
```

```sh [yarn (pnp)]
$ yarn add -D @hrgui/chord-charts
```

```sh [bun]
$ bun add -D @hrgui/chord-charts
```

:::

Use it in the app in the following way:

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
    "C",
  ),
);
```

<script setup>
import { ref, useTemplateRef, watch } from 'vue'

import { transpose, keys } from "@hrgui/chord-charts";


const count = ref(0)
const previousKey = ref('D')
const currentKey = ref('D')

const text = ref(`
  D            G          D
  Amazing Grace, how sweet the sound,
          A7
  That saved a wretch like me.
        D                G       D
  I once was lost, but now im found,
                  A7     D
  Was blind, but now I see.
`);


function transposeChordChart(e) {
  text.value = transpose(text.value, previousKey.value, e.target.value);
  previousKey.value = e.target.value;
}

</script>

## Working Example

<select v-model="currentKey" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" @change="transposeChordChart">

  <option v-for="key in keys" :value="key.name">{{key.name}}</option>
</select>

<div>

<textarea v-model="text" class="chord-chart rounded" cols="40" rows="10">
</textarea>
</div>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
