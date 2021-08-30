# `getPokemon`

`getPokemon` allows the retrieval of data for all Pokémon, or for a subset of Pokémon.

## Examples

### Get All Pokémon

`getPokemon` will return data for _all Pokémon_ if not given any options.

```js
import { getPokemon } from '@pokebag/data-sdk'

async function getAllPokemons() {
  const pokemon = await getPokemon()

  console.log(pokemon)
}

getAllPokemons()
// Logs an array with data for all Pokémon
```

### Get Specific Pokémon

`getPokemon` accepts an `options` object, which supports an `ids` array. This array can be used to filter the results if you're only looking for specific Pokémon.

```js
import { getPokemon } from '@pokebag/data-sdk'

async function getSomePokemon() {
  const pokemon = await getPokemon({
    ids: [
      'mr-mime',
      'zeraora',
    ],
  })

  console.log(pokemon)
}

getSomePokemon()
// Logs an array with data for Mr. Mime and Zeraora
```

### Get Pokémon With Skills

`getPokemon` also supports an `options.includeSkills` flag. Setting the flag to `true` will include a `skills` array on the Pokémon data that includes all skills that belong to it.

```js
import { getPokemon } from '@pokebag/data-sdk'

async function getSpecificSkills() {
  const pokemon = await getPokemon({
    includeSkills: true,
    pokemonIDs: [
      'crustle',
      'pikachu',
    ],
  })

  console.log(pokemon)
}

getSpecificSkills()
// Logs an array with data for Crustle and Pikachu, with their skills being
// included in a `skills` array on the relevant Pokémon
```

## Options

| Option          | Required  | Default     | Description                                                       |
|-----------------|-----------|-------------|-------------------------------------------------------------------|
| `ids`           | no        | `undefined` | An array of skill IDs to be retrieved.                            |
| `includeSkills` | no        | `false`     | A flag that forces a Pokémon's skills to be included in its data. |
| `patch`         | no        | `'latest'`  | The maximum patch version to return data for.                     |
