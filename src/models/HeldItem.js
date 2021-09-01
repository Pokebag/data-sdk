/** Held item stat
 * @typedef {Object} HeldItemStat
 * @property {string} [formula] A formula that can be evaluated to determine the value of this item's stat, usually based on the item's level
 * @property {'flat'|'percentage'} [type] Whether the result of the stat's formula should be interpreted as a flat value or a percentage
 */

/** Held item stats
 * @typedef {Object} HeldItemStats
 * @property {HeldItemStat} [attack] Describes how this item modifies the Pokémon's attack damage.
 * @property {HeldItemStat} [attackSpeed] Describes how this item modifies the Pokémon's attack speed.
 * @property {HeldItemStat} [cooldown] Describes how this item modifies the Pokémon's attack cooldown.
 * @property {HeldItemStat} [critDamage] Describes how this item modifies the Pokémon's damage when it scores a critical hit.
 * @property {HeldItemStat} [critRate] Describes how this item modifies the Pokémon's likelihood of scoring a critical hit.
 * @property {HeldItemStat} [defense] Describes how this item modifies the Pokémon's defense.
 * @property {HeldItemStat} [hp] Describes how this item modifies the Pokémon's hit points.
 * @property {HeldItemStat} [hpRecovery] Describes how this item modifies the Pokémon's hit point recovery speed.
 * @property {HeldItemStat} [movementSpeed] Describes how this item modifies the Pokémon's movement speed.
 * @property {HeldItemStat} [spAttack] Describes how this item modifies the Pokémon's special attack damage.
 * @property {HeldItemStat} [spDefense] Describes how this item modifies the Pokémon's special defense.
 * @property {HeldItemStat} [uniteMoveChargeRate] Describes how this item modifies the Pokémon's Unite move charge rate.
 */

/**
 * A held item
 * @typedef {Object} HeldItem
 * @property {string} displayName The display name of the item
 * @property {string} description A description of the item
 * @property {string} id
 * @property {string[]} tags An array of tags that apply to the
 * @property {Object} special An object containing information about the passive bonus provided by the item
 * @property {string} special.description A template string for the description of the item's passive bonus
 * @property {Object} special.boons An object representing the item's passive bonus and how it changes with the item's level
 * @property {HeldItemStats} stats An object containing information about how the item affects the holding Pokémon's stats
 */
