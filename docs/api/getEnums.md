# `getEnums`

`getEnums` returns `enum`s for the dataset. This is useful for parsing representatoinal fields into their official strings.

> **⚠️ NOTE ⚠️**
> If you just need to parse the `slot` and `type` of skills returned from `getSkills`, you should probably just pass the `parseEnums` option to `getSkills`.

## Examples

```js
import {
  getEnums,
  getSkills,
} from '@pokebag/data-sdk'

async function getParsedSkills() {
  const skills = await getSkills()
  const [
    skillSlots,
    skillTypes,
  ] = await Promise.all([
    getEnums({ type: 'pokemon-skill-slot' }),
    getEnums({ type: 'pokemon-skill-type' }),
  ])

  return skills.map(skill => {
    return {
      ...skill,
      slot: skillSlots[skill.slot],
      type: skillTypes[skill.type],
    }
  })
}

getParsedSkills()
// Logs an array of skills with enums parsed
```
