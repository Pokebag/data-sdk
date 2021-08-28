# `getFile`

`getFile` allows the retrieval of a file within the dataset at a particular patch version. If not provided with a specific version, this method returns the data for the latest patch.

The directories currently available are:

```js
import { getFile } from '@pokebag/data-sdk'

async function getPokemonDetails(pokemonName, patchVersion) {
  const POKEMON_JSON = await getFile(`pokemon/${pokemonName}.json`, patchVersion)

  console.log(POKEMON_JSON)
}

getPokemonDetails('machamp', '1.1.1.4')
// Logs the data for Machamp up to patch 1.1.1.4:
/*
{
  "tags": {
    "range": "Melee",
    "difficulty": "Intermediate",
    "role": "All-Rounder"
  },
  "evolution": [
    {
      "name": "Machop",
      "level": "5"
    },
    {
      "name": "Machoke",
      "level": "9"
    }
  ],
  "damageType": "physical",
  "displayName": "Machamp",
  "ratings": {
    "combat": 8,
    "resistance": 5,
    "mobility": 5,
    "scoring": 5,
    "assistance": 2,
    "total": 25
  },
  "stats": [
    {
      "hp": 3250,
      "attack": 165,
      "defense": 98,
      "spAttack": 20,
      "spDefense": 64
    },
    '...',
  ]
}
*/
```
