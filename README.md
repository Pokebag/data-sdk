# `@pokebag/data-sdk`

## Why Does the Dataset Need Its Own SDK?

This data SDK exists to make it easy to work with [Pokébag](https://pokeb.ag)'s Pokémon UNITE dataset ([`@pokebag/pokemon-unite-data`](https://github.com/pokebag/pokemon-unite-data)). The dataset is built with the expectation that the data will undergo _cumulative transclusion_ before being used.

### WTF is Cumulative Transclusion?

Cumulative transclusion is a process wherein a complete dataset is compiled by applying ordered patches to a base dataset. This means that, other than the base dataset in `@pokebag/pokemon-unite-data`, no part of the dataset is complete. Rather, all patches beyond the base dataset include only the changes that were made in that patch.

As a contrived example:

* The base dataset contains a data file with a complete view of Charizard.
    ```json
    {
      "displayName": "Charizard",
      "stats": {
        "attack": 15,
        "defense": 20
      },
    }
    ```
* In the base dataset, Charizard's attack is 15.
* In patch 1.1.1.8, Charizard's attack is increased to 20.
* For patches 1.1.1.1 through 1.1.1.7, there will be no data for Charizard.
* In patch 1.1.1.8, there will be a file for Charizard. The only data in the file will be empty, except for the upgrade to Charizard's attack.
    ```json
    {
      "stats": {
        "attack": 15
      },
    }
    ```

This expectation of cumulative transclusion makes it impossible to just retrieve the files for a single patch. Instead, the base dataset must be compiled, then **all** of the patch files must applied to the base dataset to get a complete view of the dataset for a specific patch.

## What's Pokébag?
[Pokébag](https://pokeb.ag) is a website for Pokémon fans! We're currently focused on providing really great content for Pokémon UNITE players, but we'll eventually expand to cover far more Pokémon games. Check it out at https://pokeb.ag.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://trezy.com/"><img src="https://avatars.githubusercontent.com/u/442980?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Trezy</b></sub></a><br /><a href="https://github.com/Pokebag/pokemon-unite-data/commits?author=trezy" title="Code">💻</a> <a href="#data-trezy" title="Data">🔣</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
