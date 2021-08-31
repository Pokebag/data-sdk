# Getting Started

## Requirements

* npm or Yarn
* Node.js

## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

This package also relies on the [`@pokebag/pokemon-unite-data`](https://npmjs.com/package/@pokebag/pokemon-unite-data), so you must install both packages:

[npm][]:
```sh
npm install @pokebag/data-sdk @pokebag/pokemon-unite-data
```

[Yarn][]:
```sh
yarn add @pokebag/data-sdk @pokebag/pokemon-unite-data
```

## Usage

To use the data SDK in your Node app, you'll need to import it:

```js
import * as PokebagDataSDK from '@pokebag/data-sdk'
```

Alternatively, you can import the individual methods that you need:

```js
import {
  getHeldItems,
  getPokemon,
  getSkills,
} from '@pokebag/data-sdk'
```

Checkout the rest of our docs for more details on what you can do with the SDK!

### Core Methods
* [`getHeldItems`](./api/getHeldItems)
* [`getPokemon`](./api/getPokemon)
* [`getSkills`](./api/getSkills)

### Low-level API
* [`getDirectory`](./api/getDirectory)
* [`getEntities`](./api/getEntities)
* [`getFile`](./api/getFile)
* [`getPatches`](./api/getPatches)
