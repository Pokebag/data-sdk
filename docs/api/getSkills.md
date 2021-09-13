# `getSkills`

`getSkills` allows the retrieval of data for all skills (also known as special abilities), or for a subset of skills.

## Examples

### Get All Skills

`getSkills` will return data for _all skills_ if not given any options.

```js
import { getSkills } from '@pokebag/data-sdk'

async function getAllSkills() {
  const skills = await getSkills()

  console.log(skills)
}

getAllSkills()
// Logs an array with data for all skills
```

### Get Specific Skills

`getSkills` accepts an `options` object, which supports an `ids` array. This array can be used to filter the results if you're only looking for specific skills.

```js
import { getSkills } from '@pokebag/data-sdk'

async function getSomeSkills() {
  const skills = await getSkills({
    ids: [
      'absol-night-slash+',
      'absol-psycho-cut+',
    ],
  })

  console.log(skills)
}

getSomeSkills()
// Logs an array that only includes Absol's Night Slash+ and Psycho Cut+ skills.
```

### Get Skills for a Specific Pokémon

`getSkills` also supports an `options.pokemonIDs` array. This array will filter results by the Pokémon to whom the skill belongs.

_**NOTE:**_ `options.ids` and `options.pokemonIDs` may not be used together. If you attempt to provide both options, an error will be thrown. If you are looking for an intersection of this data, you will need to filter the lists yourself.

```js
import { getSkills } from '@pokebag/data-sdk'

async function getSpecificSkills() {
  const skills = await getSkills({
    pokemonIDs: [
      'crustle',
      'pikachu',
    ],
  })

  console.log(skills)
}

getSpecificSkills()
// Logs an array of only skills that belong to Crustle or Pikachu.
```

### Disable parsing of enums

By default, `getSkills` will parse the `slot` and `type` fields to their representational strings (e.g. `'Move 1'` / `'Move 2'` and `'Dash'` / `'Area'`, respectively). If you would prefer to render these strings yourself, you can pass `parseEnums: false`:

```js
import { getSkills } from '@pokebag/data-sdk'

async function getSpecificSkills() {
  const skills = await getSkills({ parseEnums: false })

  console.log(skills)
}

getSpecificSkills()
// Logs an array of skills where `skill` and `type` will be represented by
// their enums, rather than their strings.
```

## Options

| Option        | Required  | Default     | Description                                                                  |
|---------------|-----------|-------------|------------------------------------------------------------------------------|
| `ids`         | no        | `undefined` | An array of skill IDs to be retrieved.                                       |
| `pokemonIDs`  | no        | `undefined` | An array of Pokémon IDs to filter the skill results.                         |
| `parseEnums`  | no        | `true`      | If `true`, parses `slot` and `type` fields to their representational strings |
| `patch`       | no        | `'latest'`  | The maximum patch version to return data for.                                |
