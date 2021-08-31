# `getHeldItems`

`getHeldItems` allows the retrieval of data for all held items, or for a subset of held items.

## Examples

### Get All Held Items

`getHeldItems` will return data for _all held items_ if not given any options.

```js
import { getHeldItems } from '@pokebag/data-sdk'

async function getAllHeldItems() {
  const heldItems = await getHeldItems()

  console.log(heldItems)
}

getAllHeldItems()
// Logs an array with data for all held items
```

### Get Specific Held Items

`getHeldItems` accepts an `options` object, which supports an `ids` array. This array can be used to filter the results if you're only looking for specific items.

```js
import { getHeldItems } from '@pokebag/data-sdk'

async function getSomeHeldItems() {
  const heldItems = await getHeldItems({
    ids: [
      'buddy-barrier',
      'score-shield',
    ],
  })

  console.log(heldItems)
}

getSomeHeldItems()
// Logs an array with data for the Buddy Barrier and Score Shield held items
```

## Options

| Option  | Required  | Default     | Description                                   |
|---------|-----------|-------------|-----------------------------------------------|
| `ids`   | no        | `undefined` | An array of held item IDs to be retrieved.    |
| `patch` | no        | `'latest'`  | The maximum patch version to return data for. |
