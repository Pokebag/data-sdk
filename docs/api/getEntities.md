# `getEntities`

`getEntities` does most of the heavy lifting for our higher-level API.

> **⚠️ NOTE ⚠️**
> You should probably be using [`getHeldItems`](./getHeldItems.md), [`getPokemon`](./getPokemon.md), or [`getSkills`](./getSkills.md) instead.

```js
import { getEntities } from '@pokebag/data-sdk'

async function logAllOfThePokemon(pokemon) {
  const entities = await getEntities({
    ids: pokemon,
    type: 'pokemon',
  })

  console.log(entities)
}

logAllOfThePokemon(['crustle', 'mr-mime'])
// Logs an array with data for Crustle and Mr. Mime
```
