# `getDirectory`

`getDirectory` allows the retrieval of the contents of a directory within the dataset at a particular patch version. If not provided with a specific version, this method returns the dataset for the latest patch.

The directories currently available are:

<!-- * `battle-items` -->
* `held-items`
* `pokemon`
* `skills`

```js
import { getDirectory } from '@pokebag/data-sdk'

async function listPokemonInPatch(patchVersion) {
  const FILES = await getDirectory('pokemon', patchVersion)

  console.log(FILES)
}

listPokemonInPatch('1.1.1.6')
// Logs an array of filenames within the pokemon directory up to patch 1.1.1.6:
// ['absol.json', 'alolan-ninetales.json', 'blissey.json', 'charizard.json', 'cinderace.json', etc.]
```
