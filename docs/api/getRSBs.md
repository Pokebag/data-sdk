# `getRSBs`

`getRSBs` allows the retrieval of data for all RSBs, or for a subset of RSBs.

## Examples

### Get All RSBs

`getRSBs` will return data for _all RSBs_ if not given any options.

```js
import { getRSBs } from '@pokebag/data-sdk'

async function getAllRSBs() {
  const rsbs = await getRSBs()

  console.log(rsbs)
}

getAllRSBs()
// Logs an array with data for all RSBs
```

### Get Specific RSBs

`getRSBs` accepts an `options` object, which supports an `ids` array. This array can be used to filter the results if you're only looking for specific RSBs.

```js
import { getRSBs } from '@pokebag/data-sdk'

async function getSomeRSBs() {
  const rsbs = await getRSBs({
    ids: [
      'absol-night-slash+-rsb',
      'absol-psycho-cut+-rsb',
    ],
  })

  console.log(rsbs)
}

getSomeRSBs()
// Logs an array that only includes RSBs for Absol's Night Slash+ and Psycho
// Cut+ skills.
```

### Get RSBs for a Specific Pokémon

`getRSBs` supports an `options.pokemonIDs` array. This array will filter results by the Pokémon to whom the RSB belongs.

_**NOTE:**_ `options.ids` and `options.pokemonIDs` may not be used together. If you attempt to provide both options, an error will be thrown. If you are looking for an intersection of this data, you will need to filter the lists yourself.

```js
import { getRSBs } from '@pokebag/data-sdk'

async function getSpecificRSBs() {
  const rsbs = await getRSBs({
    pokemonIDs: [
      'crustle',
      'pikachu',
    ],
  })

  console.log(rsbs)
}

getSpecificRSBs()
// Logs an array of only RSBs that belong to Crustle or Pikachu.
```

### Get RSBs for a Specific Pokémon

`getRSBs` supports an `options.skillIDs` array. This array will filter results by the skill to which the RSB belongs.

_**NOTE:**_ `options.ids` and `options.skillIDs` may not be used together. If you attempt to provide both options, an error will be thrown. If you are looking for an intersection of this data, you will need to filter the lists yourself.

```js
import { getRSBs } from '@pokebag/data-sdk'

async function getSpecificRSBs() {
  const rsbs = await getRSBs({
    skillIDs: [
      'crustle-stealth-rock',
      'garchomp-dig',
    ],
  })

  console.log(rsbs)
}

getSpecificRSBs()
// Logs an array of only RSBs for Crustle's Stealth Rock or Garchomp's Dig
// skills.
```

### Using `pokemonIDs` and `skillIDs` together

`getRSBs` supports using both the `options.pokemonIDs` and `options.skillIDs` options at the same time. This is an **additive** operation; e.g. the returned array will be a union of the skill and Pokémon RSBs, rather than an intersection.

```js
import { getRSBs } from '@pokebag/data-sdk'

async function getLotsOfRSBs() {
  const rsbs = await getRSBs({
    pokemonIDs: [
      'crustle',
      'pikachu',
    ],
    skillIDs: [
      'gengar-hex',
      'garchomp-dig',
    ],
  })

  console.log(rsbs)
}

getLotsOfRSBs()
// Logs an array of RSBs that belong to either Crustle or Pikachu, as well as
// RSBs for Gengar's Hex and Garchomp's Dig skills.
```

## Options

| Option        | Required  | Default     | Description                                           |
|---------------|-----------|-------------|-------------------------------------------------------|
| `ids`         | no        | `undefined` | An array of skill IDs to be retrieved.                |
| `pokemonIDs`  | no        | `undefined` | An array of Pokémon IDs to filter the skill results.  |
| `skillIDs`    | no        | `undefined` | An array of skill IDs to filter the skill results.    |
| `patch`       | no        | `'latest'`  | The maximum patch version to return data for.         |
