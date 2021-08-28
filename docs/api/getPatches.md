# `getPatches`

`getPatches` is the starting point for discovering what patches the dataset currently supports. It will return an array of all currently supported patch versions.

```js
import { getPatches } from '@pokebag/data-sdk'

async function list1XPatches() {
  const PATCHES = await getPatches()

  console.log(PATCHES.filter(patch => patch.startsWith('1.')))
}

list1XPatches()
// Logs an array of patch versions:
// ['1.1.1.1', '1.1.1.2', '1.1.1.3', etc.]
```
